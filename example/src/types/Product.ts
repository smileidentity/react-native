import type {
  DocumentVerificationRequest,
  EnhancedKycRequest,
  SmileIDViewProps,
  SmartSelfieEnrollmentRequest,
  SmartSelfieAuthenticationRequest,
  SmartSelfieEnrollmentEnhancedRequest,
  SmartSelfieAuthenticationEnhancedRequest,
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
    | SmartSelfieEnrollmentEnhancedRequest
    | SmartSelfieAuthenticationEnhancedRequest
    | BiometricKYCRequest
    | SmileIDViewProps
    | ConsentRequest;
};
