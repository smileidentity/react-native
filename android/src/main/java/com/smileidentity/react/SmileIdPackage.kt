package com.smileidentity.react

import com.facebook.react.TurboReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.facebook.react.uimanager.ViewManager
import com.smileidentity.react.viewmanagers.SmileIDBiometricKYCViewManager
import com.smileidentity.react.viewmanagers.SmileIDConsentViewManager
import com.smileidentity.react.viewmanagers.SmileIDDocumentVerificationViewManager
import com.smileidentity.react.viewmanagers.SmileIDEnhancedDocumentVerificationViewManager
import com.smileidentity.react.viewmanagers.SmileIDSmartSelfieAuthenticationViewManager
import com.smileidentity.react.viewmanagers.SmileIDSmartSelfieCaptureViewManager
import com.smileidentity.react.viewmanagers.SmileIDSmartSelfieEnrollmentViewManager

class SmileIdPackage : TurboReactPackage() {

  override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> =
    listOf(
      SmileIDSmartSelfieCaptureViewManager(reactContext),
      SmileIDSmartSelfieEnrollmentViewManager(reactContext),
      SmileIDSmartSelfieAuthenticationViewManager(reactContext),
      SmileIDDocumentVerificationViewManager(reactContext),
      SmileIDEnhancedDocumentVerificationViewManager(reactContext),
      SmileIDConsentViewManager(reactContext),
      SmileIDBiometricKYCViewManager(reactContext),
    )

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

      moduleInfos[SmileIdModule.NAME] = ReactModuleInfo(
        SmileIdModule.NAME,
        SmileIdModule.NAME,
        false,  // canOverrideExistingModule
        false,  // needsEagerInit
        true,  // hasConstants
        false,  // isCxxModule
        false // isTurboModule
      )
      moduleInfos
    }
  }
}
