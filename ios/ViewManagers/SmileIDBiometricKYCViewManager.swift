import Foundation
import SwiftUI
import React

@objc(SmileIDBiometricKYCViewManager)
class SmileIDBiometricKYCViewManager: SmileIDBaseViewManager {
    override func getView() -> UIView {
        return SmileIDBiometricKYCViewWrapper()
    }
}
