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
        jobStatusResponse: SmartSelfieJobStatusResponse
    ) {
        let encoder = JSONEncoder()
        guard let jsonData = try? encoder.encode(jobStatusResponse) else {
            product.onResult?(["error": SmileIDError.unknown("SmileIDSmartSelfieEnrollmentView encoding error")])
            return
        }
        product.onResult?(["result": String(data: jsonData, encoding: .utf8)!])
    }

    func didError(error: Error) {
        product.onResult?(["error": error.localizedDescription])
    }
}
