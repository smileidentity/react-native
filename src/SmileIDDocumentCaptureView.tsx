import React from 'react';
import type { HostComponent } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { DocumentVerificationRequest } from './index';
import type { NativeProps } from './types/NativeProps';

const SmileIDDocumentCaptureComponent = codegenNativeComponent<
  NativeProps<DocumentVerificationRequest>
>('SmileIDDocumentCaptureView') as HostComponent<
  NativeProps<DocumentVerificationRequest>
>;

const SmileIDDocumentCaptureView: React.FC<DocumentVerificationRequest> = (
  props
) => {
  const { onResult, ...configProps } = props;
  const nativeProps: NativeProps<DocumentVerificationRequest> = {
    config: configProps,
    onSmileIDResult: onResult,
    onSmileIDError: onResult,
  };

  return <SmileIDDocumentCaptureComponent {...nativeProps} />;
};

export default SmileIDDocumentCaptureView;
