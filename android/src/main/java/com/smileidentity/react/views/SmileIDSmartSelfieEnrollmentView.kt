package com.smileidentity.react.views

import android.content.Context
import com.smileidentity.SmileID
import com.smileidentity.shared.RNSmartSelfieEnrollment
import com.smileidentity.shared.SmileIDViewConfig

class SmileIDSmartSelfieEnrollmentView(context: Context) : SmileIDSelfieView(context) {
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

        SmileID.RNSmartSelfieEnrollment(
          config = config,
          onResult = { result ->
            handleResultCallback(result)
          }
        )
      }
    }
  }
}
