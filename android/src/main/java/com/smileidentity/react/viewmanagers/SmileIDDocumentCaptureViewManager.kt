package com.smileidentity.react.viewmanagers

import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.smileidentity.react.views.SmileIDDocumentCaptureView

@ReactModule(name = SmileIDDocumentCaptureViewManager.NAME)
class SmileIDDocumentCaptureViewManager : BaseSmileIDViewManager<SmileIDDocumentCaptureView>() {

  override fun getName(): String = NAME

  override fun createViewInstance(context: ThemedReactContext): SmileIDDocumentCaptureView {
    return SmileIDDocumentCaptureView(context)
  }

  companion object {
    const val NAME = "SmileIDDocumentCaptureView"
  }
}
