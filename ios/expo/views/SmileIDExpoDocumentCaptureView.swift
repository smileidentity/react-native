import ExpoModulesCore
import UIKit
import SwiftUI
import SmileID

/**
 * Expo implementation of DocumentCapture using the new architecture
 */
class SmileIDExpoDocumentCaptureView: SmileIDExpoView {
    
    var isDocumentFrontSide: Bool = true
    var showConfirmation: Bool = true
    var allowGalleryUpload: Bool = false
    
    override func renderContent() {
        let config = createConfig()
        
        // Use SmileIDExtReactNative to create the view
        let uiView = SmileID.RNDocumentCapture(
            config: config,
            onResult: { [weak self] result in
                self?.handleResultCallback(result)
            }
        )
        
        // Use the base class helper to set the UIView
        setUIView(uiView)
    }
    
    private func createConfig() -> SmileIDViewConfig {
        var config = SmileIDViewConfig()
        config.userId = userId
        config.jobId = jobId
        config.allowAgentMode = allowAgentMode
        config.showInstructions = showInstructions
        config.showAttribution = showAttribution
        config.extraPartnerParams = extraPartnerParams
        config.isDocumentFrontSide = isDocumentFrontSide
        config.showConfirmation = showConfirmation
        config.allowGalleryUpload = allowGalleryUpload
        return config
    }
}