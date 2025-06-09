package com.smileidentity.react.views

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.consumeWindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.statusBars
import androidx.compose.foundation.layout.windowInsetsPadding
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.stringResource
import androidx.lifecycle.viewmodel.compose.LocalViewModelStoreOwner
import com.facebook.react.bridge.ReactApplicationContext
import com.smileidentity.R
import com.smileidentity.SmileID
import com.smileidentity.compose.document.DocumentCaptureScreen
import com.smileidentity.compose.document.DocumentCaptureSide
import com.smileidentity.compose.theme.colorScheme
import com.smileidentity.metadata.LocalMetadataProvider
import com.smileidentity.react.results.DocumentCaptureResult
import com.smileidentity.react.utils.DocumentCaptureResultAdapter
import com.smileidentity.util.randomJobId
import timber.log.Timber
import java.io.File

class SmileIDDocumentCaptureView(context: ReactApplicationContext) : SmileIDView(context) {
  var showConfirmation: Boolean = true
  var front: Boolean = true
  var allowGalleryUpload: Boolean = false
  var idAspectRatio: Float? = null

  override fun renderContent() {
    composeView.apply {
      val customViewModelStoreOwner = CustomViewModelStoreOwner()
      setContent {
        CompositionLocalProvider(LocalViewModelStoreOwner provides customViewModelStoreOwner) {
          LocalMetadataProvider.MetadataProvider {
            val colorScheme = SmileID.colorScheme.copy(background = Color.White)
            Box(
              modifier =
                Modifier
                  .background(color = colorScheme.background)
                  .windowInsetsPadding(WindowInsets.statusBars)
                  .consumeWindowInsets(WindowInsets.statusBars)
                  .fillMaxSize(),
            ) {
              renderDocumentCaptureScreen()
            }
          }
        }
      }
    }
  }

  @Composable
  private fun renderDocumentCaptureScreen() {
    val jobId = jobId ?: rememberSaveable { randomJobId() }
    val hero = if (front) R.drawable.si_doc_v_front_hero else R.drawable.si_doc_v_back_hero
    val instructionTitle =
      if (front) {
        R.string.si_doc_v_instruction_title
      } else {
        R.string.si_doc_v_instruction_back_title
      }
    val instructionSubTitle =
      if (front) {
        R.string.si_verify_identity_instruction_subtitle
      } else {
        R.string.si_doc_v_instruction_back_subtitle
      }
    val captureTitleText =
      if (front) {
        R.string.si_doc_v_capture_instructions_front_title
      } else {
        R.string.si_doc_v_capture_instructions_back_title
      }
    DocumentCaptureScreen(
      jobId = jobId,
      side = if (front) DocumentCaptureSide.Front else DocumentCaptureSide.Back,
      showInstructions = showInstructions,
      showAttribution = showAttribution,
      allowGallerySelection = allowGalleryUpload,
      showConfirmation = showConfirmation,
      showSkipButton = false,
      instructionsHeroImage = hero,
      instructionsTitleText = stringResource(instructionTitle),
      instructionsSubtitleText = stringResource(instructionSubTitle),
      captureTitleText = stringResource(captureTitleText),
      knownIdAspectRatio = idAspectRatio,
      onConfirm = { file -> handleConfirmation(file) },
      onError = { throwable -> emitFailure(throwable) },
      onSkip = { },
    )
  }

  private fun handleConfirmation(file: File) {
    val newMoshi =
      SmileID.moshi.newBuilder()
        .add(DocumentCaptureResultAdapter.FACTORY)
        .build()
    val result =
      DocumentCaptureResult(
        documentFrontFile = if (front) file else null,
        documentBackFile = if (!front) file else null,
      )
    val json =
      try {
        newMoshi
          .adapter(DocumentCaptureResult::class.java)
          .toJson(result)
      } catch (e: Exception) {
        Timber.w(e)
        "null"
      }
    emitSuccess(json)
  }
}
