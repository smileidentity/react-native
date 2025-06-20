/**
 * Expo platform entry point
 * Exports the Expo implementation and view components
 */

// Export the Expo SDK implementation
export { SmileIDExpoSDK } from './SmileIDExpoSDK';

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
