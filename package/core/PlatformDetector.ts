/**
 * Platform detection logic for SmileID SDK
 * Automatically detects whether running in Expo or React Native environment
 */
import { PLATFORM_DETECTION } from './constants';

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
    } catch (error) {
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
      require(PLATFORM_DETECTION.EXPO_MODULES_CORE);
      return true;
    } catch (error) {
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
      require(PLATFORM_DETECTION.REACT_NATIVE);
      return true;
    } catch (error) {
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
        // @ts-ignore - window and self might not exist in React Native
        if (typeof window !== 'undefined') return window;
        // @ts-ignore - window and self might not exist in React Native
        if (typeof self !== 'undefined') return self;
        return {};
      })();

      // Check for Expo Go specific globals
      return (
        typeof (globalObject as any).expo !== 'undefined' ||
        typeof (globalObject as any).ExpoModules !== 'undefined' ||
        typeof (globalObject as any).__expo !== 'undefined'
      );
    } catch (error) {
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
    } catch (error) {
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
   * Get platform-specific module path
   * @param moduleName Base module name
   * @returns Platform-specific module path
   */
  static getModulePath(moduleName: string): string {
    const platform = this.getPlatform();
    return `../platforms/${platform}/${moduleName}`;
  }

  /**
   * Load platform-specific module
   * @param moduleName Module name to load
   * @returns Loaded module
   */
  static loadPlatformModule<T = any>(moduleName: string): T {
    const modulePath = this.getModulePath(moduleName);
    try {
      return require(modulePath);
    } catch (error) {
      throw new Error(
        `Failed to load platform module: ${modulePath}. ` +
          `Platform: ${this.getPlatform()}. Error: ${error}`
      );
    }
  }

  /**
   * Get diagnostic information for debugging
   * @returns Diagnostic information object
   */
  static getDiagnostics(): Record<string, any> {
    const platformInfo = this.detectPlatform();

    return {
      platform: platformInfo.platform,
      hasExpoModulesCore: platformInfo.hasExpoModulesCore,
      hasReactNative: platformInfo.hasReactNative,
      isExpoGo: platformInfo.isExpoGo,
      sdkVersion: platformInfo.sdkVersion,
      nodeVersion: process.version,
      hermesVersion: (global as any).HermesInternal?.getRuntimeProperties?.()?.[
        'OSS Release Version'
      ],
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
