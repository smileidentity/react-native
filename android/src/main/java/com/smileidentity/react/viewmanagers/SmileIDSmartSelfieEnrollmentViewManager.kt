package com.smileidentity.react.viewmanagers

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.smileidentity.react.views.SmileIDSmartSelfieEnrollment


@ReactModule(name = SmileIDSmartSelfieEnrollmentViewManager.NAME)
class SmileIDSmartSelfieEnrollmentViewManager(private val reactApplicationContext: ReactApplicationContext) :
  SimpleViewManager<SmileIDSmartSelfieEnrollment>() {
  override fun getName(): String {
    return NAME
  }

  override fun getExportedCustomBubblingEventTypeConstants(): Map<String, Any> {
    return mapOf(
      "onSmileResult" to mapOf(
        "phasedRegistrationNames" to mapOf(
          "bubbled" to "onResult"
        )
      )
    )
  }

  @ReactProp(name = "product")
  fun setProduct(view: SmileIDSmartSelfieEnrollment, product: ReadableMap) {
    view.product = product
  }

  override fun createViewInstance(p0: ThemedReactContext): SmileIDSmartSelfieEnrollment {
    return SmileIDSmartSelfieEnrollment(reactApplicationContext)
  }

  companion object {
    const val NAME = "SmileIDSmartSelfieEnrollmentView"
  }

}
