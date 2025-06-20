/**
 * Expo view components for SmileID SDK
 * These will eventually be replaced with proper Expo module view implementations
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type {
  SmileIDViewProps,
  DocumentVerificationRequest,
  SmartSelfieEnrollmentRequest,
  SmartSelfieAuthenticationRequest,
  BiometricKYCRequest,
  ConsentRequest,
  SmartSelfieEnrollmentEnhancedRequest,
  SmartSelfieAuthenticationEnhancedRequest,
  EnhancedDocumentVerificationRequest,
} from '../../core/types';

// Placeholder component for Expo view implementations
// TODO: Replace with actual Expo module views
const PlaceholderView: React.FC<{
  title: string;
  onResult?: (event: any) => void;
}> = ({ title, onResult }) => {
  React.useEffect(() => {
    // Simulate a result after 2 seconds for development purposes
    const timer = setTimeout(() => {
      onResult?.({
        success: true,
        message: `${title} completed successfully in Expo mode`,
        timestamp: new Date().toISOString(),
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [title, onResult]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>Expo Implementation</Text>
      <Text style={styles.description}>
        This is a placeholder view. In a production environment, this would be
        replaced with the actual SmileID Expo module view implementation.
      </Text>
    </View>
  );
};

// SmileID Expo View Components
export const SmileIDSmartSelfieEnrollmentView: React.FC<
  SmartSelfieEnrollmentRequest
> = (props) => (
  <PlaceholderView title="Smart Selfie Enrollment" onResult={props.onResult} />
);

export const SmileIDSmartSelfieAuthenticationView: React.FC<
  SmartSelfieAuthenticationRequest
> = (props) => (
  <PlaceholderView
    title="Smart Selfie Authentication"
    onResult={props.onResult}
  />
);

export const SmileIDSmartSelfieEnrollmentEnhancedView: React.FC<
  SmartSelfieEnrollmentEnhancedRequest
> = (props) => (
  <PlaceholderView
    title="Smart Selfie Enrollment Enhanced"
    onResult={props.onResult}
  />
);

export const SmileIDSmartSelfieAuthenticationEnhancedView: React.FC<
  SmartSelfieAuthenticationEnhancedRequest
> = (props) => (
  <PlaceholderView
    title="Smart Selfie Authentication Enhanced"
    onResult={props.onResult}
  />
);

export const SmileIDDocumentVerificationView: React.FC<
  DocumentVerificationRequest
> = (props) => (
  <PlaceholderView title="Document Verification" onResult={props.onResult} />
);

export const SmileIDBiometricKYCView: React.FC<BiometricKYCRequest> = (
  props
) => <PlaceholderView title="Biometric KYC" onResult={props.onResult} />;

export const SmileIDEnhancedDocumentVerificationView: React.FC<
  EnhancedDocumentVerificationRequest
> = (props) => (
  <PlaceholderView
    title="Enhanced Document Verification"
    onResult={props.onResult}
  />
);

export const SmileIDSmartSelfieCaptureView: React.FC<SmileIDViewProps> = (
  props
) => <PlaceholderView title="Smart Selfie Capture" onResult={props.onResult} />;

export const SmileIDDocumentCaptureView: React.FC<SmileIDViewProps> = (
  props
) => <PlaceholderView title="Document Capture" onResult={props.onResult} />;

export const SmileIDConsentView: React.FC<ConsentRequest> = (props) => (
  <PlaceholderView title="Consent" onResult={props.onResult} />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    lineHeight: 20,
  },
});

// Re-export types for convenience
export type {
  SmileIDViewProps,
  DocumentVerificationRequest,
  SmartSelfieEnrollmentRequest,
  SmartSelfieAuthenticationRequest,
  BiometricKYCRequest,
  ConsentRequest,
  SmartSelfieEnrollmentEnhancedRequest,
  SmartSelfieAuthenticationEnhancedRequest,
  EnhancedDocumentVerificationRequest,
};
