import React from 'react';
import type { HostComponent } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { SmartSelfieEnrollmentEnhancedRequest } from './index';
import type { NativeProps } from './types/NativeProps';

const SmileIDSmartSelfieEnrollmentEnhancedComponent = codegenNativeComponent<
  NativeProps<SmartSelfieEnrollmentEnhancedRequest>
>('SmileIDSmartSelfieEnrollmentEnhancedView') as HostComponent<
  NativeProps<SmartSelfieEnrollmentEnhancedRequest>
>;

const SmileIDSmartSelfieEnrollmentEnhancedView: React.FC<
  SmartSelfieEnrollmentEnhancedRequest
> = (props) => {
  const { onResult, ...configProps } = props;
  const nativeProps: NativeProps<SmartSelfieEnrollmentEnhancedRequest> = {
    config: configProps,
    onSmileIDResult: onResult,
    onSmileIDError: onResult,
  };

  return <SmileIDSmartSelfieEnrollmentEnhancedComponent {...nativeProps} />;
};

export default SmileIDSmartSelfieEnrollmentEnhancedView;
