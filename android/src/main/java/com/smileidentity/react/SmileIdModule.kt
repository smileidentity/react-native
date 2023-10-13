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
  override fun initialize(enableCrashReporting: Boolean,useSandBox: Boolean , promise: Promise) {
    SmileID.initialize(reactApplicationContext, enableCrashReporting = enableCrashReporting, useSandbox = useSandBox)
    promise.resolve(null)
  }

  @ReactMethod
  override fun doEnhancedKycAsync(request: ReadableMap, promise: Promise) = launch(
    work = {
        SmileID.api.doEnhancedKycAsync(
          EnhancedKycRequest(
            country = request.getString("country")!!,
            idType = request.getString("idType")!!,
            idNumber = request.getString("idNumber")!!,
            firstName = request.getString("firstName"),
            middleName = request.getString("middleName"),
            lastName = request.getString("lastName"),
            dob = request.getString("dob"),
            phoneNumber = request.getString("phoneNumber"),
            bankCode = request.getString("bankCode"),
            callbackUrl = request.getString("callbackUrl"),
            partnerParams = request.partnerParams(),
            sourceSdk = "android (react-native)",
            timestamp = request.partnerParams().extras["timestamp"]!!,
            signature = request.partnerParams().extras["signature"]!!,
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
