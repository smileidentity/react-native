import type {
  DocumentVerificationRequest,
  EnhancedKycRequest,
  SmileIDViewProps,
  SmartSelfieEnrollmentRequest,
  SmartSelfieAuthenticationRequest,
  SmartSelfieEnrollmentRequestEnhanced,
  SmartSelfieAuthenticationRequestEnhanced,
  BiometricKYCRequest,
  ConsentRequest,
} from '@smile_identity/react-native';

export type Product = {
  title: string;
  product:
    | EnhancedKycRequest
    | DocumentVerificationRequest
    | SmartSelfieEnrollmentRequest
    | SmartSelfieAuthenticationRequest
    | SmartSelfieEnrollmentRequestEnhanced
    | SmartSelfieAuthenticationRequestEnhanced
    | BiometricKYCRequest
    | SmileIDViewProps
    | ConsentRequest;
};
