import React from 'react';
import type { HostComponent } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { SmartSelfieEnrollmentEnhancedRequest } from './index';
import { useSmileIDView } from './useSmileIDView';

const SmileIDSmartSelfieEnrollmentEnhancedComponent =
  codegenNativeComponent<SmartSelfieEnrollmentEnhancedRequest>(
    'SmileIDSmartSelfieEnrollmentEnhancedView'
  ) as HostComponent<SmartSelfieEnrollmentEnhancedRequest>;

const SmileIDSmartSelfieEnrollmentEnhancedView: React.FC<
  SmartSelfieEnrollmentEnhancedRequest
> = (props) => {
  const viewRef = useSmileIDView(
    'SmileIDSmartSelfieEnrollmentEnhancedView',
    props
  );

  return (
    <SmileIDSmartSelfieEnrollmentEnhancedComponent ref={viewRef} {...props} />
  );
};

export default SmileIDSmartSelfieEnrollmentEnhancedView;
