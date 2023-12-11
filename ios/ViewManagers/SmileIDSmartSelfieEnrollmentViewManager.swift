import Foundation
import React
import SwiftUI

@objc(SmileIDSmartSelfieEnrollmentViewManager)
class SmileIDSmartSelfieEnrollmentViewManager: SmileIDBaseViewManager {
    override func getView() -> UIView {
        SmileIDSmartSelfieEnrollmentView()
    }

    @objc func setParams(_ node: NSNumber, params: NSDictionary) {
        DispatchQueue.main.async {
            if let component = self.bridge.uiManager.view(forReactTag: node) as? SmileIDSmartSelfieEnrollmentView {
                component.product.extraPartnerParams = params["extraPartnerParams"] as? [String: String] ?? [:]
                component.product.userId = params["userId"] as? String
                component.product.jobId = params["jobId"] as? String
                component.product.allowAgentMode = params["allowAgentMode"] as? Bool ?? false
                component.product.showAttribution = params["showAttribution"] as? Bool ?? true
                component.product.showInstructions = params["showInstructions"] as? Bool ?? true
                component.product.onResult = params["onResult"] as? RCTDirectEventBlock
            }
        }
    }
}
