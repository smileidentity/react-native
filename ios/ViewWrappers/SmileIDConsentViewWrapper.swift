import Foundation

import SwiftUI
import SmileID

class SmileIDConsentViewWrapper: BaseSmileIDViewWrapper  {

    override func getView() -> AnyView {
        return AnyView(SmileIDConsentView(product: self.product))
    }
}
