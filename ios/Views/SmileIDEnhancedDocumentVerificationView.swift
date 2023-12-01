import Foundation
import SwiftUI
import SmileID

struct SmileIDEnhancedDocumentVerificationView : View {
    @ObservedObject var product: SmileIDProductModel
    
    var body: some View {
        NavigationView {
            if let countryCode = product.countryCode{
                SmileID.enhancedDocumentVerificationScreen(
                    countryCode: countryCode,
                    documentType: product.documentType,
                    captureBothSides: product.captureBothSides,
                    allowGalleryUpload: product.allowGalleryUpload,
                    delegate:product.delegate ?? self
                )
            } else {
                Text("countryCode is required.")
            }
        }.navigationViewStyle(StackNavigationViewStyle())
    }
}

extension SmileIDEnhancedDocumentVerificationView : EnhancedDocumentVerificationResultDelegate {
    func didSucceed(
        selfie: URL,
        documentFrontImage: URL,
        documentBackImage: URL?,
        jobStatusResponse: EnhancedDocumentVerificationJobStatusResponse
    ){
        print("SmileIDEnhancedDocumentVerificationView didSucceed no delegate found")
    }
    
    
    func didError(error: Error){
        print("SmileIDEnhancedDocumentVerificationView didError no delegate found")
    }
}
