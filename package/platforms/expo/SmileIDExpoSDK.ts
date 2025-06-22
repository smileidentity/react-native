/**
 * Simplified Expo platform implementation for SmileID SDK
 * This is a thin wrapper that just passes calls to the native module
 * All error handling and response processing is done by SmileIDSDK in core
 */
import { requireNativeModule } from 'expo-modules-core';
import type { SmileIDSDKInterface } from '../../core/SmileIDSDK';

// Get the native module
const SmileIDExpoModule = requireNativeModule('SmileIDExpo');

/**
 * Expo platform implementation - thin wrapper
 * Simply delegates all calls to the native module without any processing
 */
export class SmileIDExpoSDK implements SmileIDSDKInterface {
  // All methods simply delegate to the native module
  // The SmileIDSDK in core handles all error formatting and response processing
  
  initialize = SmileIDExpoModule.initialize.bind(SmileIDExpoModule);
  setAllowOfflineMode = SmileIDExpoModule.setAllowOfflineMode.bind(SmileIDExpoModule);
  submitJob = SmileIDExpoModule.submitJob.bind(SmileIDExpoModule);
  getUnsubmittedJobs = SmileIDExpoModule.getUnsubmittedJobs.bind(SmileIDExpoModule);
  getSubmittedJobs = SmileIDExpoModule.getSubmittedJobs.bind(SmileIDExpoModule);
  cleanup = SmileIDExpoModule.cleanup.bind(SmileIDExpoModule);
  disableCrashReporting = SmileIDExpoModule.disableCrashReporting.bind(SmileIDExpoModule);
  authenticate = SmileIDExpoModule.authenticate.bind(SmileIDExpoModule);
  prepUpload = SmileIDExpoModule.prepUpload.bind(SmileIDExpoModule);
  upload = SmileIDExpoModule.upload.bind(SmileIDExpoModule);
  doEnhancedKyc = SmileIDExpoModule.doEnhancedKyc.bind(SmileIDExpoModule);
  doEnhancedKycAsync = SmileIDExpoModule.doEnhancedKycAsync.bind(SmileIDExpoModule);
  getSmartSelfieJobStatus = SmileIDExpoModule.getSmartSelfieJobStatus.bind(SmileIDExpoModule);
  getDocumentVerificationJobStatus = SmileIDExpoModule.getDocumentVerificationJobStatus.bind(SmileIDExpoModule);
  getBiometricKycJobStatus = SmileIDExpoModule.getBiometricKycJobStatus.bind(SmileIDExpoModule);
  getEnhancedDocumentVerificationJobStatus = SmileIDExpoModule.getEnhancedDocumentVerificationJobStatus.bind(SmileIDExpoModule);
  getProductsConfig = SmileIDExpoModule.getProductsConfig.bind(SmileIDExpoModule);
  getValidDocuments = SmileIDExpoModule.getValidDocuments.bind(SmileIDExpoModule);
  getServices = SmileIDExpoModule.getServices.bind(SmileIDExpoModule);
  pollSmartSelfieJobStatus = SmileIDExpoModule.pollSmartSelfieJobStatus.bind(SmileIDExpoModule);
  pollDocumentVerificationJobStatus = SmileIDExpoModule.pollDocumentVerificationJobStatus.bind(SmileIDExpoModule);
  pollBiometricKycJobStatus = SmileIDExpoModule.pollBiometricKycJobStatus.bind(SmileIDExpoModule);
  pollEnhancedDocumentVerificationJobStatus = SmileIDExpoModule.pollEnhancedDocumentVerificationJobStatus.bind(SmileIDExpoModule);
  setCallbackUrl = SmileIDExpoModule.setCallbackUrl.bind(SmileIDExpoModule);
}