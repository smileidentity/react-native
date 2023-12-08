import Foundation
import React
import SwiftUI

class SmileIDBaseViewManager: RCTViewManager, SmileIDUIViewDelegate {
    func getView() -> UIView {
        fatalError("Must be implemented by subclass")
    }

    override func view() -> UIView! {
        getView()
    }

    @objc override static func requiresMainQueueSetup() -> Bool {
        true
    }
}
