package com.smileidentity.react.viewmanagers

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.smileidentity.react.views.SmileIDSmartSelfieEnrollmentView


@ReactModule(name = SmileIDSmartSelfieEnrollmentViewManager.NAME)
class SmileIDSmartSelfieEnrollmentViewManager(private val reactApplicationContext: ReactApplicationContext) :
  SimpleViewManager<SmileIDSmartSelfieEnrollmentView>() {
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

  @ReactProp(name = "params")
  fun setParams(view: SmileIDSmartSelfieEnrollmentView, params: ReadableMap) {
    view.params = params
  }

  override fun createViewInstance(p0: ThemedReactContext): SmileIDSmartSelfieEnrollmentView {
    return SmileIDSmartSelfieEnrollmentView(reactApplicationContext)
  }

  companion object {
    const val NAME = "SmileIDSmartSelfieEnrollmentView"
  }

}
