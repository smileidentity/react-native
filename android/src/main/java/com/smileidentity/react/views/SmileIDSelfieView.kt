package com.smileidentity.react.views

import android.annotation.SuppressLint
import android.content.Context
import com.facebook.react.uimanager.ThemedReactContext
import com.smileidentity.SmileID
import com.smileidentity.react.results.SmartSelfieCaptureResult
import com.smileidentity.react.utils.SelfieCaptureResultAdapter
import com.smileidentity.results.SmartSelfieResult
import com.smileidentity.shared.SmileIDSharedResult

@SuppressLint("CheckResult")
abstract class SmileIDSelfieView(currentContext: ThemedReactContext) : SmileIDView(currentContext) {

  override fun handleResult(result: SmileIDSharedResult<*>) {
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
              emitError("Failed to serialize result", e)
              return
            }
            json?.let { js ->
              emitResult(js)
            }
          }
          is String -> emitResult(data)
          else -> emitResult(data.toString())
        }
      }
      is SmileIDSharedResult.WithError -> emitError(result.cause.message ?: "Unknown error", result.cause)
      is SmileIDSharedResult.Error -> emitError(result.message, result.cause)
    }
  }
}
