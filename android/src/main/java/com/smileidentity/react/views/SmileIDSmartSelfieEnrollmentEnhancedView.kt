package com.smileidentity.react.views

import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.lifecycle.viewmodel.compose.LocalViewModelStoreOwner
import com.facebook.react.bridge.ReactApplicationContext
import com.smileidentity.SmileID
import com.smileidentity.networking.FileAdapter
import com.smileidentity.compose.SmartSelfieEnrollmentEnhanced
import com.smileidentity.react.results.SmartSelfieCaptureResult
import com.smileidentity.react.utils.SelfieCaptureResultAdapter
import com.smileidentity.results.SmileIDResult
import com.smileidentity.util.randomUserId
import com.squareup.moshi.Moshi
import kotlinx.collections.immutable.toImmutableMap

class SmileIDSmartSelfieEnrollmentEnhancedView(context: ReactApplicationContext) : SmileIDView(context) {

  override fun renderContent() {
    composeView.apply {
      setContent {
        val customViewModelStoreOwner = CustomViewModelStoreOwner()
        CompositionLocalProvider(LocalViewModelStoreOwner provides customViewModelStoreOwner) {
          SmileID.SmartSelfieEnrollmentEnhanced(
            userId = userId ?: rememberSaveable { randomUserId() },
            allowNewEnroll = allowNewEnroll ?: false,
            showAttribution = showAttribution,
            showInstructions = showInstructions,
            extraPartnerParams = extraPartnerParams,
          ) {
            when (it) {
              is SmileIDResult.Success -> {
                val moshi =
                  Moshi.Builder()
                    .add(FileAdapter)
                    .build()
                val result =
                  SmartSelfieCaptureResult(
                    selfieFile = it.data.selfieFile,
                    livenessFiles = it.data.livenessFiles,
                    apiResponse = it.data.apiResponse,
                  )
                val json =
                  try {
                    moshi
                      .adapter(SmartSelfieCaptureResult::class.java)
                      .toJson(result)
                  } catch (e: Exception) {
                    emitFailure(e)
                    return@SmartSelfieEnrollmentEnhanced
                  }
                json?.let { response ->
                  emitSuccess(response)
                }
              }

              is SmileIDResult.Error -> emitFailure(it.throwable)
            }
          }
        }
      }
    }
  }
}
