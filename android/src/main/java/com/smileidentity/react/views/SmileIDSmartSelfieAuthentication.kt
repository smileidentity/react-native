package com.smileidentity.react.views

import androidx.compose.runtime.saveable.rememberSaveable
import com.facebook.react.bridge.ReactApplicationContext
import com.smileidentity.SmileID
import com.smileidentity.compose.SmartSelfieAuthentication
import com.smileidentity.results.SmartSelfieResult
import com.smileidentity.results.SmileIDResult
import com.smileidentity.util.randomJobId

class SmileIDSmartSelfieAuthentication(context: ReactApplicationContext) : SmileIDView(context) {

  override fun renderContent() {
    product?.let {
      composeView.apply {
        setContent {
          userId = userId ?: rememberSaveable { randomJobId() }
          jobId = jobId ?: rememberSaveable { randomJobId() }
          SmileID.SmartSelfieAuthentication(
            userId = userId!!,
            jobId = jobId!!,
            allowAgentMode = allowAgentMode
          ) { result ->
            when (result) {
              is SmileIDResult.Success -> {
                val json = try {
                  SmileID.moshi
                    .adapter(SmartSelfieResult::class.java)
                    .toJson(result.data)
                } catch (e: Exception) {
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
