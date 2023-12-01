import Foundation
import SwiftUI
import SmileID

struct SmileIDDocumentVerificationView : View {
    @ObservedObject var product: SmileIDProductModel
    
    var body: some View {
        NavigationView {
            if let documentType = product.documentType {
                SmileID.documentVerificationScreen(
                    countryCode: documentType,
                    documentType: product.documentType,
                    captureBothSides: product.captureBothSides,
                    allowGalleryUpload: product.allowGalleryUpload,
                    delegate:product.delegate ?? self
                )
            }else{
                Text("Document type is required.")
            }
        }.navigationViewStyle(StackNavigationViewStyle())
    }
}

extension SmileIDDocumentVerificationView : DocumentVerificationResultDelegate {
    func didSucceed(
        selfie: URL,
        documentFrontImage: URL,
        documentBackImage: URL?,
        jobStatusResponse: DocumentVerificationJobStatusResponse
    ){
        print("SmileIDDocumentVerificationView didSucceed no delegate found")
    }
    
    
    func didError(error: Error){
        print("SmileIDDocumentVerificationView didError no delegate found")
    }
}
