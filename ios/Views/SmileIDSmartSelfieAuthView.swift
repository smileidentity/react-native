import Foundation
import SwiftUI
import SmileID

struct SmileIDSmartSelfieAuthView : View {
    @ObservedObject var product: SmileIDProductModel

    var body: some View {
        NavigationView {
            SmileID.smartSelfieAuthenticationScreen(
                userId:product.userId ?? generateUserId(),
                jobId: product.jobId ?? generateJobId(),
                allowAgentMode: product.allowAgentMode,
                showAttribution: product.showAttribution,
                showInstructions: product.showInstructions,
                extraPartnerParams:(product.extraPartnerParams as? [String : String]) ?? [:],
                delegate:product.delegate ?? self
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
       print("SmileIDSmartSelfieAuthView didSucceed no delegate found")
    }
    
    func didError(error: Error) {
        print("SmileIDSmartSelfieAuthView didError no delegate found")
    }
}
