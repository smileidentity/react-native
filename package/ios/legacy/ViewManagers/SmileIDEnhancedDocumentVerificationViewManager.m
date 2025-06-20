#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(SmileIDEnhancedDocumentVerificationViewManager, RCTViewManager)

// Expose the config property to React Native (inherited from base class)
RCT_EXPORT_VIEW_PROPERTY(config, NSDictionary)

// Export custom direct event types for results and errors
RCT_EXPORT_VIEW_PROPERTY(onSmileIDResult, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onSmileIDError, RCTDirectEventBlock)

@end
