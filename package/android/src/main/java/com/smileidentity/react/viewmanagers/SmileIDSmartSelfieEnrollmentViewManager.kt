package com.smileidentity.react.viewmanagers

import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ThemedReactContext
import com.smileidentity.react.views.SmileIDSmartSelfieEnrollmentView

@ReactModule(name = SmileIDSmartSelfieEnrollmentViewManager.NAME)
class SmileIDSmartSelfieEnrollmentViewManager : BaseSmileIDViewManager<SmileIDSmartSelfieEnrollmentView>() {
  
  override fun getName(): String = NAME

  override fun createViewInstance(context: ThemedReactContext): SmileIDSmartSelfieEnrollmentView {
    return SmileIDSmartSelfieEnrollmentView(context)
  }

  companion object {
    const val NAME = "SmileIDSmartSelfieEnrollmentView"
  }
}
