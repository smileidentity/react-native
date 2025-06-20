import type { SmartSelfieEnrollmentRequest } from './index';
import { createSmileIDView } from './useSmileIDEvents';

const SmileIDSmartSelfieCaptureView = createSmileIDView<SmartSelfieEnrollmentRequest>('SmileIDSmartSelfieCaptureView');

export default SmileIDSmartSelfieCaptureView;
