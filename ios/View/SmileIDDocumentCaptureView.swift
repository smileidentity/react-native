import Foundation
import SmileID
import SwiftUI

struct DocumentCaptureResult {
    let documentFile: URL? // Using URL to represent file paths in Swift

    init(documentFile: URL?) {
        self.documentFile = documentFile
    }
}

struct SmileIDDocumentCaptureView: View {
    @ObservedObject var product: SmileIDProductModel
    @State private var localMetadata = LocalMetadata()
    var smileIDUIViewDelegate: SmileIDUIViewDelegate
    var body: some View {
        NavigationView {
            DocumentCaptureScreen(
                side: self.product.front ? .front : .back,
                showInstructions: self.product.showInstructions,
                showAttribution: self.product.showAttribution,
                allowGallerySelection: self.product.allowGalleryUpload,
                showSkipButton: false,
                instructionsHeroImage: self.product.front ? SmileIDResourcesHelper.DocVFrontHero : SmileIDResourcesHelper.DocVBackHero,
                instructionsTitleText: SmileIDResourcesHelper.localizedString(
                    for: self.product.front ? "Instructions.Document.Front.Header" : "Instructions.Document.Back.Header"
                ),
                instructionsSubtitleText: SmileIDResourcesHelper.localizedString(
                    for: self.product.front ? "Instructions.Document.Front.Callout" : "Instructions.Document.Back.Callout"
                ),
                captureTitleText: SmileIDResourcesHelper.localizedString(for: "Action.TakePhoto"),
                knownIdAspectRatio: self.product.idAspectRatio,
                showConfirmation: self.product.showConfirmation,
                onConfirm: onConfirmed,
                onError: onError,
                onSkip: onSkip
            )
        }.navigationViewStyle(StackNavigationViewStyle()).environmentObject(localMetadata)
    }

    func onConfirmed(data: Data) {
        do {
            // Attempt to create the document file
            let url = try LocalStorage.createDocumentFile(
                jobId: product.jobId ?? generateJobId(),
                fileType: product.front ? FileType.documentFront : FileType.documentBack,
                document: data
            )

            // Create params dictionary
            var params: [String: Any] = [
                "documentFrontImage": product.front ? url.absoluteString : nil,
                "documentBackImage": product.front ? nil : url.absoluteString,
            ]

            // Convert params to JSON-compatible dictionary and serialize to JSON
            guard let jsonData = try? JSONSerialization.data(withJSONObject: params.toJSONCompatibleDictionary(), options: .prettyPrinted),
                  let jsonString = String(data: jsonData, encoding: .utf8)
            else {
                // If serialization fails, call the error handler
                smileIDUIViewDelegate.onError(error: SmileIDError.unknown("SmileIDDocumentCaptureView encoding error"))
                return
            }

            // Send the result as a JSON string
            smileIDUIViewDelegate.onResult(smileResult: jsonString)

        } catch {
            // Handle file creation error
          smileIDUIViewDelegate.onError(error: SmileIDError.unknown("Error creating document file: \(error.localizedDescription)"))
        }
    }

    func onError(error: Error) {
        smileIDUIViewDelegate.onError(error: error.localizedDescription)
    }

    func onSkip() {
        smileIDUIViewDelegate.onError(error: SmileIDError.unknown("SmileIDDocumentCaptureView skipped"))
    }
}
