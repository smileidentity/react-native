import type { ConfigPlugin } from '@expo/config-plugins';
import { withDangerousMod } from '@expo/config-plugins';
import { writeToPodfile } from './writeToPodfile';

/**
 * Sets the `$SmileIDUseExpo` variable in the Podfile.
 * This variable is read by the react-native-smile-id.podspec to determine which source files to include.
 */
export const withSmileIDiOSPodspec: ConfigPlugin<boolean> = (c) => {
  return withDangerousMod(c, [
    'ios',
    (config) => {
      writeToPodfile(
        config.modRequest.projectRoot,
        '$useSmileIDExpo',
        String(true)
      );
      return config;
    },
  ]);
};
