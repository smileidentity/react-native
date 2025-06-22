import Foundation
import React
import SwiftUI
import SmileID

@objc(SmileIDDocumentCaptureViewManager)
class SmileIDDocumentCaptureViewManager: SmileIDBaseViewManager {
    
    override static func moduleName() -> String! {
        return "SmileIDDocumentCaptureView"
    }
    
    override func createView(config: SmileIDViewConfig, onResult: @escaping (SmileIDSharedResult<Any>) -> Void) -> AnyView {
        return AnyView(
            SmileIDDocumentCaptureView(
                config: config,
                onResult: onResult
            )
        )
    }
    
    // Override setConfig to use the fromDocumentCaptureMap validation
    @objc override func setConfig(_ view: UIView, config configDict: NSDictionary?) {
        guard let configDict = configDict else { return }
        
        DispatchQueue.main.async { [weak self] in
            guard let self = self else { return }
            
            do {
                // Use the fromDocumentCaptureMap method to create config with validation
                self.config = try SmileIDViewConfig.fromDocumentCaptureMap(configDict as! [String: Any])
                
                // Update the view using base class method
                self.updateView(view)
            } catch {
                // Emit error event
                self.bridge.eventDispatcher().sendEvent(
                    withName: "topSmileIDError",
                    body: [
                        "target": view.reactTag ?? 0,
                        "error": error.localizedDescription
                    ]
                )
            }
        }
    }
}
