import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import type { EnhancedKycRequest } from './index';

export interface Spec extends TurboModule {
  initialize: (useSandBox: boolean) => Promise<void>;
  doEnhancedKycAsync: (
    enhancedKYCRequest: EnhancedKycRequest
  ) => Promise<string>;
}
export default TurboModuleRegistry.getEnforcing<Spec>('RNSmileID');
