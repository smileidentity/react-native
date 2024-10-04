import Foundation
import SmileID
import SwiftUI


struct SmileIDSmartSelfieCaptureView: View {
  @ObservedObject var viewModel: SelfieViewModel
  @ObservedObject var product: SmileIDProductModel
  @State private var acknowledgedInstructions = false
  static let shared = FileManager()
  private let fileManager = Foundation.FileManager.default

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
        } else if let selfieToConfirm = viewModel.selfieToConfirm {
          if (self.product.showConfirmation) {
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
            allowAgentMode: self.product.allowAgentMode,
            viewModel: viewModel
          ).preferredColorScheme(.light)
        }
      }
    }
    .navigationViewStyle(StackNavigationViewStyle()).padding()
  }
}

extension SmileIDSmartSelfieCaptureView: SmartSelfieResultDelegate {
  func didSucceed(selfieImage: URL, livenessImages: [URL], apiResponse: SmartSelfieResponse?) {
    var params: [String: Any] = [
      "selfieFile": getFilePath(fileName: selfieImage.absoluteString),
      "livenessFiles": livenessImages.map {
        getFilePath(fileName: $0.absoluteString)
      }
    ]

    guard let jsonData = try? JSONSerialization.data(withJSONObject: params.toJSONCompatibleDictionary(), options: .prettyPrinted) else {
      product.onResult?(["error": SmileIDError.unknown("SmileIDSmartSelfieEnrollmentView encoding error")])
      return
    }
    product.onResult?(["result": String(data: jsonData, encoding: .utf8)!])
  }

  func didError(error: Error) {
    product.onResult?(["error": error.localizedDescription])
  }

  func getSmileIDDirectory() -> String? {
    guard let documentsDirectory = fileManager.urls(for: .documentDirectory, in: .userDomainMask).first else {
      print("Unable to access documents directory")
      return nil
    }

    let smileIDDirectory = documentsDirectory.appendingPathComponent("SmileID")
    return smileIDDirectory.absoluteURL.absoluteString
  }

  func createSmileIDDirectoryIfNeeded() -> Bool {
    guard let smileIDDirectory = getSmileIDDirectory() else {
      return false
    }

    if !fileManager.fileExists(atPath: smileIDDirectory) {
      do {
        try fileManager.createDirectory(atPath: smileIDDirectory, withIntermediateDirectories: true, attributes: nil)
        return true
      } catch {
        print("Error creating SmileID directory: \(error)")
        return false
      }
    }

    return true
  }

  func getFilePath(fileName: String) -> String? {
    guard let smileIDDirectory = getSmileIDDirectory() else {
      return nil
    }

    return (smileIDDirectory as NSString).appendingPathComponent(fileName)
  }
}
