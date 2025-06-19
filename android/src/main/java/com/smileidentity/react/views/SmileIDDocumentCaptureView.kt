package com.smileidentity.react.views

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ThemedReactContext
import com.smileidentity.SmileID
import com.smileidentity.shared.RNDocumentCapture
import com.smileidentity.shared.SmileIDViewConfig

class SmileIDDocumentCaptureView(context: ThemedReactContext) : SmileIDView(context) {

  override fun update() {
    setContent {
      SmileID.RNDocumentCapture(
        config = config,
        onResult = { result ->
          handleResult(result)
        }
      )
    }
  }
}
