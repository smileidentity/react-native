package com.smileidentity.react.views

import android.graphics.BitmapFactory
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.consumeWindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.statusBars
import androidx.compose.foundation.layout.windowInsetsPadding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.runtime.toMutableStateList
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
import com.smileidentity.compose.selfie.SmartSelfieInstructionsScreen
import com.smileidentity.compose.theme.colorScheme
import com.smileidentity.compose.theme.typography
import com.smileidentity.models.v2.Metadata
import com.smileidentity.react.utils.SelfieCaptureResultAdapter
import com.smileidentity.results.SmileIDResult
import com.smileidentity.util.randomJobId
import com.smileidentity.util.randomUserId
import com.smileidentity.viewmodel.SelfieUiState
import com.smileidentity.viewmodel.SelfieViewModel
import com.smileidentity.viewmodel.viewModelFactory
import java.io.File

data class SmartSelfieCaptureResult(
  val selfieFile: File? = null,
  val livenessFiles: List<File >? = null
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
    val userId = randomUserId()
    val jobId = randomJobId()
    val metadata = LocalMetadata.current
    val viewModel: SelfieViewModel =
      viewModel(
        factory =
        viewModelFactory {
          SelfieViewModel(
            isEnroll = false,
            userId = userId,
            jobId = jobId,
            allowNewEnroll = false,
            skipApiSubmission = true,
            metadata = metadata,
          )
        },
      )
    val uiState = viewModel.uiState.collectAsStateWithLifecycle().value
    var acknowledgedInstructions by rememberSaveable { mutableStateOf(false) }
    CompositionLocalProvider(
      LocalMetadata provides remember { Metadata.default().items.toMutableStateList() },
    ) {
      MaterialTheme(colorScheme = SmileID.colorScheme, typography = SmileID.typography) {
        Surface(content = {
          when {
            showInstructions && !acknowledgedInstructions -> SmartSelfieInstructionsScreen(
              showAttribution = showAttribution,
            ) {
              acknowledgedInstructions = true
            }
            uiState.processingState != null -> HandleProcessingState(viewModel)
            uiState.selfieToConfirm != null ->
              HandleSelfieConfirmation(
                showConfirmation,
                uiState,
                viewModel,
              )

            else -> RenderSelfieCaptureScreen(userId, jobId, allowAgentMode ?: true, viewModel)
          }
        })
      }
    }
  }

  @Composable
  private fun RenderSelfieCaptureScreen(
    userId: String,
    jobId: String,
    allowAgentMode: Boolean,
    viewModel: SelfieViewModel,
  ) {
    Box(
      modifier =
      Modifier
        .background(color = Color.White)
        .windowInsetsPadding(WindowInsets.statusBars)
        .consumeWindowInsets(WindowInsets.statusBars)
        .fillMaxSize(),
    ) {
      SelfieCaptureScreen(
        userId = userId,
        jobId = jobId,
        allowAgentMode = allowAgentMode,
        allowNewEnroll = false,
        skipApiSubmission = true,
        viewModel = viewModel,
      )
    }
  }

  @Composable
  private fun HandleSelfieConfirmation(
    showConfirmation: Boolean,
    uiState: SelfieUiState,
    viewModel: SelfieViewModel,
  ) {
    if (showConfirmation) {
      ImageCaptureConfirmationDialog(
        titleText = stringResource(R.string.si_smart_selfie_confirmation_dialog_title),
        subtitleText =
        stringResource(
          R.string.si_smart_selfie_confirmation_dialog_subtitle,
        ),
        painter =
        BitmapPainter(
          BitmapFactory
            .decodeFile(uiState.selfieToConfirm!!.absolutePath)
            .asImageBitmap(),
        ),
        confirmButtonText =
        stringResource(
          R.string.si_smart_selfie_confirmation_dialog_confirm_button,
        ),
        onConfirm = {
          viewModel.submitJob()
        },
        retakeButtonText =
        stringResource(
          R.string.si_smart_selfie_confirmation_dialog_retake_button,
        ),
        onRetake = viewModel::onSelfieRejected,
        scaleFactor = 1.25f,
      )
    } else {
      viewModel.submitJob()
    }
  }

  @Composable
  private fun HandleProcessingState(viewModel: SelfieViewModel) {
    viewModel.onFinished { res ->
      when (res) {
        is SmileIDResult.Success -> {
          val result =
            SmartSelfieCaptureResult(
              selfieFile = res.data.selfieFile,
              livenessFiles = res.data.livenessFiles,
            )
          val newMoshi =
            SmileID.moshi
              .newBuilder()
              .add(SelfieCaptureResultAdapter.FACTORY)
              .build()
          val json =
            try {
              newMoshi
                .adapter(SmartSelfieCaptureResult::class.java)
                .toJson(result)
            } catch (e: Exception) {
              emitFailure(e)
              return@onFinished
            }
          json?.let { js ->
            emitSuccess(js)
          }
        }

        is SmileIDResult.Error -> emitFailure(res.throwable)
      }
    }
  }
}