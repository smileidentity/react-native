# Release Notes

## (Unreleased)
* Individual Selfie capture

## 10.1.11
* Fix config issues on iOS

## 10.1.10
* Bump ios to 10.2.8 (https://github.com/smileidentity/ios/releases/tag/v10.2.8) In memory zip file handling

## 10.1.9
* Bump ios to 10.2.6 (https://github.com/smileidentity/ios/releases/tag/v10.2.6) All polling methods now return a AsyncThrowingStream<JobStatusResponse<T>, Error> and instead of a timeout, if there is no error it'll return the last valid response and complete the stream.
* Bump android to 10.2.5 (https://github.com/smileidentity/android/releases/tag/v10.2.5)
* Removed `SmileID.setEnvironment()` since the API Keys are no longer shared between environments

## 10.1.7

* Return the correct type exports and class exports
* Sample app updates to include polling
* Fix ios results to make them uniform with android
* Bump android to 10.2.2 (https://github.com/smileidentity/android/releases/tag/v10.2.2)

## 10.1.6

* Bump iOS to 10.2.2 (https://github.com/smileidentity/ios/releases/tag/v10.2.2) which fixes retry crash

## 10.1.5

* Fix setCallbackUrl crash on ios
* Bump android to 10.1.6 (https://github.com/smileidentity/android/releases/tag/v10.1.7)
* Bump iOS to 10.2.1 (https://github.com/smileidentity/ios/releases/tag/v10.2.1)


## 10.1.4

* Support for react native 0.74.x see (https://reactnative.dev/blog/2024/04/22/release-0.74)
* Android minSdkVersion 23 as per react native 0.74.x (https://reactnative.dev/blog/2024/04/22/release-0.74#android-minimum-sdk-bump-android-60)
* Added offline functionality
  * setAllowOfflineMode
  * submitJob
  * getUnsubmittedJobs
  * getSubmittedJobs
  * cleanup
* Added missing setEnvironment and setCallbackUrl interfaces
* Bump android to 10.1.6 (https://github.com/smileidentity/android/releases/tag/v10.1.6)
* Bump iOS to 10.2.0 (https://github.com/smileidentity/ios/releases/tag/v10.2.0)

## 10.1.3

* Fix polling when instantly starting polling after capture result

## 10.1.2

* Return correct types in all networking methods
* Serialize networking methods to json
* Fix authentication request optional params

## 10.1.1

* Exposed JobType Enum which was missing in exports

## 10.1.0

* Introduced polling methods for products
  * SmartSelfie
  * Biometric kyc
  * Document verification
  * Enhanced document verification
* Moved SmartSelfie enrollment and authentication to synchronous endpoints
* Offline responses for the rest of the products
* Updated to react native 0.73.8
* Bump android to 10.1.4 (https://github.com/smileidentity/android/releases/tag/v10.1.4)
* Bump kotlin version to 2.0.0

## 10.0.3
* Bump iOS to 10.0.11 (https://github.com/smileidentity/ios/releases/tag/v10.0.11)

## 10.0.2

* Bump iOS to 10.0.9 (https://github.com/smileidentity/ios/releases/tag/v10.0.9)
* Bump minimum ios version to 13.4 (https://reactnative.dev/blog/2023/12/06/0.73-debugging-improvements-stable-symlinks#other-breaking-changes)
* Update java version to 17 on all instances
* Update react native to 0.73.6
* Update kotlin to version 1.9.23

## 10.0.1

* Bump Android to 10.0.4 (https://github.com/smileidentity/android/releases/tag/v10.0.4)
* Bump iOS to 10.0.8 (https://github.com/smileidentity/ios/releases/tag/v10.0.8)
* Networking for iOS
* Update java version to 17

## 10.0.0

* Remove beta
* iOS: Biometric KYC allow agent mode
* iOS: Document capture captureBothSides fixes
* iOS: Biometric KYC invalid payload fixes
* Android: Document capture crash fixes
* iOS & Android: Consent screen import fixes

## 10.0.0-beta03

* Added networking wrappers
* Allow new enroll flag
* Android DocV and Enhanced DocV crashes
* iOS DocV and enhanced DocV crashes

## 10.0.0-beta02

### Added

* iOS
  * SmartSelfie™  Enrolment
  * SmartSelfie™ Authentication
  * Document Verification
  * Enhanced Document Verification
  * Biometric KYC
  * Consent Screen
* Android
  * Enhanced Document Verification
  * Consent Screen

### Changed

* SmartSelfie™  Enrolment
* SmartSelfie™ Authentication
* Document Verification

## 10.0.0-beta01

* Initial release
* Support for Android only
  * SmartSelfie™  Enrolment
  * SmartSelfie™ Authentication
  * Document Verification
  * Biometric KYC
