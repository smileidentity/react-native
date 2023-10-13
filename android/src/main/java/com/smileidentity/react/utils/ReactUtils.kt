package com.smileidentity.react.utils

import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.ReadableType
import com.smileidentity.models.IdInfo
import com.smileidentity.models.JobType
import com.smileidentity.models.PartnerParams
import com.smileidentity.util.randomUserId

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

fun ReadableMap.toArray(): Array<Any?> {
  val array = mutableListOf<Any?>()
  val keysIterator = keySetIterator()

  while (keysIterator.hasNextKey()) {
    val key = keysIterator.nextKey()
    val value: Any? = when (getType(key)) {
      ReadableType.Null -> null
      ReadableType.Boolean -> getBoolean(key)
      ReadableType.Number -> getDouble(key)
      ReadableType.String -> getString(key)
      ReadableType.Map -> getMap(key)?.toArray()
      ReadableType.Array -> getArray(key)
    }
    array.add(value)
  }
  return array.toTypedArray()
}


fun ReadableMap.idInfo(): IdInfo? {
  if (!hasKey("idInfo") && !hasKey("country")) {
    return null
  }
  val idInfoMap = getMap("idInfo")
  val country = idInfoMap?.getString("country") ?: run {
    Log.w("SmileIdentity", "idInfo.country is required")
    return null
  }
  return IdInfo(
    country = country,
    idType = if (idInfoMap.hasKey("idType")) idInfoMap.getString("idType") else null,
    idNumber = if (idInfoMap.hasKey("idNumber")) idInfoMap.getString("idNumber") else null,
    firstName = if (idInfoMap.hasKey("firstName")) idInfoMap.getString("firstName") else null,
    middleName = if (idInfoMap.hasKey("middleName")) idInfoMap.getString("middleName") else null,
    lastName = if (idInfoMap.hasKey("lastName")) idInfoMap.getString("lastName") else null,
    dob = if (idInfoMap.hasKey("dob")) idInfoMap.getString("dob") else null,
    bankCode = if (idInfoMap.hasKey("bankCode")) idInfoMap.getString("bankCode") else null,
    entered = if (idInfoMap.hasKey("entered")) idInfoMap.getBoolean("entered") else false,
  )
}


fun ReadableMap.partnerParams(): PartnerParams {
  if (hasKey("partnerParams")) {
    val partnerParams = getMap("partnerParams")
    return PartnerParams(
      jobType = if (partnerParams!!.hasKey("jobType")) JobType.fromValue(partnerParams.getInt("jobType")) else null,
      userId = if (partnerParams.hasKey("userId")) partnerParams.getString("userId")!! else randomUserId(),
      jobId = if (partnerParams.hasKey("jobId")) partnerParams.getString("jobId")!! else randomUserId(),
      extras = if (partnerParams.hasKey("extras")) partnerParams.getMap("extras")!!.toMap() else emptyMap()
    )
  }
  return PartnerParams(
    userId = randomUserId(),
    jobId = randomUserId(),
  )
}
