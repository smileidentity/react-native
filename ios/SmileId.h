
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNSmileIdSpec.h"

@interface SmileId : NSObject <NativeSmileIdSpec>
#else
#import <React/RCTBridgeModule.h>

@interface SmileId : NSObject <RCTBridgeModule>
#endif

@end
