package com.smileidentity.react.views

import androidx.compose.runtime.saveable.rememberSaveable
import com.facebook.react.bridge.ReactApplicationContext
import com.smileidentity.SmileID
import com.smileidentity.compose.BiometricKYC
import com.smileidentity.models.IdInfo
import com.smileidentity.results.BiometricKycResult
import com.smileidentity.results.SmileIDResult
import com.smileidentity.util.randomJobId
import com.smileidentity.util.randomUserId
import timber.log.Timber

class SmileIDBiometricKYCView(context: ReactApplicationContext) : SmileIDView(context) {
  var idInfo: IdInfo? = null
  override fun renderContent() {
    idInfo ?: run {
      emitFailure(IllegalArgumentException("idInfo is required for BiometricKYC"))
      return
    }

    composeView.apply {
      setContent {
        SmileID.BiometricKYC(
          idInfo = idInfo!!,
          userId = userId ?: rememberSaveable { randomUserId() },
          jobId = jobId ?: rememberSaveable { randomJobId() },
          allowAgentMode = allowAgentMode ?: false,
          showAttribution = showInstructions ?: true,
        ) { result ->
          when (result) {
            is SmileIDResult.Success -> {
              val json = try {
                SmileID.moshi
                  .adapter(BiometricKycResult::class.java)
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
