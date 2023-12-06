import Foundation

import SwiftUI
import SmileID

class SmileIDBiometricKYCViewWrapper: BaseSmileIDViewWrapper {

    @objc public func setIdInfo(_ idInfo: NSDictionary?) {
        self.product.idInfo = idInfo?.toIdInfo()
    }

    override func getView(tag: NSNumber) -> AnyView {
        return AnyView(SmileIDBiometricKYCView(product: self.product, reactTag: tag))
    }
}
