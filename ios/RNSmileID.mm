#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RNSmileID, NSObject)
RCT_EXTERN_METHOD(initialize:(BOOL)useSandBox withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(authenticate:(NSDictionary *)request withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(prepUpload:(NSDictionary *)request withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(upload:(NSString *)url request:(NSDictionary *)request withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(doEnhancedKyc:(NSDictionary *)request withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(doEnhancedKycAsync:(NSDictionary *)request withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getSmartSelfieJobStatus:(NSDictionary *)request withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getDocumentVerificationJobStatus:(NSDictionary *)request withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getBiometricKycJobStatus:(NSDictionary *)request withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getEnhancedDocumentVerificationJobStatus:(NSDictionary *)request withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getProductsConfig:(NSDictionary *)request withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getValidDocuments:(NSDictionary *)request withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getServicesWithResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)
@end
