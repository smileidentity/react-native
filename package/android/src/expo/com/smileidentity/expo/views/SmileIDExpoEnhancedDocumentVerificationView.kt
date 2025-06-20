package com.smileidentity.expo.views

import android.content.Context
import androidx.compose.runtime.Composable
import com.smileidentity.SmileID
import com.smileidentity.shared.RNEnhancedDocumentVerification
import com.smileidentity.shared.SmileIDViewConfig
import expo.modules.kotlin.AppContext

/**
 * Expo implementation of EnhancedDocumentVerification using the new architecture
 */
class SmileIDExpoEnhancedDocumentVerificationView(
    context: Context,
    appContext: AppContext
) : SmileIDExpoView(context, appContext) {

    var countryCode: String? = null
    var documentType: String? = null
    var allowGallerySelection: Boolean = false
    var captureBothSides: Boolean = true
    var consentInformation: Map<String, Any?>? = null

    override fun renderContent() {
        setContentWithTheme {
            RenderEnhancedDocumentVerificationContent()
        }
    }

    @Composable
    private fun RenderEnhancedDocumentVerificationContent() {
        val config = SmileIDViewConfig(
            userId = userId,
            jobId = jobId,
            allowAgentMode = allowAgentMode ?: false,
            showInstructions = showInstructions,
            skipApiSubmission = skipApiSubmission,
            showAttribution = showAttribution,
            extraPartnerParams = extraPartnerParams,
            countryCode = countryCode,
            documentType = documentType,
            allowGallerySelection = allowGallerySelection,
            captureBothSides = captureBothSides,
            consentInformation = consentInformation
        )

        SmileID.RNEnhancedDocumentVerification(
            config = config,
            onResult = { result ->
                handleResultCallback(result)
            }
        )
    }
}