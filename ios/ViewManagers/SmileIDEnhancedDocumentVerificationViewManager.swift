import Foundation
import SwiftUI
import React

@objc(SmileIDEnhancedDocumentVerificationViewManager)
class SmileIDEnhancedDocumentVerificationViewManager: SmileIDBaseViewManager {
    override func getView() -> UIView {
        return SmileIDEnhancedDocumentVerificationViewWrapper()
    }
}
