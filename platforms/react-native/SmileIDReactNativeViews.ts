/**
 * React Native view components - re-export existing implementations
 * This maintains backward compatibility while allowing future platform-specific customizations
 */

// Re-export all existing view components from the legacy src directory
export { default as SmileIDSmartSelfieEnrollmentView } from '../../src/SmileIDSmartSelfieEnrollmentView';
export { default as SmileIDSmartSelfieAuthenticationView } from '../../src/SmileIDSmartSelfieAuthenticationView';
export { default as SmileIDSmartSelfieEnrollmentEnhancedView } from '../../src/SmileIDSmartSelfieEnrollmentEnhancedView';
export { default as SmileIDSmartSelfieAuthenticationEnhancedView } from '../../src/SmileIDSmartSelfieAuthenticationEnhancedView';
export { default as SmileIDDocumentVerificationView } from '../../src/SmileIDDocumentVerificationView';
export { default as SmileIDBiometricKYCView } from '../../src/SmileIDBiometricKYCView';
export { default as SmileIDEnhancedDocumentVerificationView } from '../../src/SmileIDEnhancedDocumentVerificationView';
export { default as SmileIDSmartSelfieCaptureView } from '../../src/SmileIDSmartSelfieCaptureView';
export { default as SmileIDDocumentCaptureView } from '../../src/SmileIDDocumentCaptureView';
export { default as SmileIDConsentView } from '../../src/SmileIDConsentView';

// Re-export types related to views
export type {
  SmileIDViewProps,
  DocumentVerificationRequest,
  SmartSelfieEnrollmentRequest,
  SmartSelfieAuthenticationRequest,
  BiometricKYCRequest,
  ConsentRequest,
  SmartSelfieEnrollmentEnhancedRequest,
  SmartSelfieAuthenticationEnhancedRequest,
  EnhancedDocumentVerificationRequest,
} from '../../core/types';
