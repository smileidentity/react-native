package com.smileidentity.react.views

import com.facebook.react.bridge.ReactApplicationContext
import com.smileidentity.SmileID
import com.smileidentity.shared.RNSmartSelfieEnrollmentEnhanced
import com.smileidentity.shared.SmileIDViewConfig

class SmileIDSmartSelfieEnrollmentEnhancedView(context: ReactApplicationContext) : SmileIDSelfieView(context) {
  override fun renderContent() {
    composeView.apply {
      setContentWithTheme {
        val config = SmileIDViewConfig(
          userId = userId,
          allowNewEnroll = allowNewEnroll ?: false,
          showAttribution = showAttribution,
          showInstructions = showInstructions,
          skipApiSubmission = skipApiSubmission,
          extraPartnerParams = extraPartnerParams
        )

        SmileID.RNSmartSelfieEnrollmentEnhanced(
          config = config,
          onResult = { result ->
            handleResultCallback(result)
          }
        )
      }
    }
  }
}
