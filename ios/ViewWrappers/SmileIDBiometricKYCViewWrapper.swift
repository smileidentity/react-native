import Foundation

import SwiftUI
import SmileID

class SmileIDBiometricKYCViewWrapper: BaseSmileIDViewWrapper  {

    override func getView() -> AnyView {
        return AnyView(SmileIDBiometricKYCView(product: self.product))
    }
}
