#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(SmileIDBiometricKYCViewManager, RCTViewManager)
RCT_EXPORT_VIEW_PROPERTY(userId, NSString)
RCT_EXPORT_VIEW_PROPERTY(allowAgentMode, BOOL)
@end
