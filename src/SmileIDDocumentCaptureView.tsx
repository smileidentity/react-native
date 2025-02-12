import React from 'react';
import type { HostComponent } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { DocumentVerificationRequest } from './index';
import { useSmileIDView } from './useSmileIDView';

const SmileIDDocumentCaptureComponent =
  codegenNativeComponent<DocumentVerificationRequest>(
    'SmileIDDocumentCaptureView'
  ) as HostComponent<DocumentVerificationRequest>;

const SmileIDDocumentCaptureView: React.FC<DocumentVerificationRequest> = (
  props
) => {
  const viewRef = useSmileIDView('SmileIDDocumentCaptureView', props);

  return <SmileIDDocumentCaptureComponent ref={viewRef} {...props} />;
};

export default SmileIDDocumentCaptureView;
