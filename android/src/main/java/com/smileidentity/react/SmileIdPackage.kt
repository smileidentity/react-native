package com.smileidentity.react

import com.facebook.react.TurboReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.facebook.react.uimanager.ViewManager
import java.util.Collections

class SmileIdPackage : TurboReactPackage() {

  override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> =
    Collections.singletonList(SmileIDViewManager(reactContext))

  override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
    return if (name == SmileIdModule.NAME) {
      SmileIdModule(reactContext)
    } else {
      null
    }
  }

  override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
    return ReactModuleInfoProvider {
      val moduleInfos: MutableMap<String, ReactModuleInfo> = HashMap()
      val isTurboModule: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
      moduleInfos[SmileIdModule.NAME] = ReactModuleInfo(
        SmileIdModule.NAME,
        SmileIdModule.NAME,
        false,  // canOverrideExistingModule
        false,  // needsEagerInit
        true,  // hasConstants
        false,  // isCxxModule
        isTurboModule // isTurboModule
      )
      moduleInfos
    }
  }
}
