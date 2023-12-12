import Foundation

import SmileID
import SwiftUI

class SmileIDEnhancedDocumentVerificationViewWrapper: BaseSmileIDViewWrapper {
    override func getView() -> AnyView {
        AnyView(SmileIDEnhancedDocumentVerificationView(product: product))
    }
}
