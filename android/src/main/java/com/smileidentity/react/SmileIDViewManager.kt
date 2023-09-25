package com.smileidentity.react

import com.facebook.react.bridge.ReactApplicationContext
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

  @ReactProp(name = "userId")
  fun setUserId(view: SmileIDView, userId: String?) {
    userId?.let {
      view.userId = it
    }
  }

  @ReactProp(name = "jobId")
  fun setJobId(view: SmileIDView, jobId: String?) {
    jobId?.let {
      view.jobId = it
    }
  }

  @ReactProp(name = "jobType")
  fun setJobType(view: SmileIDView, jobType: String?) {
    jobType?.let {
      view.jobType = it
    }
  }

  override fun createViewInstance(p0: ThemedReactContext): SmileIDView {
    return SmileIDView(mCallerContext)
  }

  companion object {
    const val NAME = "SmileIDView"
  }

}
