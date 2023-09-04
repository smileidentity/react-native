package com.smileidentity.react

import android.widget.LinearLayout
import android.Manifest
import android.content.Context
import android.util.Log
import android.view.Choreographer
import android.view.ViewGroup
import androidx.compose.ui.platform.ComposeView
import com.smileidentity.SmileID
import com.smileidentity.compose.SmartSelfieEnrollment

class SmileIDView (context: Context) : LinearLayout(context) {
  private val composeView: ComposeView = ComposeView(context)

  init {
    val layoutParams = ViewGroup.LayoutParams(
      ViewGroup.LayoutParams.WRAP_CONTENT,
      ViewGroup.LayoutParams.WRAP_CONTENT
    )
    setLayoutParams(layoutParams)
    orientation = VERTICAL

    composeView.setContent {
      SmileID.SmartSelfieEnrollment(
        userId = "userId1",
        jobId = "userId1",
        allowAgentMode = true,
        showInstructions = true,
      ) { result ->
        //TODO: handle result
      }
    }
    composeView.layoutParams = ViewGroup.LayoutParams(
      ViewGroup.LayoutParams.MATCH_PARENT,
      ViewGroup.LayoutParams.MATCH_PARENT
    )
    addView(composeView)

    setupLayoutHack()
    manuallyLayoutChildren()
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
      Log.d("Started", "$e.message")
    }

  }
}
