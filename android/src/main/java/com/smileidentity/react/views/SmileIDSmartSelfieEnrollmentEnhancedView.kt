package com.smileidentity.react.views

import com.facebook.react.uimanager.ThemedReactContext
import com.smileidentity.SmileID
import com.smileidentity.shared.RNSmartSelfieEnrollmentEnhanced

class SmileIDSmartSelfieEnrollmentEnhancedView(context: ThemedReactContext) : SmileIDSelfieView(context) {
  
  override fun update() {
    setContent {
      SmileID.RNSmartSelfieEnrollmentEnhanced(
        config = config,
        onResult = { result ->
          handleResult(result)
        }
      )
    }
  }
}
