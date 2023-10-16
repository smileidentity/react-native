package com.smileidentity.react

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.smileidentity.SmileID
import com.smileidentity.SmileIdSpec
import com.smileidentity.models.EnhancedKycRequest
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
  override fun initialize(enableCrashReporting: Boolean, useSandBox: Boolean, promise: Promise) {
    SmileID.initialize(
      reactApplicationContext,
      enableCrashReporting = enableCrashReporting,
      useSandbox = useSandBox
    )
    promise.resolve(null)
  }

  @ReactMethod
  override fun doEnhancedKycAsync(product: ReadableMap, promise: Promise) = launch(
    work = {
      val partnerParams = product.partnerParams()
      partnerParams ?: run {
        IllegalArgumentException("partnerParams is required for enhanced kyc")
      }
      val country = if (product.hasKey("country")) product.getString("country") else null
      country ?: run {
        IllegalArgumentException("country is required for enhanced kyc")
      }
      val idType = if (product.hasKey("idType")) product.getString("idType") else null
      idType ?: run {
        IllegalArgumentException("idType is required for enhanced kyc")
      }
      val idNumber = if (product.hasKey("idNumber")) product.getString("idNumber") else null
      idNumber ?: run {
        IllegalArgumentException("idNumber is required for enhanced kyc")
      }
      val timestamp = partnerParams?.extras?.get("timestamp")
      timestamp ?: run {
        IllegalArgumentException("partnerParams.timestamp is required for enhanced kyc")
      }
      val signature = partnerParams?.extras?.get("signature")
      signature ?: run {
        IllegalArgumentException("partnerParams.signature is required for enhanced kyc")
      }
      SmileID.api.doEnhancedKycAsync(
        EnhancedKycRequest(
          country = country!!,
          idType = idType!!,
          idNumber = idNumber!!,
          firstName = product.getString("firstName"),
          middleName = product.getString("middleName"),
          lastName = product.getString("lastName"),
          dob = product.getString("dob"),
          phoneNumber = product.getString("phoneNumber"),
          bankCode = product.getString("bankCode"),
          callbackUrl = product.getString("callbackUrl"),
          partnerParams = partnerParams!!,
          sourceSdk = "android (react-native)",
          timestamp = timestamp!!,
          signature = signature!!,
        )
      )
    },
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
    const val NAME = "SmileID"
  }
}
