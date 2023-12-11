import { NativeModules, Platform } from 'react-native';
import SmileIDSmartSelfieEnrollmentView from './SmileIDSmartSelfieEnrollmentView';
import SmileIDSmartSelfieAuthenticationView from './SmileIDSmartSelfieEnrollmentView';
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
  initialize: (useSandBox: boolean = false) => _SmileID.initialize(useSandBox),
  doEnhancedKycAsync: (enhancedKYCRequest: EnhancedKycRequest) =>
    _SmileID.doEnhancedKycAsync(enhancedKYCRequest),
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
