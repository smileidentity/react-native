package com.smileidentity.react.views

import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.lifecycle.viewmodel.compose.LocalViewModelStoreOwner
import com.facebook.react.bridge.ReactApplicationContext
import com.smileidentity.SmileID
import com.smileidentity.compose.EnhancedDocumentVerificationScreen
import com.smileidentity.react.results.DocumentCaptureResult
import com.smileidentity.react.utils.DocumentCaptureResultAdapter
import com.smileidentity.results.SmileIDResult
import com.smileidentity.util.randomJobId
import com.smileidentity.util.randomUserId
import kotlinx.collections.immutable.toImmutableMap

class SmileIDEnhancedDocumentVerificationView(context: ReactApplicationContext) :
  SmileIDView(context) {
  var countryCode: String? = null
  var allowGalleryUpload: Boolean = false
  var captureBothSides: Boolean = true
  var documentType: String? = null
  var idAspectRatio: Float? = null

  override fun renderContent() {
    countryCode ?: run {
      emitFailure(IllegalArgumentException("countryCode is required for DocumentVerification"))
      return;
    }

    composeView.apply {
      val customViewModelStoreOwner = CustomViewModelStoreOwner()
      setContent {
        CompositionLocalProvider(LocalViewModelStoreOwner provides customViewModelStoreOwner) {
          SmileID.EnhancedDocumentVerificationScreen(
            userId = userId ?: rememberSaveable { randomUserId() },
            jobId = jobId ?: rememberSaveable { randomJobId() },
            countryCode = countryCode!!,
            documentType = documentType,
            idAspectRatio = idAspectRatio,
            showAttribution = showAttribution ?: true,
            allowAgentMode = allowAgentMode ?: false,
            showInstructions = showInstructions ?: true,
            allowNewEnroll = allowNewEnroll ?: false,
            allowGalleryUpload = allowGalleryUpload,
            captureBothSides = captureBothSides,
            skipApiSubmission = skipApiSubmission,
            extraPartnerParams = extraPartnerParams,
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
                    emitFailure(e)
                    return@EnhancedDocumentVerificationScreen
                  }
                json?.let { js ->
                  emitSuccess(js)
                }
              }

              is SmileIDResult.Error -> emitFailure(res.throwable)
            }
          }
        }
      }
    }
  }
}
