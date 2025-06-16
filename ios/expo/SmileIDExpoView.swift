import ExpoModulesCore

// This view will be used for creating the native view component in iOS.
// Eventually this should be replaced with actual SmileID view components.
class SmileIDExpoView: ExpoView {
  required init(appContext: AppContext? = nil) {
    super.init(appContext: appContext)
    clipsToBounds = true
  }
}