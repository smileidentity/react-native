import Foundation

import SwiftUI
import SmileID

class SmileIDSmartSelfieAuthViewWrapper: BaseSmileIDViewWrapper  {

    override func getView(tag : NSNumber) -> AnyView {
        return AnyView(SmileIDSmartSelfieAuthView(product: self.product, reactTag: tag))
    }
}
