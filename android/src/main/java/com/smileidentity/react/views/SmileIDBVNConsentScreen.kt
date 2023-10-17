package com.smileidentity.react.views

import android.webkit.URLUtil
import com.facebook.react.bridge.ReactApplicationContext
import com.smileidentity.react.utils.getStringOrDefault

class SmileIDBVNConsentScreen (context: ReactApplicationContext) : SmileIDView(context) {

  override fun renderContent() {
    product?.let {product->
      val partnerName = product.getStringOrDefault("partnerName",null) ?: run {
        emitFailure(IllegalArgumentException("partnerName is required for BiometricKYC"))
        return
      }
      val partnerPrivacyPolicy = product.getStringOrDefault("partnerPrivacyPolicy",null)  ?: run {
        emitFailure(IllegalArgumentException("partnerPrivacyPolicy is required for BiometricKYC"))
        return
      }
      if(!URLUtil.isValidUrl(partnerPrivacyPolicy)){
        emitFailure(IllegalArgumentException("a valid url for partnerPrivacyPolicy is required for BiometricKYC"))
        return
      }
      val logoResName = product.getStringOrDefault("partnerIcon",null)  ?: run {
        emitFailure(IllegalArgumentException("partnerPrivacyPolicy is required for BiometricKYC"))
        return
      }
      val partnerIcon = context.resources.getIdentifier(
        logoResName,
        "drawable",
        (context as? ReactApplicationContext)?.currentActivity?.packageName
      )
      composeView.apply {
        setContent {
//            SmileID.BvnConsentScreen(
//              partnerIcon = painterResource(
//                id = partnerIcon
//              ),
//              partnerName = partnerName,
//              partnerPrivacyPolicy = URL(partnerPrivacyPolicy),
//              onConsentDenied = {
//                emitSuccess("denied")
//              },
//              onConsentGranted = {
//                emitSuccess("accepted")
//              },
//            )
        }}
    }
   }
}
