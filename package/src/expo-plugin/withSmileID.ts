import type { ConfigPlugin } from '@expo/config-plugins';
import {
  withPlugins,
  AndroidConfig,
  createRunOncePlugin,
} from '@expo/config-plugins';
import { withSmileIDAndroidBuildGradle } from './withSmileIDAndroidBuildGradle';
import { withSmileIDiOSPodspec } from './withSmileIDiOSPodspec';

const pkg = require('../../package.json');

const CAMERA_USAGE = 'Allow $(PRODUCT_NAME) to access your camera';

interface ConfigProps {
  cameraPermissionText?: string;
  useExpo?: boolean;
}

const withSmileID: ConfigPlugin<ConfigProps> = (config, props = {}) => {
  // iOS permissions
  if (!config.ios) config.ios = {};
  if (!config.ios.infoPlist) config.ios.infoPlist = {};

  config.ios.infoPlist.NSCameraUsageDescription =
    props.cameraPermissionText ??
    config.ios.infoPlist.NSCameraUsageDescription ??
    CAMERA_USAGE;

  // Android permissions
  const androidPermissions = [
    'android.permission.CAMERA',
    'android.permission.INTERNET',
  ];

  // Apply Android configurations
  config = withSmileIDAndroidBuildGradle(config, props);
  
  // Apply iOS configurations
  config = withSmileIDiOSPodspec(config, props);

  return withPlugins(config, [
    [AndroidConfig.Permissions.withPermissions, androidPermissions],
  ]);
};

export default createRunOncePlugin(withSmileID, pkg.name, pkg.version);
