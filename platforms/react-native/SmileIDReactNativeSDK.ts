/**
 * React Native platform implementation for SmileID SDK
 * Wraps existing legacy implementation with shared core logic
 */
import { NativeModules, Platform } from 'react-native';
import type { SmileIDSDKInterface } from '../../core/SmileIDSDK';
import { SmileIDCore } from '../../core/SmileIDCore';
import type {
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
  Config,
} from '../../core/types';
import type { Spec } from '../../src/NativeSmileId';

// Define linking error message
const LINKING_ERROR =
  `The package 'react-native-smile-id' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const SmileIdModule = isTurboModuleEnabled
  ? require('../../src/NativeSmileId').default
  : NativeModules.RNSmileID;

const _SmileID: Spec = SmileIdModule
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
 * React Native platform implementation
 * Delegates to the existing React Native module while applying shared core logic
 */
export class SmileIDReactNativeSDK implements SmileIDSDKInterface {
  private initialized = false;

  /**
   * Initialize SmileID SDK with configuration
   */
  async initialize(
    useSandBox: boolean = false,
    enableCrashReporting: boolean = false,
    config?: Config,
    apiKey?: string
  ): Promise<void> {
    try {
      // Use the existing legacy module for initialization
      await _SmileID.initialize(
        useSandBox,
        enableCrashReporting,
        config,
        apiKey
      );
      this.initialized = true;
    } catch (error) {
      throw SmileIDCore.formatError(error);
    }
  }

  /**
   * Ensure SDK is initialized before operations
   */
  private ensureInitialized(): void {
    if (!this.initialized) {
      throw new Error(
        'SmileID SDK not initialized. Please call initialize() first.'
      );
    }
  }

  /**
   * Set allow offline mode
   */
  async setAllowOfflineMode(allowOfflineMode: boolean = false): Promise<void> {
    this.ensureInitialized();
    try {
      return await _SmileID.setAllowOfflineMode(allowOfflineMode);
    } catch (error) {
      throw SmileIDCore.formatError(error);
    }
  }

  /**
   * Submit a job
   */
  async submitJob(jobId: string): Promise<any> {
    this.ensureInitialized();
    try {
      const response = await _SmileID.submitJob(jobId);
      return SmileIDCore.processResponse(response, 'submitJob');
    } catch (error) {
      throw SmileIDCore.formatError(error);
    }
  }

  /**
   * Get unsubmitted jobs
   */
  async getUnsubmittedJobs(): Promise<string[]> {
    this.ensureInitialized();
    try {
      const response = await _SmileID.getUnsubmittedJobs();
      return SmileIDCore.processResponse<string[]>(
        response,
        'getUnsubmittedJobs'
      );
    } catch (error) {
      throw SmileIDCore.formatError(error);
    }
  }

  /**
   * Get submitted jobs
   */
  async getSubmittedJobs(): Promise<string[]> {
    this.ensureInitialized();
    try {
      const response = await _SmileID.getSubmittedJobs();
      return SmileIDCore.processResponse<string[]>(
        response,
        'getSubmittedJobs'
      );
    } catch (error) {
      throw SmileIDCore.formatError(error);
    }
  }

  /**
   * Cleanup a job
   */
  async cleanup(jobId: string): Promise<void> {
    this.ensureInitialized();
    try {
      return await _SmileID.cleanup(jobId);
    } catch (error) {
      throw SmileIDCore.formatError(error);
    }
  }

  /**
   * Disable crash reporting
   */
  async disableCrashReporting(): Promise<void> {
    this.ensureInitialized();
    try {
      if (Platform.OS === 'android') {
        return await _SmileID.disableCrashReporting();
      }
      // No-op for iOS as mentioned in original implementation
      return Promise.resolve();
    } catch (error) {
      throw SmileIDCore.formatError(error);
    }
  }

  /**
   * Authenticate request
   */
  async authenticate(
    request: AuthenticationRequest
  ): Promise<AuthenticationResponse> {
    this.ensureInitialized();
    try {
      const response = await _SmileID.authenticate(request);
      return SmileIDCore.processResponse<AuthenticationResponse>(
        response,
        'authenticate'
      );
    } catch (error) {
      throw SmileIDCore.formatError(error);
    }
  }

  /**
   * Prepare upload
   */
  async prepUpload(request: PrepUploadRequest): Promise<PrepUploadResponse> {
    this.ensureInitialized();
    try {
      const response = await _SmileID.prepUpload(request);
      return SmileIDCore.processResponse<PrepUploadResponse>(
        response,
        'prepUpload'
      );
    } catch (error) {
      throw SmileIDCore.formatError(error);
    }
  }

  /**
   * Upload files
   */
  async upload(url: string, request: UploadRequest): Promise<any> {
    this.ensureInitialized();
    try {
      const response = await _SmileID.upload(url, request);
      return SmileIDCore.processResponse(response, 'upload');
    } catch (error) {
      throw SmileIDCore.formatError(error);
    }
  }

  /**
   * Perform Enhanced KYC
   */
  async doEnhancedKyc(
    request: EnhancedKycRequest
  ): Promise<EnhancedKycResponse> {
    this.ensureInitialized();
    try {
      const response = await _SmileID.doEnhancedKyc(request);
      return SmileIDCore.processResponse<EnhancedKycResponse>(
        response,
        'doEnhancedKyc'
      );
    } catch (error) {
      throw SmileIDCore.formatError(error);
    }
  }

  /**
   * Perform Enhanced KYC asynchronously
   */
  async doEnhancedKycAsync(
    request: EnhancedKycRequest
  ): Promise<EnhancedKycAsyncResponse> {
    this.ensureInitialized();
    try {
      const response = await _SmileID.doEnhancedKycAsync(request);
      return SmileIDCore.processResponse<EnhancedKycAsyncResponse>(
        response,
        'doEnhancedKycAsync'
      );
    } catch (error) {
      throw SmileIDCore.formatError(error);
    }
  }

  /**
   * Get Smart Selfie job status
   */
  async getSmartSelfieJobStatus(
    request: JobStatusRequest
  ): Promise<SmartSelfieJobStatusResponse> {
    this.ensureInitialized();
    try {
      const response = await _SmileID.getSmartSelfieJobStatus(request);
      return SmileIDCore.processResponse<SmartSelfieJobStatusResponse>(
        response,
        'getSmartSelfieJobStatus'
      );
    } catch (error) {
      throw SmileIDCore.formatError(error);
    }
  }

  /**
   * Get Document Verification job status
   */
  async getDocumentVerificationJobStatus(
    request: JobStatusRequest
  ): Promise<DocumentVerificationJobStatusResponse> {
    this.ensureInitialized();
    try {
      const response = await _SmileID.getDocumentVerificationJobStatus(request);
      return SmileIDCore.processResponse<DocumentVerificationJobStatusResponse>(
        response,
        'getDocumentVerificationJobStatus'
      );
    } catch (error) {
      throw SmileIDCore.formatError(error);
    }
  }

  /**
   * Get Biometric KYC job status
   */
  async getBiometricKycJobStatus(
    request: JobStatusRequest
  ): Promise<BiometricKycJobStatusResponse> {
    this.ensureInitialized();
    try {
      const response = await _SmileID.getBiometricKycJobStatus(request);
      return SmileIDCore.processResponse<BiometricKycJobStatusResponse>(
        response,
        'getBiometricKycJobStatus'
      );
    } catch (error) {
      throw SmileIDCore.formatError(error);
    }
  }

  /**
   * Get Enhanced Document Verification job status
   */
  async getEnhancedDocumentVerificationJobStatus(
    request: JobStatusRequest
  ): Promise<EnhancedDocumentVerificationJobStatusResponse> {
    this.ensureInitialized();
    try {
      const response =
        await _SmileID.getEnhancedDocumentVerificationJobStatus(request);
      return SmileIDCore.processResponse<EnhancedDocumentVerificationJobStatusResponse>(
        response,
        'getEnhancedDocumentVerificationJobStatus'
      );
    } catch (error) {
      throw SmileIDCore.formatError(error);
    }
  }

  /**
   * Get products configuration
   */
  async getProductsConfig(
    request: ProductsConfigRequest
  ): Promise<ProductsConfigResponse> {
    this.ensureInitialized();
    try {
      const response = await _SmileID.getProductsConfig(request);
      return SmileIDCore.processResponse<ProductsConfigResponse>(
        response,
        'getProductsConfig'
      );
    } catch (error) {
      throw SmileIDCore.formatError(error);
    }
  }

  /**
   * Get valid documents
   */
  async getValidDocuments(request: ProductsConfigRequest): Promise<any> {
    this.ensureInitialized();
    try {
      const response = await _SmileID.getValidDocuments(request);
      return SmileIDCore.processResponse(response, 'getValidDocuments');
    } catch (error) {
      throw SmileIDCore.formatError(error);
    }
  }

  /**
   * Get services
   */
  async getServices(): Promise<ServicesResponse> {
    this.ensureInitialized();
    try {
      const response = await _SmileID.getServices();
      return SmileIDCore.processResponse<ServicesResponse>(
        response,
        'getServices'
      );
    } catch (error) {
      throw SmileIDCore.formatError(error);
    }
  }

  /**
   * Poll Smart Selfie job status
   */
  async pollSmartSelfieJobStatus(
    request: JobStatusRequest,
    interval: number,
    numAttempts: number
  ): Promise<SmartSelfieJobStatusResponse> {
    this.ensureInitialized();
    try {
      // Apply validation and assign polling parameters
      if (!Number.isInteger(interval) || !Number.isInteger(numAttempts)) {
        throw new Error('interval and numAttempts must be integers.');
      }
      request.interval = interval;
      request.numAttempts = numAttempts;

      const response = await _SmileID.pollSmartSelfieJobStatus(request);
      return SmileIDCore.processResponse<SmartSelfieJobStatusResponse>(
        response,
        'pollSmartSelfieJobStatus'
      );
    } catch (error) {
      throw SmileIDCore.formatError(error);
    }
  }

  /**
   * Poll Document Verification job status
   */
  async pollDocumentVerificationJobStatus(
    request: JobStatusRequest,
    interval: number,
    numAttempts: number
  ): Promise<DocumentVerificationJobStatusResponse> {
    this.ensureInitialized();
    try {
      // Apply validation and assign polling parameters
      if (!Number.isInteger(interval) || !Number.isInteger(numAttempts)) {
        throw new Error('interval and numAttempts must be integers.');
      }
      request.interval = interval;
      request.numAttempts = numAttempts;

      const response =
        await _SmileID.pollDocumentVerificationJobStatus(request);
      return SmileIDCore.processResponse<DocumentVerificationJobStatusResponse>(
        response,
        'pollDocumentVerificationJobStatus'
      );
    } catch (error) {
      throw SmileIDCore.formatError(error);
    }
  }

  /**
   * Poll Biometric KYC job status
   */
  async pollBiometricKycJobStatus(
    request: JobStatusRequest,
    interval: number,
    numAttempts: number
  ): Promise<BiometricKycJobStatusResponse> {
    this.ensureInitialized();
    try {
      // Apply validation and assign polling parameters
      if (!Number.isInteger(interval) || !Number.isInteger(numAttempts)) {
        throw new Error('interval and numAttempts must be integers.');
      }
      request.interval = interval;
      request.numAttempts = numAttempts;

      const response = await _SmileID.pollBiometricKycJobStatus(request);
      return SmileIDCore.processResponse<BiometricKycJobStatusResponse>(
        response,
        'pollBiometricKycJobStatus'
      );
    } catch (error) {
      throw SmileIDCore.formatError(error);
    }
  }

  /**
   * Poll Enhanced Document Verification job status
   */
  async pollEnhancedDocumentVerificationJobStatus(
    request: JobStatusRequest,
    interval: number,
    numAttempts: number
  ): Promise<EnhancedDocumentVerificationJobStatusResponse> {
    this.ensureInitialized();
    try {
      // Apply validation and assign polling parameters
      if (!Number.isInteger(interval) || !Number.isInteger(numAttempts)) {
        throw new Error('interval and numAttempts must be integers.');
      }
      request.interval = interval;
      request.numAttempts = numAttempts;

      const response =
        await _SmileID.pollEnhancedDocumentVerificationJobStatus(request);
      return SmileIDCore.processResponse<EnhancedDocumentVerificationJobStatusResponse>(
        response,
        'pollEnhancedDocumentVerificationJobStatus'
      );
    } catch (error) {
      throw SmileIDCore.formatError(error);
    }
  }

  /**
   * Set callback URL
   */
  async setCallbackUrl(callbackUrl: string): Promise<void> {
    this.ensureInitialized();
    try {
      return await _SmileID.setCallbackUrl(callbackUrl);
    } catch (error) {
      throw SmileIDCore.formatError(error);
    }
  }
}
