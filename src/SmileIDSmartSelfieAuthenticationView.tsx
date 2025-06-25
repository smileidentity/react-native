import React from 'react';
import type { SmartSelfieAuthenticationRequest } from './index';
import { useSmileIDView } from './useSmileIDView';
import SmileIDSmartSelfieAuthenticationNativeView from './SmileIDSmartSelfieAuthenticationNativeView';


const SmileIDSmartSelfieAuthenticationView: React.FC<
  SmartSelfieAuthenticationRequest
> = (props) => {
  const viewRef = useSmileIDView('SmileIDSmartSelfieAuthenticationView', props);

  return (
    <SmileIDSmartSelfieAuthenticationNativeView ref={viewRef} {...props} />
  );
};

export default SmileIDSmartSelfieAuthenticationView;
