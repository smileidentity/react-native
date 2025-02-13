package com.smileidentity.react.viewmanagers

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.smileidentity.react.utils.getBoolOrDefault
import com.smileidentity.react.utils.getStringOrDefault
import com.smileidentity.react.views.SmileIDDocumentCaptureView
import com.smileidentity.react.views.SmileIDDocumentVerificationView

@ReactModule(name = SmileIDDocumentCaptureViewManager.NAME)
class SmileIDDocumentCaptureViewManager(
  private val reactApplicationContext: ReactApplicationContext
) : BaseSmileIDViewManager<SmileIDDocumentCaptureView>(reactApplicationContext) {
  override fun getName(): String = NAME

  override fun createSmileView(): SmileIDDocumentCaptureView {
    if (smileIDView == null) {
      smileIDView = SmileIDDocumentCaptureView(reactApplicationContext)
    }
    return smileIDView as SmileIDDocumentCaptureView
  }

  override fun applyArgs(view: SmileIDDocumentCaptureView, args: ReadableMap?) {
    args?.let {
      view.userId = it.getStringOrDefault("userId")
      view.jobId = it.getStringOrDefault("jobId")
      view.allowAgentMode = it.getBoolOrDefault("allowAgentMode", true)
      view.showAttribution = it.getBoolOrDefault("showAttribution", true)
      view.showInstructions = it.getBoolOrDefault("showInstructions", true)
      view.showConfirmation = it.getBoolOrDefault("showConfirmation", true)
      view.allowGalleryUpload = it.getBoolOrDefault("allowGalleryUpload", false)
      view.front = it.getBoolOrDefault("isDocumentFrontSide", true)
    }
  }

  companion object {
    const val NAME = "SmileIDDocumentCaptureView"
  }
}
