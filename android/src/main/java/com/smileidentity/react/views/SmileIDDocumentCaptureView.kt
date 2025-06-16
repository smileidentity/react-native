package com.smileidentity.react.views

import com.facebook.react.bridge.ReactApplicationContext
import com.smileidentity.SmileID
import com.smileidentity.shared.RNDocumentCapture
import com.smileidentity.shared.SmileIDViewConfig

class SmileIDDocumentCaptureView(context: ReactApplicationContext) : SmileIDView(context) {
  var showConfirmation: Boolean = true
  var front: Boolean = true
  var allowGalleryUpload: Boolean = false
  var idAspectRatio: Float? = null
  var countryCode: String? = null
  var documentType: String? = null
  var captureBothSides: Boolean = true

  override fun renderContent() {
    composeView.apply {
      setContentWithTheme {
        val config = SmileIDViewConfig(
          userId = userId,
          jobId = jobId,
          showInstructions = showInstructions,
          showAttribution = showAttribution,
          extraPartnerParams = extraPartnerParams,
          countryCode = countryCode,
          documentType = documentType,
          captureBothSides = captureBothSides,
          allowGalleryUpload = allowGalleryUpload,
          showConfirmation = showConfirmation,
          idAspectRatio = idAspectRatio
        )

        SmileID.RNDocumentCapture(
          config = config,
          onResult = { result ->
            handleResultCallback(result)
          }
        )
      }
    }
  }
}
