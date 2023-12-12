package com.smileidentity

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReadableMap

abstract class SmileIdSpec internal constructor(context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {

  abstract fun initialize(useSandBox: Boolean ,promise: Promise)

  abstract fun disableCrashReporting(promise: Promise)
  abstract fun doEnhancedKycAsync(request: ReadableMap, promise: Promise)
  abstract fun doEnhancedKyc(request: ReadableMap, promise: Promise)
}
