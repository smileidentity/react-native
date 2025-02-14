package com.smileidentity.react.utils

import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.ReadableType
import com.smileidentity.models.IdInfo
import com.smileidentity.models.JobType
import com.smileidentity.models.PartnerParams
import com.smileidentity.util.randomUserId
import kotlinx.collections.immutable.ImmutableMap
import kotlinx.collections.immutable.PersistentMap
import kotlinx.collections.immutable.persistentMapOf
import kotlinx.collections.immutable.toImmutableMap
import kotlinx.collections.immutable.toPersistentMap
import timber.log.Timber
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale
import java.util.TimeZone

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

fun ReadableMap.getFloatOrDefault(key: String, defaultValue: Float? = null): Float? {
  if (hasKey(key)) {
    return getDouble(key).toFloat()
  }
  return defaultValue
}

fun ReadableMap.getStringOrDefault(key: String, defaultValue: String? = null): String? {
  if (hasKey(key)) {
    return getString(key)
  }
  return defaultValue
}

fun ReadableMap.getIntOrDefault(key: String, defaultValue: Int? = null): Int? {
  if (hasKey(key)) {
    return getInt(key)
  }
  return defaultValue
}

fun ReadableMap.getMapOrDefault(key: String, defaultValue: ReadableMap? = null): ReadableMap? {
  if (hasKey(key)) {
    return getMap(key)
  }
  return defaultValue
}

fun ReadableMap.getImmutableMapOrDefault(
  key: String,
  defaultValue: ImmutableMap<String, String> = persistentMapOf()
): ImmutableMap<String, String> {
  return if (hasKey(key)) {
    getMap(key)?.toHashMap()
      ?.mapValues { it.value?.toString() ?: "" }
      ?.toPersistentMap()
      ?: defaultValue
  } else {
    defaultValue
  }
}

/**
 * Converts current time to ISO8601 string with milliseconds in UTC
 * Format: yyyy-MM-dd'T'HH:mm:ss.SSS'Z'
 */
internal fun getCurrentIsoTimestamp(): String {
  val pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
  val sdf = SimpleDateFormat(pattern, Locale.US)
  sdf.timeZone = TimeZone.getTimeZone("UTC")
  return sdf.format(Date())
}

