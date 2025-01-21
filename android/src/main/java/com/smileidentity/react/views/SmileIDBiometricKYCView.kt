package com.smileidentity.react.views

import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.lifecycle.viewmodel.compose.LocalViewModelStoreOwner
import com.facebook.react.bridge.ReactApplicationContext
import com.smileidentity.SmileID
import com.smileidentity.compose.BiometricKYC
import com.smileidentity.models.IdInfo
import com.smileidentity.react.results.SmartSelfieCaptureResult
import com.smileidentity.react.utils.SelfieCaptureResultAdapter
import com.smileidentity.results.SmileIDResult
import com.smileidentity.util.randomJobId
import com.smileidentity.util.randomUserId

class SmileIDBiometricKYCView(context: ReactApplicationContext) : SmileIDView(context) {
  var idInfo: IdInfo? = null

  override fun renderContent() {
    idInfo ?: run {
      emitFailure(IllegalArgumentException("idInfo is required for BiometricKYC"))
      return
    }
    composeView.apply {
      val customViewModelStoreOwner = CustomViewModelStoreOwner()
      setContent {
        CompositionLocalProvider(LocalViewModelStoreOwner provides customViewModelStoreOwner) {
          SmileID.BiometricKYC(
            idInfo = idInfo!!,
            userId = userId ?: rememberSaveable { randomUserId() },
            jobId = jobId ?: rememberSaveable { randomJobId() },
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
                    didSubmitBiometricKycJob = res.data.didSubmitBiometricKycJob,
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
                    return@BiometricKYC
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
