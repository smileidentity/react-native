import Foundation
import SwiftUI
import SmileID

struct SmileIDSmartSelfieEnrollmentView : View {
    @ObservedObject var product: SmileIDProductModel

    var body: some View {
        NavigationView {
            SmileID.smartSelfieEnrollmentScreen(
                userId:product.userId ?? generateUserId(),
                jobId: product.jobId ?? generateJobId(),
                allowAgentMode: product.allowAgentMode,
                showAttribution: product.showAttribution,
                showInstructions: product.showInstructions,
                extraPartnerParams:(product.extraPartnerParams as? [String : String]) ?? [:],
                delegate:self
            )
        }.navigationViewStyle(StackNavigationViewStyle())
        
    }
}

extension SmileIDSmartSelfieEnrollmentView: SmartSelfieResultDelegate {
    func didSucceed(
        selfieImage: URL,
        livenessImages: [URL],
        jobStatusResponse: SmartSelfieJobStatusResponse
    ) {
       print("SmileIDSmartSelfieEnrollmentView didSucceed no delegate found")
    }
    
    func didError(error: Error) {
        print("SmileIDSmartSelfieEnrollmentView didError no delegate found")
    }
}
