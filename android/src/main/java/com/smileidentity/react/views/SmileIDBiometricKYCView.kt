package com.smileidentity.react.views

import android.webkit.URLUtil
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.res.painterResource
import com.facebook.react.bridge.ReactApplicationContext
import com.smileidentity.SmileID
import com.smileidentity.compose.BiometricKYC
import com.smileidentity.react.utils.getStringOrDefault
import com.smileidentity.react.utils.idInfo
import com.smileidentity.results.BiometricKycResult
import com.smileidentity.results.SmileIDResult
import com.smileidentity.util.randomJobId
import com.smileidentity.util.randomUserId
import timber.log.Timber
import java.net.URL

class SmileIDBiometricKYCView(context: ReactApplicationContext) : SmileIDView(context) {
  override fun renderContent() {
    params?.let { product ->
      val idInfo = product.idInfo() ?: run {
        emitFailure(IllegalArgumentException("idInfo is required for BiometricKYC"))
        return
      }
      val partnerName = product.getStringOrDefault("partnerName", null) ?: run {
        emitFailure(IllegalArgumentException("partnerName is required for BiometricKYC"))
        return
      }

      val partnerPrivacyPolicy = product.getStringOrDefault("partnerPrivacyPolicy", null) ?: run {
        emitFailure(IllegalArgumentException("partnerPrivacyPolicy is required for BiometricKYC"))
        return
      }
      if (!URLUtil.isValidUrl(partnerPrivacyPolicy)) {
        emitFailure(IllegalArgumentException("a valid url for partnerPrivacyPolicy is required for BiometricKYC"))
        return
      }
      val logoResName = product.getString("partnerIcon") ?: run {
        emitFailure(IllegalArgumentException("productName is required for BiometricKYC"))
        return
      }
      val partnerIcon = context.resources.getIdentifier(
        logoResName,
        "drawable",
        (context as? ReactApplicationContext)?.currentActivity?.packageName
      )

      val productName = product.getStringOrDefault("productName", null) ?: run {
        emitFailure(IllegalArgumentException("productName is required for BiometricKYC"))
        return
      }
      composeView.apply {
        setContent {
          SmileID.BiometricKYC(
            idInfo = idInfo,
            partnerIcon = painterResource(id = partnerIcon),
            partnerName = partnerName,
            productName = productName,
            partnerPrivacyPolicy = URL(partnerPrivacyPolicy),
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

}
