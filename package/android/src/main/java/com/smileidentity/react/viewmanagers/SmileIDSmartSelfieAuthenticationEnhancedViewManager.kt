package com.smileidentity.react.viewmanagers

import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ThemedReactContext
import com.smileidentity.react.views.SmileIDSmartSelfieAuthenticationEnhancedView

@ReactModule(name = SmileIDSmartSelfieAuthenticationEnhancedViewManager.NAME)
class SmileIDSmartSelfieAuthenticationEnhancedViewManager : BaseSmileIDViewManager<SmileIDSmartSelfieAuthenticationEnhancedView>() {

  override fun getName(): String = NAME

  override fun createViewInstance(context: ThemedReactContext): SmileIDSmartSelfieAuthenticationEnhancedView {
    return SmileIDSmartSelfieAuthenticationEnhancedView(context)
  }

  companion object {
    const val NAME = "SmileIDSmartSelfieAuthenticationEnhancedView"
  }
}
