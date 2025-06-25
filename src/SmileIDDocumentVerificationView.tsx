import React from 'react';
import type { DocumentVerificationRequest } from './index';
import { useSmileIDView } from './useSmileIDView';
import SmileIDDocumentVerificationNativeView from './SmileIDDocumentVerificationNativeView';


const SmileIDDocumentVerificationView: React.FC<DocumentVerificationRequest> = (
  props
) => {
  const viewRef = useSmileIDView('SmileIDDocumentVerificationView', props);

  return <SmileIDDocumentVerificationNativeView ref={viewRef} {...props} />;
};

export default SmileIDDocumentVerificationView;
