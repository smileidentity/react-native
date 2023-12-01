import Foundation

import SwiftUI
import SmileID

class SmileIDEnhancedDocumentVerificationViewWrapper: BaseSmileIDViewWrapper  {

    override func getView() -> AnyView {
        return AnyView(SmileIDEnhancedDocumentVerificationView(product: self.product))
    }
}
