package com.smileidentity.expo.views

import android.content.Context
import androidx.compose.runtime.Composable
import com.smileidentity.SmileID
import com.smileidentity.shared.RNSmartSelfieCapture
import com.smileidentity.shared.SmileIDViewConfig
import expo.modules.kotlin.AppContext

/**
 * Example Expo implementation of SmartSelfieCapture using the new architecture
 */
class SmileIDExpoSmartSelfieCaptureView(
    context: Context,
    appContext: AppContext
) : SmileIDExpoView(context, appContext) {

    var showConfirmation: Boolean = true
    var useStrictMode: Boolean = false

    override fun renderContent() {
        setContentWithTheme {
            RenderSmartSelfieCaptureContent()
        }
    }

    @Composable
    private fun RenderSmartSelfieCaptureContent() {
      val config = SmileIDViewConfig(
        userId = userId,
        jobId = jobId,
        allowAgentMode = allowAgentMode ?: false,
        showInstructions = showInstructions,
        skipApiSubmission = skipApiSubmission,
        showAttribution = showAttribution,
        extraPartnerParams = extraPartnerParams,
        showConfirmation = showConfirmation,
        useStrictMode = useStrictMode
      )

      SmileID.RNSmartSelfieCapture(
        config = config,
        onResult = { result ->
          handleResultCallback(result)
        }
      )
    }
}
