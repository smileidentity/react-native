import Foundation

import SwiftUI
import SmileID

class SmileIDBiometricKYCViewWrapper: BaseSmileIDViewWrapper {

    @objc public func setIdInfo(_ idInfo: NSDictionary?) {
        self.product.idInfo = idInfo?.toIdInfo()
    }

    override func getView() -> AnyView {
        return AnyView(SmileIDBiometricKYCView(product: self.product))
    }
}
