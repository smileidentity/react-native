import React from 'react';
import type { HostComponent } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { BiometricKYCRequest } from './index';
import { useSmileIDView } from './useSmileIDView';

const SmileIDBiometricKYCComponent =
  codegenNativeComponent<BiometricKYCRequest>(
    'SmileIDBiometricKYCView'
  ) as HostComponent<BiometricKYCRequest>;

const SmileIDBiometricKYCView: React.FC<BiometricKYCRequest> = (props) => {
  const viewRef = useSmileIDView('SmileIDBiometricKYCView', props);

  return <SmileIDBiometricKYCComponent ref={viewRef} {...props} />;
};

export default SmileIDBiometricKYCView;
