# SmileID React Native SDK (v11) — Agents Guide

Guidance for AI coding agents working on the Smile ID React Native SDK v11. Humans welcome; tone
optimised for tools.

## What This Repo Is

**`@smile_identity/react-native`** — a **thin wrapper** around the native Smile ID SDKs. The
flows, capture UI, camera and ML all live natively; this package exposes them to JS as native
view components plus a module surface. Smile ID provides digital KYC, identity verification, and
onboarding across Africa; this is customer-facing product code.

**This is the critical fact about this repo:** it is *not* where behaviour lives. A capture bug,
a threshold change, or a liveness fix belongs in `smileidentity/android-v11` or
`smileidentity/ios-sdk` — not here. This package passes configuration down and results back,
faithfully.

**v11 is the line partners are on today.** v12 is a separate, ground-up SDK where the React
Native package is TypeScript-first, Expo-only and owns its own UI. Do not port v12 patterns
here — the architectures are opposites.

## Golden Rules

- These rules encode decisions already made — don't relitigate them per change. If a rule
  genuinely shouldn't apply, say so and ask; never silently deviate.
- Precedence when sources disagree: **this file > existing code**. Code that violates a rule is
  tracked legacy debt, not license to imitate.
- Never claim something works or passes unless you actually ran it; list exactly what you
  couldn't run.
- Any partner-facing change adds a plain-language bullet to `CHANGELOG.md` in the same change.
- When a new convention is agreed, record it in this file in the same change.
- **Fix behaviour natively, not in TypeScript.** Wrapping around a native bug here creates
  divergence between platforms instead of resolving it.

## Commands

```bash
yarn lint            # ESLint
yarn typecheck       # tsc
yarn test            # Jest (CI adds --maxWorkers=2 --coverage)
yarn prepare         # build the publishable output (CI runs this)
yarn example         # the example app
```

**CI map:** per-PR gate = `ci.yml` — `yarn lint`, `yarn typecheck`, `yarn test` with coverage,
then `yarn prepare`, plus Android and iOS example builds. Also `audit.yml` and `semgrep.yml`.
Publishing is CI's job — never publish locally.

## Architecture

- `src/index.tsx` — the public surface
- `src/NativeSmileId.ts` — the module interface
- `src/SmileID*View.tsx` — one component per product (`SmileIDBiometricKYCView`,
  `SmileIDDocumentCaptureView`, `SmileIDDocumentVerificationView`,
  `SmileIDEnhancedDocumentVerificationView`, `SmileIDConsentView`, …). Each renders a **native
  view**; the flow itself runs natively.
- `src/__tests__/` — Jest tests
- `android/` — Kotlin glue, namespace `com.smileidentity.react`
- `react-native-smile-id.podspec` — iOS glue

**There is no codegen.** `package.json` declares no `codegenConfig`, so despite the
`NativeSmileId.ts` name this is **not** a TurboModule/Fabric package — it uses the legacy bridge.
Don't add codegen config or new-architecture spec files without an explicit decision; doing so
changes how every host app links this package.

## Native Pins — read this before bumping

The two platforms pin the native SDK differently, and the Android side is **host-overridable**:

| platform | file | pin |
|---|---|---|
| Android | `android/build.gradle` | `com.smileidentity:android-sdk:$smile_id_sdk_version`, resolved from `rootProject.ext.smileIdAndroidSdkVersion` → else the `SmileId_androidVersion` property |
| iOS | `react-native-smile-id.podspec` | `s.dependency "SmileID", "<version>"` (hard-pinned) |

Two consequences:

1. **Bump both together.** Shipping one platform on a newer native SDK than the other is how the
   wrappers drift apart; state the native versions in the PR.
2. **A host app can override the Android version and not the iOS one.** If you are debugging a
   report where Android and iOS behave differently, check the host's
   `smileIdAndroidSdkVersion` before assuming a wrapper bug.

## Cross-Platform Parity

This SDK has siblings on Android, iOS, Flutter and React Native (Expo). Parity is a contract:
public type names, config fields **and their defaults**, and error-code strings stay aligned
across the wrappers, and all must agree with the natives underneath.

When you add or rename a public type or config field: **state the parity impact in the PR**, and
mirror it in the sibling wrappers if they're available locally.

Some divergences are intentional — notably ML threshold magnitudes differ between Android and
iOS because ML Kit and Vision report head rotation differently. **Never "align" those by copying
numbers across**; that breaks liveness on real devices while tests stay green.

## Conventions

- TypeScript with explicit props types per view component; `readonly` props and immutable data
  shapes.
- **No abbreviations**; spell out short locals (`viewModel` not `vm`); exceptions: loop counters
  and `e` for caught errors.
- **No business logic in this package.** TS configures, forwards, and surfaces results. If you
  find yourself reimplementing a validation rule or state machine that exists natively, stop —
  that's the divergence this wrapper exists to avoid.
- No `any` without a justifying comment; narrow at the bridge boundary rather than casting.
- Never log PII or secrets — no tokens, JWTs, signatures, images or partner params.

## Testing

- Jest tests in `src/__tests__/`, run with coverage in CI.
- There is no visual/snapshot gate for the native views — they render natively, so UI-affecting
  changes are verified by hand on a device. Say so in the PR.
- **Every defect fix ships a test that fails before the fix**, at the tightest layer that
  reproduces it; name it in the PR.
- A test that passes and fails on the same commit is a defect in the test — fix or quarantine it,
  never add retries.

## Documentation

**Comment discipline — default to no comment.** A comment earns its place only by stating a
constraint or a WHY the code cannot express — never what the next line does. TSDoc on public API
is one clear sentence plus the params that genuinely need explaining.

Source comments stay self-contained: describe behaviour in this SDK's own terms. No comparisons
to the v12 SDKs, no file paths into other repos.

**Partner-facing docs:** any change partners can see or copy-paste — public API, props and their
defaults, install coordinates, minimum requirements, error codes, permissions, README
quick-start — needs a matching docs update or a "Docs impact" note in the PR description.

## Definition of Done

- ⚠️ **Ask first:** new dependencies; native SDK version bumps; anything that would introduce
  codegen / new-architecture specs.
- 🚫 **Never:** commit secrets; log PII; publish packages; reimplement native behaviour in TS.

Before finishing any change:

- [ ] `yarn lint`, `yarn typecheck`, `yarn test` green, and `yarn prepare` succeeds
- [ ] Native pin bumped → **both** `android/build.gradle` and the podspec, versions stated in the
      PR
- [ ] Public surface changed → parity impact stated; sibling wrappers mirrored
- [ ] UI-affecting change → verified on a device and stated as such
- [ ] `CHANGELOG.md` bullet for anything partner-visible
- [ ] Self-review in priority order — security (no PII/secrets in logs) → bridge contract (props
      and events match the natives on both sides) → reliability (error paths surfaced, not
      swallowed) → architecture (no behaviour reimplemented in TS) → readability. If you can't
      describe a concrete failure scenario, don't flag it.
