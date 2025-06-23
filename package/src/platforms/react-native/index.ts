/**
 * React Native platform entry point
 * Exports the React Native implementation and view components
 */
export { SmileIDReactNativeSDK } from './SmileIDReactNativeSDK';

// Export all view components from core (they work on both platforms)
export {
  SmileIDBiometricKYCView,
  SmileIDConsentView,
  SmileIDDocumentCaptureView,
  SmileIDDocumentVerificationView,
  SmileIDEnhancedDocumentVerificationView,
  SmileIDSmartSelfieAuthenticationView,
  SmileIDSmartSelfieAuthenticationEnhancedView,
  SmileIDSmartSelfieCaptureView,
  SmileIDSmartSelfieEnrollmentView,
  SmileIDSmartSelfieEnrollmentEnhancedView,
} from '../../core/SmileIDViews';

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

export type {
  BiometricKYCRequest,
  ConsentRequest,
  DocumentVerificationRequest,
  EnhancedDocumentVerificationRequest,
  SmartSelfieAuthenticationRequest,
  SmartSelfieEnrollmentRequest,
  SmartSelfieAuthenticationEnhancedRequest,
  SmartSelfieEnrollmentEnhancedRequest,
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
