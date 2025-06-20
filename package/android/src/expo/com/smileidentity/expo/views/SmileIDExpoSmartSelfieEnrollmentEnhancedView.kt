package com.smileidentity.expo.views

import android.content.Context
import androidx.compose.runtime.Composable
import com.smileidentity.SmileID
import com.smileidentity.shared.RNSmartSelfieEnrollmentEnhanced
import com.smileidentity.shared.SmileIDViewConfig
import expo.modules.kotlin.AppContext

/**
 * Expo implementation of SmartSelfieEnrollmentEnhanced using the new architecture
 */
class SmileIDExpoSmartSelfieEnrollmentEnhancedView(
    context: Context,
    appContext: AppContext
) : SmileIDExpoView(context, appContext) {

    var allowNewEnroll: Boolean = false

    override fun renderContent() {
        setContentWithTheme {
            RenderSmartSelfieEnrollmentEnhancedContent()
        }
    }

    @Composable
    private fun RenderSmartSelfieEnrollmentEnhancedContent() {
        val config = SmileIDViewConfig(
            userId = userId,
            jobId = jobId,
            allowAgentMode = allowAgentMode ?: false,
            showInstructions = showInstructions,
            skipApiSubmission = skipApiSubmission,
            showAttribution = showAttribution,
            extraPartnerParams = extraPartnerParams,
            allowNewEnroll = allowNewEnroll
        )

        SmileID.RNSmartSelfieEnrollmentEnhanced(
            config = config,
            onResult = { result ->
                handleResultCallback(result)
            }
        )
    }
}