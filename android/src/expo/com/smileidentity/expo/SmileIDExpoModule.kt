package com.smileidentity.expo

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.Promise
import expo.modules.kotlin.exception.Exceptions
import expo.modules.kotlin.exception.CodedException
import com.smileidentity.shared.SmileIDSharedCore
import com.smileidentity.shared.SmileIDSharedResult
import com.smileidentity.SmileID
import com.smileidentity.expo.views.*
import kotlinx.collections.immutable.toImmutableMap
import kotlinx.coroutines.*
import kotlin.time.Duration.Companion.milliseconds

class SmileIDExpoModule : Module() {
  
  // Helper function to parse common base configuration
  private fun parseBaseConfig(view: SmileIDExpoView, config: Map<String, Any?>) {
    config["userId"]?.let { view.userId = it as? String }
    config["jobId"]?.let { view.jobId = it as? String }
    config["allowAgentMode"]?.let { view.allowAgentMode = it as? Boolean }
    config["showInstructions"]?.let { view.showInstructions = it as? Boolean ?: true }
    config["skipApiSubmission"]?.let { view.skipApiSubmission = it as? Boolean ?: false }
    config["showAttribution"]?.let { view.showAttribution = it as? Boolean ?: true }
    
    // Handle extraPartnerParams if provided
    (config["extraPartnerParams"] as? Map<String, String>)?.let { params ->
      view.extraPartnerParams = params.toImmutableMap()
    }
  }
  
  // Each module class must implement the definition function. The definition consists of components
  // that describe the module and its functionality to the React Native bridge.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('SmileIDExpo')` in JavaScript.
    Name("SmileIDExpo")

    // Sets constant properties on the module. Can take a dictionary or a closure that returns a dictionary.
    Constants(
      "PI" to Math.PI
    )

    // Defines event names that the module can send to JavaScript.
    Events("onChange")

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("hello") {
      "Hello world! 👋"
    }

    // Defines a JavaScript function that always returns a Promise and whose native code
    // is by default dispatched on the different thread than the JavaScript thread.
    AsyncFunction("setValueAsync") { value: String ->
      // Send an event to JavaScript.
      sendEvent("onChange", mapOf(
        "value" to value
      ))
    }

    // Register SmileIDExpoSmartSelfieCaptureView
    View(SmileIDExpoSmartSelfieCaptureView::class) {
      Events("onSmileIDResult", "onSmileIDError")
      
      Prop("config") { view: SmileIDExpoSmartSelfieCaptureView, config: Map<String, Any?> ->
        parseBaseConfig(view, config)
        config["showConfirmation"]?.let { view.showConfirmation = it as? Boolean ?: true }
        config["useStrictMode"]?.let { view.useStrictMode = it as? Boolean ?: false }
        view.renderContent()
      }
    }
    
    // Register SmileIDExpoBiometricKYCView
    View(SmileIDExpoBiometricKYCView::class) {
      Events("onSmileIDResult", "onSmileIDError")
      
      Prop("config") { view: SmileIDExpoBiometricKYCView, config: Map<String, Any?> ->
        parseBaseConfig(view, config)
        config["idInfo"]?.let { view.idInfo = it as? Map<String, Any?> }
        view.renderContent()
      }
    }
    
    // Register SmileIDExpoConsentView
    View(SmileIDExpoConsentView::class) {
      Events("onSmileIDResult", "onSmileIDError")
      
      Prop("config") { view: SmileIDExpoConsentView, config: Map<String, Any?> ->
        parseBaseConfig(view, config)
        config["consentInformation"]?.let { view.consentInformation = it as? Map<String, Any?> }
        view.renderContent()
      }
    }
    
    // Register SmileIDExpoDocumentCaptureView
    View(SmileIDExpoDocumentCaptureView::class) {
      Events("onSmileIDResult", "onSmileIDError")
      
      Prop("config") { view: SmileIDExpoDocumentCaptureView, config: Map<String, Any?> ->
        parseBaseConfig(view, config)
        config["countryCode"]?.let { view.countryCode = it as? String }
        config["documentType"]?.let { view.documentType = it as? String }
        config["allowGallerySelection"]?.let { view.allowGallerySelection = it as? Boolean ?: false }
        view.renderContent()
      }
    }
    
    // Register SmileIDExpoDocumentVerificationView
    View(SmileIDExpoDocumentVerificationView::class) {
      Events("onSmileIDResult", "onSmileIDError")
      
      Prop("config") { view: SmileIDExpoDocumentVerificationView, config: Map<String, Any?> ->
        parseBaseConfig(view, config)
        config["countryCode"]?.let { view.countryCode = it as? String }
        config["documentType"]?.let { view.documentType = it as? String }
        config["allowGallerySelection"]?.let { view.allowGallerySelection = it as? Boolean ?: false }
        config["captureBothSides"]?.let { view.captureBothSides = it as? Boolean ?: true }
        view.renderContent()
      }
    }
    
    // Register SmileIDExpoEnhancedDocumentVerificationView
    View(SmileIDExpoEnhancedDocumentVerificationView::class) {
      Events("onSmileIDResult", "onSmileIDError")
      
      Prop("config") { view: SmileIDExpoEnhancedDocumentVerificationView, config: Map<String, Any?> ->
        parseBaseConfig(view, config)
        config["countryCode"]?.let { view.countryCode = it as? String }
        config["documentType"]?.let { view.documentType = it as? String }
        config["allowGallerySelection"]?.let { view.allowGallerySelection = it as? Boolean ?: false }
        config["captureBothSides"]?.let { view.captureBothSides = it as? Boolean ?: true }
        config["consentInformation"]?.let { view.consentInformation = it as? Map<String, Any?> }
        view.renderContent()
      }
    }
    
    // Register SmileIDExpoSmartSelfieAuthenticationView
    View(SmileIDExpoSmartSelfieAuthenticationView::class) {
      Events("onSmileIDResult", "onSmileIDError")
      
      Prop("config") { view: SmileIDExpoSmartSelfieAuthenticationView, config: Map<String, Any?> ->
        parseBaseConfig(view, config)
        view.renderContent()
      }
    }
    
    // Register SmileIDExpoSmartSelfieAuthenticationEnhancedView
    View(SmileIDExpoSmartSelfieAuthenticationEnhancedView::class) {
      Events("onSmileIDResult", "onSmileIDError")
      
      Prop("config") { view: SmileIDExpoSmartSelfieAuthenticationEnhancedView, config: Map<String, Any?> ->
        parseBaseConfig(view, config)
        view.renderContent()
      }
    }
    
    // Register SmileIDExpoSmartSelfieEnrollmentView
    View(SmileIDExpoSmartSelfieEnrollmentView::class) {
      Events("onSmileIDResult", "onSmileIDError")
      
      Prop("config") { view: SmileIDExpoSmartSelfieEnrollmentView, config: Map<String, Any?> ->
        parseBaseConfig(view, config)
        config["allowNewEnroll"]?.let { view.allowNewEnroll = it as? Boolean ?: false }
        view.renderContent()
      }
    }
    
    // Register SmileIDExpoSmartSelfieEnrollmentEnhancedView
    View(SmileIDExpoSmartSelfieEnrollmentEnhancedView::class) {
      Events("onSmileIDResult", "onSmileIDError")
      
      Prop("config") { view: SmileIDExpoSmartSelfieEnrollmentEnhancedView, config: Map<String, Any?> ->
        parseBaseConfig(view, config)
        config["allowNewEnroll"]?.let { view.allowNewEnroll = it as? Boolean ?: false }
        view.renderContent()
      }
    }

    // =====================================================
    // BASIC OPERATIONS - Using SmileIDSharedCore
    // =====================================================

    // Initialize the SmileID SDK
    AsyncFunction("initialize") { useSandBox: Boolean, enableCrashReporting: Boolean, config: Map<String, Any>?, apiKey: String? ->
      val context = appContext.reactContext ?: throw CodedException("CONTEXT_ERROR", "React context not available")
      val smileConfig = config?.toConfig()
      
      SmileIDSharedCore.launchForExpo {
        SmileIDSharedCore.initialize(context, useSandBox, enableCrashReporting, smileConfig, apiKey)
      }
    }

    // Set allow offline mode
    AsyncFunction("setAllowOfflineMode") { allowOfflineMode: Boolean ->
      SmileIDSharedCore.launchForExpo {
        SmileIDSharedCore.setAllowOfflineMode(allowOfflineMode)
      }
    }

    // Set callback URL
    AsyncFunction("setCallbackUrl") { callbackUrl: String ->
      SmileIDSharedCore.launchForExpo {
        SmileIDSharedCore.setCallbackUrl(callbackUrl)
      }
    }

    // Submit a job
    AsyncFunction("submitJob") { jobId: String ->
      SmileIDSharedCore.launchForExpo {
        SmileIDSharedCore.submitJob(jobId)
      }
    }

    // Get unsubmitted jobs
    AsyncFunction("getUnsubmittedJobs") { ->
      SmileIDSharedCore.launchForExpo {
        SmileIDSharedCore.getUnsubmittedJobs()
      }
    }

    // Get submitted jobs
    AsyncFunction("getSubmittedJobs") { ->
      SmileIDSharedCore.launchForExpo {
        SmileIDSharedCore.getSubmittedJobs()
      }
    }

    // Cleanup a job
    AsyncFunction("cleanup") { jobId: String ->
      SmileIDSharedCore.launchForExpo {
        SmileIDSharedCore.cleanup(jobId)
      }
    }

    // Disable crash reporting
    AsyncFunction("disableCrashReporting") { ->
      SmileIDSharedCore.launchForExpo {
        SmileIDSharedCore.disableCrashReporting()
      }
    }

    // =====================================================
    // API OPERATIONS - Using SmileIDSharedCore with Map conversion
    // =====================================================

    // Authenticate
    AsyncFunction("authenticate") { request: Map<String, Any> ->
      SmileIDSharedCore.launchForExpoWithMap(
        work = { 
          SmileIDSharedCore.authenticate(request.toAuthenticationRequest()) 
        },
        toMapConverter = { it.toMap() }
      )
    }

    // Prepare upload
    AsyncFunction("prepUpload") { request: Map<String, Any> ->
      SmileIDSharedCore.launchForExpoWithMap(
        work = { 
          SmileIDSharedCore.prepUpload(request.toPrepUploadRequest()) 
        },
        toMapConverter = { it.toMap() }
      )
    }

    // Upload files
    AsyncFunction("upload") { url: String, request: Map<String, Any> ->
      SmileIDSharedCore.launchForExpo {
        SmileIDSharedCore.upload(url, request.toUploadRequest())
      }
    }

    // Enhanced KYC
    AsyncFunction("doEnhancedKyc") { request: Map<String, Any> ->
      SmileIDSharedCore.launchForExpoWithMap(
        work = { 
          SmileIDSharedCore.doEnhancedKyc(request.toEnhancedKycRequest()) 
        },
        toMapConverter = { it.toMap() }
      )
    }

    // Enhanced KYC Async
    AsyncFunction("doEnhancedKycAsync") { request: Map<String, Any> ->
      SmileIDSharedCore.launchForExpoWithMap(
        work = { 
          SmileIDSharedCore.doEnhancedKycAsync(request.toEnhancedKycRequest()) 
        },
        toMapConverter = { it.toMap() }
      )
    }

    // Get Smart Selfie job status
    AsyncFunction("getSmartSelfieJobStatus") { request: Map<String, Any> ->
      SmileIDSharedCore.launchForExpoWithMap(
        work = { 
          SmileIDSharedCore.getSmartSelfieJobStatus(request.toJobStatusRequest()) 
        },
        toMapConverter = { it.toMap() }
      )
    }

    // Get Document Verification job status
    AsyncFunction("getDocumentVerificationJobStatus") { request: Map<String, Any> ->
      SmileIDSharedCore.launchForExpoWithMap(
        work = { 
          SmileIDSharedCore.getDocumentVerificationJobStatus(request.toJobStatusRequest()) 
        },
        toMapConverter = { it.toMap() }
      )
    }

    // Get Biometric KYC job status
    AsyncFunction("getBiometricKycJobStatus") { request: Map<String, Any> ->
      SmileIDSharedCore.launchForExpoWithMap(
        work = { 
          SmileIDSharedCore.getBiometricKycJobStatus(request.toJobStatusRequest()) 
        },
        toMapConverter = { it.toMap() }
      )
    }

    // Get Enhanced Document Verification job status
    AsyncFunction("getEnhancedDocumentVerificationJobStatus") { request: Map<String, Any> ->
      SmileIDSharedCore.launchForExpoWithMap(
        work = { 
          SmileIDSharedCore.getEnhancedDocumentVerificationJobStatus(request.toJobStatusRequest()) 
        },
        toMapConverter = { it.toMap() }
      )
    }

    // Get products config
    AsyncFunction("getProductsConfig") { request: Map<String, Any> ->
      SmileIDSharedCore.launchForExpoWithMap(
        work = { 
          SmileIDSharedCore.getProductsConfig(request.toProductsConfigRequest()) 
        },
        toMapConverter = { it.toMap() }
      )
    }

    // Get valid documents
    AsyncFunction("getValidDocuments") { request: Map<String, Any> ->
      SmileIDSharedCore.launchForExpoWithMap(
        work = { 
          SmileIDSharedCore.getValidDocuments(request.toProductsConfigRequest()) 
        },
        toMapConverter = { it.toMap() }
      )
    }

    // Get services
    AsyncFunction("getServices") { ->
      SmileIDSharedCore.launchForExpoWithMap(
        work = { 
          SmileIDSharedCore.getServices() 
        },
        toMapConverter = { it.toMap() }
      )
    }

    // =====================================================
    // POLLING OPERATIONS - Using SmileIDSharedCore
    // =====================================================

    // Poll Smart Selfie job status
    AsyncFunction("pollSmartSelfieJobStatus") { request: Map<String, Any> ->
      val interval = (request["interval"] as? Number)?.toLong() ?: 5000L
      val numAttempts = (request["numAttempts"] as? Number)?.toLong() ?: 10L
      
      SmileIDSharedCore.launchForExpoWithMap(
        work = { 
          SmileIDSharedCore.pollSmartSelfieJobStatus(
            request.toJobStatusRequest(),
            interval,
            numAttempts
          ) 
        },
        toMapConverter = { it.toMap() }
      )
    }

    // Poll Document Verification job status
    AsyncFunction("pollDocumentVerificationJobStatus") { request: Map<String, Any> ->
      val interval = (request["interval"] as? Number)?.toLong() ?: 5000L
      val numAttempts = (request["numAttempts"] as? Number)?.toLong() ?: 10L
      
      SmileIDSharedCore.launchForExpoWithMap(
        work = { 
          SmileIDSharedCore.pollDocumentVerificationJobStatus(
            request.toJobStatusRequest(),
            interval,
            numAttempts
          ) 
        },
        toMapConverter = { it.toMap() }
      )
    }

    // Poll Biometric KYC job status
    AsyncFunction("pollBiometricKycJobStatus") { request: Map<String, Any> ->
      val interval = (request["interval"] as? Number)?.toLong() ?: 5000L
      val numAttempts = (request["numAttempts"] as? Number)?.toLong() ?: 10L
      
      SmileIDSharedCore.launchForExpoWithMap(
        work = { 
          SmileIDSharedCore.pollBiometricKycJobStatus(
            request.toJobStatusRequest(),
            interval,
            numAttempts
          ) 
        },
        toMapConverter = { it.toMap() }
      )
    }

    // Poll Enhanced Document Verification job status
    AsyncFunction("pollEnhancedDocumentVerificationJobStatus") { request: Map<String, Any> ->
      val interval = (request["interval"] as? Number)?.toLong() ?: 5000L
      val numAttempts = (request["numAttempts"] as? Number)?.toLong() ?: 10L
      
      SmileIDSharedCore.launchForExpoWithMap(
        work = { 
          SmileIDSharedCore.pollEnhancedDocumentVerificationJobStatus(
            request.toJobStatusRequest(),
            interval,
            numAttempts
          ) 
        },
        toMapConverter = { it.toMap() }
      )
    }
  }
}