package com.smileidentity.react.views

import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.lifecycle.viewmodel.compose.LocalViewModelStoreOwner
import com.facebook.react.bridge.ReactApplicationContext
import com.smileidentity.SmileID
import com.smileidentity.compose.SmartSelfieEnrollment
import com.smileidentity.react.results.SmartSelfieCaptureResult
import com.smileidentity.react.utils.SelfieCaptureResultAdapter
import com.smileidentity.results.SmileIDResult
import com.smileidentity.util.randomUserId

class SmileIDSmartSelfieEnrollmentView(context: ReactApplicationContext) : SmileIDView(context) {

  override fun renderContent() {
    composeView.apply {
      setContent {
        val customViewModelStoreOwner = CustomViewModelStoreOwner()
        CompositionLocalProvider(LocalViewModelStoreOwner provides customViewModelStoreOwner) {
          SmileID.SmartSelfieEnrollment(
            userId = userId ?: rememberSaveable { randomUserId() },
            allowAgentMode = allowAgentMode ?: false,
            allowNewEnroll = allowNewEnroll ?: false,
            showAttribution = showAttribution,
            showInstructions = showInstructions,
            extraPartnerParams = extraPartnerParams,
          ) { res ->
            when (res) {
              is SmileIDResult.Success -> {
                val result =
                  SmartSelfieCaptureResult(
                    selfieFile = res.data.selfieFile,
                    livenessFiles = res.data.livenessFiles,
                    apiResponse = res.data.apiResponse,
                  )
                val newMoshi =
                  SmileID.moshi
                    .newBuilder()
                    .add(SelfieCaptureResultAdapter.FACTORY)
                    .build()
                val json =
                  try {
                    newMoshi
                      .adapter(SmartSelfieCaptureResult::class.java)
                      .toJson(result)
                  } catch (e: Exception) {
                    emitFailure(e)
                    return@SmartSelfieEnrollment
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
