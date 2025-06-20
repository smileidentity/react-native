import ExpoModulesCore

public class SmileIDExpoModule: Module {
  // Each module class must implement the definition function. The definition consists of components
  // that describe the module and its functionality to the React Native bridge.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  public func definition() -> ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('SmileIDExpo')` in JavaScript.
    Name("SmileIDExpo")

    // Sets constant properties on the module. Can take a dictionary or a closure that returns a dictionary.
    Constants([
      "PI": Double.pi
    ])

    // Defines event names that the module can send to JavaScript.
    Events("onChange")

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("hello") {
      return "Hello world! 👋"
    }

    // Defines a JavaScript function that always returns a Promise and whose native code
    // is by default dispatched on the different thread than the JavaScript thread.
    AsyncFunction("setValueAsync") { (value: String) in
      // Send an event to JavaScript.
      self.sendEvent("onChange", [
        "value": value
      ])
    }

    // Enables the module to be used as a native view. Definition components that are accepted as part of
    // the view definition: Prop, Events.
    View(SmileIDExpoView.self) {
      // Defines a setter for the `name` prop.
      Prop("name") { (view: SmileIDExpoView, prop: String) in
        print(prop)
      }
    }

    // MARK: - SmileID SDK Methods

    // Initialize the SmileID SDK
    AsyncFunction("initialize") { (useSandBox: Bool, enableCrashReporting: Bool, config: [String: Any]?, apiKey: String?) -> Void in
      // TODO: Initialize SmileID iOS SDK
      // This will delegate to the existing iOS SDK implementation
      print("SmileID SDK initialized with sandbox: \(useSandBox)")
    }

    // Set allow offline mode
    AsyncFunction("setAllowOfflineMode") { (allowOfflineMode: Bool) -> Void in
      // TODO: Set offline mode
      print("Offline mode set to: \(allowOfflineMode)")
    }

    // Submit a job
    AsyncFunction("submitJob") { (jobId: String) -> [String: Any] in
      // TODO: Submit job implementation
      return ["success": true, "jobId": jobId]
    }

    // Get unsubmitted jobs
    AsyncFunction("getUnsubmittedJobs") { () -> [String] in
      // TODO: Get unsubmitted jobs implementation
      return []
    }

    // Get submitted jobs
    AsyncFunction("getSubmittedJobs") { () -> [String] in
      // TODO: Get submitted jobs implementation
      return []
    }

    // Cleanup a job
    AsyncFunction("cleanup") { (jobId: String) -> Void in
      // TODO: Cleanup job implementation
      print("Cleaning up job: \(jobId)")
    }

    // Disable crash reporting (iOS specific)
    AsyncFunction("disableCrashReporting") { () -> Void in
      // TODO: Disable crash reporting
      print("Crash reporting disabled")
    }

    // Authenticate
    AsyncFunction("authenticate") { (request: [String: Any]) -> [String: Any] in
      // TODO: Authentication implementation
      return ["success": true, "signature": "test-signature"]
    }

    // Prepare upload
    AsyncFunction("prepUpload") { (request: [String: Any]) -> [String: Any] in
      // TODO: Prep upload implementation
      return ["code": "success", "uploadUrl": "https://example.com/upload"]
    }

    // Upload files
    AsyncFunction("upload") { (url: String, request: [String: Any]) -> [String: Any] in
      // TODO: Upload implementation
      return ["success": true]
    }

    // Enhanced KYC
    AsyncFunction("doEnhancedKyc") { (request: [String: Any]) -> [String: Any] in
      // TODO: Enhanced KYC implementation
      return ["success": true, "result": "verified"]
    }

    // Enhanced KYC Async
    AsyncFunction("doEnhancedKycAsync") { (request: [String: Any]) -> [String: Any] in
      // TODO: Enhanced KYC Async implementation
      return ["success": true]
    }

    // Get Smart Selfie job status
    AsyncFunction("getSmartSelfieJobStatus") { (request: [String: Any]) -> [String: Any] in
      // TODO: Get Smart Selfie job status implementation
      return ["jobComplete": true, "jobSuccess": true]
    }

    // Get Document Verification job status
    AsyncFunction("getDocumentVerificationJobStatus") { (request: [String: Any]) -> [String: Any] in
      // TODO: Get Document Verification job status implementation
      return ["jobComplete": true, "jobSuccess": true]
    }

    // Get Biometric KYC job status
    AsyncFunction("getBiometricKycJobStatus") { (request: [String: Any]) -> [String: Any] in
      // TODO: Get Biometric KYC job status implementation
      return ["jobComplete": true, "jobSuccess": true]
    }

    // Get Enhanced Document Verification job status
    AsyncFunction("getEnhancedDocumentVerificationJobStatus") { (request: [String: Any]) -> [String: Any] in
      // TODO: Get Enhanced Document Verification job status implementation
      return ["jobComplete": true, "jobSuccess": true]
    }

    // Get products config
    AsyncFunction("getProductsConfig") { (request: [String: Any]) -> [String: Any] in
      // TODO: Get products config implementation
      return ["config": [:]]
    }

    // Get valid documents
    AsyncFunction("getValidDocuments") { (request: [String: Any]) -> [String: Any] in
      // TODO: Get valid documents implementation
      return ["documents": []]
    }

    // Get services
    AsyncFunction("getServices") { () -> [String: Any] in
      // TODO: Get services implementation
      return ["services": []]
    }

    // Poll Smart Selfie job status
    AsyncFunction("pollSmartSelfieJobStatus") { (request: [String: Any]) -> [String: Any] in
      // TODO: Poll Smart Selfie job status implementation
      return ["jobComplete": true, "jobSuccess": true]
    }

    // Poll Document Verification job status
    AsyncFunction("pollDocumentVerificationJobStatus") { (request: [String: Any]) -> [String: Any] in
      // TODO: Poll Document Verification job status implementation
      return ["jobComplete": true, "jobSuccess": true]
    }

    // Poll Biometric KYC job status
    AsyncFunction("pollBiometricKycJobStatus") { (request: [String: Any]) -> [String: Any] in
      // TODO: Poll Biometric KYC job status implementation
      return ["jobComplete": true, "jobSuccess": true]
    }

    // Poll Enhanced Document Verification job status
    AsyncFunction("pollEnhancedDocumentVerificationJobStatus") { (request: [String: Any]) -> [String: Any] in
      // TODO: Poll Enhanced Document Verification job status implementation
      return ["jobComplete": true, "jobSuccess": true]
    }

    // Set callback URL
    AsyncFunction("setCallbackUrl") { (callbackUrl: String) -> Void in
      // TODO: Set callback URL implementation
      print("Callback URL set to: \(callbackUrl)")
    }
  }
}