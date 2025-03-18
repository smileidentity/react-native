import Foundation
import SmileID
import SwiftUI

struct SmileIDSmartSelfieCaptureView: View, SmileIDFileUtilsProtocol {
  var fileManager: FileManager = Foundation.FileManager.default
  @ObservedObject var viewModel: SelfieViewModel
  @ObservedObject var product: SmileIDProductModel
  @State private var acknowledgedInstructions = false
  var smileIDUIViewDelegate: SmileIDUIViewDelegate
  
  var body: some View {
    NavigationView {
      selfieCaptureScreen
    }.navigationViewStyle(StackNavigationViewStyle())
      .padding()
  }
  
  private var selfieCaptureScreen: some View {
    Group {
      if product.useStrictMode {
        SmileID.smartSelfieEnrollmentScreenEnhanced(
          userId: product.userId ?? generateUserId(),
          allowNewEnroll: product.allowNewEnroll,
          showAttribution: product.showAttribution,
          showInstructions: product.showInstructions,
          skipApiSubmission: true,
          extraPartnerParams: product.extraPartnerParams,
          delegate: self)
      } else {
        SmileID.smartSelfieEnrollmentScreen(
          userId: product.userId ?? generateUserId(),
          jobId: product.jobId ?? generateJobId(),
          allowNewEnroll: product.allowNewEnroll,
          allowAgentMode: product.allowAgentMode,
          showAttribution: product.showAttribution,
          showInstructions: product.showInstructions,
          skipApiSubmission: true,
          extraPartnerParams: product.extraPartnerParams,
          delegate: self)
      }
    }
  }
}

extension SmileIDSmartSelfieCaptureView: SmartSelfieResultDelegate {
  func didSucceed(selfieImage: URL, livenessImages: [URL], apiResponse _: SmartSelfieResponse?) {
    let params: [String: Any] = [
      "selfieFile": getFilePath(fileName: selfieImage.absoluteString),
      "livenessFiles": livenessImages.map {
        getFilePath(fileName: $0.absoluteString)
      },
    ]
    
    guard let jsonData = try? JSONSerialization.data(withJSONObject: params.toJSONCompatibleDictionary(), options: .prettyPrinted) else {
      smileIDUIViewDelegate.onError(error: SmileIDError.unknown("SmileIDSmartSelfieCaptureView encoding error"))
      return
    }
    smileIDUIViewDelegate.onResult(smileResult: String(data: jsonData, encoding: .utf8)!)
  }
  
  func didError(error: Error) {
    smileIDUIViewDelegate.onError(error: error)
  }
}
