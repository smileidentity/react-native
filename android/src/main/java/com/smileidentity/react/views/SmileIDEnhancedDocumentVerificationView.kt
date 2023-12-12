package com.smileidentity.react.views

import androidx.compose.runtime.saveable.rememberSaveable
import com.facebook.react.bridge.ReactApplicationContext
import com.smileidentity.SmileID
import com.smileidentity.compose.EnhancedDocumentVerificationScreen
import com.smileidentity.react.utils.getBoolOrDefault
import com.smileidentity.react.utils.getStringOrDefault
import com.smileidentity.results.EnhancedDocumentVerificationResult
import com.smileidentity.results.SmileIDResult
import com.smileidentity.util.randomJobId
import com.smileidentity.util.randomUserId
import timber.log.Timber

class SmileIDEnhancedDocumentVerificationView(context: ReactApplicationContext) : SmileIDView(context) {

  override fun renderContent() {
    params?.let{ product ->
      val countryCode = product.getStringOrDefault("countryCode",null) ?: run {
        emitFailure(IllegalArgumentException("countryCode is required for DocumentVerification"))
        return;
      }
      val allowGalleryUpload = product.getBoolOrDefault("allowGalleryUpload",false)
      val captureBothSides = product.getBoolOrDefault("captureBothSides",false)
      composeView.apply {
        setContent {
          SmileID.EnhancedDocumentVerificationScreen(
            userId = userId ?: rememberSaveable { randomUserId() },
            jobId = jobId ?: rememberSaveable { randomJobId() },
            countryCode = countryCode!!,
            documentType = product.getString("documentType"),
            showInstructions = showInstructions ?: true,
            allowGalleryUpload = allowGalleryUpload,
            captureBothSides = captureBothSides
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
