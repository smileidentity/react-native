package com.smileidentity.react.viewmanagers

import com.facebook.react.bridge.ReadableMap
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp
import com.smileidentity.react.toConsentInfo
import com.smileidentity.react.toIdInfo
import com.smileidentity.react.views.SmileIDView
import kotlinx.collections.immutable.toImmutableMap

abstract class BaseSmileIDViewManager<T : SmileIDView> : ViewGroupManager<T>() {

  abstract override fun createViewInstance(context: ThemedReactContext): T

  override fun getExportedCustomDirectEventTypeConstants(): MutableMap<String, Any>? =
    MapBuilder.builder<String, Any>()
      .put("topSmileIDResult", MapBuilder.of("registrationName", "onSmileIDResult"))
      .put("topSmileIDError", MapBuilder.of("registrationName", "onSmileIDError"))
      .build()

  override fun onAfterUpdateTransaction(view: T) {
    super.onAfterUpdateTransaction(view)
    view.update()
  }

  override fun onDropViewInstance(view: T) {
    view.cleanup()
    super.onDropViewInstance(view)
  }

  @ReactProp(name = "config")
  fun setConfig(view: T, config: ReadableMap?) {
    if (config == null) return
    
    // Update the configuration from the map
    config.getString("userId")?.let { view.config.userId = it }
    config.getString("jobId")?.let { view.config.jobId = it }
    
    if (config.hasKey("allowAgentMode")) {
      view.config.allowAgentMode = config.getBoolean("allowAgentMode")
    }
    
    if (config.hasKey("allowNewEnroll")) {
      view.config.allowNewEnroll = config.getBoolean("allowNewEnroll")
    }
    
    if (config.hasKey("showInstructions")) {
      view.config.showInstructions = config.getBoolean("showInstructions")
    }
    
    if (config.hasKey("skipApiSubmission")) {
      view.config.skipApiSubmission = config.getBoolean("skipApiSubmission")
    }
    
    if (config.hasKey("showAttribution")) {
      view.config.showAttribution = config.getBoolean("showAttribution")
    }
    
    // Handle extraPartnerParams
    config.getMap("extraPartnerParams")?.let { paramsMap ->
      val map = mutableMapOf<String, String>()
      val iterator = paramsMap.keySetIterator()
      while (iterator.hasNextKey()) {
        val key = iterator.nextKey()
        paramsMap.getString(key)?.let { value ->
          map[key] = value
        }
      }
      view.config.extraPartnerParams = map.toImmutableMap()
    }
    
    // Document-specific props
    config.getString("countryCode")?.let { view.config.countryCode = it }
    config.getString("documentType")?.let { view.config.documentType = it }
    
    if (config.hasKey("captureBothSides")) {
      view.config.captureBothSides = config.getBoolean("captureBothSides")
    }
    
    if (config.hasKey("allowGalleryUpload")) {
      view.config.allowGalleryUpload = config.getBoolean("allowGalleryUpload")
    }
    
    if (config.hasKey("showConfirmation")) {
      view.config.showConfirmation = config.getBoolean("showConfirmation")
    }
    
    if (config.hasKey("idAspectRatio")) {
      view.config.idAspectRatio = config.getDouble("idAspectRatio").toFloat()
    }
    
    if (config.hasKey("isDocumentFrontSide")) {
      view.config.isDocumentFrontSide = config.getBoolean("isDocumentFrontSide")
    }
    
    // Handle both property names for backward compatibility
    config.getString("bypassSelfieCaptureWithFile")?.let { 
      view.config.bypassSelfieCaptureWithFilePath = it 
    }
    config.getString("bypassSelfieCaptureWithFilePath")?.let { 
      view.config.bypassSelfieCaptureWithFilePath = it 
    }
    
    // Capture-specific props
    if (config.hasKey("useStrictMode")) {
      view.config.useStrictMode = config.getBoolean("useStrictMode")
    }
    
    // Consent-specific props
    config.getString("partnerName")?.let { view.config.partnerName = it }
    config.getString("partnerPrivacyPolicy")?.let { view.config.partnerPrivacyPolicy = it }
    config.getString("partnerIcon")?.let { view.config.logoResName = it }
    config.getString("productName")?.let { view.config.productName = it }
    
    // KYC-specific props
    config.getMap("idInfo")?.let { idInfoMap ->
      view.config.idInfo = idInfoMap.toIdInfo()
    }
    
    config.getMap("consentInformation")?.let { consentInfoMap ->
      view.config.consentInformation = consentInfoMap.toConsentInfo()
    }
  }
}
