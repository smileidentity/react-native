import Foundation
import SmileID
import SwiftUI

struct SmileIDSmartSelfieEnrollmentEnhancedView: View,SmileIDFileUtilsProtocol {
  var fileManager: FileManager = Foundation.FileManager.default
  @ObservedObject var product : SmileIDProductModel
  var body: some View {
    NavigationView {
      SmileID.smartSelfieEnrollmentScreenEnhanced(
        userId: product.userId ?? generateUserId(),
        allowNewEnroll: product.allowNewEnroll,
        showAttribution: product.showAttribution,
        showInstructions: product.showInstructions,
        extraPartnerParams: product.extraPartnerParams as [String: String],
        delegate: self
      )
    }.navigationViewStyle(StackNavigationViewStyle())
  }
}

extension SmileIDSmartSelfieEnrollmentEnhancedView: SmartSelfieResultDelegate {
  func didSucceed(selfieImage: URL, livenessImages: [URL], apiResponse: SmartSelfieResponse?) {
    var params: [String: Any] = [
      "selfieFile": getFilePath(fileName: selfieImage.absoluteString),
      "livenessFiles": livenessImages.map {
        getFilePath(fileName: $0.absoluteString)
      },
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
