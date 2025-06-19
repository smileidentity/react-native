import React from 'react';
import type { HostComponent } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { SmartSelfieEnrollmentRequest } from './index';
import type { NativeProps } from './types/NativeProps';

const SmileIDSmartSelfieCaptureComponent = codegenNativeComponent<
  NativeProps<SmartSelfieEnrollmentRequest>
>('SmileIDSmartSelfieCaptureView') as HostComponent<
  NativeProps<SmartSelfieEnrollmentRequest>
>;

const SmileIDSmartSelfieCaptureView: React.FC<SmartSelfieEnrollmentRequest> = (
  props
) => {
  const { onResult, ...configProps } = props;
  const nativeProps: NativeProps<SmartSelfieEnrollmentRequest> = {
    config: configProps,
    onSmileIDResult: onResult,
    onSmileIDError: onResult,
  };

  return <SmileIDSmartSelfieCaptureComponent {...nativeProps} />;
};

export default SmileIDSmartSelfieCaptureView;
