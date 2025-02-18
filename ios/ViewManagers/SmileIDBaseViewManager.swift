import Foundation
import React
import SwiftUI

class SmileIDBaseViewManager: RCTViewManager, SmileIDUIViewDelegate {
    var product = SmileIDProductModel()
    @objc var onResult: RCTDirectEventBlock?
    @objc var currentNode: NSNumber?
    func getView() -> UIView {
        fatalError("Must be implemented by subclass")
    }

    @objc open func create(_: NSNumber, params _: NSDictionary) {}

    func onResult(smileResult: String) {
        bridge.eventDispatcher().sendDeviceEvent(
            withName: "onSmileResult",
            body: ["result": smileResult]
        )
    }

    func onError(error: any Error) {
        bridge.eventDispatcher().sendDeviceEvent(
            withName: "onSmileResult",
            body: ["error": error]
        )
    }

    override func view() -> UIView! {
        getView()
    }

    override func customBubblingEventTypes() -> [String]! {
        return ["onResult"]
    }

    @objc override func constantsToExport() -> [AnyHashable: Any]! {
        return ["onResult": "onResult"]
    }

    override static func requiresMainQueueSetup() -> Bool {
        return true
    }
}
