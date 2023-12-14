package com.smileidentity.react.utils

import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.ReadableType
import com.smileidentity.models.IdInfo
import com.smileidentity.models.JobType
import com.smileidentity.models.PartnerParams
import com.smileidentity.util.randomUserId
import timber.log.Timber

fun ReadableMap.toMap(): Map<String, String> {
  val map = mutableMapOf<String, String>()
  val iterator = keySetIterator()
  while (iterator.hasNextKey()) {
    val key = iterator.nextKey()
    val value: String = when (getType(key)) {
      ReadableType.Null -> null.toString()
      ReadableType.Boolean -> getBoolean(key).toString()
      ReadableType.Number -> getDouble(key).toString()
      ReadableType.String -> getString(key)!!
      ReadableType.Map -> getMap(key)?.toMap().toString()
      ReadableType.Array -> getArray(key).toString()
    }
    map[key] = value
  }
  return map
}

fun ReadableMap.idInfo(): IdInfo? {
  val country = getStringOrDefault("country", null) ?: run {
    Timber.e("idInfo.country is required")
    return null
  }
  return IdInfo(
    country = country,
    idType = getStringOrDefault("idType", null),
    idNumber = getStringOrDefault("idNumber", null),
    firstName = getStringOrDefault("firstName", null),
    middleName = getStringOrDefault("middleName", null),
    lastName = getStringOrDefault("lastName", null),
    dob = getStringOrDefault("dob", null),
    bankCode = getStringOrDefault("bankCode", null),
    entered = getBoolOrDefault("entered", false),
  )
}


fun ReadableMap.partnerParams(): PartnerParams? {
  val partnerParams = getMapOrDefault("partnerParams", null) ?: run {
    Timber.w("partnerParams is required")
    return null
  }
  val jobTypeValue = partnerParams.getIntOrDefault("jobType", null)
  val jobType = if (jobTypeValue != null) JobType.fromValue(jobTypeValue) else null
  return PartnerParams(
    jobType = jobType,
    userId = partnerParams.getStringOrDefault("userId", null) ?: run { randomUserId() },
    jobId = partnerParams.getStringOrDefault("jobId", null) ?: run { randomUserId() },
    extras = partnerParams.getMapOrDefault("extras", null)?.toMap() ?: run { emptyMap() },
  )
}


fun ReadableMap.getBoolOrDefault(key: String, defaultValue: Boolean): Boolean {
  if (hasKey(key)) {
    return getBoolean(key)
  }
  return defaultValue
}

fun ReadableMap.getFloatOrDefault(key: String, defaultValue: Float?): Float? {
  if (hasKey(key)) {
    return getDouble(key).toFloat()
  }
  return defaultValue
}

fun ReadableMap.getStringOrDefault(key: String, defaultValue: String?): String? {
  if (hasKey(key)) {
    return getString(key)
  }
  return defaultValue
}

fun ReadableMap.getIntOrDefault(key: String, defaultValue: Int?): Int? {
  if (hasKey(key)) {
    return getInt(key)
  }
  return defaultValue
}

fun ReadableMap.getMapOrDefault(key: String, defaultValue: ReadableMap?): ReadableMap? {
  if (hasKey(key)) {
    return getMap(key)
  }
  return defaultValue
}
