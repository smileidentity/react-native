package com.smileidentity.react

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.smileidentity.SmileID
import com.smileidentity.SmileIDCrashReporting
import com.smileidentity.SmileIdSpec
import com.smileidentity.models.EnhancedKycRequest
import com.smileidentity.react.utils.getStringOrDefault
import com.smileidentity.react.utils.partnerParams
import kotlinx.coroutines.CoroutineExceptionHandler
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch


class SmileIdModule internal constructor(context: ReactApplicationContext) :
  SmileIdSpec(context) {

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  override fun initialize(useSandBox: Boolean, promise: Promise) {
    SmileID.initialize(reactApplicationContext, useSandbox = useSandBox)
    promise.resolve(null)
  }

  @ReactMethod
  override fun disableCrashReporting(promise: Promise) {
    SmileIDCrashReporting.disable()
  }

  @ReactMethod
  override fun authenticate(request: ReadableMap, promise: Promise) = launch(
    work = { SmileID.api.authenticate(request = request.toAuthenticationRequest()) },
    promise = promise
  )

  @ReactMethod
  fun prepUpload(request: ReadableMap, promise: Promise) = launch(
    work = { SmileID.api.prepUpload(request = request.toPrepUploadRequest()) },
    promise = promise
  )

  @ReactMethod
  fun upload(url: String, request: ReadableMap, promise: Promise) = launch(
    work = { SmileID.api.upload(url, request.toUploadRequest()) },
    promise = promise
  )

  @ReactMethod
  fun doEnhancedKyc(request: ReadableMap, promise: Promise) = launch(
    work = { SmileID.api.doEnhancedKyc(request = request.toEnhancedKycRequest()) },
    promise = promise
  )

  @ReactMethod
  fun doEnhancedKycAsync(request: ReadableMap, promise: Promise) = launch(
    work = { SmileID.api.doEnhancedKycAsync(request = request.toEnhancedKycRequest()) },
    promise = promise
  )

  @ReactMethod
  fun getSmartSelfieJobStatus(request: ReadableMap, promise: Promise) = launch(
    work = { SmileID.api.getSmartSelfieJobStatus(request = request.toJobStatusRequest()) },
    promise = promise
  )

  @ReactMethod
  fun getDocumentVerificationJobStatus(request: ReadableMap, promise: Promise) = launch(
    work = { SmileID.api.getDocumentVerificationJobStatus(request = request.toJobStatusRequest()) },
    promise = promise
  )

  @ReactMethod
  fun getBiometricKycJobStatus(request: ReadableMap, promise: Promise) = launch(
    work = { SmileID.api.getBiometricKycJobStatus(request = request.toJobStatusRequest()) },
    promise = promise
  )

  @ReactMethod
  fun getEnhancedDocumentVerificationJobStatus(request: ReadableMap, promise: Promise) = launch(
    work = { SmileID.api.getEnhancedDocumentVerificationJobStatus(request = request.toJobStatusRequest()) },
    promise = promise
  )

  @ReactMethod
  fun getProductsConfig(request: ReadableMap, promise: Promise) = launch(
    work = { SmileID.api.getProductsConfig(request = request.toProductsConfigRequest()) },
    promise = promise
  )

  @ReactMethod
  fun getValidDocuments(request: ReadableMap, promise: Promise) = launch(
    work = { SmileID.api.getValidDocuments(request = request.toProductsConfigRequest()) },
    promise = promise
  )

  @ReactMethod
  fun getServices(promise: Promise) = launch(
    work = { SmileID.api.getServices() },
    promise = promise
  )

  private fun <T> launch(
    work: suspend () -> T,
    promise: Promise,
    scope: CoroutineScope = CoroutineScope(Dispatchers.IO)
  ) {
    val handler = CoroutineExceptionHandler { _, throwable ->
      promise.reject(throwable.message)
    }
    scope.launch(handler) {
      promise.resolve(Result.success(work()))
    }
  }

  companion object {
    const val NAME = "RNSmileID"
  }
}
