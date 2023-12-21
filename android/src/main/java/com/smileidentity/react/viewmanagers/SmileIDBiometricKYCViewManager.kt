package com.smileidentity.react.viewmanagers

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.smileidentity.react.utils.*
import com.smileidentity.react.*
import com.smileidentity.react.views.SmileIDBiometricKYCView


@ReactModule(name = SmileIDBiometricKYCViewManager.NAME)
class SmileIDBiometricKYCViewManager(private val reactApplicationContext: ReactApplicationContext) :
  SimpleViewManager<SmileIDBiometricKYCView>() {
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
    view: SmileIDBiometricKYCView,
    commandId: String?,
    args: ReadableArray?
  ) {
    super.receiveCommand(view, commandId, args)
    when (commandId?.toInt()) {
      COMMAND_SET_PARAMS -> {
        // Extract params from args and apply to view
        val params = args?.getMap(0)
        params?.let {
          val idInfoMap = params.getMap("idInfo")
            ?: return view.emitFailure(IllegalArgumentException("idInfo is required to run Biometric KYC"))
          val idInfo = idInfoMap.toIdInfo()
            ?: return view.emitFailure(IllegalArgumentException("idInfo is required to run Biometric KYC"))
          view.extraPartnerParams = params.getMap("extraPartnerParams")?.toMap()
          view.userId = params.getStringOrDefault("userId")
          view.jobId = params.getStringOrDefault("jobId")
          view.idInfo = idInfo
          view.allowAgentMode = params.getBoolOrDefault("allowAgentMode", false)
          view.showAttribution = params.getBoolOrDefault("showAttribution", true)
          view.showInstructions = params.getBoolOrDefault("showInstructions", true)
          view.renderContent()
        }
      }
    }
  }

  override fun createViewInstance(p0: ThemedReactContext): SmileIDBiometricKYCView {
    return SmileIDBiometricKYCView(reactApplicationContext)
  }

  companion object {
    const val NAME = "SmileIDBiometricKYCView"
    const val COMMAND_SET_PARAMS = 6
  }

}
