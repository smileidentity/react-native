package com.smileidentity.shared.views

import android.content.Context
import android.webkit.URLUtil
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.lifecycle.viewmodel.compose.LocalViewModelStoreOwner
import com.facebook.react.bridge.ReactApplicationContext
import com.smileidentity.SmileID
import com.smileidentity.compose.ConsentScreen
import com.smileidentity.results.SmileIDResult
import com.smileidentity.shared.SmileIDSharedResult
import com.smileidentity.shared.SmileIDViewConfig
import java.net.URL

@Composable
fun SmileIDConsentView(
  config: SmileIDViewConfig,
  onResult: (SmileIDSharedResult<*>) -> Unit
) {
  config.partnerName ?: run {
    onResult(SmileIDSharedResult.WithError(IllegalArgumentException("partnerName is required for ConsentView")))
    return
  }
  config.partnerPrivacyPolicy?: run {
    onResult(SmileIDSharedResult.WithError(IllegalArgumentException("partnerPrivacyPolicy is required for ConsentView")))
    return
  }
  if (!URLUtil.isValidUrl(config.partnerPrivacyPolicy)) {
    onResult(SmileIDSharedResult.WithError(IllegalArgumentException("a valid url for partnerPrivacyPolicy is required for ConsentView")))
    return
  }
  config.logoResName ?: run {
    onResult(SmileIDSharedResult.WithError(IllegalArgumentException("logoResName is required for ConsentView")))
    return
  }
  config.productName ?: run {
    onResult(SmileIDSharedResult.WithError(IllegalArgumentException("productName is required for ConsentView")))
    return
  }

  val context = LocalContext.current
  val partnerIcon = context.resources.getIdentifier(
    config.logoResName,
    "drawable",
    (context as? ReactApplicationContext)?.currentActivity?.packageName ?: context.packageName
  )

  val customViewModelStoreOwner = CustomViewModelStoreOwner()
  CompositionLocalProvider(LocalViewModelStoreOwner provides customViewModelStoreOwner) {
    SmileID.ConsentScreen(
      partnerIcon = painterResource(
        id = partnerIcon
      ),
      partnerName = config.partnerName!!,
      productName = config.productName!!,
      partnerPrivacyPolicy = URL(config.partnerPrivacyPolicy),
      onConsentDenied = {
        onResult(SmileIDSharedResult.Success("denied"))
      },
      onConsentGranted = {
        onResult(SmileIDSharedResult.Success("accepted"))
      },
    )
  }
}
