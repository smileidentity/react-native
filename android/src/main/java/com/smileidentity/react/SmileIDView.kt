package com.smileidentity.react

import android.view.Choreographer
import android.view.ViewGroup
import android.widget.LinearLayout
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.platform.ComposeView
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.RCTEventEmitter
import com.smileidentity.SmileID
import com.smileidentity.compose.DocumentVerification
import com.smileidentity.compose.SmartSelfieAuthentication
import com.smileidentity.compose.SmartSelfieEnrollment
import com.smileidentity.models.JobType
import com.smileidentity.results.DocumentVerificationResult
import com.smileidentity.results.SmartSelfieResult
import com.smileidentity.results.SmileIDResult
import com.smileidentity.util.randomJobId
import com.smileidentity.util.randomUserId

class SmileIDView(context: ReactApplicationContext) : LinearLayout(context) {
  private val composeView: ComposeView = ComposeView(context.currentActivity!!)
  private var eventEmitter: RCTEventEmitter

  private val smartSelfieEnrollmentRoute = "smart_selfie_enrollment"
  private val smartSelfieAuthenticationRoute = "smart_selfie_authentication"
  private val biometricKycRoute = "bio_kyc"
  private val documentVerificationRoute = "document_verification"
  private val enhancedKycRoute = "enhanced_kyc"
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

  private fun render() {
    product?.let {
      val jobType = JobType.fromValue(it.getInt("jobType"))
      val startDestination = when (JobType.fromValue(it.getInt("jobType"))) {
        JobType.SmartSelfieEnrollment -> smartSelfieEnrollmentRoute
        JobType.SmartSelfieAuthentication -> smartSelfieAuthenticationRoute
        JobType.BiometricKyc -> biometricKycRoute
        JobType.DocumentVerification -> documentVerificationRoute
        JobType.EnhancedKyc -> enhancedKycRoute
        else -> {
          smartSelfieEnrollmentRoute
        }
      }
      var userId = it.getString("userId")
      var jobId = it.getString("userId")
      var countryCode = it.getString("countryCode")
      var productThrowable: Throwable? = null
      if (jobType == JobType.DocumentVerification && countryCode == null) {
        productThrowable = Throwable("countryCode is required for DocumentVerification")
        emitFailure(productThrowable)
        return;
      }

      composeView.setContent {
        val navHostController = rememberNavController()
        NavHost(
          navHostController,
          startDestination = startDestination
        ) {
          composable(smartSelfieEnrollmentRoute) {
            userId = userId ?: rememberSaveable { randomUserId() }
            jobId = jobId ?: rememberSaveable { randomJobId() }
            SmileID.SmartSelfieEnrollment(
              userId = userId!!,
              jobId = jobId!!,
              allowAgentMode = true,
              showInstructions = true
            ) { result ->
              when (result) {
                is SmileIDResult.Success -> {
                  val json = try {
                    SmileID.moshi
                      .adapter(SmartSelfieResult::class.java)
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
          composable(smartSelfieAuthenticationRoute) {
            userId = userId ?: rememberSaveable { randomJobId() }
            jobId = jobId ?: rememberSaveable { randomJobId() }
            SmileID.SmartSelfieAuthentication(
              userId = userId!!,
              jobId = jobId!!,
              allowAgentMode = true
            ) { result ->
              when (result) {
                is SmileIDResult.Success -> {
                  val json = try {
                    SmileID.moshi
                      .adapter(SmartSelfieResult::class.java)
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
          composable(documentVerificationRoute) {
            userId = userId ?: rememberSaveable { randomUserId() }
            jobId = jobId ?: rememberSaveable { randomJobId() }
            SmileID.DocumentVerification(
              userId = userId!!,
              jobId = jobId!!,
              countryCode = countryCode!!,
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
  }

  private fun emitSuccess(result: String) {
    val map = Arguments.createMap().apply {
      putString("result", result)
    }
    sendEvent(map)
  }

  private fun sendEvent(map: WritableMap) {
    val reactContext = context as ReactContext
    reactContext.getJSModule(RCTEventEmitter::class.java)
      .receiveEvent(id, "onSmileResult", map)
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
