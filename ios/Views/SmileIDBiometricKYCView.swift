import Foundation
import SwiftUI
import SmileID

struct SmileIDBiometricKYCView : View {
    @ObservedObject var product: SmileIDProductModel
    var reactTag : NSNumber = -1
    
    var body: some View {
        NavigationView {
            if let idInfo = product.idInfo {
                SmileID.biometricKycScreen(
                    idInfo: idInfo,
                    userId: product.userId ?? generateUserId(),
                    jobId: product.jobId ?? generateJobId(),
                    allowAgentMode: product.allowAgentMode,
                    showAttribution: product.showAttribution,
                    showInstructions: product.showInstructions,
                    extraPartnerParams: product.extraPartnerParams,
                    delegate:self
                )
            } else{
                Text("IDInfo is required.")
            }
        }.navigationViewStyle(StackNavigationViewStyle())
    }
}

extension SmileIDBiometricKYCView : BiometricKycResultDelegate {
    func didSucceed(
        selfieImage: URL,
        livenessImages: [URL],
        jobStatusResponse: BiometricKycJobStatusResponse
    ){
        let encoder = JSONEncoder()
        let jsonData = try! encoder.encode(jobStatusResponse)
        self.product.onResult?(["result": (String(data: jsonData, encoding: .utf8)!), "target": self.reactTag])
    }
    
    func didError(error: Error){
        self.product.onResult?(["error": error.localizedDescription, "target": self.reactTag])
    }
}
