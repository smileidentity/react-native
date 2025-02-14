package com.smileidentity.react.viewmanagers

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.smileidentity.react.toConsentInfo
import com.smileidentity.react.toIdInfo
import com.smileidentity.react.utils.getBoolOrDefault
import com.smileidentity.react.utils.getFloatOrDefault
import com.smileidentity.react.utils.getImmutableMapOrDefault
import com.smileidentity.react.utils.getMapOrDefault
import com.smileidentity.react.utils.getStringOrDefault
import com.smileidentity.react.views.SmileIDEnhancedDocumentVerificationView
import com.smileidentity.react.views.SmileIDSmartSelfieAuthenticationEnhancedView

@ReactModule(name = SmileIDEnhancedDocumentVerificationViewManager.NAME)
class SmileIDEnhancedDocumentVerificationViewManager(
  private val reactApplicationContext: ReactApplicationContext
) : BaseSmileIDViewManager<SmileIDEnhancedDocumentVerificationView>(reactApplicationContext) {

  override fun getName(): String = NAME

  override fun createSmileView(): SmileIDEnhancedDocumentVerificationView {
    return SmileIDEnhancedDocumentVerificationView(reactApplicationContext)
  }

  override fun applyArgs(view: SmileIDEnhancedDocumentVerificationView, args: ReadableMap?) {
    args?.let {
      val countryCode = it.getString("countryCode")
        ?: return view.emitFailure(IllegalArgumentException("countryCode is required to run Enhanced Document Verification"))
      val consentInformationMap = it.getMap("consentInformation")
        ?: return view.emitFailure(IllegalArgumentException("consentInformation is required to run Biometric KYC"))
      view.consentInformation = consentInformationMap.toConsentInfo()
      view.extraPartnerParams = it.getImmutableMapOrDefault("extraPartnerParams")
      view.userId = it.getStringOrDefault("userId")
      view.jobId = it.getStringOrDefault("jobId")
      view.countryCode = countryCode
      view.allowAgentMode = it.getBoolOrDefault("allowAgentMode", false)
      view.showAttribution = it.getBoolOrDefault("showAttribution", true)
      view.captureBothSides = it.getBoolOrDefault("captureBothSides", false)
      view.showInstructions = it.getBoolOrDefault("showInstructions", true)
      view.allowGalleryUpload = it.getBoolOrDefault("allowGalleryUpload", false)
      view.documentType = it.getStringOrDefault("documentType")
      view.idAspectRatio = it.getFloatOrDefault("idAspectRatio")
      view.allowNewEnroll = it.getBoolOrDefault("allowNewEnroll", false)
      view.skipApiSubmission = it.getBoolOrDefault("skipApiSubmission", false)
    }
  }

  companion object {
    const val NAME = "SmileIDEnhancedDocumentVerificationView"
  }
}
