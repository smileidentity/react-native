import React from 'react';
import { type HostComponent } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { SmartSelfieAuthenticationRequest } from './index';
import type { NativeProps } from './types/NativeProps';

const SmileIDSmartSelfieAuthenticationComponent = codegenNativeComponent<
  NativeProps<SmartSelfieAuthenticationRequest>
>('SmileIDSmartSelfieAuthenticationView') as HostComponent<
  NativeProps<SmartSelfieAuthenticationRequest>
>;

const SmileIDSmartSelfieAuthenticationView: React.FC<
  SmartSelfieAuthenticationRequest
> = (props) => {
  const { onResult, ...configProps } = props;
  const nativeProps: NativeProps<SmartSelfieAuthenticationRequest> = {
    config: configProps,
    onSmileIDResult: onResult,
    onSmileIDError: onResult,
  };

  return <SmileIDSmartSelfieAuthenticationComponent {...nativeProps} />;
};

export default SmileIDSmartSelfieAuthenticationView;
