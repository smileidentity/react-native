package com.smileidentity.react.views

import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.res.stringResource
import androidx.lifecycle.viewmodel.compose.LocalViewModelStoreOwner
import com.facebook.react.bridge.ReactApplicationContext
import com.smileidentity.R
import com.smileidentity.compose.components.LocalMetadata
import com.smileidentity.compose.document.DocumentCaptureScreen
import com.smileidentity.compose.document.DocumentCaptureSide
import com.smileidentity.util.randomJobId
import com.smileidentity.util.randomUserId

class SmileIDDocumentCapture(context: ReactApplicationContext) : SmileIDView(context) {
  var countryCode: String? = null
  var allowGalleryUpload: Boolean? = false
  var idAspectRatio: Float? = 1.0f
  override fun renderContent() {
    composeView.apply {
      val customViewModelStoreOwner = CustomViewModelStoreOwner()
      setContent {
        CompositionLocalProvider(LocalViewModelStoreOwner provides customViewModelStoreOwner) {
          val userId = userId ?: rememberSaveable { randomUserId() }
          val jobId = jobId ?: rememberSaveable { randomJobId() }
          val metadata = LocalMetadata.current
          DocumentCaptureScreen(
            jobId = jobId,
            side = DocumentCaptureSide.Front,
            showInstructions = showInstructions ?: true,
            showAttribution = showAttribution ?: true,
            allowGallerySelection = allowGalleryUpload ?: false,
            showSkipButton = false,
            instructionsHeroImage = R.drawable.si_doc_v_front_hero,
            instructionsTitleText = stringResource(R.string.si_doc_v_instruction_title),
            instructionsSubtitleText = stringResource(
              id = R.string.si_verify_identity_instruction_subtitle,
            ),
            captureTitleText = stringResource(
              id = R.string.si_doc_v_capture_instructions_front_title,
            ),
            knownIdAspectRatio = idAspectRatio,
            onConfirm = { _ ->

            },
            onError = {throwable: Throwable ->
                emitFailure(throwable)
            },
          )
        }
      }
    }
  }
}
