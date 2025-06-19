import ExpoModulesCore
import UIKit
import SwiftUI
import SmileID

/**
 * Expo implementation of EnhancedDocumentVerification using the new architecture
 */
class SmileIDExpoEnhancedDocumentVerificationView: SmileIDExpoView {
    
    var countryCode: String?
    var documentType: String?
    var idAspectRatio: Double?
    var captureBothSides: Bool = true
    var bypassSelfieCaptureWithFile: String?
    var allowGalleryUpload: Bool = false
    var allowNewEnroll: Bool = false
    var useStrictMode: Bool = false
    var consentInformation: [String: Any?]?
    
    override func renderContent() {
        let config = createConfig()
        
        // Use SmileIDExtReactNative to create the view
        let uiView = SmileID.RNEnhancedDocumentVerification(
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
        config.useStrictMode = useStrictMode
        config.extraPartnerParams = extraPartnerParams
        config.countryCode = countryCode
        config.documentType = documentType
        if let aspectRatio = idAspectRatio {
            config.idAspectRatio = Float(aspectRatio)
        }
        config.captureBothSides = captureBothSides
        config.bypassSelfieCaptureWithFilePath = bypassSelfieCaptureWithFile
        config.allowGalleryUpload = allowGalleryUpload
        
        // Convert consentInformation dictionary to ConsentInfo object
        if let consentDict = consentInformation {
            config.consentInformation = parseConsentInfo(consentDict)
        }
        
        return config
    }
    
    private func parseConsentInfo(_ dict: [String: Any?]) -> ConsentInfo {
        return ConsentInfo(
            isVerifiedProcess: dict["isVerifiedProcess"] as? Bool ?? false,
            name: dict["name"] as? String ?? "",
            otherConsents: dict["otherConsents"] as? [String] ?? []
        )
    }
}