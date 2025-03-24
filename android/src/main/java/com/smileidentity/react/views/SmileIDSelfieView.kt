package com.smileidentity.react.views

import android.annotation.SuppressLint
import android.content.Context
import com.smileidentity.SmileID
import com.smileidentity.react.results.SmartSelfieCaptureResult
import com.smileidentity.react.utils.SelfieCaptureResultAdapter
import com.smileidentity.results.SmartSelfieResult
import com.smileidentity.results.SmileIDResult

@SuppressLint("CheckResult")
abstract class SmileIDSelfieView(currentContext: Context) : SmileIDView(currentContext) {

  protected fun handleResultCallback(res: SmileIDResult<*>) {
    when (res) {
      is SmileIDResult.Success -> {
        val data = res.data as? SmartSelfieResult ?: run {
          emitFailure(Exception("Unexpected result type"))
          return
        }
        val result = SmartSelfieCaptureResult(
          selfieFile = data.selfieFile,
          livenessFiles = data.livenessFiles,
          apiResponse = data.apiResponse,
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
            return
          }
        json?.let { js ->
          emitSuccess(js)
        }
      }

      is SmileIDResult.Error -> emitFailure(res.throwable)
    }
  }
}
