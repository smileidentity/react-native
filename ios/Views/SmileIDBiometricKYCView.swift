import Foundation
import SwiftUI
import SmileID

struct SmileIDBiometricKYCView : View {
    @ObservedObject var product: SmileIDProductModel
    
    var body: some View {
        NavigationView {
            if let idInfo = product.idInfo {
                SmileID.biometricKycScreen(
                    idInfo: idInfo,
                    allowAgentMode: true,
                    delegate:product.delegate ?? self
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
        print("SmileIDBiometricKYCView didSucceed no delegate found")
    }
    
    func didError(error: Error){
        print("SmileIDBiometricKYCView didError no delegate found")
    }
}
