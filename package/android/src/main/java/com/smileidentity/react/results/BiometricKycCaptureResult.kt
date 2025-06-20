package com.smileidentity.react.results

import java.io.File

data class BiometricKycCaptureResult(
  val selfieFile: File? = null,
  val livenessFiles: List<File>? = null,
  val didSubmitBiometricKycJob: Boolean? = null
)
