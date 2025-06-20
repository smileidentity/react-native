package com.smileidentity.react.views

import com.facebook.react.uimanager.ThemedReactContext
import com.smileidentity.SmileID
import com.smileidentity.shared.RNSmartSelfieCapture

class SmileIDSmartSelfieCaptureView(context: ThemedReactContext) : SmileIDSelfieView(context) {

  override fun update() {
    setContent {
      SmileID.RNSmartSelfieCapture(
        config = config,
        onResult = { result ->
          handleResult(result)
        }
      )
    }
  }
}
