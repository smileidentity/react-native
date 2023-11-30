#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(SmileIDSmartSelfieEnrollmentViewManager, RCTViewManager)
RCT_EXPORT_VIEW_PROPERTY(product, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(onResult, RCTDirectEventBlock);
@end
