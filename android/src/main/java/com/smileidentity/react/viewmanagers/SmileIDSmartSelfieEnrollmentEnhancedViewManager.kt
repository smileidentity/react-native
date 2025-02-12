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
import com.smileidentity.react.views.SmileIDSmartSelfieEnrollmentEnhancedView
import com.smileidentity.react.views.SmileIDSmartSelfieEnrollmentView
import com.smileidentity.react.views.SmileIDView

@ReactModule(name = SmileIDSmartSelfieEnrollmentEnhancedViewManager.NAME)
class SmileIDSmartSelfieEnrollmentEnhancedViewManager(
  private val reactApplicationContext: ReactApplicationContext
) : BaseSmileIDViewManager<SmileIDSmartSelfieEnrollmentEnhancedView>(reactApplicationContext) {

  override fun getName(): String = NAME
  override fun createSmileView(): SmileIDSmartSelfieEnrollmentEnhancedView {
    if (smileIDView == null) {
      smileIDView = SmileIDSmartSelfieEnrollmentEnhancedView(reactApplicationContext)
    }
    return smileIDView as SmileIDSmartSelfieEnrollmentEnhancedView
  }

  override fun applyArgs(view: SmileIDSmartSelfieEnrollmentEnhancedView, args: ReadableMap?) {
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
    const val NAME = "SmileIDSmartSelfieEnrollmentEnhancedView"
  }
}
