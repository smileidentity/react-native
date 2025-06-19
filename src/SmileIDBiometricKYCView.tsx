import React from 'react';
import type { HostComponent } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { BiometricKYCRequest } from './index';
import type { NativeProps } from './types/NativeProps';

const SmileIDBiometricKYCComponent = codegenNativeComponent<
  NativeProps<BiometricKYCRequest>
>('SmileIDBiometricKYCView') as HostComponent<NativeProps<BiometricKYCRequest>>;

const SmileIDBiometricKYCView: React.FC<BiometricKYCRequest> = (props) => {
  const { onResult, ...configProps } = props;
  const nativeProps: NativeProps<BiometricKYCRequest> = {
    config: configProps,
    onSmileIDResult: onResult,
    onSmileIDError: onResult,
  };

  return <SmileIDBiometricKYCComponent {...nativeProps} />;
};

export default SmileIDBiometricKYCView;
