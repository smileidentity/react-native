package com.smileidentity.react

import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.ReadableType
import com.smileidentity.models.*
import com.smileidentity.react.utils.*
import com.smileidentity.util.randomJobId
import com.smileidentity.util.randomUserId

fun ReadableMap.toAuthenticationRequest(): AuthenticationRequest {
  return AuthenticationRequest(
    jobType = getStringOrDefault("jobType")?.let { JobType.fromValue(it) },
    country = getStringOrDefault("country"),
    idType = getStringOrDefault("idType"),
    updateEnrolledImage = getBoolOrDefault("updateEnrolledImage", false),
    jobId = getStringOrDefault("jobId"),
    userId = getStringOrDefault("userId"),
  )
}

fun ReadableMap.toAuthenticationRequest(): AuthenticationRequest {
  return AuthenticationRequest(
    jobType = getStringOrDefault("jobType")?.let { JobType.fromValue(it) },
    country = getStringOrDefault("country"),
    idType = getStringOrDefault("idType"),
    updateEnrolledImage = getBoolean("updateEnrolledImage"),
    jobId = getStringOrDefault("jobId"),
    userId = getStringOrDefault("userId")
  )
}

fun ReadableMap.toPartnerParams(): PartnerParams {
  return PartnerParams(
    jobType = getStringOrDefault("jobType")?.let { JobType.fromValue(it) },
    jobId = getStringOrDefault("jobId"),
    userId = getStringOrDefault("userId"),
    extras = getMapOrDefault("extras")?.toHashMap()
  )
}

fun ReadableMap.toConsentInfo(): ConsentInfo {
  return ConsentInfo(
    canAccess = getBoolean("canAccess"),
    consentRequired = getBoolean("consentRequired")
  )
}

fun ReadableMap.toPrepUploadRequest(): PrepUploadRequest {
  return PrepUploadRequest(
    partnerParams = getMapOrDefault("partnerParams")?.toPartnerParams(),
    callbackUrl = getStringOrDefault("callbackUrl"),
    partnerId = getStringOrDefault("partnerId"),
    sourceSdk = getStringOrDefault("sourceSdk"),
    timestamp = getDouble("timestamp"),
    signature = getStringOrDefault("signature")
  )
}

fun ReadableMap.toUploadRequest(): UploadRequest {
  val imagesArray = getArray("images")?.toArrayList()?.map {
    (it as ReadableMap).toUploadImageInfo()
  }
  return UploadRequest(
    images = imagesArray ?: emptyList(),
    idInfo = getMapOrDefault("idInfo")?.toIdInfo()
  )
}

fun ReadableMap.toUploadImageInfo(): UploadImageInfo {
  return UploadImageInfo(
    imageTypeId = getStringOrDefault("imageTypeId")?.let { ImageType.valueOf(it) },
    image = File(getStringOrDefault("imageName"))
  )
}

fun ReadableMap.toIdInfo(): IdInfo {
  return IdInfo(
    country = getStringOrDefault("country"),
    idType = getStringOrDefault("idType"),
    idNumber = getStringOrDefault("idNumber"),
    firstName = getStringOrDefault("firstName"),
    middleName = getStringOrDefault("middleName"),
    lastName = getStringOrDefault("lastName"),
    dob = getStringOrDefault("dob"),
    bankCode = getStringOrDefault("bankCode"),
    entered = getBoolean("entered")
  )
}

fun ReadableMap.toEnhancedKycRequest(): EnhancedKycRequest {
  return EnhancedKycRequest(
    country = getStringOrDefault("country"),
    idType = getStringOrDefault("idType"),
    idNumber = getStringOrDefault("idNumber"),
    firstName = getStringOrDefault("firstName"),
    middleName = getStringOrDefault("middleName"),
    lastName = getStringOrDefault("lastName"),
    dob = getStringOrDefault("dob"),
    phoneNumber = getStringOrDefault("phoneNumber"),
    bankCode = getStringOrDefault("bankCode"),
    callbackUrl = getStringOrDefault("callbackUrl"),
    partnerParams = getMapOrDefault("partnerParams")?.toPartnerParams(),
    sourceSdk = getStringOrDefault("sourceSdk"),
    timestamp = getDouble("timestamp"),
    signature = getStringOrDefault("signature")
  )
}

fun ReadableMap.toJobStatusRequest(): JobStatusRequest {
  return JobStatusRequest(
    userId = getStringOrDefault("userId"),
    jobId = getStringOrDefault("jobId"),
    includeImageLinks = getBoolean("includeImageLinks"),
    includeHistory = getBoolean("includeHistory"),
    partnerId = getStringOrDefault("partnerId"),
    timestamp = getDouble("timestamp"),
    signature = getStringOrDefault("signature")
  )
}

// Extension for ProductsConfigRequest
fun ReadableMap.toProductsConfigRequest(): ProductsConfigRequest {
  return ProductsConfigRequest(
    partnerId = getStringOrDefault("partnerId"),
    timestamp = getDouble("timestamp"),
    signature = getStringOrDefault("signature")
  )
}
