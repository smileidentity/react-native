#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(SmileIDSmartSelfieAuthenticationViewManager, RCTViewManager)
RCT_EXPORT_VIEW_PROPERTY(userId, NSString);
RCT_EXPORT_VIEW_PROPERTY(jobId, NSString);
RCT_EXPORT_VIEW_PROPERTY(countryCode, NSString);
RCT_EXPORT_VIEW_PROPERTY(allowAgentMode, BOOL);
RCT_EXPORT_VIEW_PROPERTY(showAttribution, BOOL);
RCT_EXPORT_VIEW_PROPERTY(showInstructions, BOOL);
RCT_EXPORT_VIEW_PROPERTY(extraPartnerParams, NSDictionary);
RCT_EXPORT_VIEW_PROPERTY(onResult, RCTDirectEventBlock);
@end
