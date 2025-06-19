package com.smileidentity.react.viewmanagers

import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ThemedReactContext
import com.smileidentity.react.views.SmileIDConsentView

@ReactModule(name = SmileIDConsentViewManager.NAME)
class SmileIDConsentViewManager : BaseSmileIDViewManager<SmileIDConsentView>() {

  override fun getName(): String = NAME

  override fun createViewInstance(context: ThemedReactContext): SmileIDConsentView {
    return SmileIDConsentView(context)
  }

  companion object {
    const val NAME = "SmileIDConsentView"
  }
}
