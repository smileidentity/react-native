import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import type { EnhancedKycRequest } from './index';

export interface Spec extends TurboModule {
  /**
   * Initialise the Smile ID SDK
   */
  initialize: (useSandBox: boolean) => Promise<void>;
  /**
   * NB: Only available on Android
   * Disable crash reporting
   */
  disableCrashReporting: () => Promise<void>;
  /**
   *Headless run enhanced kyc async
   */
  doEnhancedKycAsync: (
    enhancedKYCRequest: EnhancedKycRequest
  ) => Promise<string>;
  /**
   *Headless run enhanced kyc async
   */
  doEnhancedKyc: (enhancedKYCRequest: EnhancedKycRequest) => Promise<string>;
}
export default TurboModuleRegistry.getEnforcing<Spec>('RNSmileID');
