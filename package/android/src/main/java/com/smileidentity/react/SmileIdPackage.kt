package com.smileidentity.react

import com.facebook.react.TurboReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.facebook.react.uimanager.ViewManager
import com.smileidentity.react.viewmanagers.SmileIDBiometricKYCViewManager
import com.smileidentity.react.viewmanagers.SmileIDConsentViewManager
import com.smileidentity.react.viewmanagers.SmileIDDocumentCaptureViewManager
import com.smileidentity.react.viewmanagers.SmileIDDocumentVerificationViewManager
import com.smileidentity.react.viewmanagers.SmileIDEnhancedDocumentVerificationViewManager
import com.smileidentity.react.viewmanagers.SmileIDSmartSelfieAuthenticationViewManager
import com.smileidentity.react.viewmanagers.SmileIDSmartSelfieAuthenticationEnhancedViewManager
import com.smileidentity.react.viewmanagers.SmileIDSmartSelfieCaptureViewManager
import com.smileidentity.react.viewmanagers.SmileIDSmartSelfieEnrollmentViewManager
import com.smileidentity.react.viewmanagers.SmileIDSmartSelfieEnrollmentEnhancedViewManager
import com.smileidentity.react.views.SmileIDDocumentCaptureView

class SmileIdPackage : TurboReactPackage() {

  override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> =
    listOf(
      SmileIDSmartSelfieCaptureViewManager(),
      SmileIDDocumentCaptureViewManager(),
      SmileIDSmartSelfieEnrollmentViewManager(),
      SmileIDSmartSelfieAuthenticationViewManager(),
      SmileIDSmartSelfieEnrollmentEnhancedViewManager(),
      SmileIDSmartSelfieAuthenticationEnhancedViewManager(),
      SmileIDDocumentVerificationViewManager(),
      SmileIDEnhancedDocumentVerificationViewManager(),
      SmileIDConsentViewManager(),
      SmileIDBiometricKYCViewManager(),
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
