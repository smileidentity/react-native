#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RNSmileID, NSObject)
RCT_EXTERN_METHOD(initialize:(BOOL)useSandBox withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)
@end
