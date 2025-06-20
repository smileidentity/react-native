package com.smileidentity.react.viewmanagers

import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ThemedReactContext
import com.smileidentity.react.views.SmileIDEnhancedDocumentVerificationView

@ReactModule(name = SmileIDEnhancedDocumentVerificationViewManager.NAME)
class SmileIDEnhancedDocumentVerificationViewManager : BaseSmileIDViewManager<SmileIDEnhancedDocumentVerificationView>() {

  override fun getName(): String = NAME

  override fun createViewInstance(context: ThemedReactContext): SmileIDEnhancedDocumentVerificationView {
    return SmileIDEnhancedDocumentVerificationView(context)
  }

  companion object {
    const val NAME = "SmileIDEnhancedDocumentVerificationView"
  }
}
