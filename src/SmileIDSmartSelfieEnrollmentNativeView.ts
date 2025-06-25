import { type HostComponent } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { DirectEventHandler } from 'react-native/Libraries/Types/CodegenTypes';

type SmartSelfieEnrollmentRequest={
  userId?: string;
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
}
export default codegenNativeComponent<SmartSelfieEnrollmentRequest>(
  'SmileIDSmartSelfieEnrollmentView'
) as HostComponent<SmartSelfieEnrollmentRequest>;
