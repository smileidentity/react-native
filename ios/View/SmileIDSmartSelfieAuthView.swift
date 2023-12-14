import Foundation

import SmileID
import SwiftUI

class SmileIDSmartSelfieAuthView: BaseSmileIDView {
    override func getView() -> AnyView {
        AnyView(NavigationView {
            SmileID.smartSelfieAuthenticationScreen(
                userId: product.userId ?? generateUserId(),
                jobId: product.jobId ?? generateJobId(),
                allowAgentMode: product.allowAgentMode,
                showAttribution: product.showAttribution,
                showInstructions: product.showInstructions,
                extraPartnerParams: product.extraPartnerParams as [String: String],
                delegate: self
            )
        }.navigationViewStyle(StackNavigationViewStyle()))
    }
}

extension SmileIDSmartSelfieAuthView: SmartSelfieResultDelegate {
    func didSucceed(
        selfieImage _: URL,
        livenessImages _: [URL],
        jobStatusResponse: SmartSelfieJobStatusResponse
    ) {
        let encoder = JSONEncoder()
        guard let jsonData = try? encoder.encode(jobStatusResponse) else {
            product.onResult?(["error": SmileIDError.unknown("SmileIDSmartSelfieAuthView encoding error")])
            return
        }
        product.onResult?(["result": String(data: jsonData, encoding: .utf8)!])
    }

    func didError(error: Error) {
        product.onResult?(["error": error.localizedDescription])
    }
}
