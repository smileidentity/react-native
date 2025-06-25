import React from 'react';
import { useSmileIDView } from './useSmileIDView';
import type { EnhancedDocumentVerificationRequest } from './types';
import SmileIDEnhancedDocumentVerificationNativeView from './SmileIDEnhancedDocumentVerificationNativeView';

const SmileIDEnhancedDocumentVerificationView: React.FC<
  EnhancedDocumentVerificationRequest
> = (props) => {
  const viewRef = useSmileIDView(
    'SmileIDEnhancedDocumentVerificationView',
    props
  );

  return (
    <SmileIDEnhancedDocumentVerificationNativeView ref={viewRef} {...props} />
  );
};

export default SmileIDEnhancedDocumentVerificationView;
