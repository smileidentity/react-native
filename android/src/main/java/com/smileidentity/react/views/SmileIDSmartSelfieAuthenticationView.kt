package com.smileidentity.react.views

import androidx.compose.runtime.saveable.rememberSaveable
import com.facebook.react.bridge.ReactApplicationContext
import com.smileidentity.SmileID
import com.smileidentity.compose.SmartSelfieAuthentication
import com.smileidentity.results.SmartSelfieResult
import com.smileidentity.results.SmileIDResult
import com.smileidentity.util.randomJobId
import com.smileidentity.util.randomUserId
import kotlinx.collections.immutable.toImmutableMap
import timber.log.Timber

class SmileIDSmartSelfieAuthenticationView(context: ReactApplicationContext) :
  SmileIDView(context) {

  override fun renderContent() {
    composeView.apply {
      setContent {
        SmileID.SmartSelfieAuthentication(
          userId = userId ?: rememberSaveable { randomUserId() },
          jobId = jobId ?: rememberSaveable { randomJobId() },
          allowAgentMode = allowAgentMode ?: false,
          allowNewEnroll = allowNewEnroll ?: false,
          showAttribution = showAttribution ?: true,
          showInstructions = showInstructions ?: true,
          extraPartnerParams = (extraPartnerParams ?: mapOf()).toImmutableMap(),
        ) { result ->
          when (result) {
            is SmileIDResult.Success -> {
              val json = try {
                SmileID.moshi
                  .adapter(SmartSelfieResult::class.java)
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
