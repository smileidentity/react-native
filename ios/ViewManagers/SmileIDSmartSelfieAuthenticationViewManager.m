#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(SmileIDSmartSelfieAuthenticationViewManager, RCTViewManager)
RCT_EXTERN_METHOD(setParams:(nonnull NSNumber *)node params:(NSDictionary *)params)
RCT_EXPORT_VIEW_PROPERTY(onResult, RCTBubblingEventBlock);
@end
