import Foundation
import React
import SwiftUI
import SmileID

class SmileIDBaseViewManager: RCTViewManager {
    var config = SmileIDViewConfig()
    private var hostingController: UIHostingController<AnyView>?
    
    // Override in subclasses to provide the specific view
    func createView(config: SmileIDViewConfig, onResult: @escaping (SmileIDSharedResult<Any>) -> Void) -> AnyView {
        fatalError("Must be implemented by subclass")
    }
    
    override func view() -> UIView! {
        let containerView = UIView(frame: .zero)
        containerView.backgroundColor = .clear
        return containerView
    }
    
    // Match Android's getExportedCustomDirectEventTypeConstants
    override func customDirectEventTypes() -> [String: Any]! {
        return [
            "topSmileIDResult": ["registrationName": "onSmileIDResult"],
            "topSmileIDError": ["registrationName": "onSmileIDError"]
        ]
    }
    
    // Updated from customBubblingEventTypes to match new pattern
    override func customBubblingEventTypes() -> [String]! {
        return []
    }
    
    @objc override func constantsToExport() -> [AnyHashable: Any]! {
        return [:]
    }
    
    override static func requiresMainQueueSetup() -> Bool {
        return true
    }
    
    // Match Android's @ReactProp(name = "config") pattern
    // This method is called by React Native when the config prop changes
    @objc func setConfig(_ view: UIView, config configDict: NSDictionary?) {
        guard let configDict = configDict else { return }
        DispatchQueue.main.async { [weak self] in
            guard let self = self else { return }
            
            // Update configuration from dictionary
            if let userId = configDict["userId"] as? String {
                self.config.userId = userId
            }
            
            if let jobId = configDict["jobId"] as? String {
                self.config.jobId = jobId
            }
            
            if let allowAgentMode = configDict["allowAgentMode"] as? Bool {
                self.config.allowAgentMode = allowAgentMode
            }
            
            if let allowNewEnroll = configDict["allowNewEnroll"] as? Bool {
                self.config.allowNewEnroll = allowNewEnroll
            }
            
            if let showInstructions = configDict["showInstructions"] as? Bool {
                self.config.showInstructions = showInstructions
            }
            
            if let skipApiSubmission = configDict["skipApiSubmission"] as? Bool {
                self.config.skipApiSubmission = skipApiSubmission
            }
            
            if let showAttribution = configDict["showAttribution"] as? Bool {
                self.config.showAttribution = showAttribution
            }
            
            // Handle extraPartnerParams
            if let extraPartnerParams = configDict["extraPartnerParams"] as? [String: String] {
                self.config.extraPartnerParams = extraPartnerParams
            }
            
            // Document-specific props
            if let countryCode = configDict["countryCode"] as? String {
                self.config.countryCode = countryCode
            }
            
            if let documentType = configDict["documentType"] as? String {
                self.config.documentType = documentType
            }
            
            if let captureBothSides = configDict["captureBothSides"] as? Bool {
                self.config.captureBothSides = captureBothSides
            }
            
            if let allowGalleryUpload = configDict["allowGalleryUpload"] as? Bool {
                self.config.allowGalleryUpload = allowGalleryUpload
            }
            
            if let showConfirmation = configDict["showConfirmation"] as? Bool {
                self.config.showConfirmation = showConfirmation
            }
            
            if let idAspectRatio = configDict["idAspectRatio"] as? Double {
                self.config.idAspectRatio = Float(idAspectRatio)
            }
            
            if let isDocumentFrontSide = configDict["isDocumentFrontSide"] as? Bool {
                self.config.isDocumentFrontSide = isDocumentFrontSide
            }
            
            // Handle both property names for backward compatibility
            if let bypassPath = configDict["bypassSelfieCaptureWithFile"] as? String {
                self.config.bypassSelfieCaptureWithFilePath = bypassPath
            } else if let bypassPath = configDict["bypassSelfieCaptureWithFilePath"] as? String {
                self.config.bypassSelfieCaptureWithFilePath = bypassPath
            }
            
            // Capture-specific props
            if let useStrictMode = configDict["useStrictMode"] as? Bool {
                self.config.useStrictMode = useStrictMode
            }
            
            // Consent-specific props
            if let partnerName = configDict["partnerName"] as? String {
                self.config.partnerName = partnerName
            }
            
            if let partnerPrivacyPolicy = configDict["partnerPrivacyPolicy"] as? String {
                self.config.partnerPrivacyPolicy = partnerPrivacyPolicy
            }
            
            if let partnerIcon = configDict["partnerIcon"] as? String {
                self.config.logoResName = partnerIcon
            }
            
            if let productName = configDict["productName"] as? String {
                self.config.productName = productName
            }
            
            // KYC-specific props
            if let idInfo = configDict["idInfo"] as? [String: Any] {
                self.config.idInfo = self.parseIdInfo(idInfo)
            }
            
            if let consentInformation = configDict["consentInformation"] as? [String: Any] {
                self.config.consentInformation = self.parseConsentInfo(consentInformation)
            }
            
            // Update the view
            self.updateView(view)
        }
    }
    
    // Helper method to update view after configuration changes
    func updateView(_ containerView: UIView) {
        // Remove existing content
        containerView.subviews.forEach { $0.removeFromSuperview() }
        
        // Create new view with updated config
        let view = createView(config: config) { [weak self] result in
            self?.handleResult(result, containerView: containerView)
        }
        
        let hostingController = UIHostingController(rootView: view)
        hostingController.view.translatesAutoresizingMaskIntoConstraints = false
        containerView.addSubview(hostingController.view)
        
        NSLayoutConstraint.activate([
            hostingController.view.topAnchor.constraint(equalTo: containerView.topAnchor),
            hostingController.view.leadingAnchor.constraint(equalTo: containerView.leadingAnchor),
            hostingController.view.trailingAnchor.constraint(equalTo: containerView.trailingAnchor),
            hostingController.view.bottomAnchor.constraint(equalTo: containerView.bottomAnchor)
        ])
        
        self.hostingController = hostingController
    }
    
    // Handle result and emit events to React Native
    private func handleResult(_ result: SmileIDSharedResult<Any>, containerView: UIView) {
        guard let reactTag = containerView.reactTag else { return }
        
        switch result {
        case .success(let data):
            bridge.eventDispatcher().sendEvent(
                withName: "topSmileIDResult",
                body: [
                    "target": reactTag,
                    "result": data
                ]
            )
        case .error(let code, let message, _):
            bridge.eventDispatcher().sendEvent(
                withName: "topSmileIDError",
                body: [
                    "target": reactTag,
                    "error": ["code": code, "message": message]
                ]
            )
        case .withError(let error):
            bridge.eventDispatcher().sendEvent(
                withName: "topSmileIDError",
                body: [
                    "target": reactTag,
                    "error": error.localizedDescription
                ]
            )
        }
    }
    
    // Helper to parse IdInfo
    private func parseIdInfo(_ dict: [String: Any]) -> IdInfo {
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
    
    // Helper to parse ConsentInfo
    private func parseConsentInfo(_ dict: [String: Any]) -> ConsentInfo {
        return ConsentInfo(
            isVerifiedProcess: dict["isVerifiedProcess"] as? Bool ?? false,
            name: dict["name"] as? String ?? "",
            otherConsents: dict["otherConsents"] as? [String] ?? []
        )
    }
}
