import Foundation
import SmileID
import SwiftUI


struct SmileIDSmartSelfieCaptureView: View {
  @ObservedObject var viewModel: SelfieViewModel
  @ObservedObject var product : SmileIDProductModel
  @State private var acknowledgedInstructions = false
  
  var body: some View {
    NavigationView {
      Group {
        if product.showInstructions, !acknowledgedInstructions {
          SmartSelfieInstructionsScreen(showAttribution: product.showAttribution) {
            acknowledgedInstructions = true
          }
        } else if viewModel.processingState != nil {
          Color.clear.onAppear {
            self.viewModel.onFinished(callback: self)
          }
        } else if let selfieToConfirm = viewModel.selfieToConfirm{
          if(self.product.showConfirmation){
            ImageCaptureConfirmationDialog(
              title: SmileIDResourcesHelper.localizedString(for: "Confirmation.GoodSelfie"),
              subtitle: SmileIDResourcesHelper.localizedString(for: "Confirmation.FaceClear"),
              image: UIImage(data: selfieToConfirm)!,
              confirmationButtonText: SmileIDResourcesHelper.localizedString(for: "Confirmation.YesUse"),
              onConfirm: viewModel.submitJob,
              retakeButtonText: SmileIDResourcesHelper.localizedString(for: "Confirmation.Retake"),
              onRetake: viewModel.onSelfieRejected,
              scaleFactor: 1.25
            ).preferredColorScheme(.light)
          }else{
            Color.clear.onAppear {
              self.viewModel.submitJob()
            }
          }
        } else {
          SelfieCaptureScreen(
            allowAgentMode: self.product.allowAgentMode,
            viewModel: viewModel
          ).preferredColorScheme(.light)
        }
      }
    }.navigationViewStyle(StackNavigationViewStyle()).padding()
  }
}

extension SmileIDSmartSelfieCaptureView : SmartSelfieResultDelegate {
  func didSucceed(selfieImage: URL, livenessImages: [URL], apiResponse: SmartSelfieResponse?) {
    var params: [String: Any] = [
      "selfieFile": selfieImage.absoluteString,
      "livenessFiles": livenessImages,
    ]
    if let apiResponse = apiResponse {
      params["apiResponse"] = apiResponse
    }
    
    guard let jsonData = try? JSONSerialization.data(withJSONObject: params.toJSONCompatibleDictionary(), options: .prettyPrinted) else {
      product.onResult?(["error": SmileIDError.unknown("SmileIDSmartSelfieEnrollmentView encoding error")])
      return
    }
    product.onResult?(["result": String(data: jsonData, encoding: .utf8)!])
  }
  
  func didError(error: Error) {
    product.onResult?(["error": error.localizedDescription])
  }
}
