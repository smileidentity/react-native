import { NativeModules, Platform } from 'react-native';
import SmileIDSmartSelfieEnrollmentView from './SmileIDSmartSelfieEnrollmentView';
import SmileIDSmartSelfieAuthenticationView from './SmileIDSmartSelfieAuthenticationView';
import SmileIDDocumentVerificationView from './SmileIDDocumentVerificationView';
import SmileIDBiometricKYCView from './SmileIDBiometricKYCView';
import SmileIDEnhancedDocumentVerificationView from './SmileIDEnhancedDocumentVerificationView';
import SmileIDConsentView from './SmileIDConsentView';
import {
  DocumentVerificationRequest,
  SmartSelfieEnrollmentRequest,
  SmartSelfieAuthenticationRequest,
  BiometricKYCRequest,
  SmileIDViewProps,
  ConsentRequest,
  AuthenticationRequest,
  AuthenticationResponse,
  BiometricKycJobStatusResponse,
  DocumentVerificationJobStatusResponse,
  EnhancedDocumentVerificationJobStatusResponse,
  EnhancedKycRequest,
  EnhancedKycAsyncResponse,
  EnhancedKycResponse,
  JobStatusRequest,
  PrepUploadRequest,
  PrepUploadResponse,
  ProductsConfigRequest,
  ProductsConfigResponse,
  ServicesResponse,
  SmartSelfieJobStatusResponse,
  UploadRequest,
  ValidDocumentsResponse,
  JobType,
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

  authenticate: (request: AuthenticationRequest) =>
    _SmileID.authenticate(request),

  /**
   * Prepare upload process
   */
  prepUpload: (request: PrepUploadRequest) => _SmileID.prepUpload(request),

  /**
   * Perform the upload operation
   */
  upload: (url: string, request: UploadRequest) =>
    _SmileID.upload(url, request),

  /**
   * Perform Enhanced KYC
   */
  doEnhancedKyc: (request: EnhancedKycRequest) =>
    _SmileID.doEnhancedKyc(request),

  /**
   * Perform Enhanced KYC asynchronously
   */
  doEnhancedKycAsync: (request: EnhancedKycRequest) =>
    _SmileID.doEnhancedKycAsync(request),

  /**
   * Get the status of a Smart Selfie job
   */
  getSmartSelfieJobStatus: (request: JobStatusRequest) =>
    _SmileID.getSmartSelfieJobStatus(request),

  /**
   * Get the status of a document verification job
   */
  getDocumentVerificationJobStatus: (request: JobStatusRequest) =>
    _SmileID.getDocumentVerificationJobStatus(request),

  /**
   * Get the status of a biometric KYC job
   */
  getBiometricKycJobStatus: (request: JobStatusRequest) =>
    _SmileID.getBiometricKycJobStatus(request),

  /**
   * Get the status of an enhanced document verification job
   */
  getEnhancedDocumentVerificationJobStatus: (request: JobStatusRequest) =>
    _SmileID.getEnhancedDocumentVerificationJobStatus(request),

  /**
   * Get products configuration
   */
  getProductsConfig: (request: ProductsConfigRequest) =>
    _SmileID.getProductsConfig(request),

  /**
   * Get valid documents based on products configuration
   */
  getValidDocuments: (request: ProductsConfigRequest) =>
    _SmileID.getValidDocuments(request),

  /**
   * Get available services
   */
  getServices: () => _SmileID.getServices(),

  /**
   * Polls the status of a smart selfie job.
   *
   * @param {JobStatusRequest} request - The job status request object.
   * @param {number} interval - The interval duration (in milliseconds) between each polling attempt.
   * @param {number} numAttempts - The number of polling attempts before stopping.
   */
  pollSmartSelfieJobStatus: (
    request: JobStatusRequest,
    interval: number,
    numAttempts: number
  ) => {
    if (!Number.isInteger(interval) || !Number.isInteger(numAttempts)) {
      throw new Error(`interval and numAttempts must be an integer.`);
    }
    request.interval = interval;
    request.numAttempts = numAttempts;
    _SmileID.pollSmartSelfieJobStatus(request);
  },

  /**
   * Polls the status of a document verification job.
   *
   * @param {JobStatusRequest} request - The job status request object.
   * @param {number} interval - The interval duration (in milliseconds) between each polling attempt.
   * @param {number} numAttempts - The number of polling attempts before stopping.
   */
  pollDocumentVerificationJobStatus: (
    request: JobStatusRequest,
    interval: number,
    numAttempts: number
  ) => {
    if (!Number.isInteger(interval) || !Number.isInteger(numAttempts)) {
      throw new Error(`interval and numAttempts must be an integer.`);
    }
    request.interval = interval;
    request.numAttempts = numAttempts;
    _SmileID.pollDocumentVerificationJobStatus(request);
  },

  /**
   * Polls the status of a biometric KYC job.
   *
   * @param {JobStatusRequest} request - The job status request object.
   * @param {number} interval - The interval duration (in milliseconds) between each polling attempt.
   * @param {number} numAttempts - The number of polling attempts before stopping.
   */
  pollBiometricKycJobStatus: (
    request: JobStatusRequest,
    interval: number,
    numAttempts: number
  ) => {
    if (!Number.isInteger(interval) || !Number.isInteger(numAttempts)) {
      throw new Error(`interval and numAttempts must be an integer.`);
    }
    request.interval = interval;
    request.numAttempts = numAttempts;
    _SmileID.pollBiometricKycJobStatus(request);
  },

  /**
   * Polls the status of an enhanced document verification job.
   *
   * @param {JobStatusRequest} request - The job status request object.
   * @param {number} interval - The interval duration (in milliseconds) between each polling attempt.
   * @param {number} numAttempts - The number of polling attempts before stopping.
   */
  pollEnhancedDocumentVerificationJobStatus: (
    request: JobStatusRequest,
    interval: number,
    numAttempts: number
  ) => {
    if (!Number.isInteger(interval) || !Number.isInteger(numAttempts)) {
      throw new Error(`interval and numAttempts must be an integer.`);
    }
    request.interval = interval;
    request.numAttempts = numAttempts;
    _SmileID.pollEnhancedDocumentVerificationJobStatus(request);
  },
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
  SmileIDConsentView,
  //types
  JobType,
  EnhancedKycRequest,
  DocumentVerificationRequest,
  SmartSelfieEnrollmentRequest,
  SmartSelfieAuthenticationRequest,
  BiometricKYCRequest,
  SmileIDViewProps,
  ConsentRequest,
  AuthenticationRequest,
  AuthenticationResponse,
  BiometricKycJobStatusResponse,
  DocumentVerificationJobStatusResponse,
  EnhancedDocumentVerificationJobStatusResponse,
  EnhancedKycAsyncResponse,
  EnhancedKycResponse,
  JobStatusRequest,
  PrepUploadRequest,
  PrepUploadResponse,
  ProductsConfigRequest,
  ProductsConfigResponse,
  ServicesResponse,
  SmartSelfieJobStatusResponse,
  UploadRequest,
  ValidDocumentsResponse,
};
