package com.smileidentity.react.views

import com.facebook.react.uimanager.ThemedReactContext
import com.smileidentity.SmileID
import com.smileidentity.shared.RNBiometricKYC

class SmileIDBiometricKYCView(context: ThemedReactContext) : SmileIDView(context) {

  override fun update() {
    setContent {
      SmileID.RNBiometricKYC(
        config = config,
        onResult = { result ->
          handleResult(result)
        }
      )
    }
  }
}
