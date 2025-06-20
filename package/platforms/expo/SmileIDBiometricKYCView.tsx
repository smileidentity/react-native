import type { BiometricKYCRequest } from './index';
import { createSmileIDView } from './useSmileIDEvents';

const SmileIDBiometricKYCView = createSmileIDView<BiometricKYCRequest>('SmileIDBiometricKYCView');

export default SmileIDBiometricKYCView;
