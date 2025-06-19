import Foundation
import SmileID
import SwiftUI

// Legacy wrapper view that uses the new shared architecture
struct SmileIDDocumentCaptureView: View {
    let config: SmileIDViewConfig
    let onResult: (SmileIDSharedResult<Any>) -> Void
    
    var body: some View {
        // Use the new RNDocumentCapture method to create the view
        let uiView = SmileID.RNDocumentCapture(
            config: config,
            onResult: onResult
        )
        
        // Wrap UIView in SwiftUI
        UIViewWrapper(uiView: uiView)
    }
}