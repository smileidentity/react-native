import Foundation
import React

@objc(SmileIDModule)
class SmileIDModule: NSObject, RCTBridgeModule {

    static func moduleName() -> String! {
        return "SmileID"
    }

    @objc
    static func requiresMainQueueSetup() -> Bool {
        return false
    }

    @objc
    func initialize(_ config: NSDictionary) {
        // Initialize SmileID SDK with config
    }

    @objc
    func getVersion(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        resolve("1.0.0")
    }
}
