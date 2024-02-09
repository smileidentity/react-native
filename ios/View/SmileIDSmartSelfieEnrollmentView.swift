import Foundation

import SmileID
import SwiftUI

struct SmileIDSmartSelfieEnrollmentView: View {
    @ObservedObject var product : SmileIDProductModel
    var body: some View {
        NavigationView {
            SmileID.smartSelfieEnrollmentScreen(
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

extension SmileIDSmartSelfieEnrollmentView: SmartSelfieResultDelegate {
    func didSucceed(
        selfieImage _: URL,
        livenessImages _: [URL],
        jobStatusResponse: SmartSelfieJobStatusResponse?
    ) {
        let encoder = JSONEncoder()
        let jsonData: String
        if let jobStatusResponse {
            guard let encodedJsonData = try? encoder.encode(jobStatusResponse) else {
                product.onResult?(
                    ["error": SmileIDError.unknown("SmileIDSmartSelfieEnrollmentView encoding error")]
                )
                return
            }
            jsonData = String(data: encodedJsonData, encoding: .utf8)!
        } else {
            jsonData = "null"
        }
        product.onResult?(["result": jsonData])
    }

    func didError(error: Error) {
        product.onResult?(["error": error.localizedDescription])
    }
}
