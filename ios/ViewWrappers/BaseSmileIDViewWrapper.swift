import Foundation

import SwiftUI
import SmileID

class BaseSmileIDViewWrapper: UIView {

    typealias ContentView = AnyView
    
    var product = SmileIDProductModel()
    
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
    }
    
    @objc public func setUserId(_ userId: String?) {
        self.product.userId = userId
    }
    
    @objc public func setJobId(_ jobId: String?) {
        self.product.jobId = jobId
    }
    
    @objc public func setAllowAgentMode(_ allowAgentMode: Bool) {
        self.product.allowAgentMode = allowAgentMode
    }
    
    @objc public func setShowAttribution(_ showAttribution: Bool) {
        self.product.showAttribution = showAttribution
    }
    
    @objc public func setShowInstructions(_ showInstructions: Bool) {
        self.product.showInstructions = showInstructions
    }
    
    @objc public func setExtraPartnerParams(_ extraPartnerParams: NSDictionary) {
        for (key, value) in extraPartnerParams {
            if let keyString = key as? String, let valueString = value as? String {
                self.product.extraPartnerParams[keyString] = valueString
            }
        }
    }
    
    @objc public func setCountryCode(_ countryCode: String?) {
        self.product.countryCode = countryCode
    }
    
    func getView() -> AnyView {
        fatalError("Must be implemented by subclass")
    }
}
