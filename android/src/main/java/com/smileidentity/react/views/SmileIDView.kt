package com.smileidentity.react.views

import android.view.Choreographer
import android.view.ViewGroup
import android.widget.LinearLayout
import androidx.compose.ui.platform.ComposeView
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.RCTEventEmitter
import com.smileidentity.models.JobType
import com.smileidentity.react.utils.getBoolOrDefault
import com.smileidentity.react.utils.getIntOrDefault
import timber.log.Timber

abstract class SmileIDView(context: ReactApplicationContext) : LinearLayout(context) {
  val composeView: ComposeView = ComposeView(context.currentActivity!!)
  var userId: String? = null
  var jobId: String? = null
  private var jobType: JobType? = null
  var allowAgentMode: Boolean? = false
  var showInstructions: Boolean? = true
  private var eventEmitter: RCTEventEmitter
  private var productThrowable: Throwable? = null
  var product: ReadableMap? = null
    set(value) {
      field = value
      render()
    }

  init {
    val layoutParams = ViewGroup.LayoutParams(
      ViewGroup.LayoutParams.WRAP_CONTENT,
      ViewGroup.LayoutParams.WRAP_CONTENT
    )
    eventEmitter = (context as ReactContext).getJSModule(RCTEventEmitter::class.java);
    setLayoutParams(layoutParams)
    orientation = VERTICAL
    render()

    composeView.layoutParams = ViewGroup.LayoutParams(
      ViewGroup.LayoutParams.MATCH_PARENT,
      ViewGroup.LayoutParams.MATCH_PARENT
    )
    addView(composeView)

    setupLayoutHack()
    manuallyLayoutChildren()
  }

  private fun checkCommonArgs() {
    if (product == null) {
      productThrowable = IllegalArgumentException("Product is null")
      emitFailure(productThrowable!!)
      return;
    }
    userId = product?.getString("userId")
    jobId = product?.getString("jobId")

    allowAgentMode = product?.getBoolOrDefault("allowAgentMode", false)
    showInstructions = product?.getBoolOrDefault("showInstructions", true)
    val setJobType = product?.getIntOrDefault("jobType", null)
    setJobType?.let { jobTypeValue ->
      jobType = JobType.fromValue(jobTypeValue)
    }
  }

  abstract fun renderContent()

  open fun render() {
    checkCommonArgs();
    checkCommonArgs();
    renderContent()
  }

  open fun emitSuccess(result: String) {
    val map = Arguments.createMap().apply {
      putString("result", result)
    }
    sendEvent(map)
  }

  open fun sendEvent(map: WritableMap) {
    val reactContext = context as ReactContext
    reactContext.getJSModule(RCTEventEmitter::class.java)
      .receiveEvent(id, "onSmileResult", map)
  }

  open fun emitFailure(error: Throwable?) {
    val map = Arguments.createMap()
    map.putString("error", error?.message ?: "Unknown error")
    sendEvent(map)
  }

  private fun setupLayoutHack() {
    Choreographer.getInstance().postFrameCallback(object : Choreographer.FrameCallback {
      override fun doFrame(frameTimeNanos: Long) {
        manuallyLayoutChildren()
        viewTreeObserver.dispatchOnGlobalLayout()
        Choreographer.getInstance().postFrameCallback(this)
      }
    })
  }

  private fun manuallyLayoutChildren() {
    try {
      for (i in 0 until childCount) {
        val child = getChildAt(i)
        child.measure(
          MeasureSpec.makeMeasureSpec(measuredWidth, MeasureSpec.EXACTLY),
          MeasureSpec.makeMeasureSpec(measuredHeight, MeasureSpec.EXACTLY)
        )
        child.layout(0, 0, child.measuredWidth, child.measuredHeight)
      }
    } catch (e: Exception) {
      Timber.w(e)
    }
  }
}
