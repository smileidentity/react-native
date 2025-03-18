package com.smileidentity.react.views

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.CompositionLocalProvider
import androidx.lifecycle.viewmodel.compose.LocalViewModelStoreOwner
import com.facebook.react.bridge.ReactApplicationContext
import com.smileidentity.SmileID
import com.smileidentity.SmileIDOptIn
import com.smileidentity.compose.SmartSelfieEnrollment
import com.smileidentity.compose.SmartSelfieEnrollmentEnhanced
import com.smileidentity.compose.theme.colorScheme
import com.smileidentity.compose.theme.typography
import com.smileidentity.react.results.SmartSelfieCaptureResult
import com.smileidentity.react.utils.SelfieCaptureResultAdapter
import com.smileidentity.results.SmartSelfieResult
import com.smileidentity.results.SmileIDResult
import com.smileidentity.util.randomJobId
import com.smileidentity.util.randomUserId


@OptIn(SmileIDOptIn::class)
class SmileIDSmartSelfieCaptureView(context: ReactApplicationContext) : SmileIDSelfieView(context) {
  var showConfirmation: Boolean = true
  var useStrictMode: Boolean = false

  override fun renderContent() {
    composeView.apply {
      val customViewModelStoreOwner = CustomViewModelStoreOwner()
      setContent {
        CompositionLocalProvider(LocalViewModelStoreOwner provides customViewModelStoreOwner) {
          val userId = randomUserId()
          val jobId = randomJobId()
          MaterialTheme(colorScheme = SmileID.colorScheme, typography = SmileID.typography) {
            Surface(content = {
              if (useStrictMode) {
                SmileID.SmartSelfieEnrollmentEnhanced(
                  userId = userId,
                  allowNewEnroll = allowNewEnroll ?: false,
                  showAttribution = showAttribution,
                  showInstructions = showInstructions,
                  skipApiSubmission = true,
                  extraPartnerParams = extraPartnerParams,
                  onResult = { res -> handleResultCallback(res) },
                )
              } else {
                SmileID.SmartSelfieEnrollment(
                  userId = userId,
                  jobId = jobId,
                  allowNewEnroll = allowNewEnroll ?: false,
                  allowAgentMode = allowAgentMode ?: false,
                  showAttribution = showAttribution,
                  showInstructions = showInstructions,
                  skipApiSubmission = true,
                  extraPartnerParams = extraPartnerParams,
                  onResult = { res -> handleResultCallback(res) },
                )
              }
            })
          }
        }
      }
    }
  }
}
