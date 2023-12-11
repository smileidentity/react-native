#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(SmileIDConsentViewManager, RCTViewManager)
RCT_EXTERN_METHOD(setParams:(nonnull NSNumber *)node params:(NSDictionary *)params)
@end
