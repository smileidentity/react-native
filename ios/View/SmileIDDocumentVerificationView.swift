import Foundation

import SmileID
import SwiftUI

struct SmileIDDocumentVerificationView: View {
    @ObservedObject var product : SmileIDProductModel
    var body : some View {
        AnyView(NavigationView {
            if let countryCode = product.countryCode {
                SmileID.documentVerificationScreen(
                    userId: product.userId ?? generateUserId(),
                    jobId: product.jobId ?? generateJobId(),
                    countryCode: countryCode, // already validated in SmileIDDocumentVerificationViewManager
                    documentType: product.documentType,
                    idAspectRatio: product.idAspectRatio,
                    bypassSelfieCaptureWithFile: product.bypassSelfieCaptureWithFilePath,
                    captureBothSides: product.captureBothSides,
                    allowAgentMode: product.allowAgentMode,
                    allowGalleryUpload: product.allowGalleryUpload,
                    showInstructions: product.showInstructions,
                    showAttribution: product.showAttribution,
                    extraPartnerParams: product.extraPartnerParams as [String: String],
                    delegate: self
                )
            } else {
                // This exists for debugging purposes and will show in extreme cases
                // when the params were not set NB: setParams in the viewmanager will always
                // return an error if the required data is missing
                Text("An error has occured")
            }
        }.navigationViewStyle(StackNavigationViewStyle()))
    }
}

extension SmileIDDocumentVerificationView: DocumentVerificationResultDelegate {
    func didSucceed(
        selfie _: URL,
        documentFrontImage _: URL,
        documentBackImage _: URL?,
        jobStatusResponse: DocumentVerificationJobStatusResponse
    ) {
        let encoder = JSONEncoder()
        guard let jsonData = try? encoder.encode(jobStatusResponse) else {
            product.onResult?(["error": SmileIDError.unknown("SmileIDDocumentVerificationView encoding error")])
            return
        }
        product.onResult?(["result": String(data: jsonData, encoding: .utf8)!])
    }
    
    func didError(error: Error) {
        product.onResult?(["error": error.localizedDescription])
    }
}
