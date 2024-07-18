import Foundation

import SmileID
import SwiftUI

struct SmileIDBiometricKYCView: View {
    @ObservedObject var product : SmileIDProductModel
    var body: some View{
        NavigationView {
            if let idInfo = product.idInfo {
                SmileID.biometricKycScreen(
                    idInfo: idInfo, // already validated in the SmileIDBiometricKYCViewManager
                    userId: product.userId ?? generateUserId(),
                    jobId: product.jobId ?? generateJobId(),
                    allowNewEnroll: product.allowNewEnroll,
                    allowAgentMode: product.allowAgentMode,
                    showAttribution: product.showAttribution,
                    showInstructions: product.showInstructions,
                    extraPartnerParams: product.extraPartnerParams as [String: String],
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

extension SmileIDBiometricKYCView: BiometricKycResultDelegate {
    func didSucceed(selfieImage: URL, livenessImages: [URL], didSubmitBiometricJob: Bool) {

        let params: [String: Any] = [
            "selfieFile": selfieImage.absoluteString,
            "livenessFiles": livenessImages,
            "didSubmitBiometricKycJob": didSubmitBiometricJob,
        ]

        guard let jsonData = try? JSONSerialization.data(withJSONObject: params.toJSONCompatibleDictionary(), options: .prettyPrinted) else {
            product.onResult?(["error": SmileIDError.unknown("SmileIDBiometricKYCView encoding error")])
            return
        }
        product.onResult?(["result": String(data: jsonData, encoding: .utf8)!])
    }

    func didSucceed(
        selfieImage _: URL,
        livenessImages _: [URL],
        jobStatusResponse: BiometricKycJobStatusResponse
    ) {
        let encoder = JSONEncoder()
        let jsonData = try! encoder.encode(jobStatusResponse)
        product.onResult?(["result": String(data: jsonData, encoding: .utf8)!])
    }

    func didError(error: Error) {
        product.onResult?(["error": error.localizedDescription])
    }
}
