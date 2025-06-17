package com.smileidentity.expo.views

import android.content.Context
import androidx.compose.runtime.Composable
import com.smileidentity.SmileID
import com.smileidentity.shared.RNSmartSelfieAuthenticationEnhanced
import com.smileidentity.shared.SmileIDViewConfig
import expo.modules.kotlin.AppContext

/**
 * Expo implementation of SmartSelfieAuthenticationEnhanced using the new architecture
 */
class SmileIDExpoSmartSelfieAuthenticationEnhancedView(
    context: Context,
    appContext: AppContext
) : SmileIDExpoView(context, appContext) {

    override fun renderContent() {
        setContentWithTheme {
            RenderSmartSelfieAuthenticationEnhancedContent()
        }
    }

    @Composable
    private fun RenderSmartSelfieAuthenticationEnhancedContent() {
        val config = SmileIDViewConfig(
            userId = userId,
            jobId = jobId,
            allowAgentMode = allowAgentMode ?: false,
            showInstructions = showInstructions,
            skipApiSubmission = skipApiSubmission,
            showAttribution = showAttribution,
            extraPartnerParams = extraPartnerParams
        )

        SmileID.RNSmartSelfieAuthenticationEnhanced(
            config = config,
            onResult = { result ->
                handleResultCallback(result)
            }
        )
    }
}