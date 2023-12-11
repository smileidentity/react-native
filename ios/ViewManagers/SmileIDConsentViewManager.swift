import Foundation
import React
import SmileID
import SwiftUI

@objc(SmileIDConsentViewManager)
class SmileIDConsentViewManager: SmileIDBaseViewManager {
    override func getView() -> UIView {
        SmileIDConsentView()
    }

    @objc func setParams(_ node: NSNumber, params: NSDictionary) {
        DispatchQueue.main.async {
            if let component = self.bridge.uiManager.view(forReactTag: node) as? SmileIDConsentView {
                let onResult = params["onResult"] as? RCTDirectEventBlock
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
                component.product.partnerIcon = partnerIcon
                component.product.partnerName = partnerName
                component.product.productName = productName
                component.product.partnerPrivacyPolicy = partnerPrivacyPolicyUrl
                component.product.showAttribution = params["showAttribution"] as? Bool ?? true
                component.product.onResult = params["onResult"] as? RCTDirectEventBlock
            }
        }
    }
}
