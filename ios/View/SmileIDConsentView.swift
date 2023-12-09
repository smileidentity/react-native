import Foundation

import SmileID
import SwiftUI

class SmileIDConsentView: BaseSmileIDView {
    override func getView() -> AnyView {
        AnyView(NavigationView {
            if let partnerIcon = product.partnerIcon,
               let partnerName = product.partnerName,
               let productName = product.productName,
               let partnerPrivacyPolicy = product.partnerPrivacyPolicy {
                SmileID.consentScreen(
                    partnerIcon: UIImage(named: partnerIcon)!,
                    partnerName: partnerName,
                    productName: productName,
                    partnerPrivacyPolicy: URL(string: partnerPrivacyPolicy)!,
                    showAttribution: true,
                    onConsentGranted: {
                        self.product.onResult?(["result": true])
                    },
                    onConsentDenied: {
                        self.product.onResult?(["error": SmileIDError.consentDenied])
                    }
                )
            } else {
                Text("An error has occured")
            }
        }.navigationViewStyle(StackNavigationViewStyle()))
    }
}
