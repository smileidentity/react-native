/**
 * SmileID React Native SDK - Main Entry Point
 *
 * This is the new unified entry point that:
 * 1. Maintains backward compatibility with existing code
 * 2. Automatically detects platform (Expo vs React Native)
 */

// Import the smart SDK that handles platform detection automatically
import { SmileID as SmartSmileID } from './core/SmileIDSDK';

// Re-export all view components (these will be platform-specific automatically)
// For maximum code reuse, we import from the smart detection system
import { PlatformDetector } from './core/PlatformDetector';

// Dynamically export platform-appropriate view components
let viewComponents: any = {};

try {
  // Detect platform and load appropriate view components
  const platform = PlatformDetector.getPlatform();

  if (platform === 'expo') {
    // Load Expo view components
    const expoViews = require('./platforms/expo');
    viewComponents = {
      SmileIDSmartSelfieEnrollmentView:
        expoViews.SmileIDSmartSelfieEnrollmentView,
      SmileIDSmartSelfieAuthenticationView:
        expoViews.SmileIDSmartSelfieAuthenticationView,
      SmileIDSmartSelfieEnrollmentEnhancedView:
        expoViews.SmileIDSmartSelfieEnrollmentEnhancedView,
      SmileIDSmartSelfieAuthenticationEnhancedView:
        expoViews.SmileIDSmartSelfieAuthenticationEnhancedView,
      SmileIDDocumentVerificationView:
        expoViews.SmileIDDocumentVerificationView,
      SmileIDBiometricKYCView: expoViews.SmileIDBiometricKYCView,
      SmileIDEnhancedDocumentVerificationView:
        expoViews.SmileIDEnhancedDocumentVerificationView,
      SmileIDSmartSelfieCaptureView: expoViews.SmileIDSmartSelfieCaptureView,
      SmileIDDocumentCaptureView: expoViews.SmileIDDocumentCaptureView,
      SmileIDConsentView: expoViews.SmileIDConsentView,
    };
  } else {
    // Load React Native view components
    const reactNativeViews = require('./platforms/react-native');
    viewComponents = {
      SmileIDSmartSelfieEnrollmentView:
        reactNativeViews.SmileIDSmartSelfieEnrollmentView,
      SmileIDSmartSelfieAuthenticationView:
        reactNativeViews.SmileIDSmartSelfieAuthenticationView,
      SmileIDSmartSelfieEnrollmentEnhancedView:
        reactNativeViews.SmileIDSmartSelfieEnrollmentEnhancedView,
      SmileIDSmartSelfieAuthenticationEnhancedView:
        reactNativeViews.SmileIDSmartSelfieAuthenticationEnhancedView,
      SmileIDDocumentVerificationView:
        reactNativeViews.SmileIDDocumentVerificationView,
      SmileIDBiometricKYCView: reactNativeViews.SmileIDBiometricKYCView,
      SmileIDEnhancedDocumentVerificationView:
        reactNativeViews.SmileIDEnhancedDocumentVerificationView,
      SmileIDSmartSelfieCaptureView:
        reactNativeViews.SmileIDSmartSelfieCaptureView,
      SmileIDDocumentCaptureView: reactNativeViews.SmileIDDocumentCaptureView,
      SmileIDConsentView: reactNativeViews.SmileIDConsentView,
    };
  }
} catch (error) {
  // Fallback to React Native views if platform detection fails
  console.warn(
    'SmileID: Platform detection failed, falling back to React Native implementation',
    error
  );

  try {
    const reactNativeViews = require('./platforms/react-native');
    viewComponents = {
      SmileIDSmartSelfieEnrollmentView:
        reactNativeViews.SmileIDSmartSelfieEnrollmentView,
      SmileIDSmartSelfieAuthenticationView:
        reactNativeViews.SmileIDSmartSelfieAuthenticationView,
      SmileIDSmartSelfieEnrollmentEnhancedView:
        reactNativeViews.SmileIDSmartSelfieEnrollmentEnhancedView,
      SmileIDSmartSelfieAuthenticationEnhancedView:
        reactNativeViews.SmileIDSmartSelfieAuthenticationEnhancedView,
      SmileIDDocumentVerificationView:
        reactNativeViews.SmileIDDocumentVerificationView,
      SmileIDBiometricKYCView: reactNativeViews.SmileIDBiometricKYCView,
      SmileIDEnhancedDocumentVerificationView:
        reactNativeViews.SmileIDEnhancedDocumentVerificationView,
      SmileIDSmartSelfieCaptureView:
        reactNativeViews.SmileIDSmartSelfieCaptureView,
      SmileIDDocumentCaptureView: reactNativeViews.SmileIDDocumentCaptureView,
      SmileIDConsentView: reactNativeViews.SmileIDConsentView,
    };
  } catch (fallbackError) {
    console.error(
      'SmileID: Critical error - cannot load any platform implementation',
      fallbackError
    );
    // Provide minimal fallback components to prevent app crash
    viewComponents = {};
  }
}

// Export the main SmileID object (maintains backward compatibility)
export const SmileID = SmartSmileID;

// Export all view components (platform-appropriate)
export const SmileIDSmartSelfieEnrollmentView =
  viewComponents.SmileIDSmartSelfieEnrollmentView;
export const SmileIDSmartSelfieAuthenticationView =
  viewComponents.SmileIDSmartSelfieAuthenticationView;
export const SmileIDSmartSelfieEnrollmentEnhancedView =
  viewComponents.SmileIDSmartSelfieEnrollmentEnhancedView;
export const SmileIDSmartSelfieAuthenticationEnhancedView =
  viewComponents.SmileIDSmartSelfieAuthenticationEnhancedView;
export const SmileIDDocumentVerificationView =
  viewComponents.SmileIDDocumentVerificationView;
export const SmileIDBiometricKYCView = viewComponents.SmileIDBiometricKYCView;
export const SmileIDEnhancedDocumentVerificationView =
  viewComponents.SmileIDEnhancedDocumentVerificationView;
export const SmileIDSmartSelfieCaptureView =
  viewComponents.SmileIDSmartSelfieCaptureView;
export const SmileIDDocumentCaptureView =
  viewComponents.SmileIDDocumentCaptureView;
export const SmileIDConsentView = viewComponents.SmileIDConsentView;

// Re-export all shared types and classes from core (for maximum reusability)
export {
  Config,
  JobType,
  AuthenticationRequest,
  JobStatusRequest,
  PrepUploadRequest,
  ProductsConfigRequest,
  ConsentInformation,
  UploadRequest,
  IdInfo,
  EnhancedKycRequest,
} from './core/types';

// Re-export response types
export type {
  AuthenticationResponse,
  BiometricKycJobStatusResponse,
  DocumentVerificationJobStatusResponse,
  EnhancedDocumentVerificationJobStatusResponse,
  EnhancedKycAsyncResponse,
  EnhancedKycResponse,
  PrepUploadResponse,
  ProductsConfigResponse,
  ServicesResponse,
  SmartSelfieJobStatusResponse,
  ValidDocumentsResponse,
  // View prop types
  SmileIDViewProps,
  DocumentVerificationRequest,
  SmartSelfieEnrollmentRequest,
  SmartSelfieAuthenticationRequest,
  BiometricKYCRequest,
  ConsentRequest,
  SmartSelfieEnrollmentEnhancedRequest,
  SmartSelfieAuthenticationEnhancedRequest,
  EnhancedDocumentVerificationRequest,
} from './core/types';

// Export platform detection utilities for advanced users
export { PlatformDetector } from './core/PlatformDetector';
