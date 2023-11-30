//
//  SmileIDSmartSelfieEnrollmentViewWrapper.swift
//  react-native-smile-id
//
//  Created by Japhet Ndhlovu on 2023/11/30.
//

import Foundation

import SwiftUI
import SmileID

class SmileIDSmartSelfieEnrollmentViewWrapper: UIView , RNSmileIDDelegate {
    
    func didError(error: Error) {
        self.onResult?(["error": error.localizedDescription, "target": self.reactTag])
    }
    
    func didSucceed(selfieImage: URL, livenessImages: [URL], jobStatusResponse: SmartSelfieJobStatusResponse) {
        let encoder = JSONEncoder()
        let jsonData = try! encoder.encode(jobStatusResponse)
        self.onResult?(["result": (String(data: jsonData, encoding: .utf8)!), "target": self.reactTag])
    }
    
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
        let hostingController = UIHostingController(rootView: SmileIDSmartSelfieEnrollmentView(product: self.product))
        let hostingView = hostingController.view!
        hostingView.translatesAutoresizingMaskIntoConstraints = false
        addSubview(hostingView)
        hostingView.topAnchor.constraint(equalTo: self.topAnchor).isActive = true
        hostingView.leftAnchor.constraint(equalTo: self.leftAnchor).isActive = true
        hostingView.bottomAnchor.constraint(equalTo: self.bottomAnchor).isActive = true
        hostingView.rightAnchor.constraint(equalTo: self.rightAnchor).isActive = true
    }
    
    @objc public func setProduct(_ product:NSDictionary!) {
        if let userId = product["userId"] as? String {
            self.product.userId = userId
        }
        if let jobId = product["jobId"] as? String {
            self.product.jobId = jobId
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
    }
}
