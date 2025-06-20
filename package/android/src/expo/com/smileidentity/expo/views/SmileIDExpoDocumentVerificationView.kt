package com.smileidentity.expo.views

import android.content.Context
import androidx.compose.runtime.Composable
import com.smileidentity.SmileID
import com.smileidentity.shared.RNDocumentVerification
import com.smileidentity.shared.SmileIDViewConfig
import expo.modules.kotlin.AppContext

/**
 * Expo implementation of DocumentVerification using the new architecture
 */
class SmileIDExpoDocumentVerificationView(
    context: Context,
    appContext: AppContext
) : SmileIDExpoView(context, appContext) {

    var countryCode: String? = null
    var documentType: String? = null
    var allowGallerySelection: Boolean = false
    var captureBothSides: Boolean = true

    override fun renderContent() {
        setContentWithTheme {
            RenderDocumentVerificationContent()
        }
    }

    @Composable
    private fun RenderDocumentVerificationContent() {
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
            captureBothSides = captureBothSides
        )

        SmileID.RNDocumentVerification(
            config = config,
            onResult = { result ->
                handleResultCallback(result)
            }
        )
    }
}