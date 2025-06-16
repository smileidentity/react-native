/**
 * Expo platform implementation for SmileID SDK
 * Uses Expo modules to communicate with native implementations
 */
import { requireNativeModule } from 'expo-modules-core';
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

// Get the native module
const SmileIDExpoModule = requireNativeModule('SmileIDExpo');

/**
 * Expo platform implementation
 * Uses the Expo modules API to communicate with native SmileID implementations
 */
export class SmileIDExpoSDK implements SmileIDSDKInterface {
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
      await SmileIDExpoModule.initialize(
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
      return await SmileIDExpoModule.setAllowOfflineMode(allowOfflineMode);
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
      const response = await SmileIDExpoModule.submitJob(jobId);
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
      const response = await SmileIDExpoModule.getUnsubmittedJobs();
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
      const response = await SmileIDExpoModule.getSubmittedJobs();
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
      return await SmileIDExpoModule.cleanup(jobId);
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
      return await SmileIDExpoModule.disableCrashReporting();
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
      const response = await SmileIDExpoModule.authenticate(request);
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
      const response = await SmileIDExpoModule.prepUpload(request);
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
      const response = await SmileIDExpoModule.upload(url, request);
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
      const response = await SmileIDExpoModule.doEnhancedKyc(request);
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
      const response = await SmileIDExpoModule.doEnhancedKycAsync(request);
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
      const response = await SmileIDExpoModule.getSmartSelfieJobStatus(request);
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
      const response =
        await SmileIDExpoModule.getDocumentVerificationJobStatus(request);
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
      const response =
        await SmileIDExpoModule.getBiometricKycJobStatus(request);
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
        await SmileIDExpoModule.getEnhancedDocumentVerificationJobStatus(
          request
        );
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
      const response = await SmileIDExpoModule.getProductsConfig(request);
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
      const response = await SmileIDExpoModule.getValidDocuments(request);
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
      const response = await SmileIDExpoModule.getServices();
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
      // Set polling parameters on the request object
      request.interval = interval;
      request.numAttempts = numAttempts;

      const response =
        await SmileIDExpoModule.pollSmartSelfieJobStatus(request);
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
      // Set polling parameters on the request object
      request.interval = interval;
      request.numAttempts = numAttempts;

      const response =
        await SmileIDExpoModule.pollDocumentVerificationJobStatus(request);
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
      // Set polling parameters on the request object
      request.interval = interval;
      request.numAttempts = numAttempts;

      const response =
        await SmileIDExpoModule.pollBiometricKycJobStatus(request);
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
      // Set polling parameters on the request object
      request.interval = interval;
      request.numAttempts = numAttempts;

      const response =
        await SmileIDExpoModule.pollEnhancedDocumentVerificationJobStatus(
          request
        );
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
      return await SmileIDExpoModule.setCallbackUrl(callbackUrl);
    } catch (error) {
      throw SmileIDCore.formatError(error);
    }
  }
}
