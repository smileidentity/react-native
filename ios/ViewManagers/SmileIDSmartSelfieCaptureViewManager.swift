import Foundation
import React
import SwiftUI
import SmileID

@objc(SmileIDSmartSelfieCaptureViewManager)
class SmileIDSmartSelfieCaptureViewManager: SmileIDBaseViewManager {
    override func getView() -> UIView {
        BaseSmileIDView(frame: .zero, contentView: AnyView(
            SmileIDSmartSelfieCaptureView(
                allowAgentMode: self.product.allowAgentMode ,
                viewModel: SelfieViewModel(isEnroll: false,
                                           userId: self.product.userId ?? generateUserId(),
                                           jobId: self.product.jobId ?? generateJobId(),
                                           allowNewEnroll: false,
                                           skipApiSubmission: true,
                                           extraPartnerParams: [ : ],
                                           localMetadata: LocalMetadata()), product: self.product)),
                        product: self.product)
    }
    
    @objc func setParams(_ node: NSNumber, params: NSDictionary) {
        /*  UI Updates on the Main Thread:async ensures that the UI update is scheduled to run on the next cycle of the run loop, preventing any potential blocking of the UI if the update were to take a noticeable amount of time
         */
        DispatchQueue.main.async {
            if let component = self.bridge.uiManager.view(forReactTag: node) as? BaseSmileIDView {
                self.product.allowAgentMode = params["allowAgentMode"] as? Bool ?? false
                self.product.userId = params["userId"] as? String
                self.product.jobId = params["jobId"] as? String
                self.product.showConfirmation = params["showConfirmation"] as? Bool ?? true
                self.product.onResult = params["onResult"] as? RCTBubblingEventBlock
            }
        }
    }
}
