import Foundation

import SwiftUI
import SmileID

class SmileIDDocumentVerificationViewWrapper: BaseSmileIDViewWrapper  {
    
    @objc public func setAllowGalleryUpload(_ allowGalleryUpload: Bool) {
        self.product.allowGalleryUpload = allowGalleryUpload
    }
    
    @objc public func setDocumentType(_ documentType: String?) {
        self.product.documentType = documentType
    }
    
    @objc public func setCaptureBothSides(_ captureBothSides: Bool) {
        self.product.captureBothSides = captureBothSides
    }

    override func getView(tag : NSNumber) -> AnyView {
        return AnyView(SmileIDDocumentVerificationView(product: self.product, reactTag: tag))
    }
}
