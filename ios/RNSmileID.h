
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNSmileIdSpec.h"

@interface RNSmileID : NSObject <NativeSmileIdSpec>
#else
#import <React/RCTBridgeModule.h>

@interface RNSmileID : NSObject <RCTBridgeModule>
#endif

@end
