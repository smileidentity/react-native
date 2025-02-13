import React from 'react';
import type { HostComponent } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { DocumentVerificationRequest } from './index';
import { useSmileIDView } from './useSmileIDView';

const SmileIDEnhancedDocumentVerificationComponent =
  codegenNativeComponent<DocumentVerificationRequest>(
    'SmileIDEnhancedDocumentVerificationView'
  ) as HostComponent<DocumentVerificationRequest>;

const defaultConsentInfo = {
  consentInformation: {
    timestamp: new Date().toISOString(),
  },
};

const SmileIDEnhancedDocumentVerificationView: React.FC<
  DocumentVerificationRequest
> = (props) => {
  const mergedProps = { ...defaultConsentInfo, ...props };
  const viewRef = useSmileIDView(
    'SmileIDEnhancedDocumentVerificationView',
    mergedProps
  );

  return (
    <SmileIDEnhancedDocumentVerificationComponent
      ref={viewRef}
      {...mergedProps}
    />
  );
};

export default SmileIDEnhancedDocumentVerificationView;
