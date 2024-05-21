package com.smileidentity.react

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.smileidentity.SmileID
import com.smileidentity.SmileIDCrashReporting
import com.smileidentity.SmileIdSpec
import com.smileidentity.models.EnhancedKycRequest
import com.smileidentity.networking.pollBiometricKycJobStatus
import com.smileidentity.networking.pollDocumentVerificationJobStatus
import com.smileidentity.networking.pollEnhancedDocumentVerificationJobStatus
import com.smileidentity.networking.pollSmartSelfieJobStatus
import com.smileidentity.react.utils.getIntOrDefault
import com.smileidentity.react.utils.getStringOrDefault
import kotlinx.coroutines.CoroutineExceptionHandler
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.single
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import kotlin.time.Duration
import kotlin.time.Duration.Companion.milliseconds


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
  override fun prepUpload(request: ReadableMap, promise: Promise) = launch(
    work = { SmileID.api.prepUpload(request = request.toPrepUploadRequest()) },
    promise = promise
  )

  @ReactMethod
  override fun upload(url: String, request: ReadableMap, promise: Promise) = launch(
    work = { SmileID.api.upload(url, request.toUploadRequest()) },
    promise = promise
  )

  @ReactMethod
  override fun doEnhancedKyc(request: ReadableMap, promise: Promise) = launch(
    work = { SmileID.api.doEnhancedKyc(request = request.toEnhancedKycRequest()) },
    promise = promise
  )

  @ReactMethod
  override fun doEnhancedKycAsync(request: ReadableMap, promise: Promise) = launch(
    work = { SmileID.api.doEnhancedKycAsync(request = request.toEnhancedKycRequest()) },
    promise = promise
  )

  @ReactMethod
  override fun getSmartSelfieJobStatus(request: ReadableMap, promise: Promise) = launch(
    work = { SmileID.api.getSmartSelfieJobStatus(request = request.toJobStatusRequest()) },
    promise = promise
  )

  @ReactMethod
  override fun getDocumentVerificationJobStatus(request: ReadableMap, promise: Promise) = launch(
    work = { SmileID.api.getDocumentVerificationJobStatus(request = request.toJobStatusRequest()) },
    promise = promise
  )

  @ReactMethod
  override fun getBiometricKycJobStatus(request: ReadableMap, promise: Promise) = launch(
    work = { SmileID.api.getBiometricKycJobStatus(request = request.toJobStatusRequest()) },
    promise = promise
  )

  @ReactMethod
  override fun getEnhancedDocumentVerificationJobStatus(request: ReadableMap, promise: Promise) =
    launch(
      work = { SmileID.api.getEnhancedDocumentVerificationJobStatus(request = request.toJobStatusRequest()) },
      promise = promise
    )

  @ReactMethod
  override fun getProductsConfig(request: ReadableMap, promise: Promise) = launch(
    work = { SmileID.api.getProductsConfig(request = request.toProductsConfigRequest()) },
    promise = promise
  )

  @ReactMethod
  override fun getValidDocuments(request: ReadableMap, promise: Promise) = launch(
    work = { SmileID.api.getValidDocuments(request = request.toProductsConfigRequest()) },
    promise = promise
  )

  @ReactMethod
  override fun getServices(promise: Promise) = launch(
    work = { SmileID.api.getServices() },
    promise = promise
  )

  @ReactMethod
  override fun pollSmartSelfieJobStatus(request: ReadableMap, promise: Promise) = launch(
    work = {
      val jobStatusRequest = request.toJobStatusRequest()
      val interval = request.getIntOrDefault("interval") ?: run {
        throw IllegalArgumentException("interval is required")
      }
      val numAttempts = request.getIntOrDefault("numAttempts") ?: run {
        throw IllegalArgumentException("numAttempts is required")
      }
      pollJobStatus(
        apiCall = SmileID.api::pollSmartSelfieJobStatus,
        request = jobStatusRequest,
        interval = interval.toLong(),
        numAttempts = numAttempts.toLong(),
      )
    },
    promise = promise
  )

  @ReactMethod
  override fun pollDocumentVerificationJobStatus(request: ReadableMap, promise: Promise) = launch(
    work = {
      val jobStatusRequest = request.toJobStatusRequest()
      val interval = request.getIntOrDefault("interval") ?: run {
        throw IllegalArgumentException("interval is required")
      }
      val numAttempts = request.getIntOrDefault("numAttempts") ?: run {
        throw IllegalArgumentException("numAttempts is required")
      }
      pollJobStatus(
        apiCall = SmileID.api::pollDocumentVerificationJobStatus,
        request = jobStatusRequest,
        interval = interval.toLong(),
        numAttempts = numAttempts.toLong(),
      )
    },
    promise = promise
  )

  @ReactMethod
  override fun pollBiometricKycJobStatus(request: ReadableMap, promise: Promise) = launch(
    work = {
      val jobStatusRequest = request.toJobStatusRequest()
      val interval = request.getIntOrDefault("interval") ?: run {
        throw IllegalArgumentException("interval is required")
      }
      val numAttempts = request.getIntOrDefault("numAttempts") ?: run {
        throw IllegalArgumentException("numAttempts is required")
      }
      pollJobStatus(
        apiCall = SmileID.api::pollBiometricKycJobStatus,
        request = jobStatusRequest,
        interval = interval.toLong(),
        numAttempts = numAttempts.toLong(),
      )
    },
    promise = promise
  )

  @ReactMethod
  override fun pollEnhancedDocumentVerificationJobStatus(request: ReadableMap, promise: Promise) =
    launch(
      work = {
        val jobStatusRequest = request.toJobStatusRequest()
        val interval = request.getIntOrDefault("interval") ?: run {
          throw IllegalArgumentException("interval is required")
        }
        val numAttempts = request.getIntOrDefault("numAttempts") ?: run {
          throw IllegalArgumentException("numAttempts is required")
        }
        pollJobStatus(
          apiCall = SmileID.api::pollEnhancedDocumentVerificationJobStatus,
          request = jobStatusRequest,
          interval = interval.toLong(),
          numAttempts = numAttempts.toLong(),
        )
      },
      promise = promise
    )

  private suspend fun <RequestType, ResponseType> pollJobStatus(
    apiCall: suspend (RequestType, Duration, Int) -> Flow<ResponseType>,
    request: RequestType,
    interval: Long,
    numAttempts: Long,
  ): ResponseType {
    return try {
      val response =
        withContext(Dispatchers.IO) {
          apiCall(request, interval.milliseconds, numAttempts.toInt())
            .map { it }
            .single()
        }
      response
    } catch (e: Exception) {
      throw e
    }
  }

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
