
import SmileID

protocol RNSmileIDDelegate: ObservableObject ,SmartSelfieResultDelegate,DocumentVerificationResultDelegate{
    func didSucceed(selfieImage: URL, livenessImages: [URL], jobStatusResponse: SmartSelfieJobStatusResponse)
    func didError(error: Error)
}
