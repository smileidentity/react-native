package com.smileidentity.shared.views

import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.res.stringResource
import androidx.lifecycle.viewmodel.compose.LocalViewModelStoreOwner
import com.smileidentity.R
import com.smileidentity.SmileID
import com.smileidentity.compose.document.DocumentCaptureScreen
import com.smileidentity.compose.document.DocumentCaptureSide
import com.smileidentity.metadata.LocalMetadataProvider
import com.smileidentity.react.results.DocumentCaptureResult
import com.smileidentity.react.utils.DocumentCaptureResultAdapter
import com.smileidentity.results.SmileIDResult
import com.smileidentity.shared.SmileIDSharedResult
import com.smileidentity.shared.SmileIDViewConfig
import com.smileidentity.util.randomJobId
import timber.log.Timber
import java.io.File

@Composable
fun SmileIDDocumentCaptureView(
  config: SmileIDViewConfig,
  onResult: (SmileIDSharedResult<*>) -> Unit,
  front: Boolean = true
) {
  LocalMetadataProvider.MetadataProvider {
    val customViewModelStoreOwner = CustomViewModelStoreOwner()
    CompositionLocalProvider(LocalViewModelStoreOwner provides customViewModelStoreOwner) {
      RenderDocumentCaptureScreen(config, onResult, front)
    }
  }
}

@Composable
private fun RenderDocumentCaptureScreen(
  config: SmileIDViewConfig,
  onResult: (SmileIDSharedResult<*>) -> Unit,
  front: Boolean
) {
  val jobId = config.jobId ?: rememberSaveable { randomJobId() }
  val hero = if (front) R.drawable.si_doc_v_front_hero else R.drawable.si_doc_v_back_hero
  val instructionTitle = if (front) R.string.si_doc_v_instruction_title else
    R.string.si_doc_v_instruction_back_title
  val instructionSubTitle = if (front) R.string.si_verify_identity_instruction_subtitle else
    R.string.si_doc_v_instruction_back_subtitle
  val captureTitleText = if (front) R.string.si_doc_v_capture_instructions_front_title else
    R.string.si_doc_v_capture_instructions_back_title
  
  DocumentCaptureScreen(
    jobId = jobId,
    side = if (front) DocumentCaptureSide.Front else DocumentCaptureSide.Back,
    showInstructions = config.showInstructions,
    showAttribution = config.showAttribution,
    allowGallerySelection = config.allowGalleryUpload,
    showConfirmation = config.showConfirmation,
    showSkipButton = false,
    instructionsHeroImage = hero,
    instructionsTitleText = stringResource(instructionTitle),
    instructionsSubtitleText = stringResource(instructionSubTitle),
    captureTitleText = stringResource(captureTitleText),
    knownIdAspectRatio = config.idAspectRatio,
    onConfirm = { file -> handleConfirmation(file, front, onResult) },
    onError = { throwable -> onResult(SmileIDSharedResult.WithError(throwable)) },
    onSkip = { }
  )
}

private fun handleConfirmation(
  file: File,
  front: Boolean,
  onResult: (SmileIDSharedResult<*>) -> Unit
) {
  val newMoshi = SmileID.moshi.newBuilder()
    .add(DocumentCaptureResultAdapter.FACTORY)
    .build()
  val result = DocumentCaptureResult(
    documentFrontFile = if (front) file else null,
    documentBackFile = if (!front) file else null,
  )
  val json = try {
    newMoshi
      .adapter(DocumentCaptureResult::class.java)
      .toJson(result)
  } catch (e: Exception) {
    Timber.w(e)
    onResult(SmileIDSharedResult.WithError(e))
    return
  }
  onResult(SmileIDSharedResult.Success(json))
}
