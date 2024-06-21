import type {
  DocumentVerificationRequest,
  EnhancedKycRequest,
  SmileIDViewProps,
  SmartSelfieEnrollmentRequest,
  SmartSelfieAuthenticationRequest,
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
    | BiometricKYCRequest
    | SmileIDViewProps
    | ConsentRequest;
};
