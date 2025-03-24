package com.smileidentity.react.views

import android.content.Context
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.lifecycle.viewmodel.compose.LocalViewModelStoreOwner
import com.smileidentity.SmileID
import com.smileidentity.compose.SmartSelfieEnrollment
import com.smileidentity.react.results.SmartSelfieCaptureResult
import com.smileidentity.react.utils.SelfieCaptureResultAdapter
import com.smileidentity.results.SmartSelfieResult
import com.smileidentity.results.SmileIDResult
import com.smileidentity.util.randomJobId
import com.smileidentity.util.randomUserId

class SmileIDSmartSelfieEnrollmentView(context: Context) : SmileIDSelfieView(context) {
  override fun renderContent() {
    composeView.apply {
      setContent {
        val customViewModelStoreOwner = CustomViewModelStoreOwner()
        CompositionLocalProvider(LocalViewModelStoreOwner provides customViewModelStoreOwner) {
          SmileID.SmartSelfieEnrollment(
            userId = userId ?: rememberSaveable { randomUserId() },
            jobId = jobId ?: rememberSaveable { randomJobId() },
            allowAgentMode = allowAgentMode ?: false,
            allowNewEnroll = allowNewEnroll ?: false,
            showAttribution = showAttribution,
            showInstructions = showInstructions,
            skipApiSubmission = skipApiSubmission,
            extraPartnerParams = extraPartnerParams,
            onResult = { res -> handleResultCallback(res)},
          )
        }
      }
    }
  }
}
