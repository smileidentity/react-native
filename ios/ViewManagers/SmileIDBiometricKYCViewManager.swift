import Foundation
import React
import SmileID
import SwiftUI

@objc(SmileIDBiometricKYCViewManager)
class SmileIDBiometricKYCViewManager: SmileIDBaseViewManager {
    override func getView() -> UIView {
        BaseSmileIDView(frame: .zero, contentView: AnyView(SmileIDBiometricKYCView(product: self.product)))
    }

    @objc func setParams(_ node: NSNumber, params: NSDictionary) {
        /*  UI Updates on the Main Thread:async ensures that the UI update is scheduled to run on the next cycle of the run loop, preventing any potential blocking of the UI if the update were to take a noticeable amount of time
         */
        DispatchQueue.main.async {
            if let component = self.bridge.uiManager.view(forReactTag: node) as? BaseSmileIDView {
                let onResult = params["onResult"] as? RCTDirectEventBlock
                guard let idInfo = params["idInfo"] as? NSDictionary else {
                    onResult?(["error": SmileIDError.unknown("idInfo is required to run Biometric KYC")])
                    return
                }
                self.product.extraPartnerParams = params["extraPartnerParams"] as? [String: String] ?? [:]
                self.product.userId = params["userId"] as? String
                self.product.jobId = params["jobId"] as? String
                self.product.allowAgentMode = params["allowAgentMode"] as? Bool ?? false
                self.product.showAttribution = params["showAttribution"] as? Bool ?? true
                self.product.showInstructions = params["showInstructions"] as? Bool ?? true
                self.product.idInfo = idInfo.toIdInfo()
                self.product.onResult = onResult
            }
        }
    }
}
