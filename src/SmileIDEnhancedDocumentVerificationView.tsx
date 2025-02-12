import React from 'react';
import type { HostComponent } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { DocumentVerificationRequest } from './index';
import { useSmileIDView } from './useSmileIDView';

const SmileIDEnhancedDocumentVerificationComponent =
  codegenNativeComponent<DocumentVerificationRequest>(
    'SmileIDEnhancedDocumentVerificationView'
  ) as HostComponent<DocumentVerificationRequest>;

const SmileIDEnhancedDocumentVerificationView: React.FC<
  DocumentVerificationRequest
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
