package com.smileidentity.react.viewmanagers

import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.smileidentity.react.views.SmileIDDocumentVerificationView

@ReactModule(name = SmileIDDocumentVerificationViewManager.NAME)
class SmileIDDocumentVerificationViewManager : BaseSmileIDViewManager<SmileIDDocumentVerificationView>() {

  override fun getName(): String = NAME

  override fun createViewInstance(context: ThemedReactContext): SmileIDDocumentVerificationView {
    return SmileIDDocumentVerificationView(context)
  }

  companion object {
    const val NAME = "SmileIDDocumentVerificationView"
  }
}
