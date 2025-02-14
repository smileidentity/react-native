package com.smileidentity.react.views

import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.lifecycle.viewmodel.compose.LocalViewModelStoreOwner
import com.facebook.react.bridge.ReactApplicationContext
import com.smileidentity.SmileID
import com.smileidentity.compose.EnhancedDocumentVerificationScreen
import com.smileidentity.models.ConsentInformation
import com.smileidentity.react.results.DocumentCaptureResult
import com.smileidentity.react.utils.DocumentCaptureResultAdapter
import com.smileidentity.results.SmileIDResult
import com.smileidentity.util.randomJobId
import com.smileidentity.util.randomUserId

class SmileIDEnhancedDocumentVerificationView(context: ReactApplicationContext) :
  SmileIDView(context) {
  var countryCode: String? = null
  var allowGalleryUpload: Boolean = false
  var captureBothSides: Boolean = true
  var documentType: String? = null
  var idAspectRatio: Float? = null
  var consentInformation: ConsentInformation? = null

  override fun renderContent() {
    countryCode ?: run {
      emitFailure(IllegalArgumentException("countryCode is required for DocumentVerification"))
      return
    }

    consentInformation ?: run {
      emitFailure(IllegalArgumentException("consentInformation is required for DocumentVerification"))
      return
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
            showAttribution = showAttribution,
            allowAgentMode = allowAgentMode ?: false,
            showInstructions = showInstructions,
            allowNewEnroll = allowNewEnroll ?: false,
            allowGalleryUpload = allowGalleryUpload,
            captureBothSides = captureBothSides,
            extraPartnerParams = extraPartnerParams,
            consentInformation = consentInformation!!,
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
