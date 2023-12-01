import Foundation
import SwiftUI
import React

@objc(SmileIDDocumentVerificationViewManager)
class SmileIDDocumentVerificationViewManager: SmileIDBaseViewManager {
    override func getView() -> UIView {
        return SmileIDDocumentVerificationViewWrapper()
    }
}
