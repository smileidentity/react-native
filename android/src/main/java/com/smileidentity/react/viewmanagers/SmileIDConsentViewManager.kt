package com.smileidentity.react.viewmanagers

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.smileidentity.react.utils.getBoolOrDefault
import com.smileidentity.react.utils.getMapOrDefault
import com.smileidentity.react.utils.getStringOrDefault
import com.smileidentity.react.utils.toMap
import com.smileidentity.react.views.SmileIDConsentView


@ReactModule(name = SmileIDConsentViewManager.NAME)
class SmileIDConsentViewManager(private val reactApplicationContext: ReactApplicationContext) :
  SimpleViewManager<SmileIDConsentView>() {
  override fun getName(): String {
    return NAME
  }

  override fun getExportedCustomBubblingEventTypeConstants(): Map<String, Any> {
    return mapOf(
      "onSmileResult" to mapOf(
        "phasedRegistrationNames" to mapOf(
          "bubbled" to "onResult"
        )
      )
    )
  }

  override fun getCommandsMap(): Map<String, Int> {
    return mapOf("setParams" to COMMAND_SET_PARAMS)
  }

  override fun receiveCommand(
    view: SmileIDConsentView,
    commandId: String?,
    args: ReadableArray?
  ) {
    super.receiveCommand(view, commandId, args)
    when (commandId?.toInt()) {
      COMMAND_SET_PARAMS -> {
        // Extract params from args and apply to view
        val params = args?.getMap(0)
        params?.let {

          val partnerName = params.getString("partnerName") ?: return view.emitFailure(IllegalArgumentException("partnerName is required to show Consent Screen"))
          val partnerPrivacyPolicy = params.getString("partnerPrivacyPolicy") ?: return view.emitFailure(IllegalArgumentException("partnerPrivacyPolicy is required to show Consent Screen"))
          val logoResName = params.getString("partnerIcon") ?: return view.emitFailure(IllegalArgumentException("partnerIcon is required to show Consent Screen"))
          val productName = params.getString("productName") ?: return view.emitFailure(IllegalArgumentException("productName is required to show Consent Screen"))

          view.extraPartnerParams = params.getMapOrDefault("extraPartnerParams",null)?.toMap()
          view.userId = params.getStringOrDefault("userId",null)
          view.jobId = params.getStringOrDefault("jobId",null)
          view.partnerName = partnerName
          view.partnerPrivacyPolicy = partnerPrivacyPolicy
          view.logoResName = logoResName
          view.productName = productName
          view.allowAgentMode = params.getBoolOrDefault("allowAgentMode",false)
          view.showAttribution = params.getBoolOrDefault("showAttribution",true)
          view.showInstructions = params.getBoolOrDefault("showInstructions",true)
          view.renderContent()
        }
      }
    }
  }
  override fun createViewInstance(p0: ThemedReactContext): SmileIDConsentView {
    return SmileIDConsentView(reactApplicationContext)
  }

  companion object {
    const val NAME = "SmileIDConsentView"
    const val COMMAND_SET_PARAMS = 5
  }

}
