import React from 'react';
import type { SmartSelfieEnrollmentRequest } from './index';
import { useSmileIDView } from './useSmileIDView';
import SmileIDSmartSelfieCaptureNativeView from './SmileIDSmartSelfieCaptureNativeView';


const SmileIDSmartSelfieCaptureView: React.FC<SmartSelfieEnrollmentRequest> = (
  props
) => {
  const viewRef = useSmileIDView('SmileIDSmartSelfieCaptureView', props);

  return <SmileIDSmartSelfieCaptureNativeView ref={viewRef} {...props} />;
};

export default SmileIDSmartSelfieCaptureView;
