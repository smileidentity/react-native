import Foundation

import SwiftUI
import SmileID

class SmileIDDocumentVerificationViewWrapper: BaseSmileIDViewWrapper  {

    override func getView() -> AnyView {
        return AnyView(SmileIDDocumentVerificationView(product: self.product))
    }
}
