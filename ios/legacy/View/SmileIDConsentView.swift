import Foundation
import SmileID
import SwiftUI

// Legacy wrapper view that uses the new shared architecture
struct SmileIDConsentView: View {
    let config: SmileIDViewConfig
    let onResult: (SmileIDSharedResult<Any>) -> Void
    
    var body: some View {
        // Use the new RNConsent method to create the view
        let uiView = SmileID.RNConsent(
            config: config,
            onResult: onResult
        )
        
        // Wrap UIView in SwiftUI
        UIViewWrapper(uiView: uiView)
    }
}
