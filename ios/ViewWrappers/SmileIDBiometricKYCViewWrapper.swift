import Foundation

import SmileID
import SwiftUI

class SmileIDBiometricKYCViewWrapper: BaseSmileIDViewWrapper {
    override func getView() -> AnyView {
        AnyView(SmileIDBiometricKYCView(product: product))
    }
}
