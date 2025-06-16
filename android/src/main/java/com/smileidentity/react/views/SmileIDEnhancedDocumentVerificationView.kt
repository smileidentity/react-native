package com.smileidentity.react.views

import com.facebook.react.bridge.ReactApplicationContext
import com.smileidentity.SmileID
import com.smileidentity.models.ConsentInformation
import com.smileidentity.shared.RNEnhancedDocumentVerification
import com.smileidentity.shared.SmileIDViewConfig

class SmileIDEnhancedDocumentVerificationView(context: ReactApplicationContext) :
  SmileIDView(context) {
  var countryCode: String? = null
  var allowGalleryUpload: Boolean = false
  var captureBothSides: Boolean = true
  var documentType: String? = null
  var idAspectRatio: Float? = null
  var consentInformation: ConsentInformation? = null
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
          consentInformation = consentInformation,
          useStrictMode = useStrictMode ?: false
        )

        SmileID.RNEnhancedDocumentVerification(
          config = config,
          onResult = { result ->
            handleResultCallback(result)
          }
        )
      }
    }
  }
}
