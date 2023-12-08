import Foundation
import SmileID
import SwiftUI

struct SmileIDBiometricKYCView: View {
    @ObservedObject var product: SmileIDProductModel

    var body: some View {
        NavigationView {
            if let idInfo = product.idInfo {
                SmileID.biometricKycScreen(
                    idInfo: idInfo, // already validated in the SmileIDBiometricKYCViewManager
                    userId: product.userId ?? generateUserId(),
                    jobId: product.jobId ?? generateJobId(),
                    allowAgentMode: product.allowAgentMode,
                    showAttribution: product.showAttribution,
                    showInstructions: product.showInstructions,
                    extraPartnerParams: product.extraPartnerParams as [String: String],
                    delegate: self
                )
            } else {
                Text("An error has occured")
            }
        }.navigationViewStyle(StackNavigationViewStyle())
    }
}

extension SmileIDBiometricKYCView: BiometricKycResultDelegate {
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
