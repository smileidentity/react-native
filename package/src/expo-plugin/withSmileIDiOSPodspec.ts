import type { ConfigPlugin } from '@expo/config-plugins';
import { withDangerousMod } from '@expo/config-plugins';
import * as fs from 'fs';
import * as path from 'path';

interface ConfigProps {
  useExpo?: boolean;
}

/**
 * Sets the `$SmileIDUseExpo` variable in the Podfile.
 * This variable is read by the react-native-smile-id.podspec to determine which source files to include.
 */
export const withSmileIDiOSPodspec: ConfigPlugin<ConfigProps> = (
  config,
  props
) => {
  return withDangerousMod(config, [
    'ios',
    async (config) => {
      const podfilePath = path.join(
        config.modRequest.platformProjectRoot,
        'Podfile'
      );

      if (!fs.existsSync(podfilePath)) {
        return config;
      }

      let podfileContent = fs.readFileSync(podfilePath, 'utf8');
      
      // Set the variable value based on props
      const useExpo = props?.useExpo !== false;
      const variableLine = `$SmileIDUseExpo=${useExpo}`;

      // Check if the variable is already set
      const existingVariableRegex = /\$SmileIDUseExpo\s*=\s*(true|false)/;
      
      if (existingVariableRegex.test(podfileContent)) {
        // Update existing variable
        podfileContent = podfileContent.replace(
          existingVariableRegex,
          variableLine
        );
      } else {
        // Add the variable at the beginning of the file, after any comments
        const lines = podfileContent.split('\n');
        let insertIndex = 0;
        
        // Skip initial comments and empty lines
        while (insertIndex < lines.length && 
               (lines[insertIndex].trim().startsWith('#') || 
                lines[insertIndex].trim() === '')) {
          insertIndex++;
        }
        
        lines.splice(insertIndex, 0, variableLine, '');
        podfileContent = lines.join('\n');
      }

      fs.writeFileSync(podfilePath, podfileContent);
      
      return config;
    },
  ]);
};