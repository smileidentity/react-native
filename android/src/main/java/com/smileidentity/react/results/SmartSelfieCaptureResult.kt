package com.smileidentity.react.results

import com.smileidentity.models.v2.SmartSelfieResponse
import java.io.File
import com.squareup.moshi.JsonClass

@JsonClass(generateAdapter = true)
data class SmartSelfieCaptureResult(
  val selfieFile: File? = null,
  val livenessFiles: List<File>? = null,
  val apiResponse: SmartSelfieResponse? = null,
  val didSubmitBiometricKycJob: Boolean? = null
)
