import { HostComponent, NativeModules, Platform, ViewProps } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import PropTypes from 'prop-types';

const LINKING_ERROR =
  `The package 'react-native-smile-id' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

export type PartnerParams = {
  jobType?: JobType | null;
  jobId: string;
  userId: string;
  extras?: Map<string, string> | null;
}

export type SmileIDViewProps = ViewProps & {
  userId?: string;
  jobId?: string;
  partnerParams?: PartnerParams;
  jobType : JobType;
}

export type EnhancedKycRequest =  SmileIDViewProps & {
  country: string;
  idType: string;
  idNumber: string;
  firstName?: string | null;
  middleName?: string | null;
  lastName?: string | null;
  dob?: string | null;
  phoneNumber?: string | null;
  bankCode?: string | null;
  callbackUrl?: string | null;
  partnerParams: PartnerParams;
  timestamp: string;
  signature: string;
}

export type DocumentVerificationRequest = SmileIDViewProps & {
  jobType: JobType.DocumentVerification;
  countryCode: string;
  idAspectRatio?: number | null;
  captureBothSides?: boolean;
  showAttribution?: boolean;
  allowGalleryUpload?: boolean;
  showInstructions?: boolean;
}


export type SmartSelfieRequest = SmileIDViewProps & {
  allowAgentMode: boolean;
}

export enum JobType {
  BiometricKyc = 1,
  SmartSelfieAuthentication = 2,
  SmartSelfieEnrollment = 4,
  EnhancedKyc = 5,
  DocumentVerification = 6,
}

namespace JobType {
  export function ofRaw(raw: number): JobType | null {
    for (const key in JobType) {
      if (typeof JobType[key] === 'number' && JobType[key] === raw) {
        return JobType[key] as JobType;
      }
    }
    return null;
  }
}

const SmileIdModule = isTurboModuleEnabled
  ? require('./NativeSmileId').default
  : NativeModules.SmileId;

const _SmileID = SmileIdModule
  ? SmileIdModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export interface NativeProps extends ViewProps {
  product: SmartSelfieRequest | DocumentVerificationRequest | EnhancedKycRequest;
  onResult?: (event: any) => void;
}

export default codegenNativeComponent<NativeProps>(
  'SmileIDView',
) as HostComponent<NativeProps>;

export const SmileID = {
  initialize: (enableCrashReporting:boolean) => _SmileID.initialize(enableCrashReporting),
  doEnhancedKycAsync: (enhancedKYCRequest:EnhancedKycRequest) => _SmileID.initialize(enhancedKYCRequest),
};
