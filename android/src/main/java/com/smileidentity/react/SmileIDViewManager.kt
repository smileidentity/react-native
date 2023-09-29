package com.smileidentity.react

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.smileidentity.models.JobType

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
  fun setJobType(view: SmileIDView, jobType: Int?) {
    jobType?.let {
      view.jobType = JobType.fromValue(it)
    }
  }

  @ReactProp(name = "countryCode")
  fun setCountryCode(view: SmileIDView, countryCode: String?) {
    Log.v("Japhet", "setCountryCode: $countryCode")
    countryCode?.let {
      view.countryCode = it
    }
  }

  @ReactProp(name = "idType")
  fun setIdType(view: SmileIDView, idType: String?) {
    Log.v("Japhet", "setIdType: $idType")
    idType?.let {
      view.idType = it
    }
  }

  override fun createViewInstance(p0: ThemedReactContext): SmileIDView {
    return SmileIDView(mCallerContext)
  }

  companion object {
    const val NAME = "SmileIDView"
  }

}
