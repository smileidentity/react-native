import type { HostComponent } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { DirectEventHandler } from 'react-native/Libraries/Types/CodegenTypes';

type ConsentRequest={
  userId?: string;
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
  partnerIcon: string;
  partnerName: string;
  partnerPrivacyPolicy: string;
  productName: string;
}
export default codegenNativeComponent<ConsentRequest>(
  'SmileIDConsentView'
) as HostComponent<ConsentRequest>;
