import Foundation
import SmileID
import SwiftUI

struct SmileIDBiometricKYCView: View, SmileIDFileUtilsProtocol {
    var fileManager: FileManager = Foundation.FileManager.default
    @ObservedObject var product: SmileIDProductModel
    var smileIDUIViewDelegate: SmileIDUIViewDelegate
    var body: some View {
        NavigationView {
            if let idInfo = product.idInfo, let consentInformation = product.consentInformation {
                SmileID.biometricKycScreen(
                    idInfo: idInfo,
                    userId: product.userId ?? generateUserId(),
                    jobId: product.jobId ?? generateJobId(),
                    allowNewEnroll: product.allowNewEnroll,
                    allowAgentMode: product.allowAgentMode,
                    showAttribution: product.showAttribution,
                    showInstructions: product.showInstructions,
                    useStrictMode: product.useStrictMode,
                    extraPartnerParams: product.extraPartnerParams as [String: String],
                    consentInformation: consentInformation, // already validated in the SmileIDBiometricKYCViewManager
                    delegate: self
                )
            } else {
                // This exists for debugging purposes and will show in extreme cases
                // when the params were not set NB: setParams in the viewmanager will always
                // return an error if the required data is missing
                Text("An error has occured")
            }
        }.navigationViewStyle(StackNavigationViewStyle())
    }
}

extension SmileIDBiometricKYCView: BiometricKycResultDelegate {
    func didSucceed(selfieImage: URL, livenessImages: [URL], didSubmitBiometricJob: Bool) {
        let params: [String: Any] = [
            "selfieFile": getFilePath(fileName: selfieImage.absoluteString),
            "livenessFiles": livenessImages.map {
                getFilePath(fileName: $0.absoluteString)
            },
            "didSubmitBiometricKycJob": didSubmitBiometricJob,
        ]

        guard let jsonData = try? JSONSerialization.data(withJSONObject: params.toJSONCompatibleDictionary(), options: .prettyPrinted) else {
            smileIDUIViewDelegate.onError(error: SmileIDError.unknown("SmileIDBiometricKYCView encoding error"))
            return
        }
        smileIDUIViewDelegate.onResult(smileResult: String(data: jsonData, encoding: .utf8)!)
    }

    func didSucceed(
        selfieImage _: URL,
        livenessImages _: [URL],
        jobStatusResponse: BiometricKycJobStatusResponse
    ) {
        let encoder = JSONEncoder()
        let jsonData = try! encoder.encode(jobStatusResponse)
        smileIDUIViewDelegate.onResult(smileResult: String(data: jsonData, encoding: .utf8)!)
    }

    func didError(error: Error) {
        smileIDUIViewDelegate.onError(error: error)
    }
}
