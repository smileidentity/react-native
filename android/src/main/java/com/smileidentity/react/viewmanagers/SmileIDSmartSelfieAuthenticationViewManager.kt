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
import com.smileidentity.react.views.SmileIDSmartSelfieAuthenticationView
import com.smileidentity.react.views.SmileIDSmartSelfieCaptureView
import com.smileidentity.react.views.SmileIDSmartSelfieEnrollmentEnhancedView

@ReactModule(name = SmileIDSmartSelfieAuthenticationViewManager.NAME)
class SmileIDSmartSelfieAuthenticationViewManager(
  private val reactApplicationContext: ReactApplicationContext
) : BaseSmileIDViewManager<SmileIDSmartSelfieAuthenticationView>(reactApplicationContext) {

  override fun getName(): String = NAME

  override fun createSmileView(): SmileIDSmartSelfieAuthenticationView {
    if (smileIDView == null) {
      smileIDView = SmileIDSmartSelfieAuthenticationView(reactApplicationContext)
    }
    return smileIDView as SmileIDSmartSelfieAuthenticationView
  }

  override fun applyArgs(view: SmileIDSmartSelfieAuthenticationView, args: ReadableMap?) {
    args?.let {
      view.extraPartnerParams = it.getImmutableMapOrDefault("extraPartnerParams")
      view.userId = it.getStringOrDefault("userId")
      view.jobId = it.getStringOrDefault("jobId")
      view.allowAgentMode = it.getBoolOrDefault("allowAgentMode", false)
      view.showAttribution = it.getBoolOrDefault("showAttribution", true)
      view.showInstructions = it.getBoolOrDefault("showInstructions", true)
      view.allowNewEnroll = it.getBoolOrDefault("allowNewEnroll", false)
      view.skipApiSubmission = it.getBoolOrDefault("skipApiSubmission", false)
      view.renderContent()
    }
  }

  companion object {
    const val NAME = "SmileIDSmartSelfieAuthenticationView"
  }
}
