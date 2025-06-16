package com.smileidentity.react.views

import com.facebook.react.bridge.ReactApplicationContext
import com.smileidentity.SmileID
import com.smileidentity.models.ConsentInformation
import com.smileidentity.models.IdInfo
import com.smileidentity.shared.RNBiometricKYC
import com.smileidentity.shared.SmileIDViewConfig

class SmileIDBiometricKYCView(context: ReactApplicationContext) : SmileIDView(context) {
  var idInfo: IdInfo? = null
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
          idInfo = idInfo,
          consentInformation = consentInformation,
          useStrictMode = useStrictMode ?: false
        )

        SmileID.RNBiometricKYC(
          config = config,
          onResult = { result ->
            handleResultCallback(result)
          }
        )
      }
    }
  }
}
