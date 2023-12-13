import { NativeModules, Platform } from 'react-native';
import SmileIDSmartSelfieEnrollmentView from './SmileIDSmartSelfieEnrollmentView';
import SmileIDSmartSelfieAuthenticationView from './SmileIDSmartSelfieAuthenticationView';
import SmileIDDocumentVerificationView from './SmileIDDocumentVerificationView';
import SmileIDBiometricKYCView from './SmileIDBiometricKYCView';
import SmileIDEnhancedDocumentVerificationView from './SmileIDEnhancedDocumentVerificationView';
import {
  EnhancedKycRequest,
  DocumentVerificationRequest,
  SmartSelfieEnrollmentRequest,
  SmartSelfieAuthenticationRequest,
  BiometricKYCRequest,
  SmileIDViewProps,
  ConsentRequest,
} from './types';

const LINKING_ERROR =
  `The package 'react-native-smile-id' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const SmileIdModule = isTurboModuleEnabled
  ? require('./NativeSmileId').default
  : NativeModules.RNSmileID;

const _SmileID = SmileIdModule
  ? SmileIdModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

const SmileID = {
  /**
   * Initialise the Smile ID SDK
   */
  initialize: (useSandBox: boolean = false) => _SmileID.initialize(useSandBox),
  /**
   * NB: Only available on Android
   * Disable crash reporting
   */
  disableCrashReporting: () =>
    Platform.OS === 'android' ? _SmileID.disableCrashReporting() : () => {},
  /**
   *Headless run enhanced kyc async
   */
  doEnhancedKycAsync: (enhancedKYCRequest: EnhancedKycRequest) =>
    _SmileID.doEnhancedKycAsync(enhancedKYCRequest),

  /**
   *Headless run enhanced kyc async
   */
  doEnhancedKyc: (enhancedKYCRequest: EnhancedKycRequest) =>
    _SmileID.doEnhancedKyc(enhancedKYCRequest),
};

export {
  //module
  SmileID,
  //views
  SmileIDSmartSelfieEnrollmentView,
  SmileIDSmartSelfieAuthenticationView,
  SmileIDDocumentVerificationView,
  SmileIDBiometricKYCView,
  SmileIDEnhancedDocumentVerificationView,
  //types
  EnhancedKycRequest,
  DocumentVerificationRequest,
  SmartSelfieEnrollmentRequest,
  SmartSelfieAuthenticationRequest,
  BiometricKYCRequest,
  SmileIDViewProps,
  ConsentRequest,
};
