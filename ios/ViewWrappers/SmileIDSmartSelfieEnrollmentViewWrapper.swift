import Foundation

import SwiftUI
import SmileID

class SmileIDSmartSelfieEnrollmentViewWrapper: BaseSmileIDViewWrapper {

    override func getView(tag: NSNumber) -> AnyView {
        return AnyView(SmileIDSmartSelfieEnrollmentView(product: self.product, reactTag: tag))
    }
}
