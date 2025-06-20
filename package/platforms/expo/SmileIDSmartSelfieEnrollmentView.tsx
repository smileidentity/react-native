import type { SmartSelfieEnrollmentRequest } from './index';
import { createSmileIDView } from './useSmileIDEvents';

const SmileIDSmartSelfieEnrollmentView = createSmileIDView<SmartSelfieEnrollmentRequest>('SmileIDSmartSelfieEnrollmentView');

export default SmileIDSmartSelfieEnrollmentView;
