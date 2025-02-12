import React from 'react';
import type { HostComponent } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { DocumentVerificationRequest } from './index';
import { useSmileIDView } from './useSmileIDView';

const SmileIDDocumentVerificationComponent =
  codegenNativeComponent<DocumentVerificationRequest>(
    'SmileIDDocumentVerificationView'
  ) as HostComponent<DocumentVerificationRequest>;

const SmileIDDocumentVerificationView: React.FC<DocumentVerificationRequest> = (
  props
) => {
  const viewRef = useSmileIDView('SmileIDDocumentVerificationView', props);

  return <SmileIDDocumentVerificationComponent ref={viewRef} {...props} />;
};

export default SmileIDDocumentVerificationView;
