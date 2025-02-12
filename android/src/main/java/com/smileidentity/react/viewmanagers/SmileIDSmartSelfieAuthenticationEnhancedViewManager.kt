package com.smileidentity.react.viewmanagers

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.smileidentity.react.utils.getBoolOrDefault
import com.smileidentity.react.utils.getImmutableMapOrDefault
import com.smileidentity.react.utils.getStringOrDefault
import com.smileidentity.react.views.SmileIDSmartSelfieAuthenticationEnhancedView
import com.smileidentity.react.views.SmileIDSmartSelfieAuthenticationView

@ReactModule(name = SmileIDSmartSelfieAuthenticationEnhancedViewManager.NAME)
class SmileIDSmartSelfieAuthenticationEnhancedViewManager(
  private val reactApplicationContext: ReactApplicationContext
) : BaseSmileIDViewManager<SmileIDSmartSelfieAuthenticationEnhancedView>(reactApplicationContext) {

  override fun getName(): String = NAME

  override fun createSmileView(): SmileIDSmartSelfieAuthenticationEnhancedView {
    if (smileIDView == null) {
      smileIDView = SmileIDSmartSelfieAuthenticationEnhancedView(reactApplicationContext)
    }
    return smileIDView as SmileIDSmartSelfieAuthenticationEnhancedView
  }

  override fun applyArgs(view: SmileIDSmartSelfieAuthenticationEnhancedView, args: ReadableMap?) {
    args?.let {
      view.extraPartnerParams = it.getImmutableMapOrDefault("extraPartnerParams")
      view.userId = it.getStringOrDefault("userId")
      view.showAttribution = it.getBoolOrDefault("showAttribution", true)
      view.showInstructions = it.getBoolOrDefault("showInstructions", true)
      view.allowNewEnroll = it.getBoolOrDefault("allowNewEnroll", false)
      view.renderContent()
    }
  }

  companion object {
    const val NAME = "SmileIDSmartSelfieAuthenticationEnhancedView"
  }
}
