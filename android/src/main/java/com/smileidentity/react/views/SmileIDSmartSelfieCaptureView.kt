package com.smileidentity.react.views

import android.graphics.BitmapFactory
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
import androidx.compose.ui.graphics.asImageBitmap
import androidx.compose.ui.graphics.painter.BitmapPainter
import androidx.compose.ui.res.stringResource
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.LocalViewModelStoreOwner
import androidx.lifecycle.viewmodel.compose.viewModel
import com.facebook.react.bridge.ReactApplicationContext
import com.smileidentity.R
import com.smileidentity.SmileID
import com.smileidentity.SmileIDOptIn
import com.smileidentity.compose.components.ImageCaptureConfirmationDialog
import com.smileidentity.compose.components.LocalMetadata
import com.smileidentity.compose.selfie.SelfieCaptureScreen
import com.smileidentity.compose.theme.colorScheme
import com.smileidentity.results.SmartSelfieResult
import com.smileidentity.results.SmileIDResult
import com.smileidentity.util.randomJobId
import com.smileidentity.util.randomUserId
import com.smileidentity.viewmodel.SelfieUiState
import com.smileidentity.viewmodel.SelfieViewModel
import com.smileidentity.viewmodel.viewModelFactory
import timber.log.Timber
import java.io.File

data class SmartSelfieCaptureResult(
  val selfieFile: File,
  val livenessFiles: List<File>
)

@OptIn(SmileIDOptIn::class)
class SmileIDSmartSelfieCaptureView(context: ReactApplicationContext) : SmileIDView(context) {
  var showConfirmation: Boolean = true

  override fun renderContent() {
    composeView.apply {
      val customViewModelStoreOwner = CustomViewModelStoreOwner()
      setContent {
        CompositionLocalProvider(LocalViewModelStoreOwner provides customViewModelStoreOwner) {
          RenderSmartSelfieCaptureContent()
        }
      }
    }
  }

  @Composable
  private fun RenderSmartSelfieCaptureContent() {
    val colorScheme = SmileID.colorScheme.copy(background = Color.White)
    Box(
      modifier = Modifier
        .background(color = colorScheme.background)
        .windowInsetsPadding(WindowInsets.statusBars)
        .consumeWindowInsets(WindowInsets.statusBars)
        .fillMaxSize()
    ) {
      val userId = userId ?: rememberSaveable { randomUserId() }
      val jobId = jobId ?: rememberSaveable { randomJobId() }
      val metadata = LocalMetadata.current
      val viewModel: SelfieViewModel = viewModel(
        factory = viewModelFactory {
          SelfieViewModel(
            isEnroll = false,
            userId = userId,
            jobId = jobId,
            allowNewEnroll = false,
            skipApiSubmission = true,
            metadata = metadata
          )
        }
      )
      val uiState = viewModel.uiState.collectAsStateWithLifecycle().value

      when {
        uiState.processingState != null -> HandleProcessingState(uiState,viewModel)
        uiState.selfieToConfirm != null -> HandleSelfieConfirmation(uiState, viewModel)
        else -> RenderSelfieCaptureScreen(userId, jobId, viewModel)
      }
    }
  }

  @Composable
  private fun HandleProcessingState(uiState: SelfieUiState,viewModel: SelfieViewModel) {
    viewModel.onFinished { result ->
      when (result) {
        is SmileIDResult.Success -> emitSuccessResult(
          result.data
        )

        is SmileIDResult.Error -> emitFailure(result.throwable)
      }
    }
  }

  private fun emitSuccessResult(data: SmartSelfieResult) {
    val json = try {
      SmileID.moshi.adapter(SmartSelfieResult::class.java).toJson(data)
    } catch (e: Exception) {
      Timber.w(e)
      "null"
    }
    emitSuccess(json)
  }

  @Composable
  private fun HandleSelfieConfirmation(uiState: SelfieUiState, viewModel: SelfieViewModel) {
    if (showConfirmation) {
      ImageCaptureConfirmationDialog(
        titleText = stringResource(R.string.si_smart_selfie_confirmation_dialog_title),
        subtitleText = stringResource(R.string.si_smart_selfie_confirmation_dialog_subtitle),
        painter = BitmapPainter(
          BitmapFactory.decodeFile(uiState.selfieToConfirm!!.absolutePath).asImageBitmap()
        ),
        confirmButtonText = stringResource(R.string.si_smart_selfie_confirmation_dialog_confirm_button),
        onConfirm = {
          viewModel.submitJob()
        },
        retakeButtonText = stringResource(R.string.si_smart_selfie_confirmation_dialog_retake_button),
        onRetake = viewModel::onSelfieRejected,
        scaleFactor = 1.25f
      )
    } else {
      viewModel.submitJob()
    }
  }

  @Composable
  private fun RenderSelfieCaptureScreen(userId: String, jobId: String, viewModel: SelfieViewModel) {
    Box(
      modifier =  Modifier
        .background(color = Color.White)
        .windowInsetsPadding(WindowInsets.statusBars)
        .consumeWindowInsets(WindowInsets.statusBars)
        .fillMaxSize(),
    ) {
      SelfieCaptureScreen(
        modifier = Modifier
          .background(color = Color.White),
        userId = userId,
        jobId = jobId,
        allowAgentMode = allowAgentMode ?: true,
        allowNewEnroll = allowNewEnroll ?: false,
        skipApiSubmission = true,
        viewModel = viewModel
      )
    }
  }
}
