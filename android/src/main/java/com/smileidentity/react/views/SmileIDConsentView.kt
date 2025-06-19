package com.smileidentity.react.views

import com.facebook.react.uimanager.ThemedReactContext
import com.smileidentity.SmileID
import com.smileidentity.shared.RNConsent

class SmileIDConsentView(context: ThemedReactContext) : SmileIDView(context) {

  override fun update() {
    setContent {
      SmileID.RNConsent(
        config = config,
        onResult = { result ->
          handleResult(result)
        }
      )
    }
  }
}
