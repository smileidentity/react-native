import type { HostComponent } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { DirectEventHandler } from 'react-native/Libraries/Types/CodegenTypes';

type BiometricKYCRequest={
  idInfo: {
    country: string;
    idType?: string;
    idNumber?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    dob?: string;
    bankCode?: string;
    entered?: boolean;
  };
  consentInformation?: {
    consentGrantedDate: string;
    personalDetails: boolean;
    contactInformation: boolean;
    documentInformation: boolean;
  };
  useStrictMode?: boolean;
  allowAgentMode: boolean;
  showInstructions?: boolean;
  showAttribution?: boolean;
  allowNewEnroll?: boolean;
  showConfirmation?: boolean;
  skipApiSubmission?: boolean;
  userId?: string;
  jobId?: string;
  /**
   * Custom values specific to partners.
   * todo values must result to explicit types
   * codegen wont work with Record<string,any>
   */
  extraPartnerParams?:  Array<{
    key: string;
    value: string;
  }>
  onResult?: DirectEventHandler<{
    error: string | null;
    result: string
  }>;
}

export default codegenNativeComponent<BiometricKYCRequest>(
    'SmileIDBiometricKYCView'
  ) as HostComponent<BiometricKYCRequest>;
