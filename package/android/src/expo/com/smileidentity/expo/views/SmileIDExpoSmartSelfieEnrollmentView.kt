package com.smileidentity.expo.views

import android.content.Context
import androidx.compose.runtime.Composable
import com.smileidentity.SmileID
import com.smileidentity.shared.RNSmartSelfieEnrollment
import com.smileidentity.shared.SmileIDViewConfig
import expo.modules.kotlin.AppContext

/**
 * Expo implementation of SmartSelfieEnrollment using the new architecture
 */
class SmileIDExpoSmartSelfieEnrollmentView(
    context: Context,
    appContext: AppContext
) : SmileIDExpoView(context, appContext) {

    var allowNewEnroll: Boolean = false

    override fun renderContent() {
        setContentWithTheme {
            RenderSmartSelfieEnrollmentContent()
        }
    }

    @Composable
    private fun RenderSmartSelfieEnrollmentContent() {
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

        SmileID.RNSmartSelfieEnrollment(
            config = config,
            onResult = { result ->
                handleResultCallback(result)
            }
        )
    }
}