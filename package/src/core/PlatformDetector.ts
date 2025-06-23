/**
 * Platform detection logic for SmileID SDK
 * Automatically detects whether running in Expo or React Native environment
 */

/**
 * Platform detection result
 */
export interface PlatformInfo {
  platform: 'expo' | 'react-native';
  hasExpoModulesCore: boolean;
  hasReactNative: boolean;
  isExpoGo: boolean;
  sdkVersion?: string;
}

/**
 * Platform detector class with caching
 */
export class PlatformDetector {
  private static cachedPlatformInfo: PlatformInfo | null = null;

  /**
   * Detect the current platform environment
   * @returns Platform information
   */
  static detectPlatform(): PlatformInfo {
    // Return cached result if available
    if (this.cachedPlatformInfo) {
      return this.cachedPlatformInfo;
    }

    const platformInfo = this.performDetection();
    this.cachedPlatformInfo = platformInfo;
    return platformInfo;
  }

  /**
   * Clear cached platform detection result
   * Useful for testing or when environment changes
   */
  static clearCache(): void {
    this.cachedPlatformInfo = null;
  }

  /**
   * Check if currently running in Expo environment
   * @returns True if running in Expo
   */
  static isExpo(): boolean {
    return this.detectPlatform().platform === 'expo';
  }

  /**
   * Check if currently running in React Native environment
   * @returns True if running in React Native
   */
  static isReactNative(): boolean {
    return this.detectPlatform().platform === 'react-native';
  }

  /**
   * Check if running in Expo Go app
   * @returns True if running in Expo Go
   */
  static isExpoGo(): boolean {
    return this.detectPlatform().isExpoGo;
  }

  /**
   * Get the detected platform string
   * @returns Platform identifier
   */
  static getPlatform(): 'expo' | 'react-native' {
    return this.detectPlatform().platform;
  }

  /**
   * Perform the actual platform detection
   * @returns Platform information
   */
  private static performDetection(): PlatformInfo {
    try {
      const hasExpoModulesCore = this.checkExpoModulesCore();
      const hasReactNative = this.checkReactNative();
      const isExpoGo = this.checkExpoGo();

      // Determine platform based on available modules
      const platform: 'expo' | 'react-native' = hasExpoModulesCore
        ? 'expo'
        : 'react-native';

      return {
        platform,
        hasExpoModulesCore,
        hasReactNative,
        isExpoGo,
        sdkVersion: this.getExpoSdkVersion(),
      };
    } catch (error: unknown) {
      // Fallback to React Native if detection fails
      console.warn(
        'SmileID: Platform detection failed, defaulting to React Native',
        error
      );
      return {
        platform: 'react-native',
        hasExpoModulesCore: false,
        hasReactNative: true,
        isExpoGo: false,
        sdkVersion: undefined,
      };
    }
  }

  /**
   * Check if expo-modules-core is available
   * @returns True if expo-modules-core is available
   */
  private static checkExpoModulesCore(): boolean {
    try {
      // Try to require expo-modules-core
      require('expo-modules-core');
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if react-native is available
   * @returns True if react-native is available
   */
  private static checkReactNative(): boolean {
    try {
      // Try to require react-native
      require('react-native');
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if running in Expo Go
   * @returns True if running in Expo Go
   */
  private static checkExpoGo(): boolean {
    try {
      // Handle different JavaScript engines (Hermes, JSC, etc.)
      const globalObject = (() => {
        if (typeof global !== 'undefined') return global;
        // window might not exist in React Native
        if (typeof window !== 'undefined')
          return window as unknown as typeof global;
        // self might not exist in React Native
        if (typeof self !== 'undefined')
          return self as unknown as typeof global;
        return {} as typeof global;
      })();

      // Check for Expo Go specific globals
      return (
        typeof (globalObject as Record<string, unknown>).expo !== 'undefined' ||
        typeof (globalObject as Record<string, unknown>).ExpoModules !==
          'undefined' ||
        typeof (globalObject as Record<string, unknown>).__expo !== 'undefined'
      );
    } catch {
      return false;
    }
  }

  /**
   * Get Expo SDK version if available
   * @returns Expo SDK version or undefined
   */
  private static getExpoSdkVersion(): string | undefined {
    try {
      // Try to get Expo SDK version
      const Constants = require('expo-constants');
      return Constants?.expoVersion || Constants?.manifest?.sdkVersion;
    } catch {
      return undefined;
    }
  }

  /**
   * Validate platform compatibility
   * @throws Error if platform is not supported
   */
  static validatePlatform(): void {
    const platformInfo = this.detectPlatform();

    if (!platformInfo.hasExpoModulesCore && !platformInfo.hasReactNative) {
      throw new Error(
        'SmileID SDK requires either Expo modules or React Native environment. ' +
          'Please ensure you have properly installed the SDK and its dependencies.'
      );
    }

    // Warn if running in Expo Go (limited native module support)
    if (platformInfo.isExpoGo) {
      console.warn(
        'SmileID SDK: Running in Expo Go detected. Some features may not work as expected. ' +
          'For full functionality, please use a development build or bare React Native app.'
      );
    }
  }

  /**
   * Get diagnostic information for debugging
   * @returns Diagnostic information object
   */
  static getDiagnostics(): Record<string, unknown> {
    const platformInfo = this.detectPlatform();

    return {
      platform: platformInfo.platform,
      hasExpoModulesCore: platformInfo.hasExpoModulesCore,
      hasReactNative: platformInfo.hasReactNative,
      isExpoGo: platformInfo.isExpoGo,
      sdkVersion: platformInfo.sdkVersion,
      nodeVersion: process.version,
      reactNativeVersion: (() => {
        try {
          return require('react-native/package.json')?.version;
        } catch {
          return undefined;
        }
      })(),
    };
  }
}
