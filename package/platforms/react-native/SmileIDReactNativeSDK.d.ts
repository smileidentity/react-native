import type { SmileIDSDKInterface } from '../../core/SmileIDSDK';
import type { AuthenticationRequest, AuthenticationResponse, BiometricKycJobStatusResponse, DocumentVerificationJobStatusResponse, EnhancedDocumentVerificationJobStatusResponse, EnhancedKycRequest, EnhancedKycAsyncResponse, EnhancedKycResponse, JobStatusRequest, PrepUploadRequest, PrepUploadResponse, ProductsConfigRequest, ProductsConfigResponse, ServicesResponse, SmartSelfieJobStatusResponse, UploadRequest, Config } from '../../core/types';
/**
 * React Native platform implementation
 * Delegates to the existing React Native module while applying shared core logic
 */
export declare class SmileIDReactNativeSDK implements SmileIDSDKInterface {
    private initialized;
    /**
     * Initialize SmileID SDK with configuration
     */
    initialize(useSandBox?: boolean, enableCrashReporting?: boolean, config?: Config, apiKey?: string): Promise<void>;
    /**
     * Ensure SDK is initialized before operations
     */
    private ensureInitialized;
    /**
     * Set allow offline mode
     */
    setAllowOfflineMode(allowOfflineMode?: boolean): Promise<void>;
    /**
     * Submit a job
     */
    submitJob(jobId: string): Promise<any>;
    /**
     * Get unsubmitted jobs
     */
    getUnsubmittedJobs(): Promise<string[]>;
    /**
     * Get submitted jobs
     */
    getSubmittedJobs(): Promise<string[]>;
    /**
     * Cleanup a job
     */
    cleanup(jobId: string): Promise<void>;
    /**
     * Disable crash reporting
     */
    disableCrashReporting(): Promise<void>;
    /**
     * Authenticate request
     */
    authenticate(request: AuthenticationRequest): Promise<AuthenticationResponse>;
    /**
     * Prepare upload
     */
    prepUpload(request: PrepUploadRequest): Promise<PrepUploadResponse>;
    /**
     * Upload files
     */
    upload(url: string, request: UploadRequest): Promise<any>;
    /**
     * Perform Enhanced KYC
     */
    doEnhancedKyc(request: EnhancedKycRequest): Promise<EnhancedKycResponse>;
    /**
     * Perform Enhanced KYC asynchronously
     */
    doEnhancedKycAsync(request: EnhancedKycRequest): Promise<EnhancedKycAsyncResponse>;
    /**
     * Get Smart Selfie job status
     */
    getSmartSelfieJobStatus(request: JobStatusRequest): Promise<SmartSelfieJobStatusResponse>;
    /**
     * Get Document Verification job status
     */
    getDocumentVerificationJobStatus(request: JobStatusRequest): Promise<DocumentVerificationJobStatusResponse>;
    /**
     * Get Biometric KYC job status
     */
    getBiometricKycJobStatus(request: JobStatusRequest): Promise<BiometricKycJobStatusResponse>;
    /**
     * Get Enhanced Document Verification job status
     */
    getEnhancedDocumentVerificationJobStatus(request: JobStatusRequest): Promise<EnhancedDocumentVerificationJobStatusResponse>;
    /**
     * Get products configuration
     */
    getProductsConfig(request: ProductsConfigRequest): Promise<ProductsConfigResponse>;
    /**
     * Get valid documents
     */
    getValidDocuments(request: ProductsConfigRequest): Promise<any>;
    /**
     * Get services
     */
    getServices(): Promise<ServicesResponse>;
    /**
     * Poll Smart Selfie job status
     */
    pollSmartSelfieJobStatus(request: JobStatusRequest, interval: number, numAttempts: number): Promise<SmartSelfieJobStatusResponse>;
    /**
     * Poll Document Verification job status
     */
    pollDocumentVerificationJobStatus(request: JobStatusRequest, interval: number, numAttempts: number): Promise<DocumentVerificationJobStatusResponse>;
    /**
     * Poll Biometric KYC job status
     */
    pollBiometricKycJobStatus(request: JobStatusRequest, interval: number, numAttempts: number): Promise<BiometricKycJobStatusResponse>;
    /**
     * Poll Enhanced Document Verification job status
     */
    pollEnhancedDocumentVerificationJobStatus(request: JobStatusRequest, interval: number, numAttempts: number): Promise<EnhancedDocumentVerificationJobStatusResponse>;
    /**
     * Set callback URL
     */
    setCallbackUrl(callbackUrl: string): Promise<void>;
}
//# sourceMappingURL=SmileIDReactNativeSDK.d.ts.map