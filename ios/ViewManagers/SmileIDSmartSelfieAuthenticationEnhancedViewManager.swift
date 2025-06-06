import Foundation
import React
import SwiftUI

@objc(SmileIDSmartSelfieAuthenticationEnhancedViewManager)
class SmileIDSmartSelfieAuthenticationEnhancedViewManager: SmileIDBaseViewManager {
    override func getView() -> UIView {
        BaseSmileIDView(frame: .zero,
                        contentView: AnyView(SmileIDSmartSelfieAuthEnhancedView(product:
                            product, smileIDUIViewDelegate: self)), product: product)
    }

    @objc func setParams(_ node: NSNumber, commandId _: NSNumber, params: NSDictionary) {
        /*  UI Updates on the Main Thread:async ensures that the UI update is scheduled to run on the next cycle
         of the run loop, preventing any potential blocking of the UI if the update were to take
          a noticeable amount of time
         */
        DispatchQueue.main.async {
            if let component = self.bridge.uiManager.view(forReactTag: node) as? BaseSmileIDView {
                self.product.extraPartnerParams = params["extraPartnerParams"] as? [String: String] ?? [:]
                self.product.userId = params["userId"] as? String
                self.product.allowNewEnroll = params["allowNewEnroll"] as? Bool ?? false
                self.product.showAttribution = params["showAttribution"] as? Bool ?? true
                self.product.showInstructions = params["showInstructions"] as? Bool ?? true
                self.product.skipApiSubmission = params["skipApiSubmission"] as? Bool ?? false
                self.product.onResult = params["onResult"] as? RCTDirectEventBlock
            }
        }
    }
}
