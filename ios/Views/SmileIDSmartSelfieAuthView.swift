import Foundation
import SwiftUI
import SmileID

struct SmileIDSmartSelfieAuthView: View {
    @ObservedObject var product: SmileIDProductModel
    var reactTag: NSNumber = -1

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
        let jsonData = try! encoder.encode(jobStatusResponse)
        self.product.onResult?(["result": (String(data: jsonData, encoding: .utf8)!), "target": self.reactTag])
    }

    func didError(error: Error) {
        self.product.onResult?(["error": error.localizedDescription, "target": self.reactTag])
    }
}
