package com.smileidentity.react.views

import android.content.Context
import com.facebook.react.uimanager.ThemedReactContext
import com.smileidentity.SmileID
import com.smileidentity.shared.RNSmartSelfieEnrollment

class SmileIDSmartSelfieEnrollmentView(context: ThemedReactContext) : SmileIDView(context) {

  override fun update() {
    // Validate configuration before rendering
    if (!config.validateSelfieProperties()) {
      return
    }

    // Ensure IDs are generated if not provided
    val updatedConfig = config.ensureIds()

    setContent {
      SmileID.RNSmartSelfieEnrollment(
        config = updatedConfig,
        onResult = { result ->
          handleResult(result)
        }
      )
    }
  }
}
