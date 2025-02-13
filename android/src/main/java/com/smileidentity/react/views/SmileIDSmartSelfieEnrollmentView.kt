package com.smileidentity.react.views

import android.content.Context
import android.util.Log
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.lifecycle.viewmodel.compose.LocalViewModelStoreOwner
import com.smileidentity.SmileID
import com.smileidentity.compose.SmartSelfieEnrollment
import com.smileidentity.react.results.SmartSelfieCaptureResult
import com.smileidentity.react.utils.SelfieCaptureResultAdapter
import com.smileidentity.results.SmileIDResult
import com.smileidentity.util.randomUserId
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.launch

class SmileIDSmartSelfieEnrollmentView(context: Context) : SmileIDView(context) {
  private val viewScope = CoroutineScope(Dispatchers.Main + Job())
  override fun renderContent() {
    Log.v("SmileIDSmartSelfieEnrollmentView", "renderContent")
    composeView.apply {
      Log.v("SmileIDSmartSelfieEnrollmentView", "renderContent 2")
      setContent {
        Log.v("SmileIDSmartSelfieEnrollmentView", "renderContent 3")
        val customViewModelStoreOwner = CustomViewModelStoreOwner()
        CompositionLocalProvider(LocalViewModelStoreOwner provides customViewModelStoreOwner) {
          Log.v("SmileIDSmartSelfieEnrollmentView", "renderContent 4")
          SmileID.SmartSelfieEnrollment(
            userId = userId ?: rememberSaveable { randomUserId() },
            allowAgentMode = allowAgentMode ?: false,
            allowNewEnroll = allowNewEnroll ?: false,
            showAttribution = showAttribution,
            showInstructions = showInstructions,
            extraPartnerParams = extraPartnerParams,
          ) { res ->
            viewScope.launch {
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
                      return@launch
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
}
