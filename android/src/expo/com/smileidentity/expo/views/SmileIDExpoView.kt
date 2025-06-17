package com.smileidentity.expo.views

import android.content.Context
import android.view.ViewGroup
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.ui.platform.ComposeView
import expo.modules.kotlin.viewevent.EventDispatcher
import expo.modules.kotlin.views.ExpoView
import com.smileidentity.SmileID
import com.smileidentity.compose.theme.colorScheme
import com.smileidentity.compose.theme.typography
import com.smileidentity.shared.SmileIDSharedResult
import kotlinx.collections.immutable.ImmutableMap
import kotlinx.collections.immutable.persistentMapOf

/**
 * Expo-specific implementation of SmileIDView that uses native Expo events
 */
abstract class SmileIDExpoView(
    context: Context, 
    appContext: expo.modules.kotlin.AppContext
) : ExpoView(context, appContext) {

    // Event dispatchers for Expo
    protected val onSmileIDResult by EventDispatcher<Map<String, Any?>>()
    protected val onSmileIDError by EventDispatcher<Map<String, Any?>>()
    
    // Properties from SmileIDView
    lateinit var composeView: ComposeView
    var userId: String? = null
    var jobId: String? = null
    var allowAgentMode: Boolean? = false
    var showInstructions: Boolean = true
    var skipApiSubmission: Boolean = false
    var showAttribution: Boolean = true
    var extraPartnerParams: ImmutableMap<String, String> = persistentMapOf()
    
    init {
        layoutParams = ViewGroup.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT,
            ViewGroup.LayoutParams.MATCH_PARENT
        )
        setUpViews()
    }
    
    private fun setUpViews() {
        composeView = ComposeView(context)
        composeView.layoutParams = ViewGroup.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT,
            ViewGroup.LayoutParams.MATCH_PARENT
        )
        addView(composeView)
        renderContent()
    }
    
    abstract fun renderContent()
    
    /**
     * Helper method to set content on the ComposeView with MaterialTheme wrapper
     */
    open fun setContentWithTheme(content: @Composable () -> Unit) {
        composeView.setContent {
            MaterialTheme(colorScheme = SmileID.colorScheme, typography = SmileID.typography) {
                Surface(content = content)
            }
        }
    }

    /**
     * Implementation of runOnUiThread for Expo
     */
    open fun runOnUiThread(action: () -> Unit) {
        post(action)
    }

    /**
     * Emit success event using Expo's EventDispatcher
     */
    open fun emitSuccess(result: String) {
        onSmileIDResult(mapOf(
            "result" to result
        ))
    }

    /**
     * Emit failure event using Expo's EventDispatcher
     */
    open fun emitFailure(error: Throwable?) {
        onSmileIDError(mapOf(
            "error" to (error?.message ?: "Unknown error"),
            "code" to "SMILE_ID_ERROR"
        ))
    }
    
    /**
     * Generic handler for SmileIDSharedResult
     */
    open fun handleResultCallback(result: SmileIDSharedResult<*>) {
        when (result) {
            is SmileIDSharedResult.Success -> {
                when (val data = result.data) {
                    is String -> emitSuccess(data)
                    else -> emitSuccess(data.toString())
                }
            }
            is SmileIDSharedResult.WithError -> emitFailure(result.cause)
            is SmileIDSharedResult.Error -> emitFailure(Exception(result.message, result.cause))
        }
    }
}