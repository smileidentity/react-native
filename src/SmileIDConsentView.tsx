import React from 'react';
import type { HostComponent } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { ConsentRequest } from './index';
import { useSmileIDView } from './useSmileIDView';

const SmileIDConsentComponent = codegenNativeComponent<ConsentRequest>(
  'SmileIDConsentView'
) as HostComponent<ConsentRequest>;

const SmileIDConsentView: React.FC<ConsentRequest> = (props) => {
  const viewRef = useSmileIDView('SmileIDConsentView', props);

  return <SmileIDConsentComponent ref={viewRef} {...props} />;
};

export default SmileIDConsentView;
