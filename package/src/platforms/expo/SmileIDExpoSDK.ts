/**
 * Simplified Expo platform implementation for SmileID SDK
 * This is a thin wrapper that just passes calls to the native module
 * All error handling and response processing is done by SmileIDSDK in core
 */
import type { SmileIDSDKInterface } from '../../core/SmileIDSDK';

// Try to get the native module, with fallback for Expo Go
let SmileIDExpoModule: any;
let isNativeModuleAvailable = false;

try {
  // Try to import expo-modules-core dynamically
  const ExpoModulesCore = require('expo-modules-core');
  if (ExpoModulesCore && ExpoModulesCore.requireNativeModule) {
    try {
      SmileIDExpoModule =
        ExpoModulesCore.requireNativeModule('SmileIDExpoModule');
      isNativeModuleAvailable = true;
    } catch {
      // Native module not found
    }
  }
} catch {
  // expo-modules-core not available
}

// If a native module is not available, create a mock that shows helpful errors
if (!isNativeModuleAvailable) {
  console.warn(
    'SmileID SDK: Native module not found. This SDK requires a custom development build. ' +
      'You are likely running in Expo Go which does not support custom native modules. ' +
      'To use SmileID SDK, please create a development build using EAS Build or expo prebuild. ' +
      'Learn more: https://docs.expo.dev/development/build/'
  );

  const notAvailableError = () => {
    throw new Error(
      'SmileID SDK native module is not available in Expo Go. ' +
        'Please create a custom development build to use this SDK. ' +
        'Run: npx expo prebuild && npx expo run:android (or run:ios)'
    );
  };

  SmileIDExpoModule = new Proxy(
    {},
    {
      get() {
        return notAvailableError;
      },
    }
  );
}

/**
 * Expo platform implementation - thin wrapper
 * Simply delegates all calls to the native module without any processing
 */
export class SmileIDExpoSDK implements SmileIDSDKInterface {
  // All methods simply delegate to the native module
  // The SmileIDSDK in core handles all error formatting and response processing

  initialize = SmileIDExpoModule.initialize.bind(SmileIDExpoModule);
  setAllowOfflineMode =
    SmileIDExpoModule.setAllowOfflineMode.bind(SmileIDExpoModule);
  submitJob = SmileIDExpoModule.submitJob.bind(SmileIDExpoModule);
  getUnsubmittedJobs =
    SmileIDExpoModule.getUnsubmittedJobs.bind(SmileIDExpoModule);
  getSubmittedJobs = SmileIDExpoModule.getSubmittedJobs.bind(SmileIDExpoModule);
  cleanup = SmileIDExpoModule.cleanup.bind(SmileIDExpoModule);
  disableCrashReporting =
    SmileIDExpoModule.disableCrashReporting.bind(SmileIDExpoModule);
  authenticate = SmileIDExpoModule.authenticate.bind(SmileIDExpoModule);
  prepUpload = SmileIDExpoModule.prepUpload.bind(SmileIDExpoModule);
  upload = SmileIDExpoModule.upload.bind(SmileIDExpoModule);
  doEnhancedKyc = SmileIDExpoModule.doEnhancedKyc.bind(SmileIDExpoModule);
  doEnhancedKycAsync =
    SmileIDExpoModule.doEnhancedKycAsync.bind(SmileIDExpoModule);
  getSmartSelfieJobStatus =
    SmileIDExpoModule.getSmartSelfieJobStatus.bind(SmileIDExpoModule);
  getDocumentVerificationJobStatus =
    SmileIDExpoModule.getDocumentVerificationJobStatus.bind(SmileIDExpoModule);
  getBiometricKycJobStatus =
    SmileIDExpoModule.getBiometricKycJobStatus.bind(SmileIDExpoModule);
  getEnhancedDocumentVerificationJobStatus =
    SmileIDExpoModule.getEnhancedDocumentVerificationJobStatus.bind(
      SmileIDExpoModule
    );
  getProductsConfig =
    SmileIDExpoModule.getProductsConfig.bind(SmileIDExpoModule);
  getValidDocuments =
    SmileIDExpoModule.getValidDocuments.bind(SmileIDExpoModule);
  getServices = SmileIDExpoModule.getServices.bind(SmileIDExpoModule);
  pollSmartSelfieJobStatus =
    SmileIDExpoModule.pollSmartSelfieJobStatus.bind(SmileIDExpoModule);
  pollDocumentVerificationJobStatus =
    SmileIDExpoModule.pollDocumentVerificationJobStatus.bind(SmileIDExpoModule);
  pollBiometricKycJobStatus =
    SmileIDExpoModule.pollBiometricKycJobStatus.bind(SmileIDExpoModule);
  pollEnhancedDocumentVerificationJobStatus =
    SmileIDExpoModule.pollEnhancedDocumentVerificationJobStatus.bind(
      SmileIDExpoModule
    );
  setCallbackUrl = SmileIDExpoModule.setCallbackUrl.bind(SmileIDExpoModule);
}
