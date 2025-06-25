import React from 'react';
import type { ConsentRequest } from './index';
import { useSmileIDView } from './useSmileIDView';
import SmileIDConsentNativeView from './SmileIDConsentNativeView';

const SmileIDConsentView: React.FC<ConsentRequest> = (props) => {
  const viewRef = useSmileIDView('SmileIDConsentView', props);

  return <SmileIDConsentNativeView ref={viewRef} {...props} />;
};

export default SmileIDConsentView;
