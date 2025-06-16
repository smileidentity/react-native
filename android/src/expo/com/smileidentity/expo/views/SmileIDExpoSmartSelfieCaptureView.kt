package com.smileidentity.expo.views

import android.content.Context
import androidx.compose.runtime.Composable
import com.smileidentity.SmileID
import com.smileidentity.compose.components.LocalMetadataProvider
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
            LocalMetadataProvider.MetadataProvider {
                RenderSmartSelfieCaptureContent()
            }
        }
    }

    @Composable
    private fun RenderSmartSelfieCaptureContent() {
        if (useStrictMode) {
            SmileID.SmartSelfieEnrollmentEnhanced(
                userId = userId ?: "",
                showAttribution = showAttribution,
                showInstructions = showInstructions,
                skipApiSubmission = skipApiSubmission,
                extraPartnerParams = extraPartnerParams,
                onResult = { result ->
                    when (result) {
                        is SmileID.SmartSelfieResult.Success -> {
                            emitSuccess(result.toJson())
                        }
                        is SmileID.SmartSelfieResult.Error -> {
                            emitFailure(result.throwable)
                        }
                    }
                }
            )
        } else {
            // Regular smart selfie capture implementation
            SmileID.SmartSelfieEnrollment(
                userId = userId ?: "",
                showAttribution = showAttribution,
                showInstructions = showInstructions,
                skipApiSubmission = skipApiSubmission,
                extraPartnerParams = extraPartnerParams,
                onResult = { result ->
                    when (result) {
                        is SmileID.SmartSelfieResult.Success -> {
                            emitSuccess(result.toJson())
                        }
                        is SmileID.SmartSelfieResult.Error -> {
                            emitFailure(result.throwable)
                        }
                    }
                }
            )
        }
    }
}