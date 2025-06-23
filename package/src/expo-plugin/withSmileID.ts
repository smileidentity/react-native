import type { ConfigPlugin } from '@expo/config-plugins';
import { withPlugins, createRunOncePlugin } from '@expo/config-plugins';
import { withSmileIDAndroidBuildGradle } from './withSmileIDAndroidBuildGradle';
import { withSmileIDiOSPodspec } from './withSmileIDiOSPodspec';
import { ConfigProps } from './@types';

// Use dynamic resolution to find package.json regardless of build output location
let pkg;
try {
  // Try to resolve from the package root
  pkg = require('../../../package.json');
} catch {
  // Fallback for compiled code
  pkg = require('../../../../package.json');
}

const withSmileID: ConfigPlugin<ConfigProps> = (config, props = {}) => {
  if (props.useSmileIDExpo != null) {
    // Apply Android configurations
    config = withSmileIDAndroidBuildGradle(config, props.useSmileIDExpo);

    // Apply iOS configurations
    config = withSmileIDiOSPodspec(config, props.useSmileIDExpo);
  }

  return withPlugins(config, []);
};

export default createRunOncePlugin(withSmileID, pkg.name, pkg.version);
