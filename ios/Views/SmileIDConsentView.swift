import Foundation
import SwiftUI
import SmileID

struct SmileIDConsentView : View {
    @ObservedObject var product: SmileIDProductModel
    
    var body: some View {
        NavigationView {
            if let partnerIcon = product.partnerIcon ,
               let partnerName = product.partnerName ,
               let productName = product.productName ,
               let partnerPrivacyPolicy = product.productName {
                SmileID.consentScreen(
                    partnerIcon: UIImage(named: partnerIcon)!,
                    partnerName: partnerName,
                    productName: productName,
                    partnerPrivacyPolicy: URL(string: partnerPrivacyPolicy)!,
                    showAttribution: true,
                    onConsentGranted: {product.delegate?.onConsentGranted()},
                    onConsentDenied: { product.delegate?.didError(error: SmileIDError.consentDenied) }
                )
            } else {
                Text("countryCode is required.")
            }
        }.navigationViewStyle(StackNavigationViewStyle())
    }
}
