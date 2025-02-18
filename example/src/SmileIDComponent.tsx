import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import {
  SmileIDSmartSelfieEnrollmentView,
  SmileIDSmartSelfieEnrollmentEnhancedView,
  SmileIDSmartSelfieAuthenticationView,
  SmileIDSmartSelfieAuthenticationEnhancedView,
  SmileIDDocumentVerificationView,
  SmileIDBiometricKYCView,
  SmileIDDocumentCaptureView,
  SmileIDEnhancedDocumentVerificationView,
  SmileIDConsentView,
  SmileIDSmartSelfieCaptureView,
} from '@smile_identity/react-native';
import type { Product } from './types/Product';

export interface SmileIDCaptureScreenProps {
  navigation?: any; // Replace with the actual type of your navigation prop
  route?: any; // Replace with the actual type of your route prop
  componentProduct?: Product; // Replace with the actual type of your route prop
  onResult?: (event: any) => void; // Replace with the actual type of your route prop
  style?: any; // Replace with the actual type of your route prop
}

export const SmileIDComponent: React.FC<SmileIDCaptureScreenProps> = ({
  componentProduct,
  onResult,
}) => {
  const product = componentProduct?.product;
  const title = componentProduct?.title;
  return (
    <View style={styles.container}>
      {title === 'SmartSelfie Capture' && (
        // @ts-ignore - this is a known issue with the type definitions
        <SmileIDSmartSelfieCaptureView
          {...product}
          style={[styles.smileView]}
          onResult={(event) => onResult?.(event)}
        />
      )}
      {title === 'Document Capture' && (
        // @ts-ignore - this is a known issue with the type definitions
        <SmileIDDocumentCaptureView
          {...product}
          style={[styles.smileView]}
          onResult={(event) => onResult?.(event)}
        />
      )}
      {title === 'SmartSelfie Enrollment' && (
        // @ts-ignore - this is a known issue with the type definitions
        <SmileIDSmartSelfieEnrollmentView
          {...product}
          style={styles.smileView}
          onResult={(event) => onResult?.(event)}
        />
      )}
      {title === 'SmartSelfie Enrollment (Enhanced)' && (
        // @ts-ignore - this is a known issue with the type definitions
        <SmileIDSmartSelfieEnrollmentEnhancedView
          {...product}
          style={styles.smileView}
          onResult={(event) => onResult?.(event)}
        />
      )}
      {title === 'SmartSelfie Authentication' && (
        // @ts-ignore - this is a known issue with the type definitions
        <SmileIDSmartSelfieAuthenticationView
          {...product}
          style={styles.smileView}
          onResult={(event) => onResult?.(event)}
        />
      )}
      {title === 'SmartSelfie Authentication (Enhanced)' && (
        // @ts-ignore - this is a known issue with the type definitions
        <SmileIDSmartSelfieAuthenticationEnhancedView
          {...product}
          style={styles.smileView}
          onResult={(event) => onResult?.(event)}
        />
      )}
      {title === 'Document Verification' && (
        // @ts-ignore - this is a known issue with the type definitions
        <SmileIDDocumentVerificationView
          {...product}
          style={styles.smileView}
          onResult={(event) => onResult?.(event)}
        />
      )}
      {title === 'Enhanced Document Verification' && (
        // @ts-ignore - this is a known issue with the type definitions
        <SmileIDEnhancedDocumentVerificationView
          {...product}
          style={styles.smileView}
          onResult={(event) => onResult?.(event)}
        />
      )}
      {title === 'Biometric KYC' && (
        // @ts-ignore - this is a known issue with the type definitions
        <SmileIDBiometricKYCView
          {...product}
          style={styles.smileView}
          onResult={(event) => onResult?.(event)}
        />
      )}
      {title === 'Consent Screen' && (
        // @ts-ignore - this is a known issue with the type definitions
        <SmileIDConsentView
          {...product}
          style={styles.smileView}
          onResult={(event) => onResult?.(event)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFDBDBC4',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  smileView: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
