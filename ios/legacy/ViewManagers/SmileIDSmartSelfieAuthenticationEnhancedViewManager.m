#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(SmileIDSmartSelfieAuthenticationEnhancedViewManager, RCTViewManager)
RCT_EXTERN_METHOD(setParams:(nonnull NSNumber *)node
                  commandId:(nonnull NSNumber *)commandId
                  params:(nonnull NSDictionary *)params)
RCT_EXTERN_METHOD(create:(nonnull NSNumber *)node params:(NSDictionary *)params)
RCT_EXPORT_VIEW_PROPERTY(onResult, RCTBubblingEventBlock);
@end
