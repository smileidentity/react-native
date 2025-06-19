import React from 'react';
import type { HostComponent } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { SmartSelfieAuthenticationEnhancedRequest } from './index';
import type { NativeProps } from './types/NativeProps';

const SmileIDSmartSelfieAuthenticationEnhancedComponent =
  codegenNativeComponent<NativeProps<SmartSelfieAuthenticationEnhancedRequest>>(
    'SmileIDSmartSelfieAuthenticationEnhancedView'
  ) as HostComponent<NativeProps<SmartSelfieAuthenticationEnhancedRequest>>;

const SmileIDSmartSelfieAuthenticationEnhancedView: React.FC<
  SmartSelfieAuthenticationEnhancedRequest
> = (props) => {
  const { onResult, ...configProps } = props;
  const nativeProps: NativeProps<SmartSelfieAuthenticationEnhancedRequest> = {
    config: configProps,
    onSmileIDResult: onResult,
    onSmileIDError: onResult,
  };

  return <SmileIDSmartSelfieAuthenticationEnhancedComponent {...nativeProps} />;
};

export default SmileIDSmartSelfieAuthenticationEnhancedView;
