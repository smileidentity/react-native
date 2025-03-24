package com.smileidentity.react.views

import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.lifecycle.viewmodel.compose.LocalViewModelStoreOwner
import com.facebook.react.bridge.ReactApplicationContext
import com.smileidentity.SmileID
import com.smileidentity.compose.SmartSelfieEnrollmentEnhanced
import com.smileidentity.react.results.SmartSelfieCaptureResult
import com.smileidentity.react.utils.SelfieCaptureResultAdapter
import com.smileidentity.results.SmartSelfieResult
import com.smileidentity.results.SmileIDResult
import com.smileidentity.util.randomUserId
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.launch

class SmileIDSmartSelfieEnrollmentEnhancedView(context: ReactApplicationContext) : SmileIDSelfieView(context) {
  override fun renderContent() {
    composeView.apply {
      setContent {
        val customViewModelStoreOwner = CustomViewModelStoreOwner()
        CompositionLocalProvider(LocalViewModelStoreOwner provides customViewModelStoreOwner) {
          SmileID.SmartSelfieEnrollmentEnhanced(
            userId = userId ?: rememberSaveable { randomUserId() },
            allowNewEnroll = allowNewEnroll ?: false,
            showAttribution = showAttribution,
            showInstructions = showInstructions,
            skipApiSubmission = skipApiSubmission,
            extraPartnerParams = extraPartnerParams,
            onResult = { res -> handleResultCallback(res) },
          )
        }
      }
    }
  }
}
