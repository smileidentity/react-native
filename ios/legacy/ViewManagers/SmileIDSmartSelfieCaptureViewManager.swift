import Foundation
import React
import SmileID
import SwiftUI

@objc(SmileIDSmartSelfieCaptureViewManager)
class SmileIDSmartSelfieCaptureViewManager: SmileIDBaseViewManager {
    override func getView() -> UIView {
        BaseSmileIDView(frame: .zero, contentView: AnyView(
            SmileIDSmartSelfieCaptureView(
                viewModel: SelfieViewModel(isEnroll: false,
                                           userId: product.userId ?? generateUserId(),
                                           jobId: product.jobId ?? generateJobId(),
                                           allowNewEnroll: false,
                                           skipApiSubmission: true,
                                           extraPartnerParams: [:],
                                           localMetadata: LocalMetadata()), product: product, smileIDUIViewDelegate: self
            )),
        product: product)
    }

    @objc func setParams(_ node: NSNumber, commandId _: NSNumber, params: NSDictionary) {
        /*  UI Updates on the Main Thread:async ensures that the UI update is scheduled to run on the next cycle of the run loop, preventing any potential blocking of the UI if the update were to take a noticeable amount of time
         */
        DispatchQueue.main.async {
            if let component = self.bridge.uiManager.view(forReactTag: node) as? BaseSmileIDView {
                self.product.allowAgentMode = params["allowAgentMode"] as? Bool ?? false
                self.product.userId = params["userId"] as? String
                self.product.jobId = params["jobId"] as? String
                self.product.showConfirmation = params["showConfirmation"] as? Bool ?? true
                self.product.showInstructions = params["showInstructions"] as? Bool ?? true
                self.product.showAttribution = params["showAttribution"] as? Bool ?? true
                self.product.useStrictMode = params["useStrictMode"] as? Bool ?? false
                self.product.onResult = params["onResult"] as? RCTBubblingEventBlock
            }
        }
    }
}
