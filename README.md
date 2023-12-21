# Smile ID React Native SDK

Smile ID provides premier solutions for Real Time Digital KYC, Identity Verification, User Onboarding, and User Authentication across Africa.

If you haven’t already, [sign up](https://www.usesmileid.com/schedule-a-demo/) for a free Smile ID account, which comes with Sandbox access.

Please see [CHANGELOG.md](CHANGELOG.md) or [Releases](https://github.com/smileidentity/react-native/releases) for the most recent version and release notes.

## Getting Started

Full documentation is available at [Smile ID Documentation](https://docs.usesmileid.com/integration-options/mobile)

### 0. Requirements

* Node.js >=16.0
* React Native >=0.70
* A `smile_config.json` file from [Smile ID Portal](https://portal.usesmileid.com/sdk)
* See: [Android Requirements](https://github.com/smileidentity/android) for Android specific requirements.
* See: [iOS Requirements](https://github.com/smileidentity/ios) for iOS specific requirements.

### 1. Dependency

The latest release is available on [npm](https://www.npmjs.com/package/rn-smile-id)

Add the dependency to your `package.json`:

```json
{
  "dependencies": {
    "@smile_identity/react-native": "<latest-version>"
  }
}
```

### 2. Smile Config

#### Android

Place the `smile_config.json` file under your application's assets, located at `src/main/assets` (This should be at the same level as your `java` and `res` directories). You may need to create the directory if it does not already exist.

#### iOS

Drag the `smile_config.json` into your project's file inspector and ensure that the file is added to your app's target. Confirm that it is by checking the Copy Bundle Resources drop down in the Build Phases tab as shown below.

### 3. Initialization

Initialize the Smile ID SDK in your app's entry file (normally `index.tsx`) by calling `initialize`:

```typescript
import { initialize } from 'rn-smile-id';
import React, { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    initialize().then(() => console.log('Smile ID Initialized'));
  }, []);

  return (
    // ...rest of your component
  );
};

export default App;
```

## Getting Help

For detailed documentation, please visit [Smile ID Documentation](https://docs.usesmileid.com/integration-options/mobile)

If you require further assistance, you can [file a support ticket](https://portal.usesmileid.com/partner/support/tickets) or [contact us](https://www.usesmileid.com/contact-us/)

## Contributing

Bug reports and Pull Requests are welcomed. Please see [CONTRIBUTING.md](CONTRIBUTING.md)

## License

[MIT License](LICENSE)
