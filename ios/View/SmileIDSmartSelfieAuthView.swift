import Foundation

import SmileID
import SwiftUI

struct SmileIDSmartSelfieAuthView: View {
    @ObservedObject var product : SmileIDProductModel
    var body: some View {
        NavigationView {
            SmileID.smartSelfieAuthenticationScreen(
                userId: product.userId ?? generateUserId(),
                jobId: product.jobId ?? generateJobId(),
                allowNewEnroll: product.allowNewEnroll,
                allowAgentMode: product.allowAgentMode,
                showAttribution: product.showAttribution,
                showInstructions: product.showInstructions,
                extraPartnerParams: product.extraPartnerParams as [String: String],
                delegate: self
            )
        }.navigationViewStyle(StackNavigationViewStyle())
    }
}

extension SmileIDSmartSelfieAuthView: SmartSelfieResultDelegate {
    func didSucceed(selfieImage: URL, livenessImages: [URL], apiResponse: SmartSelfieResponse?) {
        let encoder = JSONEncoder()
        var params: [String: Any] = [
            "selfie": selfieImage.absoluteString,
            "livenessImages": livenessImages,
        ]
        if let apiResponse = apiResponse {
            params["apiResponse"] = apiResponse
        }
        
        guard let jsonData = try? JSONSerialization.data(withJSONObject: params.toJSONCompatibleDictionary(), options: .prettyPrinted) else {
            product.onResult?(["error": SmileIDError.unknown("SmileIDSmartSelfieAuthView encoding error")])
            return
        }
        product.onResult?(["result": String(data: jsonData, encoding: .utf8)!])
    }
    
    
    func didError(error: Error) {
        product.onResult?(["error": error.localizedDescription])
    }
}
