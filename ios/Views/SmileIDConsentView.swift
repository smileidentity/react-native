import Foundation
import SwiftUI
import SmileID

struct SmileIDConsentView: View {
    @ObservedObject var product: SmileIDProductModel
    var reactTag: NSNumber = -1

    var body: some View {
        NavigationView {
            if let partnerIcon = product.partnerIcon,
               let partnerName = product.partnerName,
               let productName = product.productName,
               let partnerPrivacyPolicy = product.productName {
                SmileID.consentScreen(
                    partnerIcon: UIImage(named: partnerIcon)!,
                    partnerName: partnerName,
                    productName: productName,
                    partnerPrivacyPolicy: URL(string: partnerPrivacyPolicy)!,
                    showAttribution: true,
                    onConsentGranted: {
                        self.product.onResult?(["result": true, "target": self.reactTag])
                    },
                    onConsentDenied: {
                        self.product.onResult?(["error": SmileIDError.consentDenied, "target": self.reactTag])
                    }
                )
            } else {
                Text("countryCode is required.")
            }
        }.navigationViewStyle(StackNavigationViewStyle())
    }
}
