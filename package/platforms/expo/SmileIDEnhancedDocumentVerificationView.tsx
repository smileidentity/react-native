import type { EnhancedDocumentVerificationRequest } from './index';
import { createSmileIDView } from './useSmileIDEvents';

const SmileIDEnhancedDocumentVerificationView = createSmileIDView<EnhancedDocumentVerificationRequest>('SmileIDEnhancedDocumentVerificationView');

export default SmileIDEnhancedDocumentVerificationView;
