import ExpoModulesCore
import UIKit
import SwiftUI
import SmileID

/**
 * Expo implementation of SmartSelfieCapture using the new architecture
 */
class SmileIDExpoSmartSelfieCaptureView: SmileIDExpoView {
    
    var showConfirmation: Bool = true
    var useStrictMode: Bool = false
    
    override func renderContent() {
        let config = createConfig()
        
        // Use SmileIDExtReactNative to create the view
        let uiView = SmileID.RNSmartSelfieCapture(
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
        config.showConfirmation = showConfirmation
        config.useStrictMode = useStrictMode
        // Always skip API submission for capture
        config.skipApiSubmission = true
        return config
    }
}