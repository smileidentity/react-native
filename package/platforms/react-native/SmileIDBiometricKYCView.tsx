import type { BiometricKYCRequest } from './index';
import { createSmileIDView } from './createSmileIDView';

const SmileIDBiometricKYCView = createSmileIDView<BiometricKYCRequest>('SmileIDBiometricKYCView');

export default SmileIDBiometricKYCView;
