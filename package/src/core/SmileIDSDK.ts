/**
 * Smart entry point for SmileID SDK
 * Automatically detects platform and loads appropriate implementation
 */
import { PlatformDetector } from './PlatformDetector';
import { SmileIDCore } from './SmileIDCore';
import { SmileIDExpoSDK } from '../platforms/expo/SmileIDExpoSDK';
import { SmileIDReactNativeSDK } from '../platforms/react-native/SmileIDReactNativeSDK';
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
  ValidDocumentsResponse,
} from './types';

/**
 * SmileID SDK interface that both platforms must implement
 */
export interface SmileIDSDKInterface {
  initialize(
    useSandBox: boolean,
    enableCrashReporting: boolean,
    config?: Config,
    apiKey?: string
  ): Promise<void>;

  setAllowOfflineMode(allowOfflineMode: boolean): Promise<void>;
  submitJob(jobId: string): Promise<void>;
  getUnsubmittedJobs(): Promise<[string]>;
  getSubmittedJobs(): Promise<[string]>;
  cleanup(jobId: string): Promise<void>;
  disableCrashReporting(): Promise<void>;
  authenticate(request: AuthenticationRequest): Promise<AuthenticationResponse>;
  prepUpload(request: PrepUploadRequest): Promise<PrepUploadResponse>;
  upload(url: string, request: UploadRequest): Promise<void>;
  doEnhancedKyc(request: EnhancedKycRequest): Promise<EnhancedKycResponse>;
  doEnhancedKycAsync(
    request: EnhancedKycRequest
  ): Promise<EnhancedKycAsyncResponse>;
  getSmartSelfieJobStatus(
    request: JobStatusRequest
  ): Promise<SmartSelfieJobStatusResponse>;
  getDocumentVerificationJobStatus(
    request: JobStatusRequest
  ): Promise<DocumentVerificationJobStatusResponse>;
  getBiometricKycJobStatus(
    request: JobStatusRequest
  ): Promise<BiometricKycJobStatusResponse>;
  getEnhancedDocumentVerificationJobStatus(
    request: JobStatusRequest
  ): Promise<EnhancedDocumentVerificationJobStatusResponse>;
  getProductsConfig(
    request: ProductsConfigRequest
  ): Promise<ProductsConfigResponse>;
  getValidDocuments(
    request: ProductsConfigRequest
  ): Promise<ValidDocumentsResponse>;
  getServices(): Promise<ServicesResponse>;
  pollSmartSelfieJobStatus(
    request: JobStatusRequest
  ): Promise<SmartSelfieJobStatusResponse>;
  pollDocumentVerificationJobStatus(
    request: JobStatusRequest
  ): Promise<DocumentVerificationJobStatusResponse>;
  pollBiometricKycJobStatus(
    request: JobStatusRequest
  ): Promise<BiometricKycJobStatusResponse>;
  pollEnhancedDocumentVerificationJobStatus(
    request: JobStatusRequest
  ): Promise<EnhancedDocumentVerificationJobStatusResponse>;
  setCallbackUrl(callbackUrl: string): Promise<void>;
}

/**
 * Smart SmileID SDK that automatically detects platform and delegates to appropriate implementation
 */
export class SmileIDSDK implements SmileIDSDKInterface {
  private static instance: SmileIDSDK | null = null;
  private platformSDK: SmileIDSDKInterface | null = null;
  private initialized = false;

  /**
   * Get singleton instance of SmileID SDK
   * @returns SmileID SDK instance
   */
  static getInstance(): SmileIDSDK {
    if (!this.instance) {
      this.instance = new SmileIDSDK();
    }
    return this.instance;
  }

  /**
   * Private constructor to enforce singleton pattern
   */
  private constructor() {
    // Validate platform compatibility on instantiation
    PlatformDetector.validatePlatform();
  }

  /**
   * Get the platform-specific SDK implementation
   * @returns Platform SDK implementation
   */
  private async getPlatformSDK(): Promise<SmileIDSDKInterface> {
    if (this.platformSDK) {
      return this.platformSDK;
    }

    const platform = PlatformDetector.getPlatform();

    try {
      if (platform === 'expo') {
        // Use statically imported Expo implementation
        this.platformSDK = new SmileIDExpoSDK();
      } else {
        // Use statically imported React Native implementation
        this.platformSDK = new SmileIDReactNativeSDK();
      }

      if (!this.platformSDK) {
        throw new Error(`Failed to instantiate platform SDK for ${platform}`);
      }

      return this.platformSDK;
    } catch (error) {
      throw new Error(
        `Failed to load platform SDK for ${platform}: ${error}. ` +
          'Please ensure the platform-specific implementation is properly installed.'
      );
    }
  }

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
      // Get platform SDK and initialize
      const platformSDK = await this.getPlatformSDK();
      await platformSDK.initialize(
        useSandBox,
        enableCrashReporting,
        config,
        apiKey
      );

      this.initialized = true;
    } catch (error) {
      const formattedError = SmileIDCore.formatError(error);
      throw new Error(`SDK initialization failed: ${formattedError.message}`);
    }
  }

  /**
   * Set allow offline mode
   */
  async setAllowOfflineMode(allowOfflineMode: boolean): Promise<void> {
    const platformSDK = await this.getPlatformSDK();
    return platformSDK.setAllowOfflineMode(allowOfflineMode);
  }

  /**
   * Submit a job
   */
  async submitJob(jobId: string): Promise<void> {
    const platformSDK = await this.getPlatformSDK();
    return platformSDK.submitJob(jobId);
  }

  /**
   * Get unsubmitted jobs
   */
  async getUnsubmittedJobs(): Promise<[string]> {
    const platformSDK = await this.getPlatformSDK();
    return platformSDK.getUnsubmittedJobs();
  }

  /**
   * Get submitted jobs
   */
  async getSubmittedJobs(): Promise<[string]> {
    const platformSDK = await this.getPlatformSDK();
    return platformSDK.getSubmittedJobs();
  }

  /**
   * Cleanup a job
   */
  async cleanup(jobId: string): Promise<void> {
    const platformSDK = await this.getPlatformSDK();
    return platformSDK.cleanup(jobId);
  }

  /**
   * Disable crash reporting
   */
  async disableCrashReporting(): Promise<void> {
    const platformSDK = await this.getPlatformSDK();
    return platformSDK.disableCrashReporting();
  }

  /**
   * Authenticate request
   */
  async authenticate(
    request: AuthenticationRequest
  ): Promise<AuthenticationResponse> {
    try {
      const platformSDK = await this.getPlatformSDK();
      const response = await platformSDK.authenticate(request);

      // Process response using shared core logic
      return SmileIDCore.processResponse<AuthenticationResponse>(
        response,
        'authentication'
      );
    } catch (error) {
      throw SmileIDCore.formatError(error);
    }
  }

  /**
   * Prepare upload
   */
  async prepUpload(request: PrepUploadRequest): Promise<PrepUploadResponse> {
    try {
      // Validate request using shared core logic
      await SmileIDCore.validateRequest(request, [
        'partnerParams',
        'partnerId',
        'timestamp',
        'signature',
      ]);

      const platformSDK = await this.getPlatformSDK();
      const response = await platformSDK.prepUpload(request);

      // Process response using shared core logic
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
  async upload(url: string, request: UploadRequest): Promise<void> {
    try {
      // Validate request using shared core logic
      await SmileIDCore.validateRequest(request, ['images']);

      const platformSDK = await this.getPlatformSDK();
      await platformSDK.upload(url, request);
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
    try {
      const platformSDK = await this.getPlatformSDK();
      const response = await platformSDK.doEnhancedKyc(request);

      // Process response using shared core logic
      return SmileIDCore.processResponse<EnhancedKycResponse>(
        response,
        'enhancedKyc'
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
    try {
      const platformSDK = await this.getPlatformSDK();
      const response = await platformSDK.doEnhancedKycAsync(request);

      // Process response using shared core logic
      return SmileIDCore.processResponse<EnhancedKycAsyncResponse>(
        response,
        'enhancedKycAsync'
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
    try {
      const platformSDK = await this.getPlatformSDK();
      const response = await platformSDK.getSmartSelfieJobStatus(request);

      // Process response using shared core logic
      return SmileIDCore.processResponse<SmartSelfieJobStatusResponse>(
        response,
        'smartSelfieJobStatus'
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
    try {
      const platformSDK = await this.getPlatformSDK();
      const response =
        await platformSDK.getDocumentVerificationJobStatus(request);

      // Process response using shared core logic
      return SmileIDCore.processResponse<DocumentVerificationJobStatusResponse>(
        response,
        'documentVerificationJobStatus'
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
    try {
      const platformSDK = await this.getPlatformSDK();
      const response = await platformSDK.getBiometricKycJobStatus(request);

      // Process response using shared core logic
      return SmileIDCore.processResponse<BiometricKycJobStatusResponse>(
        response,
        'biometricKycJobStatus'
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
    try {
      const platformSDK = await this.getPlatformSDK();
      const response =
        await platformSDK.getEnhancedDocumentVerificationJobStatus(request);

      // Process response using shared core logic
      return SmileIDCore.processResponse<EnhancedDocumentVerificationJobStatusResponse>(
        response,
        'enhancedDocumentVerificationJobStatus'
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
    try {
      // Validate request using shared core logic
      await SmileIDCore.validateRequest(request, [
        'partnerId',
        'timestamp',
        'signature',
      ]);

      const platformSDK = await this.getPlatformSDK();
      const response = await platformSDK.getProductsConfig(request);

      // Process response using shared core logic
      return SmileIDCore.processResponse<ProductsConfigResponse>(
        response,
        'productsConfig'
      );
    } catch (error) {
      throw SmileIDCore.formatError(error);
    }
  }

  /**
   * Get valid documents
   */
  async getValidDocuments(
    request: ProductsConfigRequest
  ): Promise<ValidDocumentsResponse> {
    try {
      // Validate request using shared core logic
      await SmileIDCore.validateRequest(request, [
        'partnerId',
        'timestamp',
        'signature',
      ]);

      const platformSDK = await this.getPlatformSDK();
      const response = await platformSDK.getValidDocuments(request);

      // Process response using shared core logic
      return SmileIDCore.processResponse<ValidDocumentsResponse>(
        response,
        'validDocuments'
      );
    } catch (error) {
      throw SmileIDCore.formatError(error);
    }
  }

  /**
   * Get services
   */
  async getServices(): Promise<ServicesResponse> {
    try {
      const platformSDK = await this.getPlatformSDK();
      const response = await platformSDK.getServices();

      // Process response using shared core logic
      return SmileIDCore.processResponse<ServicesResponse>(
        response,
        'services'
      );
    } catch (error) {
      throw SmileIDCore.formatError(error);
    }
  }

  /**
   * Poll Smart Selfie job status
   */
  async pollSmartSelfieJobStatus(
    request: JobStatusRequest
  ): Promise<SmartSelfieJobStatusResponse> {
    try {
      const platformSDK = await this.getPlatformSDK();
      const response = await platformSDK.pollSmartSelfieJobStatus(request);

      // Process response using shared core logic
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
    request: JobStatusRequest
  ): Promise<DocumentVerificationJobStatusResponse> {
    try {
      const platformSDK = await this.getPlatformSDK();
      const response =
        await platformSDK.pollDocumentVerificationJobStatus(request);

      // Process response using shared core logic
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
    request: JobStatusRequest
  ): Promise<BiometricKycJobStatusResponse> {
    try {
      const platformSDK = await this.getPlatformSDK();
      const response = await platformSDK.pollBiometricKycJobStatus(request);

      // Process response using shared core logic
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
    request: JobStatusRequest
  ): Promise<EnhancedDocumentVerificationJobStatusResponse> {
    try {
      const platformSDK = await this.getPlatformSDK();
      const response =
        await platformSDK.pollEnhancedDocumentVerificationJobStatus(request);

      // Process response using shared core logic
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
    const platformSDK = await this.getPlatformSDK();
    return platformSDK.setCallbackUrl(callbackUrl);
  }

  /**
   * Get platform diagnostics (useful for debugging)
   */
  static getDiagnostics(): Record<string, any> {
    return {
      platformDetection: PlatformDetector.getDiagnostics(),
      sdkInfo: {
        initialized: SmileIDSDK.getInstance().initialized,
        platform: PlatformDetector.getPlatform(),
      },
    };
  }
}

// Export singleton instance as default
export const SmileID = SmileIDSDK.getInstance();
