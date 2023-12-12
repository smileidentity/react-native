import Foundation

import SmileID
import SwiftUI

class SmileIDSmartSelfieAuthViewWrapper: BaseSmileIDViewWrapper {
    override func getView() -> AnyView {
        AnyView(SmileIDSmartSelfieAuthView(product: product))
    }
}
