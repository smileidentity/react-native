import type { DocumentVerificationRequest } from './index';
import { createSmileIDView } from './useSmileIDEvents';

const SmileIDDocumentVerificationView = createSmileIDView<DocumentVerificationRequest>('SmileIDDocumentVerificationView');

export default SmileIDDocumentVerificationView;
