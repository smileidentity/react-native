import React from 'react';
import type { SmartSelfieEnrollmentEnhancedRequest } from './index';
import { useSmileIDView } from './useSmileIDView';
import SmileIDSmartSelfieEnrollmentEnhancedNativeView from './SmileIDSmartSelfieEnrollmentEnhancedNativeView';


const SmileIDSmartSelfieEnrollmentEnhancedView: React.FC<
  SmartSelfieEnrollmentEnhancedRequest
> = (props) => {
  const viewRef = useSmileIDView(
    'SmileIDSmartSelfieEnrollmentEnhancedView',
    props
  );

  return (
    <SmileIDSmartSelfieEnrollmentEnhancedNativeView ref={viewRef} {...props} />
  );
};

export default SmileIDSmartSelfieEnrollmentEnhancedView;
