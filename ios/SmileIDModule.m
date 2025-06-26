#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(SmileIDModule, NSObject)

RCT_EXTERN_METHOD(initialize:(NSDictionary *)config)

RCT_EXTERN_METHOD(getVersion:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)

@end
