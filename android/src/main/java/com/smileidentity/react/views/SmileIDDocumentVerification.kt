package com.smileidentity.react.views

import androidx.compose.runtime.saveable.rememberSaveable
import com.facebook.react.bridge.ReactApplicationContext
import com.smileidentity.SmileID
import com.smileidentity.compose.DocumentVerification
import com.smileidentity.models.JobType
import com.smileidentity.results.DocumentVerificationResult
import com.smileidentity.results.SmileIDResult
import com.smileidentity.util.randomJobId
import com.smileidentity.util.randomUserId
import timber.log.Timber

class SmileIDDocumentVerification(context: ReactApplicationContext) : SmileIDView(context) {

  override fun renderContent() {
    product?.let{product ->
      val countryCode = product.getString("countryCode")
      if (jobType == JobType.DocumentVerification && countryCode == null) {
        productThrowable = Throwable("countryCode is required for DocumentVerification")
        emitFailure(productThrowable!!)
        return;
      }
      val allowGalleryUpload = if (product.hasKey("allowGalleryUpload")) product.getBoolean("allowGalleryUpload") else false
      val captureBothSides = if (product.hasKey("captureBothSides")) product.getBoolean("captureBothSides") else false
      composeView.apply {
        setContent {
          userId = userId ?: rememberSaveable { randomUserId() }
          jobId = jobId ?: rememberSaveable { randomJobId() }
          SmileID.DocumentVerification(
            userId = userId!!,
            jobId = jobId!!,
            countryCode = countryCode!!,
            documentType = product.getString("documentType"),
            showInstructions = showInstructions,
            allowGalleryUpload = allowGalleryUpload,
            captureBothSides = captureBothSides
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
