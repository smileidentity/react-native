import React from 'react';
import { type HostComponent } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { SmartSelfieAuthenticationRequest } from './index';
import { useSmileIDView } from './useSmileIDView';

const SmileIDSmartSelfieAuthenticationComponent =
  codegenNativeComponent<SmartSelfieAuthenticationRequest>(
    'SmileIDSmartSelfieAuthenticationView'
  ) as HostComponent<SmartSelfieAuthenticationRequest>;

const SmileIDSmartSelfieAuthenticationView: React.FC<
  SmartSelfieAuthenticationRequest
> = (props) => {
  const viewRef = useSmileIDView('SmileIDSmartSelfieAuthenticationView', props);

  return <SmileIDSmartSelfieAuthenticationComponent ref={viewRef} {...props} />;
};

export default SmileIDSmartSelfieAuthenticationView;
