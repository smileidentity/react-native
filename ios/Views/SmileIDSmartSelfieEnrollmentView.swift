import Foundation
import SwiftUI
import SmileID

struct SmileIDSmartSelfieEnrollmentView : View {
    @ObservedObject var product: SmileIDProductModel
    var userId: String?
    var jobId: String?
    var allowAgentMode: Bool = false
    var showInstructions: Bool = true
    
    
    var body: some View {
        NavigationView {
            SmileID.smartSelfieEnrollmentScreen(
                userId:product.userId ?? generateUserId(),
                jobId: product.jobId ?? generateJobId(),
                allowAgentMode: product.allowAgentMode,
                showAttribution: product.showAttribution,
                showInstructions: product.showInstructions,
                extraPartnerParams:(product.extraPartnerParams as? [String : String]) ?? [:],
                delegate: self
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
        //        onEnrollmentSuccess(userId, selfieImage, livenessImages, jobStatusResponse)
    }
    
    func didError(error: Error) {
        //        onError(error)
    }
}
