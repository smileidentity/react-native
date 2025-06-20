import type { SmartSelfieAuthenticationRequest } from './index';
import { createSmileIDView } from './useSmileIDEvents';

const SmileIDSmartSelfieAuthenticationView = createSmileIDView<SmartSelfieAuthenticationRequest>('SmileIDSmartSelfieAuthenticationView');

export default SmileIDSmartSelfieAuthenticationView;
