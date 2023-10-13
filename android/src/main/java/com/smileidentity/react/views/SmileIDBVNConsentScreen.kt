package com.smileidentity.react.views

import android.webkit.URLUtil
import com.facebook.react.bridge.ReactApplicationContext

class SmileIDBVNConsentScreen (context: ReactApplicationContext) : SmileIDView(context) {

  override fun renderContent() {
    product?.let {product->
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
