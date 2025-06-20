package com.smileidentity.react.views

import com.facebook.react.uimanager.ThemedReactContext
import com.smileidentity.SmileID
import com.smileidentity.shared.RNSmartSelfieAuthentication

class SmileIDSmartSelfieAuthenticationView(context: ThemedReactContext) :
  SmileIDSelfieView(context) {

  override fun update() {
    setContent {
      SmileID.RNSmartSelfieAuthentication(
        config = config,
        onResult = { result ->
          handleResult(result)
        }
      )
    }
  }
}
