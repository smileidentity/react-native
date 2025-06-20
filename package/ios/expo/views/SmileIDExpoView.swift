import ExpoModulesCore
import UIKit
import SwiftUI
import SmileID

/**
 * Expo-specific implementation of SmileIDView that uses native Expo events
 */
class SmileIDExpoView: ExpoView {
    // Event dispatchers for Expo
    let onSmileIDResult = EventDispatcher()
    let onSmileIDError = EventDispatcher()
    
    // Properties from SmileIDView
    var userId: String?
    var jobId: String?
    var allowAgentMode: Bool = false
    var showInstructions: Bool = true
    var skipApiSubmission: Bool = false
    var showAttribution: Bool = true
    var extraPartnerParams: [String: String] = [:]
    
    // Hosting controller for SwiftUI views
    var hostingController: UIHostingController<AnyView>?
    
    required init(appContext: AppContext? = nil) {
        super.init(appContext: appContext)
        clipsToBounds = true
        setupView()
    }
    
    private func setupView() {
        // Initial setup
        backgroundColor = .clear
    }
    
    /**
     * Must be overridden by subclasses to render their specific content
     */
    func renderContent() {
        fatalError("renderContent must be implemented by subclass")
    }
    
    /**
     * Helper method to set content view with proper hosting controller
     */
    func setContent<Content: View>(_ content: Content) {
        // Remove existing hosting controller if any
        hostingController?.view.removeFromSuperview()
        hostingController?.removeFromParent()
        
        // Create new hosting controller
        let newHostingController = UIHostingController(rootView: AnyView(content))
        newHostingController.view.backgroundColor = .clear
        newHostingController.view.translatesAutoresizingMaskIntoConstraints = false
        
        // Add to view hierarchy
        addSubview(newHostingController.view)
        
        // Setup constraints
        NSLayoutConstraint.activate([
            newHostingController.view.topAnchor.constraint(equalTo: topAnchor),
            newHostingController.view.leadingAnchor.constraint(equalTo: leadingAnchor),
            newHostingController.view.trailingAnchor.constraint(equalTo: trailingAnchor),
            newHostingController.view.bottomAnchor.constraint(equalTo: bottomAnchor)
        ])
        
        // Store reference
        hostingController = newHostingController
    }
    
    /**
     * Helper method to add a UIView with full constraints
     */
    func setUIView(_ uiView: UIView) {
        // Remove existing subviews
        subviews.forEach { $0.removeFromSuperview() }
        
        // Add the new UIView
        uiView.translatesAutoresizingMaskIntoConstraints = false
        addSubview(uiView)
        
        // Setup constraints
        NSLayoutConstraint.activate([
            uiView.topAnchor.constraint(equalTo: topAnchor),
            uiView.leadingAnchor.constraint(equalTo: leadingAnchor),
            uiView.trailingAnchor.constraint(equalTo: trailingAnchor),
            uiView.bottomAnchor.constraint(equalTo: bottomAnchor)
        ])
    }
    
    /**
     * Emit success event using Expo's EventDispatcher
     */
    func emitSuccess(_ result: Any) {
        onSmileIDResult([
            "result": result
        ])
    }
    
    /**
     * Emit failure event using Expo's EventDispatcher
     */
    func emitFailure(_ error: Error?) {
        onSmileIDError([
            "error": error?.localizedDescription ?? "Unknown error",
            "code": "SMILE_ID_ERROR"
        ])
    }
    
    /**
     * Generic handler for SmileIDSharedResult
     */
    func handleResultCallback(_ result: SmileIDSharedResult<Any>) {
        switch result {
        case .success(let data):
            emitSuccess(data)
        case .error(let code, let message, let cause):
            emitFailure(NSError(
                domain: "SmileID",
                code: Int(code) ?? -1,
                userInfo: [
                    NSLocalizedDescriptionKey: message,
                    NSUnderlyingErrorKey: cause as Any
                ]
            ))
        case .withError(let error):
            emitFailure(error)
        }
    }
}