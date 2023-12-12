import Foundation
import React
import SmileID
import SwiftUI

@objc(SmileIDBiometricKYCViewManager)
class SmileIDBiometricKYCViewManager: SmileIDBaseViewManager {
    override func getView() -> UIView {
        SmileIDBiometricKYCView()
    }

    @objc func setParams(_ node: NSNumber, params: NSDictionary) {
        /*  UI Updates on the Main Thread:async ensures that the UI update is scheduled to run on the next cycle of the run loop, preventing any potential blocking of the UI if the update were to take a noticeable amount of time
         */
        DispatchQueue.main.async {
            if let component = self.bridge.uiManager.view(forReactTag: node) as? SmileIDBiometricKYCView {
                let onResult = params["onResult"] as? RCTDirectEventBlock
                guard let idInfo = params["idInfo"] as? NSDictionary else {
                    onResult?(["error": SmileIDError.unknown("idInfo is required to run Biometric KYC")])
                    return
                }
                component.product.extraPartnerParams = params["extraPartnerParams"] as? [String: String] ?? [:]
                component.product.userId = params["userId"] as? String
                component.product.jobId = params["jobId"] as? String
                component.product.allowAgentMode = params["allowAgentMode"] as? Bool ?? false
                component.product.showAttribution = params["showAttribution"] as? Bool ?? true
                component.product.showInstructions = params["showInstructions"] as? Bool ?? true
                component.product.idInfo = idInfo.toIdInfo()
                component.product.onResult = onResult
            }
        }
    }
}
