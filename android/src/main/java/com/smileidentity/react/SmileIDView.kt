package com.smileidentity.react

import android.view.Choreographer
import android.view.ViewGroup
import android.widget.LinearLayout
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.platform.ComposeView
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.RCTEventEmitter
import com.smileidentity.SmileID
import com.smileidentity.compose.DocumentVerification
import com.smileidentity.compose.SmartSelfieAuthentication
import com.smileidentity.compose.SmartSelfieEnrollment
import com.smileidentity.models.Document
import com.smileidentity.results.DocumentVerificationResult
import com.smileidentity.results.SmartSelfieResult
import com.smileidentity.results.SmileIDResult
import com.smileidentity.util.randomJobId
import com.smileidentity.util.randomUserId

class SmileIDView(context: ReactApplicationContext) : LinearLayout(context) {
  private val composeView: ComposeView = ComposeView(context.currentActivity!!)
  lateinit var userId: String
  lateinit var jobId: String
  lateinit var jobType: String
  lateinit var eventEmitter: RCTEventEmitter


  init {
    val layoutParams = ViewGroup.LayoutParams(
      ViewGroup.LayoutParams.WRAP_CONTENT,
      ViewGroup.LayoutParams.WRAP_CONTENT
    )
    eventEmitter = (context as ReactContext).getJSModule(RCTEventEmitter::class.java);
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
          ) {
            when (it) {
              is SmileIDResult.Success -> {
                val json = try {
                  SmileID.moshi
                    .adapter(SmartSelfieResult::class.java)
                    .toJson(it.data)
                } catch (e: Exception) {
                  "null"
                }
                emitSuccess(json)
              }
              is SmileIDResult.Error -> {
                it.throwable.printStackTrace()
                emitFailure(it.throwable)
              }
            }
          }
        }
        composable("smart_selfie_authentication") {
          val userId = rememberSaveable { randomJobId() }
          val jobId = rememberSaveable { randomJobId() }
          SmileID.SmartSelfieAuthentication(
            userId = userId,
            jobId = jobId,
            allowAgentMode = true){
            when (it) {
              is SmileIDResult.Success -> {
                val json = try {
                  SmileID.moshi
                    .adapter(SmartSelfieResult::class.java)
                    .toJson(it.data)
                } catch (e: Exception) {
                  "null"
                }
                emitSuccess(json)
              }
              is SmileIDResult.Error -> {
                it.throwable.printStackTrace()
                emitFailure(it.throwable)
              }
            }
          }
        }
        composable("document_verification") {
          val userId = rememberSaveable { randomUserId() }
          val jobId = rememberSaveable { randomJobId() }
          val documentType = remember(it) {
            Document(
              it.arguments?.getString("countryCode")!!,
              it.arguments?.getString("idType")!!,
            )
          }
          SmileID.DocumentVerification(
            userId = userId,
            jobId = jobId,
            idType = documentType,
            showInstructions = true,
            allowGalleryUpload = true,
            captureBothSides = true){result ->
            when (result) {
              is SmileIDResult.Success -> {
                val json = try {
                  SmileID.moshi
                    .adapter(DocumentVerificationResult::class.java)
                    .toJson(result.data)
                } catch (e: Exception) {
                  "null"
                }
                emitSuccess(json)
              }
              is SmileIDResult.Error -> {
                result.throwable.printStackTrace()
                emitFailure(result.throwable)
              }
            }
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

  private fun emitSuccess(result: String) {
    val map = Arguments.createMap()
    map.putString("result", result)
    sendEvent(map)
  }

  private fun sendEvent(map: WritableMap){
    eventEmitter.receiveEvent(id, "onSmileResult", map)
  }

  private fun emitFailure(error: Throwable) {
    val map = Arguments.createMap()
    map.putString("error", error.message)
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
    } catch (_: Exception) {
    }
  }
}
