/**
 * Shared SmileID view components that work across platforms
 * Uses the platform-specific factories internally
 */
import { PlatformDetector } from './PlatformDetector';
import type {
  BiometricKYCRequest,
  ConsentRequest,
  DocumentVerificationRequest,
  EnhancedDocumentVerificationRequest,
  SmartSelfieAuthenticationRequest,
  SmartSelfieEnrollmentRequest,
  SmartSelfieAuthenticationEnhancedRequest,
  SmartSelfieEnrollmentEnhancedRequest,
} from './types';
import type { ComponentType } from 'react';

// Platform-specific factory loader
let createSmileIDView: <T extends { onResult?: (event: any) => void }>(
  viewName: string
) => ComponentType<T>;

// Initialize the factory based on platform
if (PlatformDetector.getPlatform() === 'expo') {
  createSmileIDView =
    require('../platforms/expo/useSmileIDExpoView').createSmileIDView;
} else {
  createSmileIDView =
    require('../platforms/react-native/useSmileIDRNView').createSmileIDView;
}

/**
 * Shared view components - these work on both Expo and React Native
 */

export const SmileIDBiometricKYCView = createSmileIDView<BiometricKYCRequest>(
  'SmileIDBiometricKYCView'
);

export const SmileIDConsentView =
  createSmileIDView<ConsentRequest>('SmileIDConsentView');

export const SmileIDDocumentCaptureView = createSmileIDView<{
  onResult?: (_event: any) => void;
}>('SmileIDDocumentCaptureView');

export const SmileIDDocumentVerificationView =
  createSmileIDView<DocumentVerificationRequest>(
    'SmileIDDocumentVerificationView'
  );

export const SmileIDEnhancedDocumentVerificationView =
  createSmileIDView<EnhancedDocumentVerificationRequest>(
    'SmileIDEnhancedDocumentVerificationView'
  );

export const SmileIDSmartSelfieAuthenticationView =
  createSmileIDView<SmartSelfieAuthenticationRequest>(
    'SmileIDSmartSelfieAuthenticationView'
  );

export const SmileIDSmartSelfieAuthenticationEnhancedView =
  createSmileIDView<SmartSelfieAuthenticationEnhancedRequest>(
    'SmileIDSmartSelfieAuthenticationEnhancedView'
  );

export const SmileIDSmartSelfieCaptureView = createSmileIDView<{
  onResult?: (_event: any) => void;
}>('SmileIDSmartSelfieCaptureView');

export const SmileIDSmartSelfieEnrollmentView =
  createSmileIDView<SmartSelfieEnrollmentRequest>(
    'SmileIDSmartSelfieEnrollmentView'
  );

export const SmileIDSmartSelfieEnrollmentEnhancedView =
  createSmileIDView<SmartSelfieEnrollmentEnhancedRequest>(
    'SmileIDSmartSelfieEnrollmentEnhancedView'
  );
