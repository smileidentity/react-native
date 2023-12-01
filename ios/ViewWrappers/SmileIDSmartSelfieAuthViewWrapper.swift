import Foundation

import SwiftUI
import SmileID

class SmileIDSmartSelfieAuthViewWrapper: BaseSmileIDViewWrapper  {

    override func getView() -> AnyView {
        return AnyView(SmileIDSmartSelfieAuthView(product: self.product))
    }
}
