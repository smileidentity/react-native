package com.smileidentity.react.views

import androidx.compose.runtime.saveable.rememberSaveable
import com.facebook.react.bridge.ReactApplicationContext
import com.smileidentity.SmileID
import com.smileidentity.compose.DocumentVerification
import com.smileidentity.react.utils.getBoolOrDefault
import com.smileidentity.react.utils.getFloatOrDefault
import com.smileidentity.react.utils.getStringOrDefault
import com.smileidentity.results.DocumentVerificationResult
import com.smileidentity.results.SmileIDResult
import com.smileidentity.util.randomJobId
import com.smileidentity.util.randomUserId
import kotlinx.collections.immutable.toImmutableMap
import timber.log.Timber
import java.io.File

class SmileIDDocumentVerificationView(context: ReactApplicationContext) : SmileIDView(context) {

  override fun renderContent() {
    params?.let{ params ->
      val countryCode = params.getStringOrDefault("countryCode",null) ?: run {
        emitFailure(IllegalArgumentException("countryCode is required for DocumentVerification"))
        return;
      }
      val allowGalleryUpload = params.getBoolOrDefault("allowGalleryUpload",false)
      val captureBothSides = params.getBoolOrDefault("captureBothSides",false)
      var bypassSelfieCaptureWithFile : File? = null
      params.getStringOrDefault("bypassSelfieCaptureWithFile",null)?.let {
         bypassSelfieCaptureWithFile = File(it)
      }
      composeView.apply {
        setContent {
          SmileID.DocumentVerification(
            userId = userId ?: rememberSaveable { randomUserId() },
            jobId = jobId ?: rememberSaveable { randomJobId() },
            countryCode = countryCode!!,
            documentType = params.getString("documentType"),
            idAspectRatio = params.getFloatOrDefault("idAspectRatio",-1f),
            showAttribution = showAttribution ?: true,
            showInstructions = showInstructions ?: true,
            allowGalleryUpload = allowGalleryUpload,
            captureBothSides = captureBothSides,
            bypassSelfieCaptureWithFile = bypassSelfieCaptureWithFile,
            extraPartnerParams = (extraPartnerParams ?: mapOf()).toImmutableMap(),
          ) { result ->
            when (result) {
              is SmileIDResult.Success -> {
                val json = try {
                  SmileID.moshi
                    .adapter(DocumentVerificationResult::class.java)
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
