#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(SmileIDEnhancedDocumentVerificationViewManager, RCTViewManager)
RCT_EXPORT_VIEW_PROPERTY(userId, NSString);
RCT_EXPORT_VIEW_PROPERTY(jobId, NSString);
RCT_EXPORT_VIEW_PROPERTY(documentType, NSString);
RCT_EXPORT_VIEW_PROPERTY(bypassSelfieCaptureWithFile, NSString);
RCT_EXPORT_VIEW_PROPERTY(countryCode, NSString);
RCT_EXPORT_VIEW_PROPERTY(allowAgentMode, BOOL);
RCT_EXPORT_VIEW_PROPERTY(allowGalleryUpload, BOOL);
RCT_EXPORT_VIEW_PROPERTY(showAttribution, BOOL);
RCT_EXPORT_VIEW_PROPERTY(captureBothSides, BOOL);
RCT_EXPORT_VIEW_PROPERTY(showInstructions, BOOL);
RCT_EXPORT_VIEW_PROPERTY(extraPartnerParams, NSDictionary);
RCT_EXPORT_VIEW_PROPERTY(idInfo, NSDictionary);
RCT_EXPORT_VIEW_PROPERTY(onResult, RCTDirectEventBlock);
@end
