/**
 * Smart entry point for SmileID SDK
 * Automatically detects platform and loads appropriate implementation
 */
import { PlatformDetector } from './PlatformDetector';
import { SmileIDCore } from './SmileIDCore';
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
} from './types';

/**
 * SmileID SDK interface that both platforms must implement
 */
export interface SmileIDSDKInterface {
  initialize(
    useSandBox?: boolean,
    enableCrashReporting?: boolean,
    config?: Config,
    apiKey?: string
  ): Promise<void>;

  setAllowOfflineMode(allowOfflineMode?: boolean): Promise<void>;
  submitJob(jobId: string): Promise<any>;
  getUnsubmittedJobs(): Promise<string[]>;
  getSubmittedJobs(): Promise<string[]>;
  cleanup(jobId: string): Promise<void>;
  disableCrashReporting(): Promise<void>;
  authenticate(request: AuthenticationRequest): Promise<AuthenticationResponse>;
  prepUpload(request: PrepUploadRequest): Promise<PrepUploadResponse>;
  upload(url: string, request: UploadRequest): Promise<any>;
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
  getValidDocuments(request: ProductsConfigRequest): Promise<any>;
  getServices(): Promise<ServicesResponse>;
  pollSmartSelfieJobStatus(
    request: JobStatusRequest,
    interval: number,
    numAttempts: number
  ): Promise<SmartSelfieJobStatusResponse>;
  pollDocumentVerificationJobStatus(
    request: JobStatusRequest,
    interval: number,
    numAttempts: number
  ): Promise<DocumentVerificationJobStatusResponse>;
  pollBiometricKycJobStatus(
    request: JobStatusRequest,
    interval: number,
    numAttempts: number
  ): Promise<BiometricKycJobStatusResponse>;
  pollEnhancedDocumentVerificationJobStatus(
    request: JobStatusRequest,
    interval: number,
    numAttempts: number
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
        // Load Expo implementation
        const ExpoSDK = PlatformDetector.loadPlatformModule('SmileIDExpoSDK');
        this.platformSDK = new ExpoSDK.SmileIDExpoSDK();
      } else {
        // Load React Native implementation
        const ReactNativeSDK = PlatformDetector.loadPlatformModule(
          'SmileIDReactNativeSDK'
        );
        this.platformSDK = new ReactNativeSDK.SmileIDReactNativeSDK();
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
      // Validate configuration using shared core logic
      const validatedConfig = await SmileIDCore.validateConfig(config);

      // Get platform SDK and initialize
      const platformSDK = await this.getPlatformSDK();
      await platformSDK.initialize(
        useSandBox,
        enableCrashReporting,
        validatedConfig,
        apiKey
      );

      this.initialized = true;
    } catch (error) {
      const formattedError = SmileIDCore.formatError(error);
      throw new Error(`SDK initialization failed: ${formattedError.message}`);
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
    const platformSDK = await this.getPlatformSDK();
    return platformSDK.setAllowOfflineMode(allowOfflineMode);
  }

  /**
   * Submit a job
   */
  async submitJob(jobId: string): Promise<any> {
    this.ensureInitialized();
    const platformSDK = await this.getPlatformSDK();
    return platformSDK.submitJob(jobId);
  }

  /**
   * Get unsubmitted jobs
   */
  async getUnsubmittedJobs(): Promise<string[]> {
    this.ensureInitialized();
    const platformSDK = await this.getPlatformSDK();
    return platformSDK.getUnsubmittedJobs();
  }

  /**
   * Get submitted jobs
   */
  async getSubmittedJobs(): Promise<string[]> {
    this.ensureInitialized();
    const platformSDK = await this.getPlatformSDK();
    return platformSDK.getSubmittedJobs();
  }

  /**
   * Cleanup a job
   */
  async cleanup(jobId: string): Promise<void> {
    this.ensureInitialized();
    const platformSDK = await this.getPlatformSDK();
    return platformSDK.cleanup(jobId);
  }

  /**
   * Disable crash reporting
   */
  async disableCrashReporting(): Promise<void> {
    this.ensureInitialized();
    const platformSDK = await this.getPlatformSDK();
    return platformSDK.disableCrashReporting();
  }

  /**
   * Authenticate request
   */
  async authenticate(
    request: AuthenticationRequest
  ): Promise<AuthenticationResponse> {
    this.ensureInitialized();

    try {
      // Validate request using shared core logic
      await SmileIDCore.validateAuthenticationRequest(request);

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
    this.ensureInitialized();

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
  async upload(url: string, request: UploadRequest): Promise<any> {
    this.ensureInitialized();

    try {
      // Validate request using shared core logic
      await SmileIDCore.validateRequest(request, ['images']);

      const platformSDK = await this.getPlatformSDK();
      const response = await platformSDK.upload(url, request);

      // Process response using shared core logic
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
      // Validate request using shared core logic
      await SmileIDCore.validateEnhancedKycRequest(request);

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
    this.ensureInitialized();

    try {
      // Validate request using shared core logic
      await SmileIDCore.validateEnhancedKycRequest(request);

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
    this.ensureInitialized();

    try {
      // Validate request using shared core logic
      await SmileIDCore.validateJobStatusRequest(request);

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
    this.ensureInitialized();

    try {
      // Validate request using shared core logic
      await SmileIDCore.validateJobStatusRequest(request);

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
    this.ensureInitialized();

    try {
      // Validate request using shared core logic
      await SmileIDCore.validateJobStatusRequest(request);

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
    this.ensureInitialized();

    try {
      // Validate request using shared core logic
      await SmileIDCore.validateJobStatusRequest(request);

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
    this.ensureInitialized();

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
  async getValidDocuments(request: ProductsConfigRequest): Promise<any> {
    this.ensureInitialized();

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
      return SmileIDCore.processResponse(response, 'validDocuments');
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
    request: JobStatusRequest,
    interval: number,
    numAttempts: number
  ): Promise<SmartSelfieJobStatusResponse> {
    this.ensureInitialized();

    try {
      // Validate polling parameters using shared core logic
      SmileIDCore.validatePollingParams(interval, numAttempts);
      await SmileIDCore.validateJobStatusRequest(request);

      const platformSDK = await this.getPlatformSDK();
      const response = await platformSDK.pollSmartSelfieJobStatus(
        request,
        interval,
        numAttempts
      );

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
    request: JobStatusRequest,
    interval: number,
    numAttempts: number
  ): Promise<DocumentVerificationJobStatusResponse> {
    this.ensureInitialized();

    try {
      // Validate polling parameters using shared core logic
      SmileIDCore.validatePollingParams(interval, numAttempts);
      await SmileIDCore.validateJobStatusRequest(request);

      const platformSDK = await this.getPlatformSDK();
      const response = await platformSDK.pollDocumentVerificationJobStatus(
        request,
        interval,
        numAttempts
      );

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
    request: JobStatusRequest,
    interval: number,
    numAttempts: number
  ): Promise<BiometricKycJobStatusResponse> {
    this.ensureInitialized();

    try {
      // Validate polling parameters using shared core logic
      SmileIDCore.validatePollingParams(interval, numAttempts);
      await SmileIDCore.validateJobStatusRequest(request);

      const platformSDK = await this.getPlatformSDK();
      const response = await platformSDK.pollBiometricKycJobStatus(
        request,
        interval,
        numAttempts
      );

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
    request: JobStatusRequest,
    interval: number,
    numAttempts: number
  ): Promise<EnhancedDocumentVerificationJobStatusResponse> {
    this.ensureInitialized();

    try {
      // Validate polling parameters using shared core logic
      SmileIDCore.validatePollingParams(interval, numAttempts);
      await SmileIDCore.validateJobStatusRequest(request);

      const platformSDK = await this.getPlatformSDK();
      const response =
        await platformSDK.pollEnhancedDocumentVerificationJobStatus(
          request,
          interval,
          numAttempts
        );

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
    this.ensureInitialized();
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
