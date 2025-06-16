package com.smileidentity.react.views

import com.facebook.react.bridge.ReactApplicationContext
import com.smileidentity.SmileID
import com.smileidentity.shared.RNConsent
import com.smileidentity.shared.SmileIDViewConfig

class SmileIDConsentView(context: ReactApplicationContext) : SmileIDView(context) {
  var partnerName : String? = null
  var partnerPrivacyPolicy : String? = null
  var logoResName : String? = null
  var productName : String? = null

  override fun renderContent() {
    composeView.apply {
      setContentWithTheme {
        val config = SmileIDViewConfig(
          partnerName = partnerName,
          partnerPrivacyPolicy = partnerPrivacyPolicy,
          logoResName = logoResName,
          productName = productName
        )

        SmileID.RNConsent(
          config = config,
          onResult = { result ->
            handleResultCallback(result)
          }
        )
      }
    }
  }
}
