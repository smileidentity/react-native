/**
 * SmileID React Native SDK - Main Entry Point
 *
 * This is the new unified entry point that:
 * 1. Maintains 100% backward compatibility with existing code
 * 2. Automatically detects platform (Expo vs React Native)
 * 3. Uses shared core logic for maximum code reusability
 * 4. Provides the exact same API surface as before
 *
 * KEY DESIGN PRINCIPLE: Zero Breaking Changes
 * - All existing imports continue to work exactly as before
 * - All existing functionality preserved with identical behavior
 * - Smart platform detection happens transparently
 */
import { SmileIDSDK } from './core/SmileIDSDK';
export declare const SmileID: SmileIDSDK;
export declare const SmileIDSmartSelfieEnrollmentView: any;
export declare const SmileIDSmartSelfieAuthenticationView: any;
export declare const SmileIDSmartSelfieEnrollmentEnhancedView: any;
export declare const SmileIDSmartSelfieAuthenticationEnhancedView: any;
export declare const SmileIDDocumentVerificationView: any;
export declare const SmileIDBiometricKYCView: any;
export declare const SmileIDEnhancedDocumentVerificationView: any;
export declare const SmileIDSmartSelfieCaptureView: any;
export declare const SmileIDDocumentCaptureView: any;
export declare const SmileIDConsentView: any;
export { Config, JobType, AuthenticationRequest, JobStatusRequest, PrepUploadRequest, ProductsConfigRequest, ConsentInformation, UploadRequest, IdInfo, EnhancedKycRequest, } from './core/types';
export type { AuthenticationResponse, BiometricKycJobStatusResponse, DocumentVerificationJobStatusResponse, EnhancedDocumentVerificationJobStatusResponse, EnhancedKycAsyncResponse, EnhancedKycResponse, PrepUploadResponse, ProductsConfigResponse, ServicesResponse, SmartSelfieJobStatusResponse, ValidDocumentsResponse, SmileIDViewProps, DocumentVerificationRequest, SmartSelfieEnrollmentRequest, SmartSelfieAuthenticationRequest, BiometricKYCRequest, ConsentRequest, SmartSelfieEnrollmentEnhancedRequest, SmartSelfieAuthenticationEnhancedRequest, EnhancedDocumentVerificationRequest, } from './core/types';
export { PlatformDetector } from './core/PlatformDetector';
export declare const SmileIDDiagnostics: {
    getPlatformInfo: () => Record<string, any>;
    getSDKInfo: () => Record<string, any>;
};
//# sourceMappingURL=index.d.ts.map