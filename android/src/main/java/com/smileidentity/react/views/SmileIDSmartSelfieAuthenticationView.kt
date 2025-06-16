package com.smileidentity.react.views

import com.facebook.react.bridge.ReactApplicationContext
import com.smileidentity.SmileID
import com.smileidentity.react.results.SmartSelfieCaptureResult
import com.smileidentity.react.utils.SelfieCaptureResultAdapter
import com.smileidentity.results.SmartSelfieResult
import com.smileidentity.shared.RNSmartSelfieAuthentication
import com.smileidentity.shared.SmileIDSharedResult
import com.smileidentity.shared.SmileIDViewConfig

class SmileIDSmartSelfieAuthenticationView(context: ReactApplicationContext) :
  SmileIDSelfieView(context) {

  override fun renderContent() {
    composeView.apply {
      setContentWithTheme {
        val config = SmileIDViewConfig(
          userId = userId,
          jobId = jobId,
          allowAgentMode = allowAgentMode ?: false,
          allowNewEnroll = allowNewEnroll ?: false,
          showInstructions = showInstructions,
          skipApiSubmission = skipApiSubmission,
          showAttribution = showAttribution,
          extraPartnerParams = extraPartnerParams
        )

        SmileID.RNSmartSelfieAuthentication(
          config = config,
          onResult = { result ->
            handleResultCallback(result)
          }
        )
      }
    }
  }
}
