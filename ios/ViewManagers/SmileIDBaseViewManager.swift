import Foundation
import SwiftUI
import React

class SmileIDBaseViewManager: RCTViewManager, SmileIDUIViewDelegate {
    func getView() -> UIView {
        fatalError("Must be implemented by subclass")
    }

    override func view() -> UIView! {
        return getView()
    }

    @objc override static func requiresMainQueueSetup() -> Bool {
        return true
    }
}
