package com.smileidentity.expo.views

import android.content.Context
import androidx.compose.runtime.Composable
import com.smileidentity.SmileID
import com.smileidentity.shared.RNSmartSelfieAuthentication
import com.smileidentity.shared.SmileIDViewConfig
import expo.modules.kotlin.AppContext

/**
 * Expo implementation of SmartSelfieAuthentication using the new architecture
 */
class SmileIDExpoSmartSelfieAuthenticationView(
    context: Context,
    appContext: AppContext
) : SmileIDExpoView(context, appContext) {

    override fun renderContent() {
        setContentWithTheme {
            RenderSmartSelfieAuthenticationContent()
        }
    }

    @Composable
    private fun RenderSmartSelfieAuthenticationContent() {
        val config = SmileIDViewConfig(
            userId = userId,
            jobId = jobId,
            allowAgentMode = allowAgentMode ?: false,
            showInstructions = showInstructions,
            skipApiSubmission = skipApiSubmission,
            showAttribution = showAttribution,
            extraPartnerParams = extraPartnerParams
        )

        SmileID.RNSmartSelfieAuthentication(
            config = config,
            onResult = { result ->
                handleResultCallback(result)
            }
        )
    }
}