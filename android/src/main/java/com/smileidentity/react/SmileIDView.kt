package com.smileidentity.react

import android.content.Context
import android.view.Choreographer
import android.view.ViewGroup
import android.widget.LinearLayout
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.platform.ComposeView
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.smileidentity.SmileID
import com.smileidentity.compose.SmartSelfieAuthentication
import com.smileidentity.compose.SmartSelfieEnrollment
import com.smileidentity.util.randomJobId
import com.smileidentity.util.randomUserId
import timber.log.Timber

class SmileIDView(context: Context) : LinearLayout(context) {
  private val composeView: ComposeView = ComposeView(context)
  lateinit var userId: String
  lateinit var jobId: String
  lateinit var jobType: String

  init {
    val layoutParams = ViewGroup.LayoutParams(
      ViewGroup.LayoutParams.WRAP_CONTENT,
      ViewGroup.LayoutParams.WRAP_CONTENT
    )
    setLayoutParams(layoutParams)
    orientation = VERTICAL

    composeView.setContent {
      val navController = rememberNavController()
      NavHost(
        navController,
        if (jobType == "1") "smart_selfie_enrollment" else "smart_selfie_authentication"
      ) {
        composable("smart_selfie_enrollment") {
          val userId = rememberSaveable { randomUserId() }
          val jobId = rememberSaveable { randomJobId() }
          SmileID.SmartSelfieEnrollment(
            userId = userId,
            jobId = jobId,
            allowAgentMode = true,
            showInstructions = true
          ) { result ->
            //TODO: Handle result
            Timber.d("Result: $result")
            navController.popBackStack()
          }
        }
        composable("smart_selfie_authentication") {
          val userId = rememberSaveable { randomJobId( )}
          val jobId = rememberSaveable { randomJobId() }
          SmileID.SmartSelfieAuthentication(
            userId = userId,
            jobId = jobId,
            allowAgentMode = true,
          ) { result ->
            //TODO: Handle result
            Timber.d("Result: $result")
            navController.popBackStack()
          }
        }
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
    } catch (_: Exception) {
    }

  }
}
