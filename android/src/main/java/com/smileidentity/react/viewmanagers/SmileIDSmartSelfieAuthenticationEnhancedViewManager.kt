package com.smileidentity.react.viewmanagers

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.smileidentity.react.utils.getBoolOrDefault
import com.smileidentity.react.utils.getImmutableMapOrDefault
import com.smileidentity.react.utils.getStringOrDefault
import com.smileidentity.react.views.SmileIDSmartSelfieAuthenticationEnhancedView

@ReactModule(name = SmileIDSmartSelfieAuthenticationEnhancedViewManager.NAME)
class SmileIDSmartSelfieAuthenticationEnhancedViewManager(
  private val reactApplicationContext: ReactApplicationContext
) : SimpleViewManager<SmileIDSmartSelfieAuthenticationEnhancedView>() {

  override fun getName(): String = NAME

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
    view: SmileIDSmartSelfieAuthenticationEnhancedView,
    commandId: String?,
    args: ReadableArray?
  ) {
    super.receiveCommand(view, commandId, args)
    when (commandId?.toInt()) {
      COMMAND_SET_PARAMS -> {
        // Extract params from args and apply to view
        val params = args?.getMap(0)
        params?.let {
          view.extraPartnerParams = params.getImmutableMapOrDefault("extraPartnerParams")
          view.userId = params.getStringOrDefault("userId")
          view.showAttribution = params.getBoolOrDefault("showAttribution", true)
          view.showInstructions = params.getBoolOrDefault("showInstructions", true)
          view.allowNewEnroll = params.getBoolOrDefault("allowNewEnroll", false)
          view.renderContent()
        }
      }
    }
  }

  override fun createViewInstance(p0: ThemedReactContext): SmileIDSmartSelfieAuthenticationEnhancedView {
    return SmileIDSmartSelfieAuthenticationEnhancedView(reactApplicationContext)
  }

  companion object {
    const val NAME = "SmileIDSmartSelfieAuthenticationEnhancedView"
    const val COMMAND_SET_PARAMS = 2
  }
}
