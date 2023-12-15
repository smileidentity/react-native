package com.smileidentity.react.viewmanagers

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.smileidentity.react.utils.getBoolOrDefault
import com.smileidentity.react.utils.getFloatOrDefault
import com.smileidentity.react.utils.getMapOrDefault
import com.smileidentity.react.utils.getStringOrDefault
import com.smileidentity.react.utils.toMap
import com.smileidentity.react.views.SmileIDDocumentVerificationView


@ReactModule(name = SmileIDDocumentVerificationViewManager.NAME)
class SmileIDDocumentVerificationViewManager(private val reactApplicationContext: ReactApplicationContext) :
  SimpleViewManager<SmileIDDocumentVerificationView>() {
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
    view: SmileIDDocumentVerificationView,
    commandId: String?,
    args: ReadableArray?
  ) {
    super.receiveCommand(view, commandId, args)
    when (commandId?.toInt()) {
      COMMAND_SET_PARAMS -> {
        // Extract params from args and apply to view
        val params = args?.getMap(0)
        params?.let {
          val countryCode = params.getString("countryCode")
            ?: return view.emitFailure(IllegalArgumentException("countryCode is required to run Document Verification"))
          view.extraPartnerParams = params.getMapOrDefault("extraPartnerParams")?.toMap()
          view.userId = params.getStringOrDefault("userId")
          view.jobId = params.getStringOrDefault("jobId")
          view.countryCode = countryCode
          view.allowAgentMode = params.getBoolOrDefault("allowAgentMode", false)
          view.showAttribution = params.getBoolOrDefault("showAttribution", true)
          view.captureBothSides = params.getBoolOrDefault("captureBothSides", false)
          view.showInstructions = params.getBoolOrDefault("showInstructions", true)
          view.allowGalleryUpload = params.getBoolOrDefault("allowGalleryUpload", false)
          view.bypassSelfieCaptureWithFilePath = params.getStringOrDefault("bypassSelfieCaptureWithFilePath", null)
          view.documentType = params.getStringOrDefault("documentType", null)
          view.idAspectRatio = params.getFloatOrDefault("idAspectRatio", -1f)
          view.renderContent()
        }
      }
    }
  }

  override fun createViewInstance(p0: ThemedReactContext): SmileIDDocumentVerificationView {
    return SmileIDDocumentVerificationView(reactApplicationContext)
  }

  companion object {
    const val NAME = "SmileIDDocumentVerificationView"
    const val COMMAND_SET_PARAMS = 4
  }

}
