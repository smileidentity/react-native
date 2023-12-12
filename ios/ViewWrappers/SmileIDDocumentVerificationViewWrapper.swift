import Foundation

import SmileID
import SwiftUI

class SmileIDDocumentVerificationViewWrapper: BaseSmileIDViewWrapper {
    override func getView() -> AnyView {
        AnyView(SmileIDDocumentVerificationView(product: product))
    }
}
