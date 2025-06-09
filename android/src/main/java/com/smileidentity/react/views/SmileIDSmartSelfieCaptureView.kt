package com.smileidentity.react.views

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.lifecycle.viewmodel.compose.LocalViewModelStoreOwner
import com.facebook.react.bridge.ReactApplicationContext
import com.smileidentity.SmileID
import com.smileidentity.SmileIDOptIn
import com.smileidentity.compose.SmartSelfieEnrollment
import com.smileidentity.compose.SmartSelfieEnrollmentEnhanced
import com.smileidentity.compose.theme.colorScheme
import com.smileidentity.compose.theme.typography
import com.smileidentity.util.randomJobId
import com.smileidentity.util.randomUserId

@OptIn(SmileIDOptIn::class)
class SmileIDSmartSelfieCaptureView(
  context: ReactApplicationContext,
) : SmileIDSelfieView(context) {
  var showConfirmation: Boolean = true
  var useStrictMode: Boolean = false

  override fun renderContent() {
    composeView.apply {
      val customViewModelStoreOwner = CustomViewModelStoreOwner()
      setContent {
        CompositionLocalProvider(LocalViewModelStoreOwner provides customViewModelStoreOwner) {
          if (useStrictMode) {
            val userId = randomUserId()
            MaterialTheme(colorScheme = SmileID.colorScheme, typography = SmileID.typography) {
              Surface(content = {
                SmileID.SmartSelfieEnrollmentEnhanced(
                  userId = userId,
                  showAttribution = showAttribution,
                  showInstructions = showInstructions,
                  skipApiSubmission = true,
                  extraPartnerParams = extraPartnerParams,
                  onResult = { res -> handleResultCallback(res) },
                )
              })
            }
          } else {
            MaterialTheme(colorScheme = SmileID.colorScheme, typography = SmileID.typography) {
              Surface(content = {
                SmileID.SmartSelfieEnrollment(
                  userId = randomUserId(),
                  jobId = randomJobId(),
                  allowAgentMode = allowAgentMode ?: true,
                  allowNewEnroll = false,
                  showAttribution = showAttribution,
                  showInstructions = showInstructions,
                  skipApiSubmission = true,
                  extraPartnerParams = extraPartnerParams,
                  onResult = { res -> handleResultCallback(res) }
                )
              })
            }
          }
        }
      }
    }
  }




}
