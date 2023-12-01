import Foundation
import SwiftUI
import React

@objc(SmileIDSmartSelfieAuthenticationViewManager)
class SmileIDSmartSelfieAuthenticationViewManager: SmileIDBaseViewManager {
    override func getView() -> UIView {
        return SmileIDSmartSelfieAuthViewWrapper()
    }
}
