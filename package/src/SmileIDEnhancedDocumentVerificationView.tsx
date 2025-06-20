import type { EnhancedDocumentVerificationRequest } from './types';
import { createSmileIDView } from './createSmileIDView';

const SmileIDEnhancedDocumentVerificationView = createSmileIDView<EnhancedDocumentVerificationRequest>('SmileIDEnhancedDocumentVerificationView');

export default SmileIDEnhancedDocumentVerificationView;
