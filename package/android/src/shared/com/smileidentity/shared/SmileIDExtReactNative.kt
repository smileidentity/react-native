package com.smileidentity.shared

import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.lifecycle.viewmodel.compose.LocalViewModelStoreOwner
import com.smileidentity.SmileID
import com.smileidentity.compose.consent.ConsentScreen as SmileIDConsentScreen
import com.smileidentity.results.SmileIDResult
import com.smileidentity.shared.views.CustomViewModelStoreOwner
import com.smileidentity.shared.views.SmileIDBiometricKYCView
import com.smileidentity.shared.views.SmileIDConsentView
import com.smileidentity.shared.views.SmileIDDocumentCaptureView
import com.smileidentity.shared.views.SmileIDDocumentVerificationView
import com.smileidentity.shared.views.SmileIDEnhancedDocumentVerificationView
import com.smileidentity.shared.views.SmileIDSmartSelfieAuthenticationEnhancedView
import com.smileidentity.shared.views.SmileIDSmartSelfieAuthenticationView
import com.smileidentity.shared.views.SmileIDSmartSelfieCaptureView
import com.smileidentity.shared.views.SmileIDSmartSelfieEnrollmentEnhancedView
import com.smileidentity.shared.views.SmileIDSmartSelfieEnrollmentView
import com.smileidentity.util.randomJobId
import com.smileidentity.util.randomUserId

/**
 * Builds SmartSelfieAuthentication with shared configuration
 */
@Composable
fun SmileID.RNSmartSelfieAuthentication(
  config: SmileIDViewConfig,
  onResult: (SmileIDSharedResult<*>) -> Unit
) {
  val finalConfig = config.ensureIds()
  require(finalConfig.validateSelfieProperties()) {
    "SmartSelfieAuthentication requires userId"
  }

  SmileIDSmartSelfieAuthenticationView(config, onResult)
}

/**
 * Builds SmartSelfieEnrollment with shared configuration
 */
@Composable
fun SmileID.RNSmartSelfieEnrollment(
  config: SmileIDViewConfig,
  onResult: (SmileIDSharedResult<*>) -> Unit
) {
  val finalConfig = config.ensureIds()
  require(finalConfig.validateSelfieProperties()) {
    "SmartSelfieEnrollment requires userId"
  }

  SmileIDSmartSelfieEnrollmentView(config, onResult)
}

/**
 * Builds SmartSelfieAuthenticationEnhanced with shared configuration
 */
@Composable
fun SmileID.RNSmartSelfieAuthenticationEnhanced(
  config: SmileIDViewConfig,
  onResult: (SmileIDSharedResult<*>) -> Unit
) {
  val finalConfig = config.ensureIds()
  require(finalConfig.validateSelfieProperties()) {
    "SmartSelfieAuthenticationEnhanced requires userId"
  }

  SmileIDSmartSelfieAuthenticationEnhancedView(config, onResult)
}

/**
 * Builds SmartSelfieEnrollmentEnhanced with shared configuration
 */
@Composable
fun SmileID.RNSmartSelfieEnrollmentEnhanced(
  config: SmileIDViewConfig,
  onResult: (SmileIDSharedResult<*>) -> Unit
) {
  val finalConfig = config.ensureIds()
  require(finalConfig.validateSelfieProperties()) {
    "SmartSelfieEnrollmentEnhanced requires userId"
  }

  SmileIDSmartSelfieEnrollmentEnhancedView(config, onResult)
}

/**
 * Builds BiometricKYC with shared configuration
 */
@Composable
fun SmileID.RNBiometricKYC(
  config: SmileIDViewConfig,
  onResult: (SmileIDSharedResult<*>) -> Unit
) {
  val finalConfig = config.ensureIds()
  require(finalConfig.validateBiometricKYCProperties()) {
    "BiometricKYC requires userId and idInfo"
  }

  SmileIDBiometricKYCView(config, onResult)
}

/**
 * Builds DocumentCapture with shared configuration
 */
@Composable
fun SmileID.RNDocumentCapture(
  config: SmileIDViewConfig,
  onResult: (SmileIDSharedResult<*>) -> Unit
) {
  val finalConfig = config.ensureIds()
  require(finalConfig.validateDocumentProperties()) {
    "DocumentCapture requires countryCode"
  }

  SmileIDDocumentCaptureView(config, onResult)
}

/**
 * Builds DocumentVerification with shared configuration
 */
@Composable
fun SmileID.RNDocumentVerification(
  config: SmileIDViewConfig,
  onResult: (SmileIDSharedResult<*>) -> Unit
) {
  val finalConfig = config.ensureIds()
  require(finalConfig.validateDocumentProperties()) {
    "DocumentVerification requires countryCode"
  }

  SmileIDDocumentVerificationView(config, onResult)
}

/**
 * Builds EnhancedDocumentVerification with shared configuration
 */
@Composable
fun SmileID.RNEnhancedDocumentVerification(
  config: SmileIDViewConfig,
  onResult: (SmileIDSharedResult<*>) -> Unit
) {
  val finalConfig = config.ensureIds()
  require(finalConfig.validateEnhancedDocumentProperties()) {
    "EnhancedDocumentVerification requires countryCode and consentInformation"
  }

  SmileIDEnhancedDocumentVerificationView(config, onResult)
}

/**
 * Builds SmartSelfieCapture with shared configuration
 */
@Composable
fun SmileID.RNSmartSelfieCapture(
  config: SmileIDViewConfig,
  onResult: (SmileIDSharedResult<*>) -> Unit
) {
  val finalConfig = config.ensureIds()
  require(finalConfig.validateSelfieProperties()) {
    "SmartSelfieCapture requires userId"
  }

  SmileIDSmartSelfieCaptureView(config, onResult)
}

/**
 * Builds Consent with shared configuration
 */
@Composable
fun SmileID.RNConsent(
  config: SmileIDViewConfig,
  onResult: (SmileIDSharedResult<*>) -> Unit
) {
  val finalConfig = config.ensureIds()
  require(finalConfig.validateConsentProperties()) {
    "Consent requires consentInformation"
  }

  SmileIDConsentView(config, onResult)
}
