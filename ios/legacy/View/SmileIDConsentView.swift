import Foundation
import SmileID
import SwiftUI

struct SmileIDConsentView: View {
    @ObservedObject var product: SmileIDProductModel
    var onResult: RCTBubblingEventBlock?
    var smileIDUIViewDelegate: SmileIDUIViewDelegate
    var body: some View {
        NavigationView {
            if let partnerIcon = product.partnerIcon,
               let partnerName = product.partnerName,
               let productName = product.productName,
               let partnerPrivacyPolicy = product.partnerPrivacyPolicy,
               let uiImage = UIImage(named: partnerIcon, in: Bundle.main, compatibleWith: nil)
            {
                SmileID.consentScreen(
                    partnerIcon: uiImage,
                    partnerName: partnerName,
                    productName: productName,
                    partnerPrivacyPolicy: URL(string: partnerPrivacyPolicy)!,
                    showAttribution: true,
                    onConsentGranted: { _ in
                        DispatchQueue.main.async {
                            self.product.onResult?(["result": true])
                        }
                    },
                    onConsentDenied: {
                        DispatchQueue.main.async {
                            self.product.onResult?(["error": true])
                        }
                    }
                )
            } else {
                // This exists for debugging purposes and will show in extreme cases
                // when the params were not set NB: setParams in the viewmanager will always
                // return an error if the required data is missing
                Text("An error has occured")
            }
        }.navigationViewStyle(StackNavigationViewStyle())
    }
}
