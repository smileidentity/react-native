import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import { EnhancedKycRequest } from './index';

export interface Spec extends TurboModule {
  initialize: (enableCrashReporting:boolean,useSandBox:boolean) => Promise<void>,
  doEnhancedKycAsync: (enhancedKYCRequest:EnhancedKycRequest) => Promise<string>,
}
export default TurboModuleRegistry.getEnforcing<Spec>('SmileID');
