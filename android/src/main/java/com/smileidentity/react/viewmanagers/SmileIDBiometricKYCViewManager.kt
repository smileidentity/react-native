package com.smileidentity.react.viewmanagers

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.smileidentity.react.toConsentInfo
import com.smileidentity.react.toIdInfo
import com.smileidentity.react.utils.getBoolOrDefault
import com.smileidentity.react.utils.getImmutableMapOrDefault
import com.smileidentity.react.utils.getMapOrDefault
import com.smileidentity.react.utils.getStringOrDefault
import com.smileidentity.react.views.SmileIDBiometricKYCView

@ReactModule(name = SmileIDBiometricKYCViewManager.NAME)
class SmileIDBiometricKYCViewManager(
  private val reactApplicationContext: ReactApplicationContext
) : BaseSmileIDViewManager<SmileIDBiometricKYCView>(reactApplicationContext) {

  override fun getName(): String = NAME

  override fun createSmileView(): SmileIDBiometricKYCView {
    if (smileIDView == null) {
      smileIDView = SmileIDBiometricKYCView(reactApplicationContext)
    }
    return smileIDView as SmileIDBiometricKYCView
  }

  override fun applyArgs(view: SmileIDBiometricKYCView, args: ReadableMap?) {
    args?.let {
      val idInfoMap = it.getMap("idInfo")
        ?: return view.emitFailure(IllegalArgumentException("idInfo is required to run Biometric KYC"))
      val consentInformationMap = it.getMap("consentInformation")
        ?: return view.emitFailure(IllegalArgumentException("consentInformation is required to run Biometric KYC"))
      val idInfo = idInfoMap.toIdInfo()
      view.consentInformation = consentInformationMap.toConsentInfo()
      view.extraPartnerParams = it.getImmutableMapOrDefault("extraPartnerParams")
      view.userId = it.getStringOrDefault("userId")
      view.jobId = it.getStringOrDefault("jobId")
      view.idInfo = idInfo
      view.allowAgentMode = it.getBoolOrDefault("allowAgentMode", false)
      view.showAttribution = it.getBoolOrDefault("showAttribution", true)
      view.showInstructions = it.getBoolOrDefault("showInstructions", true)
      view.allowNewEnroll = it.getBoolOrDefault("allowNewEnroll", false)
      view.renderContent()
    }
  }

  companion object {
    const val NAME = "SmileIDBiometricKYCView"
    const val COMMAND_SET_PARAMS = 6
  }
}
