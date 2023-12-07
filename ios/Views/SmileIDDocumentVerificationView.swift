import Foundation
import SwiftUI
import SmileID

struct SmileIDDocumentVerificationView: View {
    @ObservedObject var product: SmileIDProductModel

    var body: some View {
        NavigationView {
            if let countryCode = product.countryCode {
                SmileID.documentVerificationScreen(
                    userId: product.userId ?? generateUserId(),
                    jobId: product.jobId ?? generateJobId(),
                    countryCode: countryCode,
                    documentType: product.documentType,
                    idAspectRatio: product.idAspectRatio,
                    bypassSelfieCaptureWithFile: product.computedBypassSelfieCaptureWithFile,
                    captureBothSides: product.captureBothSides,
                    allowAgentMode: product.allowAgentMode,
                    allowGalleryUpload: product.allowGalleryUpload,
                    showInstructions: product.showInstructions,
                    showAttribution: product.showAttribution,
                    extraPartnerParams: product.extraPartnerParams,
                    delegate: self
                )
            } else {
                Text("Document type is required.")
            }
        }.navigationViewStyle(StackNavigationViewStyle())
    }
}

extension SmileIDDocumentVerificationView: DocumentVerificationResultDelegate {
    func didSucceed(
        selfie: URL,
        documentFrontImage: URL,
        documentBackImage: URL?,
        jobStatusResponse: DocumentVerificationJobStatusResponse
    ) {
        let encoder = JSONEncoder()
        guard let jsonData = try? encoder.encode(jobStatusResponse) else {
            self.product.onResult?(["error": SmileIDError.unknown("SmileIDDocumentVerificationView encoding error")])
            return
        }
        self.product.onResult?(["result": (String(data: jsonData, encoding: .utf8)!)])
    }

    func didError(error: Error) {
        self.product.onResult?(["error": error.localizedDescription])
    }
}
