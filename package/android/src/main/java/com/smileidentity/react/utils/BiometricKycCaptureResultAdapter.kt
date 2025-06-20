package com.smileidentity.react.utils

import com.smileidentity.SmileID
import com.smileidentity.react.results.BiometricKycCaptureResult
import com.squareup.moshi.FromJson
import com.squareup.moshi.JsonAdapter
import com.squareup.moshi.JsonAdapter.Factory
import com.squareup.moshi.JsonReader
import com.squareup.moshi.JsonWriter
import com.squareup.moshi.ToJson
import java.io.File

class BiometricKycCaptureResultAdapter : JsonAdapter<BiometricKycCaptureResult>() {

  @FromJson
  override fun fromJson(reader: JsonReader): BiometricKycCaptureResult {
    reader.beginObject()
    var selfieFile: File? = null
    var livenessFiles: List<File>? = null
    var didSubmitBiometricKycJob: Boolean? = null

    while (reader.hasNext()) {
      when (reader.nextName()) {
        "selfieFile" -> selfieFile = reader.nextString()?.let { File(it) }
        "livenessFiles" -> {
          // Assuming livenessFiles is an array of file paths in the JSON
          val files = mutableListOf<File>()
          reader.beginArray()
          while (reader.hasNext()) {
            reader.nextString()?.let { files.add(File(it)) }
          }
          reader.endArray()
          livenessFiles = files
        }
        "didSubmitBiometricKycJob" -> didSubmitBiometricKycJob = reader.nextBoolean()
        else -> reader.skipValue()
      }
    }

    reader.endObject()
    return BiometricKycCaptureResult(
      selfieFile = selfieFile,
      livenessFiles = livenessFiles,
      didSubmitBiometricKycJob = didSubmitBiometricKycJob
    )
  }

  @ToJson
  override fun toJson(writer: JsonWriter, value: BiometricKycCaptureResult?) {
    if (value == null) {
      writer.nullValue()
      return
    }
    writer.beginObject()
    writer.name("selfieFile").value(value.selfieFile?.absolutePath)

    writer.name("livenessFiles")
    writer.beginArray()
    value.livenessFiles?.forEach { writer.value(it.absolutePath) }
    writer.endArray()

    writer.name("didSubmitBiometricKycJob").value(value.didSubmitBiometricKycJob)
    writer.endObject()
  }

  companion object {
    val FACTORY = Factory { type, annotations, moshi -> if (type == BiometricKycCaptureResult::class.java) BiometricKycCaptureResultAdapter() else null }
  }
}
