## Overview

This repo encompasses everything necessary for the Smile ID React Native SDK. It is a multi-module
project consisting of the following modules:

- [`react-native-smile-id`](https://github.com/smileidentity/react-native/tree/main) -
  The SDK distributed to partners
- [`sample`](https://github.com/smileidentity/react-native/tree/main/sample) - a sample app
  that demonstrates SDK integration and showcases Smile ID products

## Setup

- [nvm](https://github.com/nvm-sh/nvm) to manage node version
- Visual Studio Code
- [Cocoapods](https://cocoapods.org/)

## Run the sample app

We bundle a sample app that demonstrates SDK integration and showcases Smile ID products. To run it,
follow the following steps
## Development workflow

To get started with the project, run `yarn` in the root directory to install the required dependencies for each package:

To start the packager:

```sh
yarn example start
```

To run the example app on Android:

```sh
yarn example android
```

To run the example app on iOS:

```sh
yarn example ios
```

> While it's possible to use [`npm`](https://github.com/npm/cli), the tooling is built around [`yarn`](https://classic.yarnpkg.com/), so you'll have an easier time if you use `yarn` for development.

While developing, you can run the [example app](/example/) to test your changes. Any changes you make in your library's JavaScript code will be reflected in the example app without a rebuild. If you change any native code, then you'll need to rebuild the example app.

By default, the example is configured to build with the old architecture. To run the example with the new architecture, you can do the following:

1. For Android, run:

   ```sh
   ORG_GRADLE_PROJECT_newArchEnabled=true yarn example android
   ```

2. For iOS, run:

   ```sh
   RCT_NEW_ARCH_ENABLED=1 yarn example pods
   yarn example ios
   ```

If you are building for a different architecture than your previous build, make sure to remove the build folders first. You can run the following command to cleanup all build folders:

```sh
yarn clean
```

To confirm that the app is running with the new architecture, you can check the Metro logs for a message like this:

```sh
Running "SmileIdExample" with {"fabric":true,"initialProps":{"concurrentRoot":true},"rootTag":1}
```

Note the `"fabric":true` and `"concurrentRoot":true` properties.

Make sure your code passes TypeScript and ESLint. Run the following to verify:

```sh
yarn typecheck
yarn lint
```

To fix formatting errors, run the following:

```sh
yarn lint --fix
```

Remember to add tests for your change if possible. Run the unit tests by:

```sh
yarn test
```

To edit the Objective-C or Swift files, open `example/ios/SmileIdExample.xcworkspace` in XCode and find the source files at `Pods > Development Pods > react-native-smile-id`.
To edit the Java or Kotlin files, open `example/android` in Android studio and find the source files at `react-native-smile-id` under `Android`.

# Testing unreleased Native SDKs

> ⚠️ **CAUTION:** We should never have unreleased SDKs in the main branch. This is only for testing unreleased SDKs. All PRs to main branch should be released SDKs.

## Android
* Uncomment  `maven { url "https://oss.sonatype.org/content/repositories/snapshots/" }` in `android/build.gradle`
* Specify snapshot version in `android/gradle.properties` file: which must have been prebuilt from any of the PRs in the [Android](https://github.com/smileidentity/android) repo

## iOS
* Comment out the version in the react-native-smile-id.podspec file in `./react-native-smile-id.podspec` file:

```ruby
#  s.dependency "SmileID" # => Mind the version removal
```
* Specify the repo SmileID [iOS](https://github.com/smileidentity/ios) repo and pick a tag or branch podspec file in the Podfile example/ios/Podfile file:
```ruby
  pod 'SmileID', :path => '../ios/SmileID.podspec'
```ruby
  pod 'SmileID', git: 'https://github.com/smileidentity/ios.git', branch: 'main'
```
* Run `pod install` in the `example/ios` folder
* If you have pod install issues run
```bash
  pod deintegrate && pod install
```

Happy testing!

### Commit message convention

We follow the [conventional commits specification](https://www.conventionalcommits.org/en) for our commit messages:

- `fix`: bug fixes, e.g. fix crash due to deprecated method.
- `feat`: new features, e.g. add new method to the module.
- `refactor`: code refactor, e.g. migrate from class components to hooks.
- `docs`: changes into documentation, e.g. add usage example for the module..
- `test`: adding or updating tests, e.g. add integration tests using detox.
- `chore`: tooling changes, e.g. change CI config.

Our pre-commit hooks verify that your commit message matches this format when committing.

### Linting and tests

[ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [TypeScript](https://www.typescriptlang.org/)

We use [TypeScript](https://www.typescriptlang.org/) for type checking, [ESLint](https://eslint.org/) with [Prettier](https://prettier.io/) for linting and formatting the code, and [Jest](https://jestjs.io/) for testing.

Our pre-commit hooks verify that the linter and tests pass when committing.

### Publishing to npm

We use [release-it](https://github.com/release-it/release-it) to make it easier to publish new versions. It handles common tasks like bumping version based on semver, creating tags and releases etc.

To publish new versions, run the following:

```sh
yarn release
```

### Scripts

The `package.json` file contains various scripts for common tasks:

- `yarn bootstrap`: setup project by installing all dependencies and pods.
- `yarn typecheck`: type-check files with TypeScript.
- `yarn lint`: lint files with ESLint.
- `yarn test`: run unit tests with Jest.
- `yarn example start`: start the Metro server for the example app.
- `yarn example android`: run the example app on Android.
- `yarn example ios`: run the example app on iOS.

### Sending a pull request

> **Working on your first pull request?** You can learn how from this _free_ series: [How to Contribute to an Open Source Project on GitHub](https://app.egghead.io/playlists/how-to-contribute-to-an-open-source-project-on-github).

When you're sending a pull request:

- Prefer small pull requests focused on one change.
- Verify that linters and tests are passing.
- Review the documentation to make sure it looks good.
- Follow the pull request template when opening a pull request.
- For pull requests that change the API or implementation, discuss with maintainers first by opening an issue.
