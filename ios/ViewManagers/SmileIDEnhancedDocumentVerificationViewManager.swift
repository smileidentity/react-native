import Foundation
import React
import SmileID
import SwiftUI

@objc(SmileIDEnhancedDocumentVerificationViewManager)
class SmileIDEnhancedDocumentVerificationViewManager: SmileIDBaseViewManager {
    override func getView() -> UIView {
        SmileIDEnhancedDocumentVerificationViewWrapper()
    }

    @objc func setParams(_ node: NSNumber, params: NSDictionary) {
        DispatchQueue.main.async {
            if let component = self.bridge.uiManager.view(forReactTag: node) as? SmileIDEnhancedDocumentVerificationViewWrapper {
                let onResult = params["onResult"] as? RCTDirectEventBlock
                guard let countryCode = params["countryCode"] as? String else {
                    onResult?(["error": SmileIDError.unknown("countryCode is required to run Enhanced Document Verification")])
                    return
                }

                var bypassSelfieCaptureWithFilePath: URL?
                if let filePath = params["bypassSelfieCaptureWithFile"] as? String {
                    if !filePath.isValidUrl() {
                        onResult?(["error": SmileIDError.unknown("bypassSelfieCaptureWithFile must be a valid file url")])
                        return
                    }
                    bypassSelfieCaptureWithFilePath = URL(string: filePath)
                }

                component.product.extraPartnerParams = params["extraPartnerParams"] as? [String: String] ?? [:]
                component.product.userId = params["userId"] as? String
                component.product.jobId = params["jobId"] as? String
                component.product.countryCode = countryCode
                component.product.allowAgentMode = params["allowAgentMode"] as? Bool ?? false
                component.product.showAttribution = params["showAttribution"] as? Bool ?? true
                component.product.showInstructions = params["showInstructions"] as? Bool ?? true
                component.product.documentType = params["documentType"] as? String
                component.product.idAspectRatio = params["idAspectRatio"] as? Double
                component.product.bypassSelfieCaptureWithFilePath = bypassSelfieCaptureWithFilePath
                component.product.captureBothSides = params["captureBothSides"] as? Bool ?? true
                component.product.allowGalleryUpload = params["allowGalleryUpload"] as? Bool ?? false
                component.product.onResult = params["onResult"] as? RCTDirectEventBlock
            }
        }
    }
}
