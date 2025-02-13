import Foundation
import React
import SmileID
import SwiftUI

@objc(SmileIDConsentViewManager)
class SmileIDConsentViewManager: SmileIDBaseViewManager {
    override func getView() -> UIView {
         BaseSmileIDView(frame: .zero, contentView: AnyView(SmileIDConsentView(product: self.product)),product:self.product)
    }

  @objc func setParams(_ node: NSNumber, commandId: NSNumber, params: NSDictionary) {
        /*  UI Updates on the Main Thread:async ensures that the UI update is scheduled to run on the next cycle of the run loop, preventing any potential blocking of the UI if the update were to take a noticeable amount of time
         */
        DispatchQueue.main.async {
            if let component = self.bridge.uiManager.view(forReactTag: node) as? BaseSmileIDView {
                let onResult = params["onResult"] as? RCTBubblingEventBlock
                guard let partnerIcon = params["partnerIcon"] as? String else {
                    onResult?(["error": SmileIDError.unknown("partnerIcon is required to run show consent screen")])
                    return
                }
                guard let partnerName = params["partnerName"] as? String else {
                    onResult?(["error": SmileIDError.unknown("partnerName is required to run show consent screen")])
                    return
                }
                guard let productName = params["productName"] as? String else {
                    onResult?(["error": SmileIDError.unknown("productName is required to run show consent screen")])
                    return
                }
                guard let partnerPrivacyPolicyUrl = params["partnerPrivacyPolicy"] as? String else {
                    onResult?(["error": SmileIDError.unknown("partnerPrivacyPolicy is required to run show consent screen")])
                    return
                }
                if !partnerPrivacyPolicyUrl.isValidUrl() {
                    onResult?(["error": SmileIDError.unknown("partnerPrivacyPolicy must be a valid url")])
                    return
                }
                self.product.onResult = onResult
                self.product.partnerIcon = partnerIcon
                self.product.partnerName = partnerName
                self.product.productName = productName
                self.product.partnerPrivacyPolicy = partnerPrivacyPolicyUrl
                self.product.showAttribution = params["showAttribution"] as? Bool ?? true
            }
        }
    }
}
