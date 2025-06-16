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
export declare class PlatformDetector {
    private static cachedPlatformInfo;
    /**
     * Detect the current platform environment
     * @returns Platform information
     */
    static detectPlatform(): PlatformInfo;
    /**
     * Clear cached platform detection result
     * Useful for testing or when environment changes
     */
    static clearCache(): void;
    /**
     * Check if currently running in Expo environment
     * @returns True if running in Expo
     */
    static isExpo(): boolean;
    /**
     * Check if currently running in React Native environment
     * @returns True if running in React Native
     */
    static isReactNative(): boolean;
    /**
     * Check if running in Expo Go app
     * @returns True if running in Expo Go
     */
    static isExpoGo(): boolean;
    /**
     * Get the detected platform string
     * @returns Platform identifier
     */
    static getPlatform(): 'expo' | 'react-native';
    /**
     * Perform the actual platform detection
     * @returns Platform information
     */
    private static performDetection;
    /**
     * Check if expo-modules-core is available
     * @returns True if expo-modules-core is available
     */
    private static checkExpoModulesCore;
    /**
     * Check if react-native is available
     * @returns True if react-native is available
     */
    private static checkReactNative;
    /**
     * Check if running in Expo Go
     * @returns True if running in Expo Go
     */
    private static checkExpoGo;
    /**
     * Get Expo SDK version if available
     * @returns Expo SDK version or undefined
     */
    private static getExpoSdkVersion;
    /**
     * Validate platform compatibility
     * @throws Error if platform is not supported
     */
    static validatePlatform(): void;
    /**
     * Get platform-specific module path
     * @param moduleName Base module name
     * @returns Platform-specific module path
     */
    static getModulePath(moduleName: string): string;
    /**
     * Load platform-specific module
     * @param moduleName Module name to load
     * @returns Loaded module
     */
    static loadPlatformModule<T = any>(moduleName: string): T;
    /**
     * Get diagnostic information for debugging
     * @returns Diagnostic information object
     */
    static getDiagnostics(): Record<string, any>;
}
//# sourceMappingURL=PlatformDetector.d.ts.map