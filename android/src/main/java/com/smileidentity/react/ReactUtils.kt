package com.smileidentity.react

import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.ReadableType

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
