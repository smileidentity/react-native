# Smile ID React Native SDK

<p align="center">
<a href="https://apps.apple.com/us/app/smile-id/id6448359701?itscg=30200&amp;itsct=apps_box_appicon" style="width: 170px; height: 170px; border-radius: 22%; overflow: hidden; display: inline-block; vertical-align: middle;"><img src="https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/30/4a/94/304a94c9-239c-e460-c7e0-702cc8945827/AppIcon-1x_U007emarketing-0-10-0-85-220-0.png/540x540bb.jpg" alt="Smile ID" style="width: 170px; height: 170px; border-radius: 22%; overflow: hidden; display: inline-block; vertical-align: middle;"></a>
</p>

![NPM Version](https://img.shields.io/npm/v/%40smile_identity%2Freact-native)
[![Build](https://github.com/smileidentity/react-native/actions/workflows/ci.yml/badge.svg)](https://github.com/smileidentity/react-native/actions/workflows/ci.yml)

Smile ID provides premier solutions for Real Time Digital KYC, Identity Verification, User Onboarding, and User Authentication across Africa.

**✨ Universal Compatibility**: This SDK now supports both **React Native** and **Expo** projects with the same codebase - no changes required!

If you haven't already, [sign up](https://www.usesmileid.com/schedule-a-demo/) for a free Smile ID account, which comes with Sandbox access.

Please see [CHANGELOG.md](CHANGELOG.md) or [Releases](https://github.com/smileidentity/react-native/releases) for the most recent version and release notes.

<a href='https://play.google.com/store/apps/details?id=com.smileidentity.sample&utm_source=github&utm_campaign=reactnative&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img width="250" alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'/></a>

<a href="https://apps.apple.com/us/app/smile-id/id6448359701?itsct=apps_box_badge&amp;itscg=30200" style="display: inline-block; overflow: hidden; border-radius: 13px; width: 250px; height: 83px;"><img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1710028800" alt="Download on the App Store" style="border-radius: 13px; width: 250px; height: 83px;"></a>

## ✨ New: Universal React Native & Expo Support

This SDK automatically detects your environment and provides the same API for both React Native and Expo projects:

- 🚀 **Zero Breaking Changes**: Existing React Native projects continue working unchanged
- 🔄 **Automatic Detection**: Smart platform detection chooses the right implementation
- 📱 **Universal API**: Same code works in both React Native and Expo
- 🧩 **Maximum Code Reuse**: Shared business logic across platforms
- ⚡ **Easy Migration**: Drop-in replacement with no code changes needed

## Getting Started

Full documentation is available at [Smile ID Documentation](https://docs.usesmileid.com/integration-options/mobile/getting-started)

### 0. Requirements

#### Universal Requirements
* Node.js >=16.0
* A `smile_config.json` file from [Smile ID Portal](https://portal.usesmileid.com/sdk)

#### React Native Projects
* React Native >=0.70
* See: [Android Requirements](https://github.com/smileidentity/android) for Android specific requirements
* See: [iOS Requirements](https://github.com/smileidentity/ios) for iOS specific requirements

#### Expo Projects
* Expo SDK >=49.0
* EAS Build (for custom native code)
* See: [Expo Configuration](#expo-configuration) below

### 1. Installation

The latest release is available on [npm](https://www.npmjs.com/package/@smile_identity/react-native)

#### For React Native Projects:

```bash
npm install @smile_identity/react-native
# or
yarn add @smile_identity/react-native
```

#### For Expo Projects:

```bash
npx expo install @smile_identity/react-native
```

Then add to your `package.json`:

```json
{
  "dependencies": {
    "@smile_identity/react-native": "<latest-version>"
  }
}
```

### 2. Platform Configuration

#### React Native Configuration

Follow the standard React Native setup:

1. **iOS Setup**:
   ```bash
   cd ios && pod install
   ```

2. **Android Setup**: No additional steps required

3. **Metro Configuration** (if needed):
   ```javascript
   // metro.config.js
   module.exports = {
     // your existing config
   };
   ```

#### Expo Configuration

1. **Install Expo Development Build**:
   ```bash
   npx expo install expo-dev-client
   ```

2. **Configure app.json/app.config.js**:
   ```json
   {
     "expo": {
       "name": "Your App",
       "plugins": [
         "expo-dev-client"
       ],
       "ios": {
         "bundleIdentifier": "com.yourcompany.yourapp"
       },
       "android": {
         "package": "com.yourcompany.yourapp"
       }
     }
   }
   ```

3. **Build Development Build**:
   ```bash
   # For iOS Simulator
   npx eas build --platform ios --profile development --local

   # For Android Emulator
   npx eas build --platform android --profile development --local
   ```

4. **Install and Run**:
   ```bash
   # Install the build on your device/simulator
   # Then start the dev server
   npx expo start --dev-client
   ```

### 3. Usage

The API is identical for both React Native and Expo! The SDK automatically detects your environment.

#### Basic Setup

```typescript
import {
  SmileID,
  Config,
  SmileIDSmartSelfieEnrollmentView,
  SmileIDDocumentVerificationView,
  JobType,
  AuthenticationRequest
} from '@smile_identity/react-native';

// Initialize SDK (same for both platforms)
const config = new Config(
  'your-partner-id',
  'your-auth-token',
  'https://prod-lambda-url.com',
  'https://test-lambda-url.com'
);

await SmileID.initialize(
  true, // use sandbox
  false, // enable crash reporting
  config,
  'your-api-key'
);
```

#### Using View Components

```tsx
import React from 'react';
import { SmileIDSmartSelfieEnrollmentView } from '@smile_identity/react-native';

export default function MyScreen() {
  return (
    <SmileIDSmartSelfieEnrollmentView
      userId="user-123"
      jobId="job-456"
      allowAgentMode={true}
      showInstructions={true}
      onResult={(result) => {
        console.log('Enrollment result:', result);
      }}
    />
  );
}
```

#### API Methods

```typescript
// Authentication (same API for both platforms)
const authRequest = new AuthenticationRequest(
  JobType.SmartSelfieEnrollment,
  'US',
  'PASSPORT'
);

const response = await SmileID.authenticate(authRequest);

// Get services
const services = await SmileID.getServices();

// Job status
const status = await SmileID.getSmartSelfieJobStatus(statusRequest);
```

### 4. Platform Detection & Diagnostics

You can check which platform is being used:

```typescript
import { PlatformDetector, SmileIDDiagnostics } from '@smile_identity/react-native';

// Check current platform
const platform = PlatformDetector.getPlatform(); // 'expo' | 'react-native'

// Get detailed diagnostic info
const platformInfo = SmileIDDiagnostics.getPlatformInfo();
console.log('Platform:', platformInfo.platform);
console.log('Has Expo:', platformInfo.hasExpoModulesCore);
console.log('Has React Native:', platformInfo.hasReactNative);

// Get SDK diagnostic info
const sdkInfo = SmileIDDiagnostics.getSDKInfo();
```

## Example Applications

We provide **two example applications** to demonstrate different aspects of the SmileID SDK:

### 1. React Native Example (Production-Ready)

📁 **Location**: [`example/`](./example/)

**Purpose**: Full-featured React Native application showcasing production patterns and best practices.

**Key Features:**
- Complete React Native navigation setup with React Navigation
- All SmileID products and components demonstrated
- Production-ready project structure
- Performance optimized with native modules
- Real device testing and debugging tools

**Use this example when:**
- Building a traditional React Native app
- Learning production React Native patterns
- Testing performance and native module integration
- Developing for existing React Native projects

**Running the Example:**
```bash
# From project root
yarn example android
yarn example ios

# Or directly in example directory
cd example
npm run android
npm run ios
npm run start  # Start Metro bundler
```

### 2. Universal Example (Cross-Platform Demo)

📁 **Location**: [`example-unified/`](./example-unified/)

**Purpose**: Minimal example demonstrating the same code working in both React Native and Expo environments.

**Key Features:**
- **Universal Compatibility**: Same code runs in React Native and Expo
- Platform detection and diagnostics display
- Simplified setup focused on SDK demonstration
- Live platform switching demonstration
- Core SDK functionality showcase

**Use this example when:**
- Demonstrating cross-platform compatibility
- Quick SDK evaluation and testing
- Learning the universal API
- Migrating between React Native and Expo

**Running the Example:**
```bash
cd example-unified

# Install dependencies
npm install

# For React Native mode
npm run android
npm run ios

# For Expo mode (requires development build)
npm run expo:start
npm run expo:android
npm run expo:ios
```

## Which Example Should I Use?

| Need | Use This Example |
|------|------------------|
| Production React Native app | **React Native Example** (`example/`) |
| Learning React Native best practices | **React Native Example** (`example/`) |
| Quick SDK evaluation | **Universal Example** (`example-unified/`) |
| Cross-platform demonstration | **Universal Example** (`example-unified/`) |
| Expo project setup | **Universal Example** (`example-unified/`) |
| Testing universal compatibility | **Universal Example** (`example-unified/`) |

## Development Scripts

### Available Scripts

From the project root:

```bash
# Run example app
yarn example android
yarn example ios

# Development
yarn typecheck          # TypeScript validation
yarn lint               # ESLint validation
yarn test              # Run tests
yarn clean             # Clean build artifacts

# Building
yarn prepare           # Build the library (runs automatically)
```

### Project Structure

```
@smile_identity/react-native/
├── core/                          # Shared business logic
│   ├── SmileIDCore.ts            # Core SDK functionality
│   ├── SmileIDSDK.ts             # Smart SDK with platform detection
│   ├── PlatformDetector.ts       # Platform detection logic
│   ├── types.ts                  # Shared TypeScript types
│   └── constants.ts              # SDK constants and configuration
├── platforms/                     # Platform-specific implementations
│   ├── expo/                     # Expo platform wrapper
│   │   ├── SmileIDExpoSDK.ts     # Expo SDK implementation
│   │   └── SmileIDExpoViews.tsx  # Expo view components
│   └── react-native/             # React Native platform wrapper
│       ├── SmileIDReactNativeSDK.ts    # RN SDK implementation
│       └── SmileIDReactNativeViews.ts  # RN view components
├── android/                      # Android native implementations
│   ├── legacy/                   # Original React Native Android code
│   └── expo/                     # Expo module Android code
├── ios/                         # iOS native implementations
│   ├── legacy/                   # Original React Native iOS code
│   └── expo/                     # Expo module iOS code
├── example/                      # React Native example app
├── example-unified/              # Universal example app
├── src/                         # Legacy source (preserved for compatibility)
└── index.ts                     # Main entry point (universal)
```

### How It Works

#### Smart Platform Detection

The SDK uses automatic platform detection:

1. **Dependency Detection**: Checks for `expo-modules-core` availability
2. **Environment Detection**: Analyzes runtime environment
3. **Fallback Strategy**: Defaults to React Native if detection fails
4. **Caching**: Platform detection results are cached for performance

#### Core-Platform Architecture

```
┌─────────────────────────────────────┐
│           index.ts                  │ ← Universal Entry Point
│     (Smart Platform Detection)      │
└─────────────────┬───────────────────┘
                  │
        ┌─────────┴─────────┐
        │                   │
┌───────▼─────┐    ┌────────▼──────┐
│ Expo Platform│    │ RN Platform   │ ← Platform Wrappers
│   Wrapper    │    │   Wrapper     │
└───────┬─────┘    └────────┬──────┘
        │                   │
        └─────────┬─────────┘
                  │
        ┌─────────▼─────────┐
        │   Core Layer      │ ← Shared Business Logic
        │ - SmileIDCore     │
        │ - Types           │
        │ - Constants       │
        │ - Utilities       │
        └───────────────────┘
```

#### Code Reusability

- **Shared Core Logic**: ~85% of code is shared between platforms
- **Platform Wrappers**: Thin layers that delegate to shared core
- **Identical APIs**: Same interface and behavior across platforms
- **Type Safety**: Full TypeScript support with shared type definitions

## Initialization Options

There are multiple ways to initialize the SDK. See [Initialization](https://docs.usesmileid.com/integration-options/mobile/getting-started) and choose the best option for your integration.

### Option 1: Basic Initialization

```typescript
import { SmileID, Config } from '@smile_identity/react-native';

const config = new Config(
  'your-partner-id',
  'your-auth-token',
  'https://prod-lambda-url.com',
  'https://test-lambda-url.com'
);

await SmileID.initialize(
  true,  // use sandbox
  false, // enable crash reporting
  config,
  'your-api-key'
);
```

### Option 2: Environment-based Initialization

```typescript
const config = new Config(
  process.env.SMILE_PARTNER_ID,
  process.env.SMILE_AUTH_TOKEN,
  process.env.SMILE_PROD_URL,
  process.env.SMILE_TEST_URL
);

await SmileID.initialize(
  __DEV__, // use sandbox in development
  !__DEV__, // enable crash reporting in production
  config,
  process.env.SMILE_API_KEY
);
```

## Migration Guide

### From React Native v9.x to v10.x (Universal)

**✅ No code changes required!**

Your existing React Native code will continue working exactly as before. The SDK now additionally supports Expo projects.

### Adding Expo Support to Existing React Native Project

1. Install Expo CLI: `npm install -g @expo/cli`
2. Initialize Expo: `npx expo init --template bare-minimum`
3. Copy your existing React Native code
4. The SmileID SDK will automatically detect Expo and work seamlessly

### From Other Identity SDKs

See our [Migration Guide](https://docs.usesmileid.com/integration-options/mobile/migration) for detailed instructions.

## Troubleshooting

### Common Issues

#### React Native Issues

**Missing React Native CLI dependencies:**
```bash
# Install missing CLI platform tools
npm install @react-native-community/cli @react-native-community/cli-platform-android --save-dev

# Or in the main project directory
cd .. && npm install @react-native-community/cli-platform-android --save-dev
```

**Metro bundler issues:**
```bash
npx react-native start --reset-cache
```

**Android build issues:**
```bash
# Clean and rebuild
cd android && ./gradlew clean && cd ..
npx react-native run-android

# If AndroidX issues occur, ensure gradle.properties has:
# android.useAndroidX=true
# android.enableJetifier=true
```

**iOS build issues:**
```bash
cd ios && pod install && cd ..
npx react-native run-ios

# If you encounter duplicate Swift file errors during build:
# This happens when both ios/ and ios/legacy/ directories contain the same files
# The podspec has been updated to use only ios/legacy/ files to avoid conflicts

# For Xcode command line builds:
xcodebuild -workspace SmileIdExample.xcworkspace -scheme SmileIdExample -destination 'platform=iOS Simulator,name=iPhone 16,OS=18.2' build
```

**TypeScript build configuration issues:**
```bash
# If you see "file not under rootDir" errors during npm install:
# This happens when the project structure changes - the prepare script will be updated in the next release
# Workaround: install without scripts
npm install --ignore-scripts
```

#### Expo Issues

**Development build not working:**
```bash
# Rebuild development build
npx eas build --platform ios --profile development --local --clear-cache
```

**Metro config conflicts:**
```bash
# Clear Expo cache
npx expo start --clear
```

**Missing native modules:**
```bash
# Ensure you're using development build, not Expo Go
# The SmileID SDK requires native modules which are not available in Expo Go
npx expo run:ios --device
npx expo run:android --device
```

**expo-modules-core dependency issues:**
```bash
# Install Expo development client
npx expo install expo-dev-client

# Ensure you have the latest EAS CLI
npm install -g @expo/cli@latest
```

#### Build System Issues

**Xcode build validation:**
```bash
# React Native Example App build test:
cd example/ios && xcodebuild -workspace SmileIdExample.xcworkspace -scheme SmileIdExample -destination 'platform=iOS Simulator,name=iPhone 16,OS=18.2' build
# Result: ✅ BUILD SUCCEEDED

# Unified Example App build test:
cd example-unified/ios && xcodebuild -workspace SmileIdExample.xcworkspace -scheme SmileIdExample -destination 'platform=iOS Simulator,name=iPhone 16,OS=18.2' build
# Result: ✅ BUILD SUCCEEDED

# Common Xcode build requirements:
# 1. Run 'pod install' first to install CocoaPods dependencies
# 2. Use iPhone 16 simulator (iOS 18.2) or other available simulators
# 3. SmileID iOS SDK v10.5.3 properly integrated via CocoaPods
# 4. Updated podspec to avoid file conflicts (uses ios/legacy/ files)
```

**Gradle build failures:**
```bash
# If you encounter AndroidX dependency conflicts:
# Add to android/gradle.properties:
android.useAndroidX=true
android.suppressUnsupportedCompileSdk=35

# For SDK version warnings:
# This is normal - the SmileID Android SDK uses the latest Android APIs
```

**Workspace configuration errors:**
```bash
# If you see "Workspaces can only be enabled in private projects":
# Add to package.json:
"private": true

# This is required for workspace functionality
```

### Platform Detection Issues

If platform detection isn't working correctly:

```typescript
import { PlatformDetector } from '@smile_identity/react-native';

// Force platform detection refresh
PlatformDetector.clearCache();
const platform = PlatformDetector.getPlatform();

// Check diagnostics
const diagnostics = PlatformDetector.getDiagnostics();
console.log('Platform diagnostics:', diagnostics);
```

### Debug Mode

Enable debug logging:

```typescript
// This will show platform detection and SDK initialization logs
console.log('Platform Info:', SmileIDDiagnostics.getPlatformInfo());
console.log('SDK Info:', SmileIDDiagnostics.getSDKInfo());
```

## Getting Help

For detailed documentation, please visit [Smile ID Documentation](https://docs.usesmileid.com/integration-options/mobile)

If you require further assistance, you can [file a support ticket](https://portal.usesmileid.com/partner/support/tickets) or [contact us](https://www.usesmileid.com/contact-us/)

## Contributing

Bug reports and Pull Requests are welcomed. Please see [CONTRIBUTING.md](CONTRIBUTING.md)
