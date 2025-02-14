import React from 'react';
import type { HostComponent } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { BiometricKYCRequest } from './index';
import { useSmileIDView } from './useSmileIDView';

const defaultConsentInfo = {
  consentInformation: {
    timestamp: new Date().toISOString(),
  },
};

const SmileIDBiometricKYCComponent =
  codegenNativeComponent<BiometricKYCRequest>(
    'SmileIDBiometricKYCView'
  ) as HostComponent<BiometricKYCRequest>;

const SmileIDBiometricKYCView: React.FC<BiometricKYCRequest> = (props) => {
  const mergedProps = { ...defaultConsentInfo, ...props };
  const viewRef = useSmileIDView('SmileIDBiometricKYCView', mergedProps);

  return <SmileIDBiometricKYCComponent ref={viewRef} {...mergedProps} />;
};

export default SmileIDBiometricKYCView;
