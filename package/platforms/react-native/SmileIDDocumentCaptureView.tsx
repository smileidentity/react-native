import type { DocumentVerificationRequest } from './index';
import { createSmileIDView } from './createSmileIDView';

const SmileIDDocumentCaptureView = createSmileIDView<DocumentVerificationRequest>('SmileIDDocumentCaptureView');

export default SmileIDDocumentCaptureView;
