package com.smileidentity.react.viewmanagers

import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ThemedReactContext
import com.smileidentity.react.views.SmileIDBiometricKYCView

@ReactModule(name = SmileIDBiometricKYCViewManager.NAME)
class SmileIDBiometricKYCViewManager : BaseSmileIDViewManager<SmileIDBiometricKYCView>() {
  
  override fun getName(): String = NAME

  override fun createViewInstance(context: ThemedReactContext): SmileIDBiometricKYCView {
    return SmileIDBiometricKYCView(context)
  }

  companion object {
    const val NAME = "SmileIDBiometricKYCView"
  }
}
