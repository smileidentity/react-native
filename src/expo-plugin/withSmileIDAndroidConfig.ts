import type { ConfigPlugin } from '@expo/config-plugins'
import { withGradleProperties } from '@expo/config-plugins'

interface ConfigProps {
  useExpo?: boolean;
}

/**
 * Set the `SmileId_useExpo` value in the static `gradle.properties` file.
 * This is used to enable Expo-specific build configuration.
 */
export const withSmileIDAndroidConfig: ConfigPlugin<ConfigProps> = (c, props) => {
  const key = 'SmileId_useExpo'
  return withGradleProperties(c, (config) => {
    // Remove any existing SmileId_useExpo property
    config.modResults = config.modResults.filter((item) => {
      if (item.type === 'property' && item.key === key) return false
      return true
    })

    // Add the new property
    config.modResults.push({
      type: 'property',
      key: key,
      value: props?.useExpo ? 'true' : 'false',
    })

    return config
  })
}
