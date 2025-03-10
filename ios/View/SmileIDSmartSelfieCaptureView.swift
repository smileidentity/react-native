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
        OrchestratedEnhancedSelfieCaptureScreen(
          userId: product.userId ?? generateUserId(),
          isEnroll: true,
          allowNewEnroll: product.allowNewEnroll,
          showAttribution: product.showAttribution,
          showInstructions: product.showInstructions,
          skipApiSubmission: true,
          extraPartnerParams: product.extraPartnerParams,
          onResult: self
        )
      } else {
        Group {
          if product.showInstructions, !acknowledgedInstructions {
            SmartSelfieInstructionsScreen(showAttribution: product.showAttribution) {
              acknowledgedInstructions = true
            }
          } else if viewModel.processingState != nil {
            Color.clear.onAppear {
              self.viewModel.onFinished(callback: self)
            }
          } else if let selfieToConfirm = viewModel.selfieToConfirm {
            if self.product.showConfirmation {
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
            } else {
              Color.clear.onAppear {
                self.viewModel.submitJob()
              }
            }
          } else {
            SelfieCaptureScreen(
              viewModel: viewModel,
              allowAgentMode: self.product.allowAgentMode
            ).preferredColorScheme(.light)
          }
        }
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
