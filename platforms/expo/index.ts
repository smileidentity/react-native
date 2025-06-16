/**
 * Expo platform entry point
 * Exports the Expo implementation and view components
 */

// Export the Expo SDK implementation
export { SmileIDExpoSDK } from './SmileIDExpoSDK';

// Export all view components
export * from './SmileIDExpoViews';

// Re-export core types and classes that users need
export {
  Config,
  JobType,
  AuthenticationRequest,
  JobStatusRequest,
  PrepUploadRequest,
  ProductsConfigRequest,
  ConsentInformation,
  UploadRequest,
  IdInfo,
  EnhancedKycRequest,
} from '../../core/types';

// Re-export response types
export type {
  AuthenticationResponse,
  BiometricKycJobStatusResponse,
  DocumentVerificationJobStatusResponse,
  EnhancedDocumentVerificationJobStatusResponse,
  EnhancedKycAsyncResponse,
  EnhancedKycResponse,
  PrepUploadResponse,
  ProductsConfigResponse,
  ServicesResponse,
  SmartSelfieJobStatusResponse,
  ValidDocumentsResponse,
} from '../../core/types';
