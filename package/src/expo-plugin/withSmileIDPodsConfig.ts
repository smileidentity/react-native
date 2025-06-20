import type { ConfigPlugin } from '@expo/config-plugins';
import { withProjectBuildGradle } from '@expo/config-plugins';

interface ConfigProps {
  useExpo?: boolean;
}

/**
 * Modifies the Android project-level build.gradle to set useSmileIDExpo in ext block.
 * This ensures the SmileID library uses Expo-specific build configuration.
 */
export const withSmileIDPodsConfig: ConfigPlugin<ConfigProps> = (
  config,
  props
) => {
  return withProjectBuildGradle(config, (config) => {
    if (config.modResults.language === 'groovy') {
      let contents = config.modResults.contents;

      // Check if ext block exists
      const extBlockRegex = /ext\s*{([^}]*)}/;
      const extBlockMatch = contents.match(extBlockRegex);

      if (extBlockMatch && extBlockMatch[1] !== undefined) {
        // ext block exists, add or update useSmileIDExpo
        const extBlockContent = extBlockMatch[1];

        // Check if useSmileIDExpo already exists
        if (extBlockContent.includes('useSmileIDExpo')) {
          // Update existing value
          contents = contents.replace(
            /useSmileIDExpo\s*=\s*(true|false)/,
            `useSmileIDExpo = ${props?.useExpo !== false ? 'true' : 'false'}`
          );
        } else {
          // Add useSmileIDExpo to existing ext block
          const updatedExtBlock = `ext {${extBlockContent}
        useSmileIDExpo = ${props?.useExpo !== false ? 'true' : 'false'}
    }`;
          contents = contents.replace(extBlockRegex, updatedExtBlock);
        }
      } else {
        // No ext block exists, create one after buildscript block
        const buildscriptEndRegex = /buildscript\s*{[^}]*}\s*}/;
        const buildscriptMatch = contents.match(buildscriptEndRegex);

        if (buildscriptMatch) {
          const insertPosition = buildscriptMatch.index! + buildscriptMatch[0].length;
          const extBlock = `

ext {
    useSmileIDExpo = ${props?.useExpo !== false ? 'true' : 'false'}
}`;
          contents = contents.slice(0, insertPosition) + extBlock + contents.slice(insertPosition);
        }
      }

      config.modResults.contents = contents;
    }

    return config;
  });
};
