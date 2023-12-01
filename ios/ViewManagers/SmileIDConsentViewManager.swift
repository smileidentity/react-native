import Foundation
import SwiftUI
import React

@objc(SmileIDConsentViewManager)
class SmileIDConsentViewManager: SmileIDBaseViewManager {
    override func getView() -> UIView {
        return SmileIDConsentViewWrapper()
    }
}
