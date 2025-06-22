import ExpoModulesCore
import UIKit
import SwiftUI
import SmileID

/**
 * Expo implementation of Consent using the new architecture
 */
class SmileIDExpoConsentView: SmileIDExpoView {
    
    var partnerName: String?
    var partnerPrivacyPolicy: String?
    var partnerIcon: String?
    var productName: String?
    
    override func renderContent() {
        let config = createConfig()
        
        // Use SmileIDExtReactNative to create the view
        let uiView = SmileID.RNConsent(
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
        config.partnerName = partnerName
        config.partnerPrivacyPolicy = partnerPrivacyPolicy
        config.logoResName = partnerIcon
        config.productName = productName
        config.showAttribution = showAttribution
        return config
    }
}