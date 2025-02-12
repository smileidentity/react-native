import React from 'react';
import { type HostComponent } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { SmartSelfieEnrollmentRequest } from './index';
import { useSmileIDView } from './useSmileIDView';

const SmileIDSmartSelfieEnrollmentComponent =
  codegenNativeComponent<SmartSelfieEnrollmentRequest>(
    'SmileIDSmartSelfieEnrollmentView'
  ) as HostComponent<SmartSelfieEnrollmentRequest>;

const SmileIDSmartSelfieEnrollmentView: React.FC<
  SmartSelfieEnrollmentRequest
> = (props) => {
  const viewRef = useSmileIDView('SmileIDSmartSelfieEnrollmentView', props);

  return <SmileIDSmartSelfieEnrollmentComponent ref={viewRef} {...props} />;
};

export default SmileIDSmartSelfieEnrollmentView;
