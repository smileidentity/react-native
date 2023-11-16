import Foundation
import SwiftUI
import SmileID

struct SmileIDSmartSelfieEnrollmentView : View {
    var userId: String?
    var jobId: String?
    var allowAgentMode: Bool = false
    var showInstructions: Bool = true
    var product: NSDictionary? // Replace with appropriate type
    
    
    var body: some View {
        NavigationView {
            SmileID.smartSelfieEnrollmentScreen(
                userId:userId ?? generateJobId(),
                jobId: jobId ?? generateUserId(),
                allowAgentMode: allowAgentMode,
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
