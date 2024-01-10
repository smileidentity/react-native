import Foundation
import SwiftUI

class BaseSmileIDView: UIView {
    typealias ContentView = AnyView
    var contentView : AnyView?

    init(frame: CGRect,contentView:AnyView) {
        self.contentView = contentView
        super.init(frame: frame)
        commonInit()
    }

    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        commonInit()
    }

    private func commonInit() {
        // Perform initialization tasks here
        // For example, setup subviews, add constraints, configure appearance
        let hostingController = UIHostingController(rootView:contentView)
        let hostingView = hostingController.view!
        hostingView.translatesAutoresizingMaskIntoConstraints = false
        addSubview(hostingView)
        hostingView.topAnchor.constraint(equalTo: topAnchor).isActive = true
        hostingView.leftAnchor.constraint(equalTo: leftAnchor).isActive = true
        hostingView.bottomAnchor.constraint(equalTo: bottomAnchor).isActive = true
        hostingView.rightAnchor.constraint(equalTo: rightAnchor).isActive = true
    }

    func getView(product:SmileIDProductModel) -> AnyView {
        fatalError("Must be implemented by subclass")
    }
}
