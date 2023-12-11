import SmileID

@objc(RNSmileID)
class RNSmileID: NSObject {
    @objc(initialize:withResolver:withRejecter:)
    func initialize(useSandBox: Bool, resolve: @escaping RCTPromiseResolveBlock, reject _: @escaping RCTPromiseRejectBlock) {
        SmileID.initialize(useSandbox: useSandBox)
        resolve(nil)
    }
}
