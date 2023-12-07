import Foundation
import SwiftUI
import SmileID

struct SmileIDEnhancedDocumentVerificationView: View {
    @ObservedObject var product: SmileIDProductModel

    var body: some View {
        NavigationView {
            if let countryCode = product.countryCode {
                SmileID.enhancedDocumentVerificationScreen(
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
                Text("countryCode is required.")
            }
        }.navigationViewStyle(StackNavigationViewStyle())
    }
}

extension SmileIDEnhancedDocumentVerificationView: EnhancedDocumentVerificationResultDelegate {
    func didSucceed(
        selfie: URL,
        documentFrontImage: URL,
        documentBackImage: URL?,
        jobStatusResponse: EnhancedDocumentVerificationJobStatusResponse
    ) {
        let encoder = JSONEncoder()
        guard let jsonData = try? encoder.encode(jobStatusResponse) else {
            self.product.onResult?(["error": SmileIDError.unknown("SmileIDEnhancedDocumentVerificationView encoding error")])
            return
        }
        self.product.onResult?(["result": (String(data: jsonData, encoding: .utf8)!)])
    }

    func didError(error: Error) {
        self.product.onResult?(["error": error.localizedDescription])
    }
}
