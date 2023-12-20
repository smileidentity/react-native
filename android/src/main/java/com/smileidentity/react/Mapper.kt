package com.smileidentity.react

import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.ReadableType
import com.smileidentity.models.*
import com.smileidentity.react.utils.*
import com.smileidentity.util.randomJobId
import com.smileidentity.util.randomUserId
import java.io.File

fun ReadableMap.toAuthenticationRequest(): AuthenticationRequest {
  return AuthenticationRequest(
    jobType = getIntOrDefault("jobType")?.let { JobType.fromValue(it) } ?: run {
      throw IllegalArgumentException("jobType is required")
    },
    country = getStringOrDefault("country"),
    idType = getStringOrDefault("idType"),
    updateEnrolledImage = getBoolOrDefault("updateEnrolledImage", false),
    jobId = getStringOrDefault("jobId"),
    userId = getStringOrDefault("userId"),
  )
}

fun ReadableMap.toPartnerParams(): PartnerParams {
  return PartnerParams(
    jobType = getIntOrDefault("jobType")?.let { JobType.fromValue(it) } ?: run {
      throw IllegalArgumentException("jobType is required")
    },
    jobId = getStringOrDefault("jobId") ?: randomJobId(),
    userId = getStringOrDefault("userId") ?: randomUserId(),
    extras = getMapOrDefault("extras")?.toMap() ?: emptyMap()
  )
}

fun ReadableMap.toPrepUploadRequest(): PrepUploadRequest {
  return PrepUploadRequest(
    partnerParams = getMapOrDefault("partnerParams")?.toPartnerParams() ?: run {
      throw IllegalArgumentException("partnerParams is required")
    },
    callbackUrl = getStringOrDefault("callbackUrl"),
    partnerId = getStringOrDefault("partnerId") ?: run {
      throw IllegalArgumentException("partnerId is required")
    },
    sourceSdk = getStringOrDefault("sourceSdk") ?: "react-native",
    timestamp = getStringOrDefault("timestamp") ?: run {
      throw IllegalArgumentException("timestamp is required")
    },
    signature = getStringOrDefault("signature") ?: run {
      throw IllegalArgumentException("signature is required")
    },
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
    imageTypeId = getStringOrDefault("imageTypeId")?.let { ImageType.valueOf(it) } ?: run {
      throw IllegalArgumentException("imageTypeId is required")
    },
    image = File(getStringOrDefault("imageName") ?: run {
      throw IllegalArgumentException("imageName is required")
    }),
  )
}

fun ReadableMap.toIdInfo(): IdInfo {
  return IdInfo(
    country = getStringOrDefault("country") ?: run {
      throw IllegalArgumentException("country is required")
    },
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
    country = getStringOrDefault("country") ?: run {
      throw IllegalArgumentException("country is required")
    },
    idType = getStringOrDefault("idType") ?: run {
      throw IllegalArgumentException("idType is required")
    },
    idNumber = getStringOrDefault("idNumber") ?: run {
      throw IllegalArgumentException("idNumber is required")
    },
    firstName = getStringOrDefault("firstName"),
    middleName = getStringOrDefault("middleName"),
    lastName = getStringOrDefault("lastName"),
    dob = getStringOrDefault("dob"),
    phoneNumber = getStringOrDefault("phoneNumber"),
    bankCode = getStringOrDefault("bankCode"),
    callbackUrl = getStringOrDefault("callbackUrl"),
    partnerParams = getMapOrDefault("partnerParams")?.toPartnerParams() ?: run {
      throw IllegalArgumentException("partnerParams is required")
    },
    sourceSdk = getStringOrDefault("sourceSdk") ?: "react-native",
    timestamp = getStringOrDefault("timestamp") ?: run {
      throw IllegalArgumentException("timestamp is required")
    },
    signature = getStringOrDefault("signature") ?: run {
      throw IllegalArgumentException("signature is required")
    },
  )
}

fun ReadableMap.toJobStatusRequest(): JobStatusRequest {
  return JobStatusRequest(
    userId = getStringOrDefault("userId") ?: run {
      throw IllegalArgumentException("userId is required")
    },
    jobId = getStringOrDefault("jobId") ?: run {
      throw IllegalArgumentException("jobId is required")
    },
    includeImageLinks = getBoolOrDefault("includeImageLinks", false),
    includeHistory = getBoolOrDefault("includeHistory", false),
    partnerId = getStringOrDefault("partnerId") ?: run {
      throw IllegalArgumentException("partnerId is required")
    },
    timestamp = getStringOrDefault("timestamp") ?: run {
      throw IllegalArgumentException("timestamp is required")
    },
    signature = getStringOrDefault("signature") ?: run {
      throw IllegalArgumentException("signature is required")
    }
  )
}

fun ReadableMap.toProductsConfigRequest(): ProductsConfigRequest {
  return ProductsConfigRequest(
    partnerId = getStringOrDefault("partnerId") ?: run {
      throw IllegalArgumentException("partnerId is required")
    },
    timestamp = getStringOrDefault("timestamp") ?: run {
      throw IllegalArgumentException("timestamp is required")
    },
    signature = getStringOrDefault("signature") ?: run {
      throw IllegalArgumentException("signature is required")
    }
  )
}
