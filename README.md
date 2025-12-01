# Smile ID React Native SDK


<p align="center">
<a href="https://apps.apple.com/us/app/smile-id/id6448359701?itscg=30200&amp;itsct=apps_box_appicon" style="width: 170px; height: 170px; border-radius: 22%; overflow: hidden; display: inline-block; vertical-align: middle;"><img src="https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/30/4a/94/304a94c9-239c-e460-c7e0-702cc8945827/AppIcon-1x_U007emarketing-0-10-0-85-220-0.png/540x540bb.jpg" alt="Smile ID" style="width: 170px; height: 170px; border-radius: 22%; overflow: hidden; display: inline-block; vertical-align: middle;"></a>
</p>

![NPM Version](https://img.shields.io/npm/v/%40smile_identity%2Freact-native)
[![Build](https://github.com/smileidentity/react-native/actions/workflows/ci.yml/badge.svg)](https://github.com/smileidentity/react-native/actions/workflows/ci.yml)

Smile ID provides premier solutions for Real Time Digital KYC, Identity Verification, User Onboarding, and User Authentication across Africa.

If you haven’t already, [sign up](https://www.usesmileid.com/schedule-a-demo/) for a free Smile ID account, which comes with Sandbox access.

Please see [CHANGELOG.md](CHANGELOG.md) or [Releases](https://github.com/smileidentity/react-native/releases) for the most recent version and release notes.

<a href='https://play.google.com/store/apps/details?id=com.smileidentity.sample&utm_source=github&utm_campaign=reactnative&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img width="250" alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'/></a>

<a href="https://apps.apple.com/us/app/smile-id/id6448359701?itsct=apps_box_badge&amp;itscg=30200" style="display: inline-block; overflow: hidden; border-radius: 13px; width: 250px; height: 83px;"><img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1710028800" alt="Download on the App Store" style="border-radius: 13px; width: 250px; height: 83px;"></a>

## Getting Started

Full documentation is available at [Smile ID Documentation]((https://docs.usesmileid.com/integration-options/mobile/getting-started))

### 0. Requirements

* Node.js >=16.0
* React Native >=0.70
* A `smile_config.json` file from [Smile ID Portal](https://portal.usesmileid.com/sdk)
* See: [Android Requirements](https://github.com/smileidentity/android) for Android specific requirements.
* See: [iOS Requirements](https://github.com/smileidentity/ios) for iOS specific requirements.

### 1. Compatibility

This SDK supports React Native versions **0.70 to 0.74.2** on the **Old Architecture** only. Using it on unsupported versions may lead to unexpected issues such as build failures, SmileID components not rendering, or runtime crashes.

If you're using Expo, use the [Smile ID Expo SDK](https://github.com/smileidentity/react-native-expo).

For the **New Architecture** or **React Native > 0.74.2**, we don't currently have an official SDK. If you'd like to build your own wrapper around the native SmileID SDKs, check out our [recipes repo](https://github.com/smileidentity/recipes/blob/main/DOCS.md) for guides and a [sample wrapper implementation](https://github.com/smileidentity/recipes/tree/main/rn-wrap) to reference.

### 2. Dependency

The latest release is available on [npm](https://www.npmjs.com/package/rn-smile-id)

Add the dependency to your `package.json`:

```json
{
  "dependencies": {
    "@smile_identity/react-native": "<latest-version>"
  }
}
```


### 3. Initialization

There are  multiple ways to initialize the SDK. See [Initialization](https://docs.usesmileid.com/integration-options/mobile/getting-started) and choose the best option
for your integration


## Getting Help

For detailed documentation, please visit [Smile ID Documentation](https://docs.usesmileid.com/integration-options/mobile)

If you require further assistance, you can [file a support ticket](https://portal.usesmileid.com/partner/support/tickets) or [contact us](https://www.usesmileid.com/contact-us/)

## Contributing

Bug reports and Pull Requests are welcomed. Please see [CONTRIBUTING.md](CONTRIBUTING.md)

## License

[MIT License](LICENSE)
