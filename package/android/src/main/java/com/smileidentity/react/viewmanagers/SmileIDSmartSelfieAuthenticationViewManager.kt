package com.smileidentity.react.viewmanagers

import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ThemedReactContext
import com.smileidentity.react.views.SmileIDSmartSelfieAuthenticationView

@ReactModule(name = SmileIDSmartSelfieAuthenticationViewManager.NAME)
class SmileIDSmartSelfieAuthenticationViewManager : BaseSmileIDViewManager<SmileIDSmartSelfieAuthenticationView>() {

  override fun getName(): String = NAME

  override fun createViewInstance(context: ThemedReactContext): SmileIDSmartSelfieAuthenticationView {
    return SmileIDSmartSelfieAuthenticationView(context)
  }

  companion object {
    const val NAME = "SmileIDSmartSelfieAuthenticationView"
  }
}
