import ExpoModulesCore
import UIKit
import SwiftUI
import SmileID

/**
 * Expo implementation of BiometricKYC using the new architecture
 */
class SmileIDExpoBiometricKYCView: SmileIDExpoView {
    
    var idInfo: [String: Any?]?
    var consentInformation: [String: Any?]?
    var allowNewEnroll: Bool = false
    var useStrictMode: Bool = false
    
    override func renderContent() {
        let config = createConfig()
        
        // Use SmileIDExtReactNative to create the view
        let uiView = SmileID.RNBiometricKYC(
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
        
        // Convert idInfo dictionary to IdInfo object
        if let idInfoDict = idInfo {
            config.idInfo = parseIdInfo(idInfoDict)
        }
        
        // Convert consentInformation dictionary to ConsentInfo object
        if let consentDict = consentInformation {
            config.consentInformation = parseConsentInfo(consentDict)
        }
        
        return config
    }
    
    private func parseIdInfo(_ dict: [String: Any?]) -> IdInfo {
        return IdInfo(
            country: dict["country"] as? String ?? "",
            idType: dict["idType"] as? String,
            idNumber: dict["idNumber"] as? String,
            firstName: dict["firstName"] as? String,
            middleName: dict["middleName"] as? String,
            lastName: dict["lastName"] as? String,
            dob: dict["dob"] as? String,
            bankCode: dict["bankCode"] as? String,
            entered: dict["entered"] as? Bool ?? true
        )
    }
    
    private func parseConsentInfo(_ dict: [String: Any?]) -> ConsentInfo {
        return ConsentInfo(
            isVerifiedProcess: dict["isVerifiedProcess"] as? Bool ?? false,
            name: dict["name"] as? String ?? "",
            otherConsents: dict["otherConsents"] as? [String] ?? []
        )
    }
}
