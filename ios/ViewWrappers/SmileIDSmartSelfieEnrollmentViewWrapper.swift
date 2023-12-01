import Foundation

import SwiftUI
import SmileID

class SmileIDSmartSelfieEnrollmentViewWrapper: BaseSmileIDViewWrapper  {

    override func getView() -> AnyView {
        return AnyView(SmileIDSmartSelfieEnrollmentView(product: self.product))
    }
}
