import React from 'react';
import type { SmartSelfieEnrollmentRequest } from './index';
import { useSmileIDView } from './useSmileIDView';
import SmileIDSmartSelfieEnrollmentNativeView from './SmileIDSmartSelfieEnrollmentNativeView';

const SmileIDSmartSelfieEnrollmentView: React.FC<
  SmartSelfieEnrollmentRequest
> = (props) => {
  const viewRef = useSmileIDView('SmileIDSmartSelfieEnrollmentView', props);

  return <SmileIDSmartSelfieEnrollmentNativeView ref={viewRef} {...props} />;
};

export default SmileIDSmartSelfieEnrollmentView;
