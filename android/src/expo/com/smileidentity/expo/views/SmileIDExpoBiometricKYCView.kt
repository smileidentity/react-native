package com.smileidentity.expo.views

import android.content.Context
import androidx.compose.runtime.Composable
import com.smileidentity.SmileID
import com.smileidentity.shared.RNBiometricKYC
import com.smileidentity.shared.SmileIDViewConfig
import expo.modules.kotlin.AppContext

/**
 * Expo implementation of BiometricKYC using the new architecture
 */
class SmileIDExpoBiometricKYCView(
    context: Context,
    appContext: AppContext
) : SmileIDExpoView(context, appContext) {

    var idInfo: Map<String, Any?>? = null

    override fun renderContent() {
        setContentWithTheme {
            RenderBiometricKYCContent()
        }
    }

    @Composable
    private fun RenderBiometricKYCContent() {
        val config = SmileIDViewConfig(
            userId = userId,
            jobId = jobId,
            allowAgentMode = allowAgentMode ?: false,
            showInstructions = showInstructions,
            skipApiSubmission = skipApiSubmission,
            showAttribution = showAttribution,
            extraPartnerParams = extraPartnerParams,
            idInfo = idInfo
        )

        SmileID.RNBiometricKYC(
            config = config,
            onResult = { result ->
                handleResultCallback(result)
            }
        )
    }
}