import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
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
  ValidDocumentsResponse,
} from './index';

export interface Spec extends TurboModule {
  /**
   * Initialise the Smile ID SDK
   */
  initialize: (useSandBox: boolean) => Promise<void>;

  /** Switches the SDK between the sandbox and production API at runtime. Please note that if the
   * environment is switched while you or the SDK is in the middle of a job (i.e. polling job
   * status), this may cause API errors.
   */
  setEnvironment: (useSandbox: boolean) => Promise<void>;

  /**
   * The callback mechanism allows for asynchronous job requests and responses.
   * While the job_status API can be polled to get a result, a better method is to set up a
   * callback url and let the system POST a JSON response.
   */
  setCallbackUrl: (callbackUrl: URL) => Promise<void>;

  /**
   * Sets allow offline mode which enables
   * the ability to capture jobs offline and submit later
   */
  setAllowOfflineMode: (allowOfflineMode: boolean) => Promise<void>;

  /**
   * Submits an already captured job id
   */
  submitJob: (jobId: string) => Promise<void>;

  /**
   * Returns all job ids from the submitted directory
   */
  getSubmittedJobs: () => Promise<[string]>;

  /**
   * Returns all job ids from the unsubmitted directory
   */
  getUnsubmittedJobs: () => Promise<[string]>;

  /**
   * Cleans up a job id from the submitted or unsubmitted
   * directory
   */
  cleanup: (jobId: string) => Promise<void>;
  /**
   * NB: Only available on Android
   * Disable crash reporting
   */
  disableCrashReporting: () => Promise<void>;

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
}

export default TurboModuleRegistry.getEnforcing<Spec>('RNSmileID');
