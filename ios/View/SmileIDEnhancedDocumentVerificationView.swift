import Foundation
import SmileID
import SwiftUI

struct SmileIDEnhancedDocumentVerificationView: View, SmileIDFileUtilsProtocol {
    var fileManager: FileManager = Foundation.FileManager.default
    @ObservedObject var product: SmileIDProductModel
    var smileIDUIViewDelegate: SmileIDUIViewDelegate
    var body: some View {
        NavigationView {
            if let countryCode = product.countryCode, let consentInformation = product.consentInformation {
                SmileID.enhancedDocumentVerificationScreen(
                    userId: product.userId ?? generateUserId(),
                    jobId: product.jobId ?? generateJobId(),
                    allowNewEnroll: product.allowNewEnroll,
                    countryCode: countryCode, // already validated in the view manager
                    documentType: product.documentType,
                    idAspectRatio: product.idAspectRatio,
                    bypassSelfieCaptureWithFile: product.bypassSelfieCaptureWithFilePath,
                    captureBothSides: product.captureBothSides,
                    allowAgentMode: product.allowAgentMode,
                    allowGalleryUpload: product.allowGalleryUpload,
                    showInstructions: product.showInstructions,
                    skipApiSubmission: product.skipApiSubmission,
                    showAttribution: product.showAttribution,
                    useStrictMode: product.useStrictMode,
                    extraPartnerParams: product.extraPartnerParams as [String: String],
                    consentInformation: consentInformation,
                    delegate: self
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

extension SmileIDEnhancedDocumentVerificationView: EnhancedDocumentVerificationResultDelegate {
    func didSucceed(selfie: URL, documentFrontImage: URL, documentBackImage: URL?, didSubmitEnhancedDocVJob: Bool) {
        var params: [String: Any] = [
            "selfieFile": getFilePath(fileName: selfie.absoluteString),
            "documentFrontFile": getFilePath(fileName: documentFrontImage.absoluteString),
            "didSubmitEnhancedDocVJob": didSubmitEnhancedDocVJob,
        ]

        if let documentBackImage = documentBackImage {
            params["documentBackFile"] = getFilePath(fileName: documentBackImage.absoluteString)
        }

        guard let jsonData = try? JSONSerialization.data(withJSONObject: params.toJSONCompatibleDictionary(), options: .prettyPrinted) else {
            smileIDUIViewDelegate.onError(error: SmileIDError.unknown("SmileIDEnhancedDocumentVerificationView encoding error"))
            return
        }
        smileIDUIViewDelegate.onResult(smileResult: String(data: jsonData, encoding: .utf8)!)
    }

    func didError(error: Error) {
        smileIDUIViewDelegate.onError(error: error)
    }
}
