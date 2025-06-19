import React from 'react';
import type { HostComponent } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { EnhancedDocumentVerificationRequest } from './types';
import type { NativeProps } from './types/NativeProps';

const SmileIDEnhancedDocumentVerificationComponent = codegenNativeComponent<
  NativeProps<EnhancedDocumentVerificationRequest>
>('SmileIDEnhancedDocumentVerificationView') as HostComponent<
  NativeProps<EnhancedDocumentVerificationRequest>
>;

const SmileIDEnhancedDocumentVerificationView: React.FC<
  EnhancedDocumentVerificationRequest
> = (props) => {
  const { onResult, ...configProps } = props;
  const nativeProps: NativeProps<EnhancedDocumentVerificationRequest> = {
    config: configProps,
    onSmileIDResult: onResult,
    onSmileIDError: onResult,
  };

  return <SmileIDEnhancedDocumentVerificationComponent {...nativeProps} />;
};

export default SmileIDEnhancedDocumentVerificationView;
