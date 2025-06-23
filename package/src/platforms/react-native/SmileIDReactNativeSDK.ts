/**
 * Simplified React Native platform implementation for SmileID SDK
 * This is a thin wrapper that just passes calls to the native module
 * All error handling and response processing is done by SmileIDSDK in core
 */
import { NativeModules, Platform } from 'react-native';
import type { SmileIDSDKInterface } from '../../core/SmileIDSDK';

// Define linking error message
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

const NativeSmileID = SmileIdModule
  ? SmileIdModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

/**
 * React Native platform implementation - thin wrapper
 * Simply delegates all calls to the native module without any processing
 */
export class SmileIDReactNativeSDK implements SmileIDSDKInterface {
  // All methods simply delegate to the native module
  // The SmileIDSDK in core handles all error formatting and response processing

  initialize = NativeSmileID.initialize.bind(NativeSmileID);
  setAllowOfflineMode = NativeSmileID.setAllowOfflineMode.bind(NativeSmileID);
  submitJob = NativeSmileID.submitJob.bind(NativeSmileID);
  getUnsubmittedJobs = NativeSmileID.getUnsubmittedJobs.bind(NativeSmileID);
  getSubmittedJobs = NativeSmileID.getSubmittedJobs.bind(NativeSmileID);
  cleanup = NativeSmileID.cleanup.bind(NativeSmileID);
  disableCrashReporting =
    NativeSmileID.disableCrashReporting.bind(NativeSmileID);
  authenticate = NativeSmileID.authenticate.bind(NativeSmileID);
  prepUpload = NativeSmileID.prepUpload.bind(NativeSmileID);
  upload = NativeSmileID.upload.bind(NativeSmileID);
  doEnhancedKyc = NativeSmileID.doEnhancedKyc.bind(NativeSmileID);
  doEnhancedKycAsync = NativeSmileID.doEnhancedKycAsync.bind(NativeSmileID);
  getSmartSelfieJobStatus =
    NativeSmileID.getSmartSelfieJobStatus.bind(NativeSmileID);
  getDocumentVerificationJobStatus =
    NativeSmileID.getDocumentVerificationJobStatus.bind(NativeSmileID);
  getBiometricKycJobStatus =
    NativeSmileID.getBiometricKycJobStatus.bind(NativeSmileID);
  getEnhancedDocumentVerificationJobStatus =
    NativeSmileID.getEnhancedDocumentVerificationJobStatus.bind(NativeSmileID);
  getProductsConfig = NativeSmileID.getProductsConfig.bind(NativeSmileID);
  getValidDocuments = NativeSmileID.getValidDocuments.bind(NativeSmileID);
  getServices = NativeSmileID.getServices.bind(NativeSmileID);
  pollSmartSelfieJobStatus =
    NativeSmileID.pollSmartSelfieJobStatus.bind(NativeSmileID);
  pollDocumentVerificationJobStatus =
    NativeSmileID.pollDocumentVerificationJobStatus.bind(NativeSmileID);
  pollBiometricKycJobStatus =
    NativeSmileID.pollBiometricKycJobStatus.bind(NativeSmileID);
  pollEnhancedDocumentVerificationJobStatus =
    NativeSmileID.pollEnhancedDocumentVerificationJobStatus.bind(NativeSmileID);
  setCallbackUrl = NativeSmileID.setCallbackUrl.bind(NativeSmileID);
}
