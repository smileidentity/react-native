import Foundation
import SwiftUI
import React

@objc(SmileIDSmartSelfieEnrollmentViewManager)
class SmileIDSmartSelfieEnrollmentViewManager: SmileIDBaseViewManager {
    override func getView() -> UIView {
        return SmileIDSmartSelfieEnrollmentViewWrapper()
    }
}
