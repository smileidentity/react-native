import {
  type DocumentVerificationRequest,
  type EnhancedKycRequest,
  type SmileIDViewProps,
  type SmartSelfieEnrollmentRequest,
  type SmartSelfieAuthenticationRequest,
  type SmartSelfieEnrollmentEnhancedRequest,
  type SmartSelfieAuthenticationEnhancedRequest,
  type BiometricKYCRequest,
  type ConsentRequest,
  JobType,
} from '@smile_identity/react-native';
import type { SmileIDPollingFunction } from '../utils';

export type Product = {
  title: string;
  isAsync: boolean;
  jobType?: JobType;
  pollMethod?: SmileIDPollingFunction;
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
