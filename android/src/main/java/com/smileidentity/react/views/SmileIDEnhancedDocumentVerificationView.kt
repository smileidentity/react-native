package com.smileidentity.react.views

import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.lifecycle.viewmodel.compose.LocalViewModelStoreOwner
import com.facebook.react.bridge.ReactApplicationContext
import com.smileidentity.SmileID
import com.smileidentity.compose.EnhancedDocumentVerificationScreen
import com.smileidentity.results.EnhancedDocumentVerificationResult
import com.smileidentity.results.SmileIDResult
import com.smileidentity.util.randomJobId
import com.smileidentity.util.randomUserId
import kotlinx.collections.immutable.toImmutableMap
import timber.log.Timber

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
            extraPartnerParams = (extraPartnerParams ?: mapOf()).toImmutableMap(),
          ) { result ->
            when (result) {
              is SmileIDResult.Success -> {
                val json = try {
                  SmileID.moshi
                    .adapter(EnhancedDocumentVerificationResult::class.java)
                    .toJson(result.data)
                } catch (e: Exception) {
                  Timber.w(e)
                  "null"
                }
                emitSuccess(json)
              }

              is SmileIDResult.Error -> {
                result.throwable.printStackTrace()
                emitFailure(result.throwable)
              }
            }
          }
        }
      }
    }
  }
}
