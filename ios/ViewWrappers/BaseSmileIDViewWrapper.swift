import Foundation

import SwiftUI
import SmileID

class BaseSmileIDViewWrapper: UIView ,RNSmileIDDelegate {
    func onConsentGranted() {
        self.onResult?(["result": true, "target": self.reactTag])
    }
    
    func didSucceed(selfie: URL, documentFrontImage: URL, documentBackImage: URL?, jobStatusResponse: DocumentVerificationJobStatusResponse) {
        let encoder = JSONEncoder()
        let jsonData = try! encoder.encode(jobStatusResponse)
        self.onResult?(["result": (String(data: jsonData, encoding: .utf8)!), "target": self.reactTag])
    }
    
    func didError(error: Error) {
        self.onResult?(["error": error.localizedDescription, "target": self.reactTag])
    }
    
    func didSucceed(selfieImage: URL, livenessImages: [URL], jobStatusResponse: SmartSelfieJobStatusResponse) {
        let encoder = JSONEncoder()
        let jsonData = try! encoder.encode(jobStatusResponse)
        self.onResult?(["result": (String(data: jsonData, encoding: .utf8)!), "target": self.reactTag])
    }
    typealias ContentView = AnyView
    
    var product = SmileIDProductModel()
    @objc var onResult: RCTDirectEventBlock?
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        commonInit()
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        commonInit()
    }
    
    private func commonInit() {
        // Perform initialization tasks here
        // For example, setup subviews, add constraints, configure appearance
        let hostingController = UIHostingController(rootView: getView())
        let hostingView = hostingController.view!
        hostingView.translatesAutoresizingMaskIntoConstraints = false
        addSubview(hostingView)
        hostingView.topAnchor.constraint(equalTo: self.topAnchor).isActive = true
        hostingView.leftAnchor.constraint(equalTo: self.leftAnchor).isActive = true
        hostingView.bottomAnchor.constraint(equalTo: self.bottomAnchor).isActive = true
        hostingView.rightAnchor.constraint(equalTo: self.rightAnchor).isActive = true
        self.product.delegate = self
    }
    
    @objc public func setProduct(_ product:NSDictionary!) {
        if let userId = product["userId"] as? String {
            self.product.userId = userId
        }
        if let jobId = product["jobId"] as? String {
            self.product.jobId = jobId
        }
        if let partnerIcon = product["partnerIcon"] as? String {
            self.product.partnerIcon = partnerIcon
        }
        if let partnerName = product["partnerName"] as? String {
            self.product.partnerName = partnerName
        }
        if let productName = product["productName"] as? String {
            self.product.productName = productName
        }
        if let partnerPrivacyPolicy = product["partnerPrivacyPolicy"] as? String {
            self.product.partnerPrivacyPolicy = partnerPrivacyPolicy
        }
        if let partnerPrivacyPolicy = product["partnerPrivacyPolicy"] as? String {
            self.product.partnerPrivacyPolicy = partnerPrivacyPolicy
        }
        if let allowAgentMode = product["allowAgentMode"] as? Bool {
            self.product.allowAgentMode = allowAgentMode
        }
        if let showAttribution = product["showAttribution"] as? Bool {
            self.product.showAttribution = showAttribution
        }
        if let showInstructions = product["showInstructions"] as? Bool {
            self.product.showInstructions = showInstructions
        }
        if let extraPartnerParams = product["extraPartnerParams"] as? NSDictionary {
            self.product.extraPartnerParams = extraPartnerParams
        }
        if let countryCode = product["countryCode"] as? String {
            self.product.countryCode = countryCode
        }
        if let documentType = product["documentType"] as? String {
            self.product.documentType = documentType
        }
        if let captureBothSides = product["captureBothSides"] as? Bool {
            self.product.captureBothSides = captureBothSides
        }
        if let allowGalleryUpload = product["allowGalleryUpload"] as? Bool {
            self.product.allowGalleryUpload = allowGalleryUpload
        }
    }
    
    func getView() -> AnyView {
        fatalError("Must be implemented by subclass")
    }
}
