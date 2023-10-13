package com.smileidentity.react.views

import android.webkit.URLUtil
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.res.painterResource
import com.facebook.react.bridge.ReactApplicationContext
import com.smileidentity.SmileID
import com.smileidentity.compose.BiometricKYC
import com.smileidentity.react.utils.idInfo
import com.smileidentity.results.BiometricKycResult
import com.smileidentity.results.SmileIDResult
import com.smileidentity.util.randomJobId
import com.smileidentity.util.randomUserId
import java.net.URL

class SmileIDBiometricKYC(context: ReactApplicationContext) : SmileIDView(context) {
  override fun renderContent() {
    product?.let{product->
      val idInfo = product.idInfo() ?: run {
        emitFailure(IllegalArgumentException("idInfo is required for BiometricKYC"))
        return
      }
      val partnerName = if (product.hasKey("partnerName")) product.getString("partnerName") else null
      partnerName ?: run {
        emitFailure(IllegalArgumentException("partnerName is required for BiometricKYC"))
        return
      }
      val partnerPrivacyPolicy = if (product.hasKey("partnerPrivacyPolicy")) product.getString("partnerPrivacyPolicy") else null
      partnerPrivacyPolicy ?: run {
        emitFailure(IllegalArgumentException("partnerPrivacyPolicy is required for BiometricKYC"))
        return
      }
      if(!URLUtil.isValidUrl(partnerPrivacyPolicy)){
        emitFailure(IllegalArgumentException("a valid url for partnerPrivacyPolicy is required for BiometricKYC"))
        return
      }
      val logoResName = if (product.hasKey("partnerIcon")) product.getString("partnerIcon") else null
      val partnerIcon = context.resources.getIdentifier(
        logoResName,
        "drawable",
        (context as? ReactApplicationContext)?.currentActivity?.packageName
      )

      val productName = if (product.hasKey("productName")) product.getString("productName") else null
      productName ?: run {
        emitFailure(IllegalArgumentException("productName is required for BiometricKYC"))
        return
      }
      composeView.apply {
        setContent {
          userId = userId ?: rememberSaveable { randomUserId() }
          jobId = jobId ?: rememberSaveable { randomJobId() }
          SmileID.BiometricKYC(
            idInfo = idInfo,
            partnerIcon = painterResource(id = partnerIcon),
            partnerName = partnerName,
            productName = productName,
            partnerPrivacyPolicy = URL(partnerPrivacyPolicy),
            userId = userId!!,
            jobId = jobId!!,
            allowAgentMode = allowAgentMode,
            showAttribution = showInstructions,
          ) { result ->
            when (result) {
              is SmileIDResult.Success -> {
                val json = try {
                  SmileID.moshi
                    .adapter(BiometricKycResult::class.java)
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
