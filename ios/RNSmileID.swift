import SmileID

@objc(RNSmileID)
class RNSmileID: NSObject {
    /*
     enableCrashReporting is only here because android supports it and
     this method breaks if it's not the same as android
     */
    @objc(initialize:useSandBox:withResolver:withRejecter:)
    func initialize(enableCrashReporting: Bool, useSandBox: Bool, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        SmileID.initialize(useSandbox: useSandBox)
        resolve(nil)
    }
}
