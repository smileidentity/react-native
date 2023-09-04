package com.smileidentity.react

import androidx.compose.runtime.Composable
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReadableMap
import com.smileidentity.SmileID
import com.smileidentity.SmileIdSpec
import com.smileidentity.compose.SmartSelfieEnrollment

class SmileIdModule internal constructor(context: ReactApplicationContext) :
  SmileIdSpec(context) {

  override fun getName(): String {
    return NAME
  }

  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  @ReactMethod
  override fun initialize(promise: Promise) {
    SmileID.initialize(reactApplicationContext)
    promise.resolve(null)
  }

  companion object {
    const val NAME = "SmileId"
  }
}
