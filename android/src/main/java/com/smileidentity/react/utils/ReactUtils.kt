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
