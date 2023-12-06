import Foundation
import SwiftUI
import SmileID

struct SmileIDEnhancedDocumentVerificationView : View {
    @ObservedObject var product: SmileIDProductModel
    
    var body: some View {
        NavigationView {
            if let countryCode = product.countryCode{
                SmileID.enhancedDocumentVerificationScreen(
                    userId: product.userId ?? generateUserId(),
                    jobId: product.jobId ?? generateJobId(),
                    countryCode: countryCode,
                    documentType: product.documentType,
                    idAspectRatio: product.idAspectRatio,
                    bypassSelfieCaptureWithFile:product.computedBypassSelfieCaptureWithFile,
                    captureBothSides: product.captureBothSides,
                    allowAgentMode: product.allowAgentMode,
                    allowGalleryUpload: product.allowGalleryUpload,
                    showInstructions: product.showInstructions,
                    showAttribution: product.showAttribution,
                    extraPartnerParams: product.extraPartnerParams,
                    delegate:self
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
