import UIKit

protocol SmileIDUIViewDelegate {
    func getView() -> UIView
    func onResult(smileResult: String)
    func onError(error: Error)
}
