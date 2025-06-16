package com.smileid.expo

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.Promise
import expo.modules.kotlin.exception.Exceptions
import expo.modules.kotlin.exception.CodedException
import com.smileid.shared.SmileIDSharedCore
import com.smileid.shared.SmileIDResult
import com.smileidentity.SmileID
import kotlinx.coroutines.*
import kotlin.time.Duration.Companion.milliseconds

class SmileIDExpoModule : Module() {
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

    // Enables the module to be used as a native view. Definition components that are accepted as part of the view definition: Prop, Events.
    View(SmileIDExpoView::class) {
      // Defines a setter for the `name` prop.
      Prop("name") { view: SmileIDExpoView, prop: String ->
        println(prop)
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