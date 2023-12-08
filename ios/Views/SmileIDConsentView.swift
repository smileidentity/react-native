import Foundation
import SmileID
import SwiftUI

struct SmileIDConsentView: View {
    @ObservedObject var product: SmileIDProductModel

    var body: some View {
        NavigationView {
            if let partnerIcon = product.partnerIcon,
               let partnerName = product.partnerName,
               let productName = product.productName,
               let partnerPrivacyPolicy = product.partnerPrivacyPolicy
            {
                SmileID.consentScreen(
                    partnerIcon: UIImage(named: partnerIcon)!,
                    partnerName: partnerName,
                    productName: productName,
                    partnerPrivacyPolicy: URL(string: partnerPrivacyPolicy)!,
                    showAttribution: true,
                    onConsentGranted: {
                        product.onResult?(["result": true])
                    },
                    onConsentDenied: {
                        product.onResult?(["error": SmileIDError.consentDenied])
                    }
                )
            } else {
                Text("An error has occured")
            }
        }.navigationViewStyle(StackNavigationViewStyle())
    }
}
