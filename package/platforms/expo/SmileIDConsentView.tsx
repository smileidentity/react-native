import type { ConsentRequest } from './index';
import { createSmileIDView } from './useSmileIDEvents';

const SmileIDConsentView = createSmileIDView<ConsentRequest>('SmileIDConsentView');

export default SmileIDConsentView;
