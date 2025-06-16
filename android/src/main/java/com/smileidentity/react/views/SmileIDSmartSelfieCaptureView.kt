package com.smileidentity.react.views

import com.facebook.react.bridge.ReactApplicationContext
import com.smileidentity.SmileID
import com.smileidentity.shared.RNSmartSelfieCapture
import com.smileidentity.shared.SmileIDViewConfig

class SmileIDSmartSelfieCaptureView(context: ReactApplicationContext) : SmileIDSelfieView(context) {
  var showConfirmation: Boolean = true
  var useStrictMode: Boolean = false

  override fun renderContent() {
    composeView.apply {
      setContentWithTheme {
        val config = SmileIDViewConfig(
          userId = userId,
          jobId = jobId,
          allowAgentMode = allowAgentMode ?: false,
          showInstructions = showInstructions,
          skipApiSubmission = skipApiSubmission,
          showAttribution = showAttribution,
          extraPartnerParams = extraPartnerParams,
          showConfirmation = showConfirmation,
          useStrictMode = useStrictMode
        )

        SmileID.RNSmartSelfieCapture(
          config = config,
          onResult = { result ->
            handleResultCallback(result)
          }
        )
      }
    }
  }
}
