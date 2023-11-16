import Foundation
import SwiftUI
import SmileID

struct SmileIDDocumentVerification : View {
    var userId: String?
    var jobId: String?
    var allowAgentMode: Bool = false
    var countryCode: String?
    var showInstructions: Bool = true
    var product: NSDictionary? // Replace with appropriate type
    private let delegate = DocumentVerificationDelegate()
    
    
    var body: some View {
        NavigationView {
            //TODO: Handle props and missing info
            SmileID.documentVerificationScreen(
                userId:userId ?? generateJobId(),
                jobId: jobId ?? generateUserId(), 
                countryCode: countryCode ?? "",//
                allowAgentMode: allowAgentMode,
                delegate: delegate
            )
        }.navigationViewStyle(StackNavigationViewStyle())
        
    }
}

class DocumentVerificationDelegate: DocumentVerificationResultDelegate {
    func didSucceed(selfie: URL, documentFrontImage: URL, documentBackImage: URL?, jobStatusResponse: DocumentVerificationJobStatusResponse) {

    }

    func didError(error: Error) {
       
    }
}
