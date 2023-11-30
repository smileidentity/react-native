
import SmileID

protocol RNSmileIDDelegate: ObservableObject ,SmartSelfieResultDelegate{
    func didSucceed(selfieImage: URL, livenessImages: [URL], jobStatusResponse: SmartSelfieJobStatusResponse)
    func didError(error: Error)
}
