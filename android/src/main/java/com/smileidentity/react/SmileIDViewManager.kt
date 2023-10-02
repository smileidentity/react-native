package com.smileidentity.react

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp


@ReactModule(name = SmileIDViewManager.NAME)
class SmileIDViewManager(private val mCallerContext: ReactApplicationContext) :
  SimpleViewManager<SmileIDView>() {
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
  fun setProduct(view: SmileIDView, product: ReadableMap) {
    view.product = product
  }

  override fun createViewInstance(p0: ThemedReactContext): SmileIDView {
    return SmileIDView(mCallerContext)
  }

  companion object {
    const val NAME = "SmileIDView"
  }

}
