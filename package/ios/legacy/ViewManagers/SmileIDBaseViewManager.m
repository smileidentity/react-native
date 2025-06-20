#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(SmileIDBaseViewManager, RCTViewManager)

// Expose the config property to React Native
RCT_EXPORT_VIEW_PROPERTY(config, NSDictionary)

@end