package com.smileidentity.react.views

import com.facebook.react.uimanager.ThemedReactContext
import com.smileidentity.SmileID
import com.smileidentity.shared.RNSmartSelfieAuthenticationEnhanced

class SmileIDSmartSelfieAuthenticationEnhancedView(context: ThemedReactContext) :
  SmileIDSelfieView(context) {

  override fun update() {
    setContent {
      SmileID.RNSmartSelfieAuthenticationEnhanced(
        config = config,
        onResult = { result ->
          handleResult(result)
        }
      )
    }
  }
}
