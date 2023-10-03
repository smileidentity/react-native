package com.smileidentity.react

import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.ReadableType
import com.smileidentity.models.IdInfo

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
  if (!hasKey("country")) {
    return null
  }
  val country = getString("country")
  return IdInfo(
    country = country!!,
    idType = if (hasKey("idType")) getString("idType") else null,
    idNumber = if (hasKey("idNumber")) getString("idNumber") else null,
    firstName = if (hasKey("firstName")) getString("firstName") else null,
    middleName = if (hasKey("middleName")) getString("middleName") else null,
    lastName = if (hasKey("lastName")) getString("lastName") else null,
    dob = if (hasKey("dob")) getString("dob") else null,
    bankCode = if (hasKey("bankCode")) getString("bankCode") else null,
    entered = if (hasKey("entered")) getBoolean("entered") else false,
  )
}
