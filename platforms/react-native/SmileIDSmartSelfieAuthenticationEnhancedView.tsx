import React from 'react';
import type { HostComponent } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { SmartSelfieAuthenticationEnhancedRequest } from './index';
import { useSmileIDView } from './useSmileIDView';

const SmileIDSmartSelfieAuthenticationEnhancedComponent =
  codegenNativeComponent<SmartSelfieAuthenticationEnhancedRequest>(
    'SmileIDSmartSelfieAuthenticationEnhancedView'
  ) as HostComponent<SmartSelfieAuthenticationEnhancedRequest>;

const SmileIDSmartSelfieAuthenticationEnhancedView: React.FC<
  SmartSelfieAuthenticationEnhancedRequest
> = (props) => {
  const viewRef = useSmileIDView(
    'SmileIDSmartSelfieAuthenticationEnhancedView',
    props
  );

  return (
    <SmileIDSmartSelfieAuthenticationEnhancedComponent
      ref={viewRef}
      {...props}
    />
  );
};

export default SmileIDSmartSelfieAuthenticationEnhancedView;
