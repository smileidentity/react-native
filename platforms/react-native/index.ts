/**
 * React Native platform entry point
 * Exports the React Native implementation and view components
 */

// Export the React Native SDK implementation
export { SmileIDReactNativeSDK } from './SmileIDReactNativeSDK';

// Export all view components
export * from './SmileIDReactNativeViews';

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
