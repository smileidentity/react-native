package com.smileidentity.react.viewmanagers

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.smileidentity.react.utils.getBoolOrDefault
import com.smileidentity.react.utils.getStringOrDefault
import com.smileidentity.react.views.SmileIDDocumentCaptureView

@ReactModule(name = SmileIDDocumentCaptureViewManager.NAME)
class SmileIDDocumentCaptureViewManager(
  private val reactApplicationContext: ReactApplicationContext
) : SimpleViewManager<SmileIDDocumentCaptureView>() {
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
    view: SmileIDDocumentCaptureView,
    commandId: String?,
    args: ReadableArray?
  ) {
    super.receiveCommand(view, commandId, args)
    when (commandId?.toInt()) {
      COMMAND_SET_PARAMS -> {
        // Extract params from args and apply to view
        val params = args?.getMap(0)
        params?.let {
          view.userId = params.getStringOrDefault("userId")
          view.jobId = params.getStringOrDefault("jobId")
          view.allowAgentMode = params.getBoolOrDefault("allowAgentMode", false)
          view.showAttribution = params.getBoolOrDefault("showAttribution", true)
          view.showInstructions = params.getBoolOrDefault("showInstructions", true)
          view.showConfirmation = params.getBoolOrDefault("showConfirmation", true)
          view.renderContent()
        }
      }
    }
  }

  override fun createViewInstance(p0: ThemedReactContext): SmileIDDocumentCaptureView {
    return SmileIDDocumentCaptureView(reactApplicationContext)
  }

  companion object {
    const val NAME = "SmileIDDocumentCaptureView"
    const val COMMAND_SET_PARAMS = 1
  }
}
