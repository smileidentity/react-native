import React from 'react';
import type { SmartSelfieEnrollmentRequest } from './index';
import { useSmileIDView } from './useSmileIDView';
import SmileIDDocumentCaptureNativeView from './SmileIDDocumentCaptureNativeView';

const SmileIDDocumentCaptureView: React.FC<SmartSelfieEnrollmentRequest> = (
  props
) => {
  const viewRef = useSmileIDView('SmileIDDocumentCaptureView', props);

  return <SmileIDDocumentCaptureNativeView ref={viewRef} {...props} />;
};

export default SmileIDDocumentCaptureView;
