import Foundation
import SwiftUI
import React

class SmileIDBaseViewManager: RCTViewManager {

    override func view() -> UIView! {
        return SmileIDSmartSelfieEnrollmentViewWrapper()
    }

    @objc override static func requiresMainQueueSetup() -> Bool {
        return true
    }
}
