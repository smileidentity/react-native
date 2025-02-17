import Foundation
import SmileID
import SwiftUI

struct SmileIDSmartSelfieAuthEnhancedView: View, SmileIDFileUtilsProtocol {
    var fileManager: FileManager = Foundation.FileManager.default
    @ObservedObject var product: SmileIDProductModel
    var smileIDUIViewDelegate: SmileIDUIViewDelegate
    var body: some View {
        NavigationView {
            SmileID.smartSelfieAuthenticationScreenEnhanced(
                userId: product.userId ?? generateUserId(),
                allowNewEnroll: product.allowNewEnroll,
                showAttribution: product.showAttribution,
                showInstructions: product.showInstructions,
                extraPartnerParams: product.extraPartnerParams as [String: String],
                delegate: self
            )
        }.navigationViewStyle(StackNavigationViewStyle())
    }
}

extension SmileIDSmartSelfieAuthEnhancedView: SmartSelfieResultDelegate {
    func didSucceed(selfieImage: URL, livenessImages: [URL], apiResponse: SmartSelfieResponse?) {
        var params: [String: Any] = [
            "selfieFile": getFilePath(fileName: selfieImage.absoluteString),
            "livenessFiles": livenessImages.map {
                getFilePath(fileName: $0.absoluteString)
            },
        ]
        if let apiResponse = apiResponse {
            params["apiResponse"] = apiResponse
        }

        guard let jsonData = try? JSONSerialization.data(withJSONObject: params.toJSONCompatibleDictionary(), options: .prettyPrinted) else {
            smileIDUIViewDelegate.onError(error: SmileIDError.unknown("SmileIDSmartSelfieAuthView encoding error"))
            return
        }
        smileIDUIViewDelegate.onResult(smileResult: String(data: jsonData, encoding: .utf8)!)
    }

    func didError(error: Error) {
        smileIDUIViewDelegate.onError(error: error.localizedDescription)
    }
}
