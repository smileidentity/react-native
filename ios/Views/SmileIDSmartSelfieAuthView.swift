import Foundation
import SwiftUI
import SmileID

struct SmileIDSmartSelfieAuthView: View {
    @ObservedObject var product: SmileIDProductModel

    var body: some View {
        NavigationView {
            SmileID.smartSelfieAuthenticationScreen(
                userId: product.userId ?? generateUserId(),
                jobId: product.jobId ?? generateJobId(),
                allowAgentMode: product.allowAgentMode,
                showAttribution: product.showAttribution,
                showInstructions: product.showInstructions,
                extraPartnerParams: (product.extraPartnerParams as? [String: String]) ?? [:],
                delegate: self
            )
        }.navigationViewStyle(StackNavigationViewStyle())
    }
}

extension SmileIDSmartSelfieAuthView: SmartSelfieResultDelegate {
    func didSucceed(
        selfieImage: URL,
        livenessImages: [URL],
        jobStatusResponse: SmartSelfieJobStatusResponse
    ) {
        let encoder = JSONEncoder()
        guard let jsonData = try? encoder.encode(jobStatusResponse) else {
            self.product.onResult?(["error": SmileIDError.unknown("SmileIDSmartSelfieAuthView encoding error")])
            return
        }
        self.product.onResult?(["result": (String(data: jsonData, encoding: .utf8)!)])
    }

    func didError(error: Error) {
        self.product.onResult?(["error": error.localizedDescription])
    }
}
