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
import com.smileidentity.SmileIDOptIn
import com.smileidentity.compose.document.DocumentCaptureScreen
import com.smileidentity.compose.document.DocumentCaptureSide
import com.smileidentity.compose.theme.colorScheme
import com.smileidentity.util.randomJobId
import timber.log.Timber
import java.io.File

data class DocumentCaptureResult(val documentFile: File?)

@OptIn(SmileIDOptIn::class)
class SmileIDDocumentCaptureView(context: ReactApplicationContext) : SmileIDView(context) {
  var showConfirmation: Boolean = true
  private var front: Boolean = true
  private var allowGalleryUpload: Boolean = false
  private var idAspectRatio: Float? = null

  override fun renderContent() {
    composeView.apply {
      val customViewModelStoreOwner = CustomViewModelStoreOwner()
      setContent {
        CompositionLocalProvider(LocalViewModelStoreOwner provides customViewModelStoreOwner) {
          val colorScheme = SmileID.colorScheme.copy(background = Color.White)
          Box(
            modifier = Modifier
              .background(color = colorScheme.background)
              .windowInsetsPadding(WindowInsets.statusBars)
              .consumeWindowInsets(WindowInsets.statusBars)
              .fillMaxSize()
          ) {
            RenderDocumentCaptureScreen()
          }
        }
      }
    }
  }

  @Composable
  private fun RenderDocumentCaptureScreen() {
    val jobId = jobId ?: rememberSaveable { randomJobId() }
    DocumentCaptureScreen(
      jobId = jobId,
      side = if (front) DocumentCaptureSide.Front else DocumentCaptureSide.Back,
      showInstructions = showInstructions ?: true,
      showAttribution = showAttribution ?: true,
      allowGallerySelection = allowGalleryUpload,
      showSkipButton = false,
      instructionsHeroImage = R.drawable.si_doc_v_back_hero,
      instructionsTitleText = stringResource(R.string.si_doc_v_instruction_back_title),
      instructionsSubtitleText = stringResource(R.string.si_doc_v_instruction_back_subtitle),
      captureTitleText = stringResource(R.string.si_doc_v_capture_instructions_back_title),
      knownIdAspectRatio = idAspectRatio,
      onConfirm = { file -> handleConfirmation(file) },
      onError = { throwable -> emitFailure(throwable) },
      onSkip = { }
    )
  }

  private fun handleConfirmation(file: File) {
    val json = try {
      SmileID.moshi
        .adapter(DocumentCaptureResult::class.java)
        .toJson(DocumentCaptureResult(file))
    } catch (e: Exception) {
      Timber.w(e)
      "null"
    }
    emitSuccess(json)
  }
}
