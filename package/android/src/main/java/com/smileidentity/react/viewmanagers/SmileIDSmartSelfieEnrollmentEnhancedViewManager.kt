package com.smileidentity.react.viewmanagers

import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ThemedReactContext
import com.smileidentity.react.views.SmileIDSmartSelfieEnrollmentEnhancedView

@ReactModule(name = SmileIDSmartSelfieEnrollmentEnhancedViewManager.NAME)
class SmileIDSmartSelfieEnrollmentEnhancedViewManager : BaseSmileIDViewManager<SmileIDSmartSelfieEnrollmentEnhancedView>() {

  override fun getName(): String = NAME
  
  override fun createViewInstance(context: ThemedReactContext): SmileIDSmartSelfieEnrollmentEnhancedView {
    return SmileIDSmartSelfieEnrollmentEnhancedView(context)
  }

  companion object {
    const val NAME = "SmileIDSmartSelfieEnrollmentEnhancedView"
  }
}
