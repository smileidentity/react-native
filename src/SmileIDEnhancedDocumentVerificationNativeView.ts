import type { HostComponent } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { DirectEventHandler, Double } from 'react-native/Libraries/Types/CodegenTypes';

type EnhancedDocumentVerificationRequest={
  userId?: string;
  jobId?: string;
  allowAgentMode: boolean;
  showInstructions?: boolean;
  showAttribution?: boolean;
  allowNewEnroll?: boolean;
  showConfirmation?: boolean;
  skipApiSubmission?: boolean;
  extraPartnerParams?: Array<{
    key: string;
    value: string
  }>;
  onResult?: DirectEventHandler<{
    error: string | null;
    result: string
  }>;
  countryCode: string;
  documentType: string;
  idAspectRatio?: Double;
  captureBothSides?: boolean;
  allowGalleryUpload?: boolean;
  bypassSelfieCaptureWithFile?: string;
  isDocumentFrontSide?: boolean;
  useStrictMode?: boolean;
  consentInformation?: {
    consentGrantedDate: string;
    personalDetails: boolean;
    contactInformation: boolean;
    documentInformation: boolean;
  };
}
export default codegenNativeComponent<EnhancedDocumentVerificationRequest>(
  'SmileIDEnhancedDocumentVerificationView'
) as HostComponent<EnhancedDocumentVerificationRequest>;
