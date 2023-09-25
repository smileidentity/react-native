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

export type EnhancedKycRequest = {
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


export type PartnerParams = {
  jobType?: JobType | null;
  jobId: string;
  userId: string;
  extras?: Map<string, string> | null;
}

enum JobType {
  BiometricKyc = 1,
  SmartSelfieEnrollment = 2,
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

//todo:rename jobtupe to product and make it enum
export interface NativeProps extends ViewProps {
  userId?: JobType;
  jobId?: string;
  jobType: JobType;
  onResult: (result: String) => void;
}

export default codegenNativeComponent<NativeProps>(
  'SmileIDView',
) as HostComponent<NativeProps>;

export const SmileID = {
  initialize: (enableCrashReporting:boolean) => _SmileID.initialize(enableCrashReporting),
  doEnhancedKycAsync: (enhancedKYCRequest:EnhancedKycRequest) => _SmileID.initialize(enhancedKYCRequest),
};
