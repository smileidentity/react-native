import Foundation

import SwiftUI
import SmileID

class SmileIDConsentViewWrapper: BaseSmileIDViewWrapper  {
    
    @objc public func setPartnerIcon(_ partnerIcon: String?) {
        self.product.partnerIcon = partnerIcon
    }
    
    @objc public func setPartnerName(_ partnerName: String?) {
        self.product.partnerName = partnerName
    }
    
    @objc public func setProductName(_ productName: String?) {
        self.product.productName = productName
    }
    
    @objc public func setPartnerPrivacyPolicy(_ partnerPrivacyPolicy: String?) {
        self.product.partnerPrivacyPolicy = partnerPrivacyPolicy
    }

    override func getView() -> AnyView {
        return AnyView(SmileIDConsentView(product: self.product))
    }
}
