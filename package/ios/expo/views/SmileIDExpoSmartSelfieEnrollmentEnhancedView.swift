import ExpoModulesCore
import UIKit
import SwiftUI
import SmileID

/**
 * Expo implementation of SmartSelfieEnrollmentEnhanced using the new architecture
 */
class SmileIDExpoSmartSelfieEnrollmentEnhancedView: SmileIDExpoView {
    
    var allowNewEnroll: Bool = true
    
    override func renderContent() {
        let config = createConfig()
        
        // Use SmileIDExtReactNative to create the view
        let uiView = SmileID.RNSmartSelfieEnrollmentEnhanced(
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