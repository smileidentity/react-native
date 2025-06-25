import React from 'react';
import type { SmartSelfieAuthenticationEnhancedRequest } from './index';
import { useSmileIDView } from './useSmileIDView';
import SmileIDSmartSelfieAuthenticationEnhancedNativeView from './SmileIDSmartSelfieAuthenticationEnhancedNativeView';


const SmileIDSmartSelfieAuthenticationEnhancedView: React.FC<
  SmartSelfieAuthenticationEnhancedRequest
> = (props) => {
  const viewRef = useSmileIDView(
    'SmileIDSmartSelfieAuthenticationEnhancedView',
    props
  );

  return (
    <SmileIDSmartSelfieAuthenticationEnhancedNativeView
      ref={viewRef}
      {...props}
    />
  );
};

export default SmileIDSmartSelfieAuthenticationEnhancedView;
