import type { ConfigPlugin } from '@expo/config-plugins';
import { withGradleProperties } from '@expo/config-plugins';
/**
 * Modifies the Android project-level build.gradle to set useSmileIDExpo in ext block.
 * This ensures the SmileID library uses Expo-specific build configuration.
 */
export const withSmileIDAndroidBuildGradle: ConfigPlugin<boolean> = (c) => {
  const key = 'useSmileIDExpo';
  return withGradleProperties(c, (config) => {
    config.modResults = config.modResults.filter((item) => {
      if (item.type === 'property' && item.key === key) return false;
      return true;
    });

    config.modResults.push({
      type: 'property',
      key: key,
      value: 'true',
    });

    return config;
  });
};
