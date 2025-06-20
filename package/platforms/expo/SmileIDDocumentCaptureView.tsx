import type { DocumentVerificationRequest } from './index';
import { createSmileIDView } from './useSmileIDEvents';

const SmileIDDocumentCaptureView = createSmileIDView<DocumentVerificationRequest>('SmileIDDocumentCaptureView');

export default SmileIDDocumentCaptureView;
