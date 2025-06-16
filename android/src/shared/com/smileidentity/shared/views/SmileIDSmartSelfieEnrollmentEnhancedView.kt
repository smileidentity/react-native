package com.smileidentity.shared.views

import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.lifecycle.viewmodel.compose.LocalViewModelStoreOwner
import com.smileidentity.SmileID
import com.smileidentity.compose.SmartSelfieEnrollmentEnhanced
import com.smileidentity.results.SmileIDResult
import com.smileidentity.shared.SmileIDSharedResult
import com.smileidentity.shared.SmileIDViewConfig
import com.smileidentity.util.randomUserId

@Composable
fun SmileIDSmartSelfieEnrollmentEnhancedView(
  config: SmileIDViewConfig,
  onResult: (SmileIDSharedResult<*>) -> Unit
) {
  val customViewModelStoreOwner = CustomViewModelStoreOwner()
  CompositionLocalProvider(LocalViewModelStoreOwner provides customViewModelStoreOwner) {
    SmileID.SmartSelfieEnrollmentEnhanced(
      userId = config.userId ?: rememberSaveable { randomUserId() },
      showAttribution = config.showAttribution,
      showInstructions = config.showInstructions,
      extraPartnerParams = config.extraPartnerParams,
      onResult = { result ->
        when (result) {
          is SmileIDResult.Success -> onResult(SmileIDSharedResult.Success(result.data))
          is SmileIDResult.Error -> onResult(SmileIDSharedResult.WithError(result.throwable))
        }
      }
    )
  }
}
