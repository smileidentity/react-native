import React from 'react';
import type { HostComponent } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { SmartSelfieEnrollmentRequest } from './index';
import { useSmileIDView } from './useSmileIDView';

const SmileIDSmartSelfieCaptureComponent =
  codegenNativeComponent<SmartSelfieEnrollmentRequest>(
    'SmileIDSmartSelfieCaptureView'
  ) as HostComponent<SmartSelfieEnrollmentRequest>;

const SmileIDSmartSelfieCaptureView: React.FC<SmartSelfieEnrollmentRequest> = (
  props
) => {
  const viewRef = useSmileIDView('SmileIDSmartSelfieCaptureView', props);

  return <SmileIDSmartSelfieCaptureComponent ref={viewRef} {...props} />;
};

export default SmileIDSmartSelfieCaptureView;
