import Foundation
import React
import SwiftUI

class SmileIDBaseViewManager: RCTViewManager, SmileIDUIViewDelegate {
    var product = SmileIDProductModel()
    @objc var onResult: RCTDirectEventBlock?
    func getView() -> UIView {
        fatalError("Must be implemented by subclass")
    }
    
    override func view() -> UIView! {
        getView()
    }
    
    override func customBubblingEventTypes() -> [String]! {
        return ["onResult"]
    }
    
    @objc override func constantsToExport() -> [AnyHashable : Any]! {
        return ["onResult": "onResult"]
    }
    
    override static func requiresMainQueueSetup() -> Bool {
        return true
    }
}
