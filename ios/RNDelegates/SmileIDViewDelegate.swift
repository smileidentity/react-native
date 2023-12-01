import SwiftUI
protocol SmileIDViewDelegate {
    associatedtype ContentView: View
    func getView() -> ContentView
}
