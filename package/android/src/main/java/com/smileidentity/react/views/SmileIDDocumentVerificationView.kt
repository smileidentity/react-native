package com.smileidentity.react.views

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ThemedReactContext
import com.smileidentity.SmileID
import com.smileidentity.shared.RNDocumentVerification
import com.smileidentity.shared.SmileIDViewConfig

class SmileIDDocumentVerificationView(context: ThemedReactContext) : SmileIDView(context) {

  override fun update() {
    setContent {
      SmileID.RNDocumentVerification(
        config = config,
        onResult = { result ->
          handleResult(result)
        }
      )
    }
  }
}
