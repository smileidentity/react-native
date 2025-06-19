const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');
const escape = require('escape-string-regexp');
const exclusionList = require('metro-config/src/defaults/exclusionList');
const pak = require('../package.json');

const root = path.resolve(__dirname, '..');
const modules = Object.keys({ ...pak.peerDependencies });

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  watchFolders: [root],

  resolver: {
    blacklistRE: exclusionList([
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

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
