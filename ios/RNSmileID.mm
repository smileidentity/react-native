#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RNSmileID, NSObject)
RCT_EXTERN_METHOD(initialize:(BOOL)useSandBox withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(doEnhancedKyc:(NSDictionary *)request withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(doEnhancedKycAsync:(NSDictionary *)request withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)
@end
