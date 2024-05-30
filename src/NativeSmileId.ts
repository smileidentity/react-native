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
