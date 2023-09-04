package com.smileidentity.react

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext

@ReactModule(name = SmileViewManager.NAME)
class SmileViewManager(private val mCallerContext: ReactApplicationContext) :
  SimpleViewManager<SmileIDView>() {
  override fun getName(): String {
    return NAME
  }

  override fun createViewInstance(p0: ThemedReactContext): SmileIDView {
    return SmileIDView(mCallerContext.currentActivity!!)
  }

  companion object {
    const val NAME = "SmileIDView"
  }

}
