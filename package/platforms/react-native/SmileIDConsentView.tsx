import type { ConsentRequest } from './index';
import { createSmileIDView } from './createSmileIDView';

const SmileIDConsentView = createSmileIDView<ConsentRequest>('SmileIDConsentView');

export default SmileIDConsentView;
