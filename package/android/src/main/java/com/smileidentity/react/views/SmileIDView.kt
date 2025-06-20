package com.smileidentity.react.views

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.ui.platform.ComposeView
import androidx.compose.ui.platform.ViewCompositionStrategy
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.events.RCTEventEmitter
import com.facebook.react.views.view.ReactViewGroup
import com.smileidentity.SmileID
import com.smileidentity.compose.theme.colorScheme
import com.smileidentity.compose.theme.typography
import com.smileidentity.shared.SmileIDSharedResult
import com.smileidentity.shared.SmileIDViewConfig


abstract class SmileIDView(context: ThemedReactContext) : ReactViewGroup(context) {

  protected val composeView: ComposeView = ComposeView(context).apply {
    setViewCompositionStrategy(ViewCompositionStrategy.DisposeOnViewTreeLifecycleDestroyed)
  }

  // Centralized configuration using SmileIDViewConfig
  val config = SmileIDViewConfig()

  init {
    addView(composeView)
  }

  /**
   * Called after all props have been set. This is where the view should update its UI.
   */
  abstract fun update()

  /**
   * Called when the view is being destroyed. Clean up resources here.
   */
  open fun cleanup() {
    // Subclasses can override to clean up specific resources
  }

  /**
   * Set the Compose content for this view
   */
  protected fun setContent(content: @Composable () -> Unit) {
    composeView.setContent {
      MaterialTheme(
        colorScheme = SmileID.colorScheme,
        typography = SmileID.typography
      ) {
        Surface(content = content)
      }
    }
  }

  /**
   * Emit a result event back to React Native
   */
  protected fun emitResult(data: String) {
    val event = Arguments.createMap().apply {
      putString("result", data)
    }
    emitEvent("topSmileIDResult", event)
  }

  /**
   * Emit an error event back to React Native
   */
  protected fun emitError(message: String, throwable: Throwable? = null) {
    val event = Arguments.createMap().apply {
      putString("error", message)
      putString("code", "SMILE_ID_ERROR")
      throwable?.let { putString("details", it.toString()) }
    }
    emitEvent("topSmileIDError", event)
  }

  /**
   * Generic handler for SmileIDSharedResult
   */
  open fun handleResult(result: SmileIDSharedResult<*>) {
    when (result) {
      is SmileIDSharedResult.Success -> {
        when (val data = result.data) {
          is String -> emitResult(data)
          else -> emitResult(data.toString())
        }
      }
      is SmileIDSharedResult.WithError -> {
        emitError(result.cause.message ?: "Unknown error", result.cause)
      }
      is SmileIDSharedResult.Error -> {
        emitError(result.message, result.cause)
      }
    }
  }

  private fun emitEvent(eventName: String, params: WritableMap) {
    val reactContext = context as? ThemedReactContext ?: return
    reactContext.getJSModule(RCTEventEmitter::class.java)
      .receiveEvent(id, eventName, params)
  }
}
