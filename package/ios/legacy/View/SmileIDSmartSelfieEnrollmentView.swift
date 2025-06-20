import Foundation
import SmileID
import SwiftUI

// Legacy wrapper view that uses the new shared architecture
struct SmileIDSmartSelfieEnrollmentView: View {
    let config: SmileIDViewConfig
    let onResult: (SmileIDSharedResult<Any>) -> Void
    
    var body: some View {
        // Use the new RNSmartSelfieEnrollment method to create the view
        let uiView = SmileID.RNSmartSelfieEnrollment(
            config: config,
            onResult: onResult
        )
        
        // Wrap UIView in SwiftUI
        UIViewWrapper(uiView: uiView)
    }
}