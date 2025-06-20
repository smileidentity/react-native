import type { DocumentVerificationRequest } from './index';
import { createSmileIDView } from './createSmileIDView';

const SmileIDDocumentVerificationView = createSmileIDView<DocumentVerificationRequest>('SmileIDDocumentVerificationView');

export default SmileIDDocumentVerificationView;
