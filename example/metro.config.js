const path = require('path');
const escape = require('escape-string-regexp');
const exclusionList = require('metro-config/src/defaults/exclusionList');
const pak = require('../package.json');

const root = path.resolve(__dirname, '..');
const modules = Object.keys({ ...pak.peerDependencies });

// Detect if we're in Expo or React Native
const isExpo = (() => {
  try {
    require.resolve('expo/metro-config');
    return true;
  } catch {
    return false;
  }
})();

// Get the appropriate default config
const getDefaultConfigFunc = isExpo
  ? require('expo/metro-config').getDefaultConfig
  : require('@react-native/metro-config').getDefaultConfig;

const defaultConfig = getDefaultConfigFunc(__dirname);

// Common configuration
const customConfig = {
  watchFolders: [root],

  resolver: {
    blockList: exclusionList([
      // Exclude parent node_modules
      new RegExp(`^${escape(path.join(root, 'node_modules'))}\\/.*$`),
      // But allow modules from example
      ...modules
        .filter((m) => m !== 'react' && m !== 'react-native')
        .map(
          (m) =>
            new RegExp(`^${escape(path.join(root, 'node_modules', m))}\\/.*$`)
        ),
    ]),

    nodeModulesPaths: [
      path.join(__dirname, 'node_modules'),
      path.join(root, 'node_modules'),
    ],

    extraNodeModules: {
      '@smile_identity/react-native': root,
    },
  },

  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};

// Merge configurations
if (isExpo) {
  // For Expo, manually merge since it doesn't have mergeConfig
  module.exports = {
    ...defaultConfig,
    ...customConfig,
    resolver: {
      ...defaultConfig.resolver,
      ...customConfig.resolver,
    },
    transformer: {
      ...defaultConfig.transformer,
      ...customConfig.transformer,
    },
  };
} else {
  // For React Native, use mergeConfig
  const { mergeConfig } = require('@react-native/metro-config');
  module.exports = mergeConfig(defaultConfig, customConfig);
}
