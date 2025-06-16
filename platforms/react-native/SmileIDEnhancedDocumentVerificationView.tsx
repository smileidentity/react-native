import React from 'react';
import type { HostComponent } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import { useSmileIDView } from './useSmileIDView';
import type { EnhancedDocumentVerificationRequest } from './types';

const SmileIDEnhancedDocumentVerificationComponent =
  codegenNativeComponent<EnhancedDocumentVerificationRequest>(
    'SmileIDEnhancedDocumentVerificationView'
  ) as HostComponent<EnhancedDocumentVerificationRequest>;

const SmileIDEnhancedDocumentVerificationView: React.FC<
  EnhancedDocumentVerificationRequest
> = (props) => {
  const viewRef = useSmileIDView(
    'SmileIDEnhancedDocumentVerificationView',
    props
  );

  return (
    <SmileIDEnhancedDocumentVerificationComponent ref={viewRef} {...props} />
  );
};

export default SmileIDEnhancedDocumentVerificationView;
