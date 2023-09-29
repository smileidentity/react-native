package com.smileidentity.react

import android.util.Log
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
import com.smileidentity.models.JobType
import com.smileidentity.results.DocumentVerificationResult
import com.smileidentity.results.SmartSelfieResult
import com.smileidentity.results.SmileIDResult
import com.smileidentity.util.randomJobId
import com.smileidentity.util.randomUserId

class SmileIDView(context: ReactApplicationContext) : LinearLayout(context) {
  var userId: String? = null
  var jobId: String? = null
  var countryCode: String? = null
    set(value) {
      field = value
      render()
    }
  var idType: String? = null
    set(value) {
      field = value
      render()
    }
  var jobType: JobType? = null
    set(value) {
      field = value
      render()
    }
  private val composeView: ComposeView = ComposeView(context.currentActivity!!)
  private var eventEmitter: RCTEventEmitter

  val smartSelfieEnrollmentRoute = "smart_selfie_enrollment"
  val smartSelfieAuthenticationRoute = "smart_selfie_authentication"
  val biomentricKycRoute = "bio_kyc"
  val documentVerificationRoute = "document_verification"
  val enhancedKycRoute = "enhanced_kyc"


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

  private fun render() {
    Log.v("Japhet", "jobType: $jobType")
    Log.v("Japhet", "userId: $userId")
    Log.v("Japhet", "countryCode: $countryCode")
    Log.v("Japhet", "idType: $idType")
    if (jobType == null)
      return

    if (jobType == JobType.DocumentVerification && (countryCode == null || idType == null))
      return

    val startDestination = when (jobType) {
      JobType.SmartSelfieEnrollment -> smartSelfieEnrollmentRoute
      JobType.SmartSelfieAuthentication -> smartSelfieAuthenticationRoute
      JobType.BiometricKyc -> biomentricKycRoute
      JobType.DocumentVerification -> documentVerificationRoute
      JobType.EnhancedKyc -> enhancedKycRoute
      else -> {
        smartSelfieEnrollmentRoute
      }
    }
    composeView.setContent {
      val navHostController = rememberNavController()
      NavHost(
        navHostController,
        startDestination = startDestination
      ) {
        composable(smartSelfieEnrollmentRoute) {
          val userId = userId ?: rememberSaveable { randomUserId() }
          val jobId = jobId ?: rememberSaveable { randomJobId() }
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
        composable(smartSelfieAuthenticationRoute) {
          val userId = userId ?: rememberSaveable { randomJobId() }
          val jobId = jobId ?: rememberSaveable { randomJobId() }
          SmileID.SmartSelfieAuthentication(
            userId = userId,
            jobId = jobId,
            allowAgentMode = true
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
        composable(documentVerificationRoute) {
          val userId = userId ?: rememberSaveable { randomUserId() }
          val jobId = jobId ?: rememberSaveable { randomJobId() }
          val documentType = remember(it) {
            Document(
              countryCode!!,
              idType!!,
            )
          }
          SmileID.DocumentVerification(
            userId = userId,
            jobId = jobId,
            idType = documentType,
            showInstructions = true,
            allowGalleryUpload = true,
            captureBothSides = true
          ) { result ->
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
  }

  private fun emitSuccess(result: String) {
    val map = Arguments.createMap()
    map.putString("result", result)
    sendEvent(map)
  }

  private fun sendEvent(map: WritableMap) {
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
