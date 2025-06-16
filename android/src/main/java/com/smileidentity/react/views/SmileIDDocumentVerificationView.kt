package com.smileidentity.react.views

import com.facebook.react.bridge.ReactApplicationContext
import com.smileidentity.SmileID
import com.smileidentity.shared.RNDocumentVerification
import com.smileidentity.shared.SmileIDViewConfig

class SmileIDDocumentVerificationView(context: ReactApplicationContext) : SmileIDView(context) {
  var countryCode: String? = null
  var allowGalleryUpload: Boolean = false
  var captureBothSides: Boolean = true
  var bypassSelfieCaptureWithFilePath: String? = null
  var documentType: String? = null
  var idAspectRatio: Float? = null
  var useStrictMode: Boolean? = false

  override fun renderContent() {
    composeView.apply {
      setContentWithTheme {
        val config = SmileIDViewConfig(
          userId = userId,
          jobId = jobId,
          allowAgentMode = allowAgentMode ?: false,
          allowNewEnroll = allowNewEnroll ?: false,
          showInstructions = showInstructions,
          showAttribution = showAttribution,
          extraPartnerParams = extraPartnerParams,
          countryCode = countryCode,
          documentType = documentType,
          captureBothSides = captureBothSides,
          allowGalleryUpload = allowGalleryUpload,
          idAspectRatio = idAspectRatio,
          useStrictMode = useStrictMode ?: false
        )

        SmileID.RNDocumentVerification(
          config = config,
          onResult = { result ->
            handleResultCallback(result)
          }
        )
      }
    }
  }
}
