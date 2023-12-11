import Foundation

import SmileID
import SwiftUI

class SmileIDSmartSelfieEnrollmentViewWrapper: BaseSmileIDViewWrapper {
    override func getView() -> AnyView {
        AnyView(SmileIDSmartSelfieEnrollmentView(product: product))
    }
}
