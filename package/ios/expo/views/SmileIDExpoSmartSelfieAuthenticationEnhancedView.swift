import ExpoModulesCore
import UIKit
import SwiftUI
import SmileID

/**
 * Expo implementation of SmartSelfieAuthenticationEnhanced using the new architecture
 */
class SmileIDExpoSmartSelfieAuthenticationEnhancedView: SmileIDExpoView {
    
    var allowNewEnroll: Bool = false
    
    override func renderContent() {
        let config = createConfig()
        
        // Use SmileIDExtReactNative to create the view
        let uiView = SmileID.RNSmartSelfieAuthenticationEnhanced(
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
        config.allowNewEnroll = allowNewEnroll
        config.showInstructions = showInstructions
        config.skipApiSubmission = skipApiSubmission
        config.showAttribution = showAttribution
        config.extraPartnerParams = extraPartnerParams
        return config
    }
}