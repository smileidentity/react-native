package com.smileidentity.shared.views

import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.lifecycle.viewmodel.compose.LocalViewModelStoreOwner
import com.smileidentity.SmileID
import com.smileidentity.compose.EnhancedDocumentVerificationScreen
import com.smileidentity.react.results.DocumentCaptureResult
import com.smileidentity.react.utils.DocumentCaptureResultAdapter
import com.smileidentity.results.SmileIDResult
import com.smileidentity.shared.SmileIDSharedResult
import com.smileidentity.shared.SmileIDViewConfig
import com.smileidentity.util.randomJobId
import com.smileidentity.util.randomUserId

@Composable
fun SmileIDEnhancedDocumentVerificationView(
  config: SmileIDViewConfig,
  onResult: (SmileIDSharedResult<*>) -> Unit
) {
  config.countryCode ?: run {
    onResult(SmileIDSharedResult.WithError(IllegalArgumentException("countryCode is required for EnhancedDocumentVerification")))
    return
  }

  config.consentInformation ?: run {
    onResult(SmileIDSharedResult.WithError(IllegalArgumentException("consentInformation is required for EnhancedDocumentVerification")))
    return
  }

  val customViewModelStoreOwner = CustomViewModelStoreOwner()
  CompositionLocalProvider(LocalViewModelStoreOwner provides customViewModelStoreOwner) {
    SmileID.EnhancedDocumentVerificationScreen(
      userId = config.userId ?: rememberSaveable { randomUserId() },
      jobId = config.jobId ?: rememberSaveable { randomJobId() },
      countryCode = config.countryCode!!,
      documentType = config.documentType,
      idAspectRatio = config.idAspectRatio,
      showAttribution = config.showAttribution,
      allowAgentMode = config.allowAgentMode,
      showInstructions = config.showInstructions,
      allowNewEnroll = config.allowNewEnroll,
      allowGalleryUpload = config.allowGalleryUpload,
      captureBothSides = config.captureBothSides,
      extraPartnerParams = config.extraPartnerParams,
      consentInformation = config.consentInformation!!,
      useStrictMode = config.useStrictMode,
      ) { res ->
        when (res) {
          is SmileIDResult.Success -> {
            val result =
              DocumentCaptureResult(
                selfieFile = res.data.selfieFile,
                documentFrontFile = res.data.documentFrontFile,
                livenessFiles = res.data.livenessFiles,
                documentBackFile = res.data.documentBackFile,
                didSubmitEnhancedDocVJob = res.data.didSubmitEnhancedDocVJob,
              )
            val newMoshi =
              SmileID.moshi
                .newBuilder()
                .add(DocumentCaptureResultAdapter.FACTORY)
                .build()
          val json =
            try {
              newMoshi
                .adapter(DocumentCaptureResult::class.java)
                .toJson(result)
            } catch (e: Exception) {
              onResult(SmileIDSharedResult.WithError(e))
              return@EnhancedDocumentVerificationScreen
            }
          json?.let { js ->
            onResult(SmileIDSharedResult.Success(js))
          }
        }

        is SmileIDResult.Error -> onResult(SmileIDSharedResult.WithError(res.throwable))
      }
    }
  }
}
