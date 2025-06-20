package com.smileidentity.expo.views

import android.content.Context
import androidx.compose.runtime.Composable
import com.smileidentity.SmileID
import com.smileidentity.shared.RNDocumentCapture
import com.smileidentity.shared.SmileIDViewConfig
import expo.modules.kotlin.AppContext

/**
 * Expo implementation of DocumentCapture using the new architecture
 */
class SmileIDExpoDocumentCaptureView(
    context: Context,
    appContext: AppContext
) : SmileIDExpoView(context, appContext) {

    var countryCode: String? = null
    var documentType: String? = null
    var allowGallerySelection: Boolean = false

    override fun renderContent() {
        setContentWithTheme {
            RenderDocumentCaptureContent()
        }
    }

    @Composable
    private fun RenderDocumentCaptureContent() {
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
            allowGallerySelection = allowGallerySelection
        )

        SmileID.RNDocumentCapture(
            config = config,
            onResult = { result ->
                handleResultCallback(result)
            }
        )
    }
}