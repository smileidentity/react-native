import Foundation

import SmileID
import SwiftUI

class SmileIDConsentViewWrapper: BaseSmileIDViewWrapper {
    override func getView() -> AnyView {
        AnyView(SmileIDConsentView(product: product))
    }
}
