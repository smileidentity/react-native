package com.smileidentity.react.views

import com.facebook.react.uimanager.ThemedReactContext
import com.smileidentity.SmileID
import com.smileidentity.shared.RNEnhancedDocumentVerification

class SmileIDEnhancedDocumentVerificationView(context: ThemedReactContext) :
  SmileIDView(context) {

  override fun update() {
    setContent {
      SmileID.RNEnhancedDocumentVerification(
        config = config,
        onResult = { result ->
          handleResult(result)
        }
      )
    }
  }
}
