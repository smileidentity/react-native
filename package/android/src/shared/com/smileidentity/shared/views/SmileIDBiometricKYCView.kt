package com.smileidentity.shared.views

import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.lifecycle.viewmodel.compose.LocalViewModelStoreOwner
import com.smileidentity.SmileID
import com.smileidentity.compose.BiometricKYC
import com.smileidentity.react.results.BiometricKycCaptureResult
import com.smileidentity.react.utils.BiometricKycCaptureResultAdapter
import com.smileidentity.results.SmileIDResult
import com.smileidentity.shared.SmileIDSharedResult
import com.smileidentity.shared.SmileIDViewConfig
import com.smileidentity.util.randomJobId
import com.smileidentity.util.randomUserId

@Composable
fun SmileIDBiometricKYCView(
  config: SmileIDViewConfig,
  onResult: (SmileIDSharedResult<*>) -> Unit
) {
  config.idInfo ?: run {
    onResult(SmileIDSharedResult.WithError(IllegalArgumentException("idInfo is required for BiometricKYC")))
    return
  }
  config.consentInformation ?: run {
    onResult(SmileIDSharedResult.WithError(IllegalArgumentException("consentInformation is required for BiometricKYC")))
    return
  }

  val customViewModelStoreOwner = CustomViewModelStoreOwner()
  CompositionLocalProvider(LocalViewModelStoreOwner provides customViewModelStoreOwner) {
    SmileID.BiometricKYC(
      idInfo = config.idInfo!!,
      userId = config.userId ?: rememberSaveable { randomUserId() },
      jobId = config.jobId ?: rememberSaveable { randomJobId() },
      allowAgentMode = config.allowAgentMode,
      allowNewEnroll = config.allowNewEnroll,
      showAttribution = config.showAttribution,
      showInstructions = config.showInstructions,
      extraPartnerParams = config.extraPartnerParams,
      consentInformation = config.consentInformation!!,
      useStrictMode = config.useStrictMode,
      ) { res ->
        when (res) {
          is SmileIDResult.Success -> {
            val result =
              BiometricKycCaptureResult(
                selfieFile = res.data.selfieFile,
                livenessFiles = res.data.livenessFiles,
                didSubmitBiometricKycJob = res.data.didSubmitBiometricKycJob,
              )
            val newMoshi =
              SmileID.moshi
                .newBuilder()
                .add(BiometricKycCaptureResultAdapter.FACTORY)
                .build()
            val json =
              try {
                newMoshi
                  .adapter(BiometricKycCaptureResult::class.java)
                  .toJson(result)
              } catch (e: Exception) {
                onResult(SmileIDSharedResult.WithError(e))
                return@BiometricKYC
              }
            json?.let { js ->
              onResult(SmileIDSharedResult.Success(js))
            }
          }

          is SmileIDResult.Error -> SmileIDSharedResult.Success(res)
        }
      }
    }
  }
