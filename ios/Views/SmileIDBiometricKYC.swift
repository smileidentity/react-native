import Foundation
import SwiftUI
import SmileID

struct SmileIDBiometricKYC : View {
    var userId: String?
    var jobId: String?
    var partnerName: String?
    var productName: String?
    var allowAgentMode: Bool = false
    var partnerPrivacyPolicy: URL?
    var showInstructions: Bool = true
    var partnerIcon: UIImage?
    var product: NSDictionary? // Replace with appropriate type
    
    
    var body: some View {
        NavigationView {
            //TODO: Handle props and missing info
            SmileID.biometricKycScreen(partnerIcon: partnerIcon!,
                                       partnerName: partnerName!,
                                       productName: productName!,
                                       partnerPrivacyPolicy: partnerPrivacyPolicy!,
                                       delegate: self)
        }.navigationViewStyle(StackNavigationViewStyle())
        
    }
}

extension SmileIDBiometricKYC: BiometricKycResultDelegate {
    func didSucceed(
        selfieImage: URL,
        livenessImages: [URL],
        jobStatusResponse: BiometricKycJobStatusResponse
    ){
        
    }
    
    func didError(error: Error){
        
    }

}
