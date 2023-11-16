import Foundation
import SwiftUI
import React

class SmileIDBaseViewManager: RCTViewManager {

    override func view() -> UIView! {
        let view = UIView()

        // Here, add your SwiftUI view to the UIView
        let swiftUIView = SmileIDSmartSelfieEnrollmentView()
        let hostingController = UIHostingController(rootView: swiftUIView)

        // Add SwiftUI view as a subview
        let hostingView = hostingController.view!
        hostingView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(hostingView)

        // Constraints
        hostingView.topAnchor.constraint(equalTo: view.topAnchor).isActive = true
        hostingView.leftAnchor.constraint(equalTo: view.leftAnchor).isActive = true
        hostingView.bottomAnchor.constraint(equalTo: view.bottomAnchor).isActive = true
        hostingView.rightAnchor.constraint(equalTo: view.rightAnchor).isActive = true

        return view
    }

    @objc override static func requiresMainQueueSetup() -> Bool {
        return true
    }
}
