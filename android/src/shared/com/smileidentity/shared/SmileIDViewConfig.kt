package com.smileidentity.shared

import com.facebook.react.bridge.ReadableMap
import kotlinx.collections.immutable.ImmutableMap
import kotlinx.collections.immutable.persistentMapOf
import kotlinx.collections.immutable.toImmutableMap
import com.smileidentity.react.utils.getBoolOrDefault
import com.smileidentity.react.utils.getFloatOrDefault
import com.smileidentity.react.utils.getImmutableMapOrDefault
import com.smileidentity.react.utils.getMapOrDefault
import com.smileidentity.react.utils.getStringOrDefault
import com.smileidentity.react.toIdInfo
import com.smileidentity.react.toConsentInfo
import com.smileidentity.models.IdInfo
import com.smileidentity.models.ConsentInformation
import com.smileidentity.models.ConsentedInformation

/**
 * Shared properties for all SmileID views
 * Eliminates duplication across the 12 different view types
 */
data class SmileIDViewConfig(
  var userId: String? = null,
  var jobId: String? = null,
  var allowAgentMode: Boolean = false,
  var allowNewEnroll: Boolean = false,
  var showInstructions: Boolean = true,
  var skipApiSubmission: Boolean = false,
  var showAttribution: Boolean = true,
  var extraPartnerParams: ImmutableMap<String, String> = persistentMapOf(),

  // Document-specific properties
  var countryCode: String? = null,
  var documentType: String? = null,
  var captureBothSides: Boolean = true,
  var allowGalleryUpload: Boolean = false,
  var showConfirmation: Boolean = true,
  var idAspectRatio: Float? = null,

  // Capture-specific properties
  var useStrictMode: Boolean = false,

  // Consent-specific properties
  var partnerName: String? = null,
  var partnerPrivacyPolicy: String? = null,
  var logoResName: String? = null,
  var productName: String? = null,

  // KYC-specific properties
  var idInfo: IdInfo? = null,
  var consentInformation: ConsentInformation? = null
) {

  /**
   * Validates required properties for authentication/enrollment views
   */
  fun validateSelfieProperties(): Boolean {
    return userId != null // jobId will be auto-generated if null
  }

  /**
   * Validates required properties for document views
   */
  fun validateDocumentProperties(): Boolean {
    return userId != null && countryCode != null
  }

  /**
   * Validates required properties for enhanced document verification views
   */
  fun validateEnhancedDocumentProperties(): Boolean {
    return validateDocumentProperties() && consentInformation != null
  }

  /**
   * Validates required properties for consent views
   */
  fun validateConsentProperties(): Boolean {
    return partnerName != null && partnerPrivacyPolicy != null &&
           logoResName != null && productName != null
  }

  /**
   * Validates required properties for KYC views
   */
  fun validateKYCProperties(): Boolean {
    return userId != null && idInfo != null
  }

  /**
   * Validates required properties for Biometric KYC views
   */
  fun validateBiometricKYCProperties(): Boolean {
    return validateKYCProperties() && consentInformation != null
  }

  /**
   * Generates random IDs if not provided
   */
  fun ensureIds(): SmileIDViewConfig {
    return copy(
      userId = userId ?: com.smileidentity.util.randomUserId(),
      jobId = jobId ?: com.smileidentity.util.randomJobId()
    )
  }

  companion object {
    /**
     * Validates and creates SmileIDViewConfig for BiometricKYC from ReadableMap
     * @throws IllegalArgumentException if required fields are missing
     */
    fun fromBiometricKYCMap(map: ReadableMap): SmileIDViewConfig {
      val idInfoMap = map.getMap("idInfo")
        ?: throw IllegalArgumentException("idInfo is required to run Biometric KYC")

      return SmileIDViewConfig(
        userId = map.getStringOrDefault("userId"),
        jobId = map.getStringOrDefault("jobId"),
        allowAgentMode = map.getBoolOrDefault("allowAgentMode", false),
        allowNewEnroll = map.getBoolOrDefault("allowNewEnroll", false),
        showInstructions = map.getBoolOrDefault("showInstructions", true),
        showAttribution = map.getBoolOrDefault("showAttribution", true),
        extraPartnerParams = map.getImmutableMapOrDefault("extraPartnerParams"),
        idInfo = idInfoMap.toIdInfo(),
        consentInformation = map.getMapOrDefault("consentInformation")?.toConsentInfo(),
        useStrictMode = map.getBoolOrDefault("useStrictMode", false)
      )
    }

    /**
     * Validates and creates SmileIDViewConfig for DocumentVerification from ReadableMap
     * @throws IllegalArgumentException if required fields are missing
     */
    fun fromDocumentVerificationMap(map: ReadableMap): SmileIDViewConfig {
      val countryCode = map.getString("countryCode")
        ?: throw IllegalArgumentException("countryCode is required to run Document Verification")

      return SmileIDViewConfig(
        userId = map.getStringOrDefault("userId"),
        jobId = map.getStringOrDefault("jobId"),
        allowAgentMode = map.getBoolOrDefault("allowAgentMode", false),
        allowNewEnroll = map.getBoolOrDefault("allowNewEnroll", false),
        showInstructions = map.getBoolOrDefault("showInstructions", true),
        showAttribution = map.getBoolOrDefault("showAttribution", true),
        extraPartnerParams = map.getImmutableMapOrDefault("extraPartnerParams"),
        countryCode = countryCode,
        documentType = map.getStringOrDefault("documentType"),
        captureBothSides = map.getBoolOrDefault("captureBothSides", false),
        allowGalleryUpload = map.getBoolOrDefault("allowGalleryUpload", false),
        idAspectRatio = map.getFloatOrDefault("idAspectRatio"),
        useStrictMode = map.getBoolOrDefault("useStrictMode", false)
      )
    }

    /**
     * Validates and creates SmileIDViewConfig for EnhancedDocumentVerification from ReadableMap
     * @throws IllegalArgumentException if required fields are missing
     */
    fun fromEnhancedDocumentVerificationMap(map: ReadableMap): SmileIDViewConfig {
      val countryCode = map.getString("countryCode")
        ?: throw IllegalArgumentException("countryCode is required to run Enhanced Document Verification")

      return SmileIDViewConfig(
        userId = map.getStringOrDefault("userId"),
        jobId = map.getStringOrDefault("jobId"),
        allowAgentMode = map.getBoolOrDefault("allowAgentMode", false),
        allowNewEnroll = map.getBoolOrDefault("allowNewEnroll", false),
        showInstructions = map.getBoolOrDefault("showInstructions", true),
        showAttribution = map.getBoolOrDefault("showAttribution", true),
        extraPartnerParams = map.getImmutableMapOrDefault("extraPartnerParams"),
        countryCode = countryCode,
        documentType = map.getStringOrDefault("documentType"),
        captureBothSides = map.getBoolOrDefault("captureBothSides", false),
        allowGalleryUpload = map.getBoolOrDefault("allowGalleryUpload", false),
        idAspectRatio = map.getFloatOrDefault("idAspectRatio"),
        consentInformation = map.getMapOrDefault("consentInformation")?.toConsentInfo(),
        useStrictMode = map.getBoolOrDefault("useStrictMode", false)
      )
    }

    /**
     * Validates and creates SmileIDViewConfig for Consent from ReadableMap
     * @throws IllegalArgumentException if required fields are missing
     */
    fun fromConsentMap(map: ReadableMap): SmileIDViewConfig {
      val partnerName = map.getString("partnerName")
        ?: throw IllegalArgumentException("partnerName is required to show Consent Screen")
      val partnerPrivacyPolicy = map.getString("partnerPrivacyPolicy")
        ?: throw IllegalArgumentException("partnerPrivacyPolicy is required to show Consent Screen")
      val logoResName = map.getString("partnerIcon")
        ?: throw IllegalArgumentException("partnerIcon is required to show Consent Screen")
      val productName = map.getString("productName")
        ?: throw IllegalArgumentException("productName is required to show Consent Screen")

      return SmileIDViewConfig(
        userId = map.getStringOrDefault("userId"),
        jobId = map.getStringOrDefault("jobId"),
        allowAgentMode = map.getBoolOrDefault("allowAgentMode", false),
        showInstructions = map.getBoolOrDefault("showInstructions", true),
        showAttribution = map.getBoolOrDefault("showAttribution", true),
        extraPartnerParams = map.getImmutableMapOrDefault("extraPartnerParams"),
        partnerName = partnerName,
        partnerPrivacyPolicy = partnerPrivacyPolicy,
        logoResName = logoResName,
        productName = productName
      )
    }

    /**
     * Validates and creates SmileIDViewConfig for SmartSelfie from ReadableMap
     */
    fun fromSmartSelfieMap(map: ReadableMap): SmileIDViewConfig {
      return SmileIDViewConfig(
        userId = map.getStringOrDefault("userId"),
        jobId = map.getStringOrDefault("jobId"),
        allowAgentMode = map.getBoolOrDefault("allowAgentMode", false),
        allowNewEnroll = map.getBoolOrDefault("allowNewEnroll", false),
        showInstructions = map.getBoolOrDefault("showInstructions", true),
        showAttribution = map.getBoolOrDefault("showAttribution", true),
        skipApiSubmission = map.getBoolOrDefault("skipApiSubmission", false),
        extraPartnerParams = map.getImmutableMapOrDefault("extraPartnerParams")
      )
    }

    /**
     * Validates and creates SmileIDViewConfig for SmartSelfieCapture from ReadableMap
     */
    fun fromSmartSelfieCaptureMap(map: ReadableMap): SmileIDViewConfig {
      return SmileIDViewConfig(
        userId = map.getStringOrDefault("userId"),
        jobId = map.getStringOrDefault("jobId"),
        allowAgentMode = map.getBoolOrDefault("allowAgentMode", false),
        showInstructions = map.getBoolOrDefault("showInstructions", true),
        showAttribution = map.getBoolOrDefault("showAttribution", true),
        skipApiSubmission = map.getBoolOrDefault("skipApiSubmission", false),
        extraPartnerParams = map.getImmutableMapOrDefault("extraPartnerParams"),
        showConfirmation = map.getBoolOrDefault("showConfirmation", true),
        useStrictMode = map.getBoolOrDefault("useStrictMode", false)
      )
    }

    /**
     * Validates and creates SmileIDViewConfig for DocumentCapture from ReadableMap
     */
    fun fromDocumentCaptureMap(map: ReadableMap): SmileIDViewConfig {
      return SmileIDViewConfig(
        userId = map.getStringOrDefault("userId"),
        jobId = map.getStringOrDefault("jobId"),
        showInstructions = map.getBoolOrDefault("showInstructions", true),
        showAttribution = map.getBoolOrDefault("showAttribution", true),
        extraPartnerParams = map.getImmutableMapOrDefault("extraPartnerParams"),
        countryCode = map.getStringOrDefault("countryCode"),
        documentType = map.getStringOrDefault("documentType"),
        captureBothSides = map.getBoolOrDefault("captureBothSides", true),
        allowGalleryUpload = map.getBoolOrDefault("allowGalleryUpload", false),
        showConfirmation = map.getBoolOrDefault("showConfirmation", true),
        idAspectRatio = map.getFloatOrDefault("idAspectRatio")
      )
    }

    /**
     * Creates SmileIDViewConfig from a generic Map<String, Any?>
     * This is useful for Expo and other platforms that use Map instead of ReadableMap
     */
    fun fromMap(map: Map<String, Any?>, viewType: ViewType): SmileIDViewConfig {
      return when (viewType) {
        ViewType.BIOMETRIC_KYC -> fromBiometricKYCMapGeneric(map)
        ViewType.DOCUMENT_VERIFICATION -> fromDocumentVerificationMapGeneric(map)
        ViewType.ENHANCED_DOCUMENT_VERIFICATION -> fromEnhancedDocumentVerificationMapGeneric(map)
        ViewType.CONSENT -> fromConsentMapGeneric(map)
        ViewType.SMART_SELFIE_AUTHENTICATION,
        ViewType.SMART_SELFIE_ENROLLMENT,
        ViewType.SMART_SELFIE_AUTHENTICATION_ENHANCED,
        ViewType.SMART_SELFIE_ENROLLMENT_ENHANCED -> fromSmartSelfieMapGeneric(map)
        ViewType.SMART_SELFIE_CAPTURE -> fromSmartSelfieCaptureMapGeneric(map)
        ViewType.DOCUMENT_CAPTURE -> fromDocumentCaptureMapGeneric(map)
      }
    }

    @Suppress("UNCHECKED_CAST")
    private fun fromBiometricKYCMapGeneric(map: Map<String, Any?>): SmileIDViewConfig {
      val idInfoMap = map["idInfo"] as? Map<String, Any?>
        ?: throw IllegalArgumentException("idInfo is required to run Biometric KYC")

      return SmileIDViewConfig(
        userId = map["userId"] as? String,
        jobId = map["jobId"] as? String,
        allowAgentMode = (map["allowAgentMode"] as? Boolean) == true,
        allowNewEnroll = (map["allowNewEnroll"] as? Boolean) == true,
        showInstructions = (map["showInstructions"] as? Boolean) != false,
        showAttribution = (map["showAttribution"] as? Boolean) != false,
        extraPartnerParams = (map["extraPartnerParams"] as? Map<String, String>)?.toImmutableMap() ?: persistentMapOf(),
        idInfo = idInfoMapToIdInfo(idInfoMap),
        consentInformation = (map["consentInformation"] as? Map<String, Any?>)?.let { consentMapToConsentInfo(it) },
        useStrictMode = (map["useStrictMode"] as? Boolean) == true
      )
    }

    @Suppress("UNCHECKED_CAST")
    private fun fromDocumentVerificationMapGeneric(map: Map<String, Any?>): SmileIDViewConfig {
      val countryCode = map["countryCode"] as? String
        ?: throw IllegalArgumentException("countryCode is required to run Document Verification")

      return SmileIDViewConfig(
        userId = map["userId"] as? String,
        jobId = map["jobId"] as? String,
        allowAgentMode = (map["allowAgentMode"] as? Boolean) == true,
        allowNewEnroll = (map["allowNewEnroll"] as? Boolean) == true,
        showInstructions = (map["showInstructions"] as? Boolean) != false,
        showAttribution = (map["showAttribution"] as? Boolean) != false,
        extraPartnerParams = (map["extraPartnerParams"] as? Map<String, String>)?.toImmutableMap() ?: persistentMapOf(),
        countryCode = countryCode,
        documentType = map["documentType"] as? String,
        captureBothSides = (map["captureBothSides"] as? Boolean) == true,
        allowGalleryUpload = (map["allowGalleryUpload"] as? Boolean) == true,
        idAspectRatio = (map["idAspectRatio"] as? Number)?.toFloat(),
        useStrictMode = (map["useStrictMode"] as? Boolean) == true
      )
    }

    @Suppress("UNCHECKED_CAST")
    private fun fromEnhancedDocumentVerificationMapGeneric(map: Map<String, Any?>): SmileIDViewConfig {
      val countryCode = map["countryCode"] as? String
        ?: throw IllegalArgumentException("countryCode is required to run Enhanced Document Verification")

      return SmileIDViewConfig(
        userId = map["userId"] as? String,
        jobId = map["jobId"] as? String,
        allowAgentMode = (map["allowAgentMode"] as? Boolean) == true,
        allowNewEnroll = (map["allowNewEnroll"] as? Boolean) == true,
        showInstructions = (map["showInstructions"] as? Boolean) != false,
        showAttribution = (map["showAttribution"] as? Boolean) != false,
        extraPartnerParams = (map["extraPartnerParams"] as? Map<String, String>)?.toImmutableMap() ?: persistentMapOf(),
        countryCode = countryCode,
        documentType = map["documentType"] as? String,
        captureBothSides = (map["captureBothSides"] as? Boolean) == true,
        allowGalleryUpload = (map["allowGalleryUpload"] as? Boolean) == true,
        idAspectRatio = (map["idAspectRatio"] as? Number)?.toFloat(),
        consentInformation = (map["consentInformation"] as? Map<String, Any?>)?.let { consentMapToConsentInfo(it) },
        useStrictMode = (map["useStrictMode"] as? Boolean) == true
      )
    }

    @Suppress("UNCHECKED_CAST")
    private fun fromConsentMapGeneric(map: Map<String, Any?>): SmileIDViewConfig {
      val partnerName = map["partnerName"] as? String
        ?: throw IllegalArgumentException("partnerName is required to show Consent Screen")
      val partnerPrivacyPolicy = map["partnerPrivacyPolicy"] as? String
        ?: throw IllegalArgumentException("partnerPrivacyPolicy is required to show Consent Screen")
      val logoResName = map["partnerIcon"] as? String
        ?: throw IllegalArgumentException("partnerIcon is required to show Consent Screen")
      val productName = map["productName"] as? String
        ?: throw IllegalArgumentException("productName is required to show Consent Screen")

      return SmileIDViewConfig(
        userId = map["userId"] as? String,
        jobId = map["jobId"] as? String,
        allowAgentMode = (map["allowAgentMode"] as? Boolean) == true,
        showInstructions = (map["showInstructions"] as? Boolean) != false,
        showAttribution = (map["showAttribution"] as? Boolean) != false,
        extraPartnerParams = (map["extraPartnerParams"] as? Map<String, String>)?.toImmutableMap() ?: persistentMapOf(),
        partnerName = partnerName,
        partnerPrivacyPolicy = partnerPrivacyPolicy,
        logoResName = logoResName,
        productName = productName
      )
    }

    @Suppress("UNCHECKED_CAST")
    private fun fromSmartSelfieMapGeneric(map: Map<String, Any?>): SmileIDViewConfig {
      return SmileIDViewConfig(
        userId = map["userId"] as? String,
        jobId = map["jobId"] as? String,
        allowAgentMode = (map["allowAgentMode"] as? Boolean) == true,
        allowNewEnroll = (map["allowNewEnroll"] as? Boolean) == true,
        showInstructions = (map["showInstructions"] as? Boolean) != false,
        showAttribution = (map["showAttribution"] as? Boolean) != false,
        skipApiSubmission = (map["skipApiSubmission"] as? Boolean) == true,
        extraPartnerParams = (map["extraPartnerParams"] as? Map<String, String>)?.toImmutableMap() ?: persistentMapOf()
      )
    }

    @Suppress("UNCHECKED_CAST")
    private fun fromSmartSelfieCaptureMapGeneric(map: Map<String, Any?>): SmileIDViewConfig {
      return SmileIDViewConfig(
        userId = map["userId"] as? String,
        jobId = map["jobId"] as? String,
        allowAgentMode = (map["allowAgentMode"] as? Boolean) == true,
        showInstructions = (map["showInstructions"] as? Boolean) != false,
        showAttribution = (map["showAttribution"] as? Boolean) != false,
        skipApiSubmission = (map["skipApiSubmission"] as? Boolean) == true,
        extraPartnerParams = (map["extraPartnerParams"] as? Map<String, String>)?.toImmutableMap() ?: persistentMapOf(),
        showConfirmation = (map["showConfirmation"] as? Boolean) != false,
        useStrictMode = (map["useStrictMode"] as? Boolean) == true
      )
    }

    @Suppress("UNCHECKED_CAST")
    private fun fromDocumentCaptureMapGeneric(map: Map<String, Any?>): SmileIDViewConfig {
      return SmileIDViewConfig(
        userId = map["userId"] as? String,
        jobId = map["jobId"] as? String,
        showInstructions = (map["showInstructions"] as? Boolean) != false,
        showAttribution = (map["showAttribution"] as? Boolean) != false,
        extraPartnerParams = (map["extraPartnerParams"] as? Map<String, String>)?.toImmutableMap() ?: persistentMapOf(),
        countryCode = map["countryCode"] as? String,
        documentType = map["documentType"] as? String,
        captureBothSides = (map["captureBothSides"] as? Boolean) != false,
        allowGalleryUpload = (map["allowGalleryUpload"] as? Boolean) == true,
        showConfirmation = (map["showConfirmation"] as? Boolean) != false,
        idAspectRatio = (map["idAspectRatio"] as? Number)?.toFloat()
      )
    }

    // Helper function to convert map to IdInfo
    private fun idInfoMapToIdInfo(map: Map<String, Any?>): IdInfo {
      return IdInfo(
        country = map["country"] as? String ?: throw IllegalArgumentException("country is required in idInfo"),
        idType = map["idType"] as? String,
        idNumber = map["idNumber"] as? String,
        firstName = map["firstName"] as? String,
        middleName = map["middleName"] as? String,
        lastName = map["lastName"] as? String,
        dob = map["dob"] as? String,
        bankCode = map["bankCode"] as? String,
        entered = (map["entered"] as? Boolean) != false
      )
    }

    // Helper function to convert map to ConsentInformation
    private fun consentMapToConsentInfo(map: Map<String, Any?>): ConsentInformation {
      val consentedMap = map["consented"] as? Map<String, Any?>
      return ConsentInformation(
        consented = consentedMap?.let {
          ConsentedInformation(
            consentGrantedDate = it["consentGrantedDate"] as? String ?: "",
            personalDetails = (it["personalDetails"] as? Boolean) == true,
            contactInformation = (it["contactInformation"] as? Boolean) == true,
            documentInformation = (it["documentInformation"] as? Boolean) == true
          )
        } ?: ConsentedInformation(
          consentGrantedDate = "",
          personalDetails = false,
          contactInformation = false,
          documentInformation = false
        )
      )
    }
  }

  enum class ViewType {
    BIOMETRIC_KYC,
    DOCUMENT_VERIFICATION,
    ENHANCED_DOCUMENT_VERIFICATION,
    CONSENT,
    SMART_SELFIE_AUTHENTICATION,
    SMART_SELFIE_ENROLLMENT,
    SMART_SELFIE_AUTHENTICATION_ENHANCED,
    SMART_SELFIE_ENROLLMENT_ENHANCED,
    SMART_SELFIE_CAPTURE,
    DOCUMENT_CAPTURE
  }
}
