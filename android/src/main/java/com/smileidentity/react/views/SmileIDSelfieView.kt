package com.smileidentity.react.views

import android.annotation.SuppressLint
import android.content.Context
import com.smileidentity.SmileID
import com.smileidentity.react.results.SmartSelfieCaptureResult
import com.smileidentity.react.utils.SelfieCaptureResultAdapter
import com.smileidentity.results.SmartSelfieResult
import com.smileidentity.shared.SmileIDSharedResult

@SuppressLint("CheckResult")
abstract class SmileIDSelfieView(currentContext: Context) : SmileIDView(currentContext) {

  override fun handleResultCallback(result: SmileIDSharedResult<*>) {
    when (result) {
      is SmileIDSharedResult.Success -> {
        when (val data = result.data) {
          is SmartSelfieResult -> {
            val captureResult = SmartSelfieCaptureResult(
              selfieFile = data.selfieFile,
              livenessFiles = data.livenessFiles,
              apiResponse = data.apiResponse,
            )
            val newMoshi = SmileID.moshi
              .newBuilder()
              .add(SelfieCaptureResultAdapter.FACTORY)
              .build()
            val json = try {
              newMoshi
                .adapter(SmartSelfieCaptureResult::class.java)
                .toJson(captureResult)
            } catch (e: Exception) {
              emitFailure(e)
              return
            }
            json?.let { js ->
              emitSuccess(js)
            }
          }
          is String -> emitSuccess(data)
          else -> emitSuccess(data.toString())
        }
      }
      is SmileIDSharedResult.WithError -> emitFailure(result.cause)
      is SmileIDSharedResult.Error -> emitFailure(Exception(result.message, result.cause))
    }
  }
}
