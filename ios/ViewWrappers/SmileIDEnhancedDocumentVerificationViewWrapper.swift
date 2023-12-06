import Foundation

import SwiftUI
import SmileID

class SmileIDEnhancedDocumentVerificationViewWrapper: BaseSmileIDViewWrapper  {
    
    @objc public func setIdInfo(_ idInfo: NSDictionary?) {
        self.product.idInfo = idInfo?.toIdInfo()
    }
    
    @objc public func setDocumentType(_ documentType: String?) {
        self.product.documentType = documentType
    }
    
    @objc public func setCaptureBothSides(_ captureBothSides: Bool) {
        self.product.captureBothSides = captureBothSides
    }

    override func getView(tag : NSNumber) -> AnyView {
        return AnyView(SmileIDEnhancedDocumentVerificationView(product: self.product, reactTag: tag))
    }
}
