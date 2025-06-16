package com.smileidentity.expo.views

import android.content.Context
import expo.modules.kotlin.viewevent.EventDispatcher
import expo.modules.kotlin.views.ExpoView
import com.smileidentity.shared.views.SmileIDView as SharedSmileIDView

/**
 * Expo-specific implementation of SmileIDView that uses native Expo events
 */
abstract class SmileIDExpoView(
    context: Context, 
    appContext: expo.modules.kotlin.AppContext
) : SharedSmileIDView(context) {

    // Event dispatchers for Expo
    protected val onSmileIDResult by EventDispatcher<Map<String, Any?>>()
    protected val onSmileIDError by EventDispatcher<Map<String, Any?>>()

    /**
     * Implementation of runOnUiThread for Expo
     */
    override fun runOnUiThread(action: () -> Unit) {
        post(action)
    }

    /**
     * Emit success event using Expo's EventDispatcher
     */
    override fun emitSuccess(result: String) {
        onSmileIDResult(mapOf(
            "result" to result
        ))
    }

    /**
     * Emit failure event using Expo's EventDispatcher
     */
    override fun emitFailure(error: Throwable?) {
        onSmileIDError(mapOf(
            "error" to (error?.message ?: "Unknown error"),
            "code" to "SMILE_ID_ERROR"
        ))
    }
}