/**
 * Shared constants for SmileID SDK
 * This module contains all constants used across Expo and React Native platforms
 */
export const PLATFORM_DETECTION = {
  /** Expo modules core package name for detection */
  EXPO_MODULES_CORE: 'expo-modules-core',

  /** React Native package name */
  REACT_NATIVE: 'react-native',

  /** Platform types */
  PLATFORMS: {
    EXPO: 'expo',
    REACT_NATIVE: 'react-native',
  },
} as const;

export const isValidPlatform = (
  platform: string
): platform is keyof typeof PLATFORM_DETECTION.PLATFORMS => {
  return Object.values(PLATFORM_DETECTION.PLATFORMS).includes(platform as any);
};
