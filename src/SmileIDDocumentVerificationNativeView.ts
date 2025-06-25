import type { HostComponent } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { DirectEventHandler, Double } from 'react-native/Libraries/Types/CodegenTypes';

type DocumentVerificationRequest={
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
    value: string;
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
}
export default codegenNativeComponent<DocumentVerificationRequest>(
  'SmileIDDocumentVerificationView'
) as HostComponent<DocumentVerificationRequest>;
