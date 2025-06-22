package com.smileidentity.expo.views

import android.content.Context
import androidx.compose.runtime.Composable
import com.smileidentity.SmileID
import com.smileidentity.shared.RNConsent
import com.smileidentity.shared.SmileIDViewConfig
import expo.modules.kotlin.AppContext

/**
 * Expo implementation of Consent using the new architecture
 */
class SmileIDExpoConsentView(
    context: Context,
    appContext: AppContext
) : SmileIDExpoView(context, appContext) {

    var consentInformation: Map<String, Any?>? = null

    override fun renderContent() {
        setContentWithTheme {
            RenderConsentContent()
        }
    }

    @Composable
    private fun RenderConsentContent() {
        val config = SmileIDViewConfig(
            userId = userId,
            jobId = jobId,
            allowAgentMode = allowAgentMode ?: false,
            showInstructions = showInstructions,
            skipApiSubmission = skipApiSubmission,
            showAttribution = showAttribution,
            extraPartnerParams = extraPartnerParams,
            consentInformation = consentInformation
        )

        SmileID.RNConsent(
            config = config,
            onResult = { result ->
                handleResultCallback(result)
            }
        )
    }
}