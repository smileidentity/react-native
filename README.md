# Smile ID Flutter SDK

Smile ID provides the best solutions for Real Time Digital KYC, Identity Verification, User
Onboarding, and User Authentication across Africa.

If you haven’t already,
[sign up](https://www.usesmileid.com/schedule-a-demo/) for a free Smile ID account, which comes
with Sandbox access.

Please see [CHANGELOG.md](CHANGELOG.md) or
[Releases](https://github.com/smileidentity/android/releases) for the most recent version and
release notes

## Getting Started

Full documentation is available at https://docs.usesmileid.com/integration-options/mobile

#### 0. Requirements

* node >=16.0
* React Native >=0.70
* A `smile_config.json` file from [https://portal.usesmileid.com/sdk](https://portal.usesmileid.com/sdk)
* See: https://github.com/smileidentity/android for Android specific requirements
* See: https://github.com/smileidentity/ios for iOS specific requirements

#### 1. Dependency


The latest release is available on [npmjs.org](https://www.npmjs.com/package/react-native-smile-id)

Add the dependency to your `package.json`

```json
{ "react-native-smile-id": "<latest-version>"}
```

#### 2. Smile Config

#### Android

Place the `smile_config.json` file under your application's assets, located at `src/main/assets`
(This should be at the same level as your `java` and `res` directories). You may need to create the
directory if it does not already exist.

#### iOS

Drag the `smile_config.json` into your project's file inspector and ensure that the file is added to
your app's target. Confirm that it is by checking the Copy Bundle Resources drop down in the Build
Phases tab as shown below.

#### 3. Initialization

Initialize the Smile ID SDK in your app's entry file normally `index.tsx`  by calling `initialize`

```dart
import { SmileID } from 'react-native-smile-id';

void main()  {
  SmileID.initialize();
}
```

## Getting Help

For detailed documentation, please visit https://docs.usesmileid.com/integration-options/mobile

If you require further assistance, you can
[file a support ticket](https://portal.usesmileid.com/partner/support/tickets) or
[contact us](https://www.usesmileid.com/contact-us/)

## Contributing

Bug reports and Pull Requests are welcomed. Please see [CONTRIBUTING.md](CONTRIBUTING.md)

## License

[MIT License](LICENSE)
