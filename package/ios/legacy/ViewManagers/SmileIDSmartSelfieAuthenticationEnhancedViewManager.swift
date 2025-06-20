import Foundation
import React
import SwiftUI
import SmileID

@objc(SmileIDSmartSelfieAuthenticationEnhancedViewManager)
class SmileIDSmartSelfieAuthenticationEnhancedViewManager: SmileIDBaseViewManager {
    
    override static func moduleName() -> String! {
        return "SmileIDSmartSelfieAuthenticationEnhancedView"
    }
    
    override func createView(config: SmileIDViewConfig, onResult: @escaping (SmileIDSharedResult<Any>) -> Void) -> AnyView {
        return AnyView(
            SmileIDSmartSelfieAuthEnhancedView(
                config: config,
                onResult: onResult
            )
        )
    }
    
    // Override setConfig to use the fromSmartSelfieMap validation
    @objc override func setConfig(_ view: UIView, config configDict: NSDictionary?) {
        guard let configDict = configDict else { return }
        
        DispatchQueue.main.async { [weak self] in
            guard let self = self else { return }
            
            do {
                // Use the fromSmartSelfieMap method to create config
                self.config = try SmileIDViewConfig.fromSmartSelfieMap(configDict as! [String: Any])
                
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
