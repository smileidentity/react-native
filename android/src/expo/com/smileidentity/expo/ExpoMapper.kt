package com.smileid.expo

import com.smileidentity.models.*
import com.smileidentity.react.utils.getCurrentIsoTimestamp
import com.smileidentity.util.randomJobId
import com.smileidentity.util.randomUserId
import expo.modules.kotlin.exception.CodedException
import java.io.File

// =====================================================
// MAP<STRING, ANY> EXTENSIONS FOR EXPO
// =====================================================

fun Map<String, Any>.toConfig(): Config {
    return Config(
        partnerId = this["partnerId"] as? String ?: run {
            throw IllegalArgumentException("partnerId is required")
        },
        authToken = this["authToken"] as? String ?: run {
            throw IllegalArgumentException("authToken is required")
        },
        prodLambdaUrl = this["prodLambdaUrl"] as? String ?: run {
            throw IllegalArgumentException("prodBaseUrl is required")
        },
        testLambdaUrl = this["testLambdaUrl"] as? String ?: run {
            throw IllegalArgumentException("sandboxBaseUrl is required")
        },
    )
}

fun Map<String, Any>.toAuthenticationRequest(): AuthenticationRequest {
    return AuthenticationRequest(
        jobType = (this["jobType"] as? Number)?.toInt()?.let { JobType.fromValue(it) } ?: run {
            throw IllegalArgumentException("jobType is required")
        },
        country = this["country"] as? String,
        idType = this["idType"] as? String,
        updateEnrolledImage = this["updateEnrolledImage"] as? Boolean ?: false,
        jobId = this["jobId"] as? String,
        userId = this["userId"] as? String,
    )
}

fun Map<String, Any>.toPartnerParams(): PartnerParams {
    return PartnerParams(
        jobType = (this["jobType"] as? Number)?.toInt()?.let { JobType.fromValue(it) } ?: run {
            throw IllegalArgumentException("jobType is required")
        },
        jobId = this["jobId"] as? String ?: randomJobId(),
        userId = this["userId"] as? String ?: randomUserId(),
        extras = (this["extras"] as? Map<String, Any>) ?: emptyMap()
    )
}

fun Map<String, Any>.toPrepUploadRequest(): PrepUploadRequest {
    return PrepUploadRequest(
        partnerParams = (this["partnerParams"] as? Map<String, Any>)?.toPartnerParams() ?: run {
            throw IllegalArgumentException("partnerParams is required")
        },
        callbackUrl = this["callbackUrl"] as? String,
        partnerId = this["partnerId"] as? String ?: run {
            throw IllegalArgumentException("partnerId is required")
        },
        sourceSdk = this["sourceSdk"] as? String ?: "android (expo)",
        timestamp = this["timestamp"] as? String ?: run {
            throw IllegalArgumentException("timestamp is required")
        },
        allowNewEnroll = this["allowNewEnroll"] as? Boolean ?: false,
        signature = this["signature"] as? String ?: run {
            throw IllegalArgumentException("signature is required")
        },
    )
}

fun Map<String, Any>.toUploadRequest(): UploadRequest {
    val imagesArray = (this["images"] as? List<Any>)?.map { imageMap ->
        (imageMap as Map<String, Any>).toUploadImageInfo()
    }
    return UploadRequest(
        images = imagesArray ?: emptyList(),
        idInfo = (this["idInfo"] as? Map<String, Any>)?.toIdInfo()
    )
}

fun Map<String, Any>.toUploadImageInfo(): UploadImageInfo {
    return UploadImageInfo(
        imageTypeId = (this["imageTypeId"] as? String)?.let { ImageType.valueOf(it) } ?: run {
            throw IllegalArgumentException("imageTypeId is required")
        },
        image = File(this["imageName"] as? String ?: run {
            throw IllegalArgumentException("imageName is required")
        }),
    )
}

fun Map<String, Any>.toIdInfo(): IdInfo {
    return IdInfo(
        country = this["country"] as? String ?: run {
            throw IllegalArgumentException("country is required")
        },
        idType = this["idType"] as? String,
        idNumber = this["idNumber"] as? String,
        firstName = this["firstName"] as? String,
        middleName = this["middleName"] as? String,
        lastName = this["lastName"] as? String,
        dob = this["dob"] as? String,
        bankCode = this["bankCode"] as? String,
        entered = this["entered"] as? Boolean ?: false
    )
}

fun Map<String, Any>.toEnhancedKycRequest(): EnhancedKycRequest {
    return EnhancedKycRequest(
        country = this["country"] as? String ?: run {
            throw IllegalArgumentException("country is required")
        },
        idType = this["idType"] as? String ?: run {
            throw IllegalArgumentException("idType is required")
        },
        idNumber = this["idNumber"] as? String ?: run {
            throw IllegalArgumentException("idNumber is required")
        },
        firstName = this["firstName"] as? String,
        middleName = this["middleName"] as? String,
        lastName = this["lastName"] as? String,
        dob = this["dob"] as? String,
        phoneNumber = this["phoneNumber"] as? String,
        bankCode = this["bankCode"] as? String,
        callbackUrl = this["callbackUrl"] as? String,
        partnerParams = (this["partnerParams"] as? Map<String, Any>)?.toPartnerParams() ?: run {
            throw IllegalArgumentException("partnerParams is required")
        },
        sourceSdk = this["sourceSdk"] as? String ?: "android (expo)",
        timestamp = this["timestamp"] as? String ?: run {
            throw IllegalArgumentException("timestamp is required")
        },
        signature = this["signature"] as? String ?: run {
            throw IllegalArgumentException("signature is required")
        },
        consentInformation = (this["consentInformation"] as? Map<String, Any>)?.toConsentInfo() ?: run {
            ConsentInformation(
                consented = ConsentedInformation(
                    consentGrantedDate = getCurrentIsoTimestamp(),
                    personalDetails = false,
                    contactInformation = false,
                    documentInformation = false
                )
            )
        },
    )
}

fun Map<String, Any>.toConsentInfo(): ConsentInformation {
    val consentGrantedDate = this["consentGrantedDate"] as? String ?: getCurrentIsoTimestamp()

    // Try the new property names first, fall back to old property names if new ones aren't present
    val personalDetailsConsentGranted = if (this.containsKey("personalDetails")) {
        this["personalDetails"] as? Boolean ?: false
    } else {
        this["personalDetailsConsentGranted"] as? Boolean ?: false
    }

    val contactInfoConsentGranted = if (this.containsKey("contactInformation")) {
        this["contactInformation"] as? Boolean ?: false
    } else {
        this["contactInfoConsentGranted"] as? Boolean ?: false
    }

    val documentInfoConsentGranted = if (this.containsKey("documentInformation")) {
        this["documentInformation"] as? Boolean ?: false
    } else {
        this["documentInfoConsentGranted"] as? Boolean ?: false
    }

    return ConsentInformation(
        consented = ConsentedInformation(
            consentGrantedDate = consentGrantedDate,
            personalDetails = personalDetailsConsentGranted,
            contactInformation = contactInfoConsentGranted,
            documentInformation = documentInfoConsentGranted
        ),
    )
}

fun Map<String, Any>.toJobStatusRequest(): JobStatusRequest {
    return JobStatusRequest(
        userId = this["userId"] as? String ?: run {
            throw IllegalArgumentException("userId is required")
        },
        jobId = this["jobId"] as? String ?: run {
            throw IllegalArgumentException("jobId is required")
        },
        includeImageLinks = this["includeImageLinks"] as? Boolean ?: false,
        includeHistory = this["includeHistory"] as? Boolean ?: false,
        partnerId = this["partnerId"] as? String ?: run {
            throw IllegalArgumentException("partnerId is required")
        },
        timestamp = this["timestamp"] as? String ?: run {
            throw IllegalArgumentException("timestamp is required")
        },
        signature = this["signature"] as? String ?: run {
            throw IllegalArgumentException("signature is required")
        }
    )
}

fun Map<String, Any>.toProductsConfigRequest(): ProductsConfigRequest {
    return ProductsConfigRequest(
        partnerId = this["partnerId"] as? String ?: run {
            throw IllegalArgumentException("partnerId is required")
        },
        timestamp = this["timestamp"] as? String ?: run {
            throw IllegalArgumentException("timestamp is required")
        },
        signature = this["signature"] as? String ?: run {
            throw IllegalArgumentException("signature is required")
        }
    )
}

// =====================================================
// RESPONSE TO MAP EXTENSIONS FOR EXPO
// =====================================================

fun AuthenticationResponse.toMap(): Map<String, Any> {
    return mapOf(
        "success" to success,
        "signature" to signature,
        "timestamp" to timestamp,
    )
}

fun PrepUploadResponse.toMap(): Map<String, Any> {
    return mapOf(
        "code" to code,
        "uploadUrl" to uploadUrl,
        "smileJobId" to smileJobId,
    )
}

fun SmartSelfieJobStatusResponse.toMap(): Map<String, Any> {
    return mapOf(
        "jobComplete" to jobComplete,
        "jobSuccess" to jobSuccess,
        "result" to result,
        "code" to code,
        "history" to history
    )
}

fun DocumentVerificationJobStatusResponse.toMap(): Map<String, Any> {
    return mapOf(
        "jobComplete" to jobComplete,
        "jobSuccess" to jobSuccess,
        "result" to result,
        "code" to code,
        "history" to history
    )
}

fun BiometricKycJobStatusResponse.toMap(): Map<String, Any> {
    return mapOf(
        "jobComplete" to jobComplete,
        "jobSuccess" to jobSuccess,
        "result" to result,
        "code" to code,
        "history" to history
    )
}

fun EnhancedDocumentVerificationJobStatusResponse.toMap(): Map<String, Any> {
    return mapOf(
        "jobComplete" to jobComplete,
        "jobSuccess" to jobSuccess,
        "result" to result,
        "code" to code,
        "history" to history
    )
}

fun EnhancedKycResponse.toMap(): Map<String, Any> {
    return mapOf(
        "resultText" to resultText,
        "resultCode" to resultCode,
        "success" to success,
        "smileJobId" to smileJobId,
        "partnerParams" to partnerParams,
        "country" to country,
        "idType" to idType,
        "idNumber" to idNumber,
        "fullName" to fullName,
        "firstName" to firstName,
        "middleName" to middleName,
        "lastName" to lastName,
        "dob" to dob,
        "photo" to photo,
        "phoneNumber" to phoneNumber,
        "phoneNumber2" to phoneNumber2,
        "gender" to gender,
        "address" to address,
        "idIssuedDate" to idIssuedDate,
        "idExpirationDate" to idExpirationDate
    )
}

fun EnhancedKycAsyncResponse.toMap(): Map<String, Any> {
    return mapOf(
        "success" to success,
        "smileJobId" to smileJobId,
        "partnerParams" to partnerParams
    )
}

fun ProductsConfigResponse.toMap(): Map<String, Any> {
    return mapOf(
        "consentRequired" to consentRequired,
        "idSelection" to idSelection,
        "permissions" to permissions
    )
}

fun ValidDocumentsResponse.toMap(): Map<String, Any> {
    return mapOf(
        "validDocuments" to validDocuments,
        "country" to country
    )
}

fun ServicesResponse.toMap(): Map<String, Any> {
    return mapOf(
        "hostedWeb" to hostedWeb,
        "basicKyc" to basicKyc,
        "biometricKyc" to biometricKyc,
        "enhancedKyc" to enhancedKyc,
        "documentVerification" to documentVerification,
        "enhancedDocumentVerification" to enhancedDocumentVerification,
        "biometricAuthentication" to biometricAuthentication
    )
}