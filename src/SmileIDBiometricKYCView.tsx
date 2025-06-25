import React from 'react';
import type { BiometricKYCRequest } from './index';
import { useSmileIDView } from './useSmileIDView';
import SmileIDBiometricKYCNativeView from './SmileIDBiometricKYCNativeView';

const SmileIDBiometricKYCView: React.FC<BiometricKYCRequest> = (props) => {
  const viewRef = useSmileIDView('SmileIDBiometricKYCView', props);

  return <SmileIDBiometricKYCNativeView ref={viewRef} {...props} />;
};

export default SmileIDBiometricKYCView;
