import { HostComponent, NativeModules, Platform, ViewProps } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

const LINKING_ERROR =
  `The package 'react-native-smile-id' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

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
  userId?: string;
  jobId?: string;
  jobType: string
}

export default codegenNativeComponent<NativeProps>(
  'SmileIDView',
) as HostComponent<NativeProps>;

export const SmileID = {
  initialize: () => _SmileID.initialize(),
};
