package com.smileidentity.react

import android.view.Choreographer
import android.view.ViewGroup
import android.webkit.URLUtil
import android.widget.LinearLayout
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.platform.ComposeView
import androidx.compose.ui.res.painterResource
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
import com.smileidentity.compose.BiometricKYC
import com.smileidentity.compose.DocumentVerification
import com.smileidentity.compose.SmartSelfieAuthentication
import com.smileidentity.compose.SmartSelfieEnrollment
import com.smileidentity.models.JobType
import com.smileidentity.results.BiometricKycResult
import com.smileidentity.results.DocumentVerificationResult
import com.smileidentity.results.SmartSelfieResult
import com.smileidentity.results.SmileIDResult
import com.smileidentity.util.randomJobId
import com.smileidentity.util.randomUserId
import java.net.URL

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
    product?.let { product ->
      var productThrowable: Throwable? = null
      val jobType = JobType.fromValue(product.getInt("jobType"))
      val startDestination = when (jobType) {
        JobType.SmartSelfieEnrollment -> smartSelfieEnrollmentRoute
        JobType.SmartSelfieAuthentication -> smartSelfieAuthenticationRoute
        JobType.BiometricKyc -> biometricKycRoute
        JobType.DocumentVerification -> documentVerificationRoute
        JobType.EnhancedKyc -> enhancedKycRoute
        else -> {
          productThrowable = Throwable("Job type is not valid")
          emitFailure(productThrowable)
          return;
        }
      }
      /*
      * Check for common args
       */
      var userId = product.getString("userId")
      var jobId = product.getString("userId")
      var countryCode = product.getString("countryCode")
      if (jobType == JobType.DocumentVerification && countryCode == null) {
        productThrowable = Throwable("countryCode is required for DocumentVerification")
        emitFailure(productThrowable)
        return;
      }

      val allowAgentMode = if (product.hasKey("allowAgentMode")) product.getBoolean("allowAgentMode") else false
      val showInstructions = if (product.hasKey("showInstructions")) product.getBoolean("showInstructions") else true
      val isProduction = if (product.hasKey("isProduction")) product.getBoolean("isProduction") else false

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
              allowAgentMode = allowAgentMode,
              showInstructions = showInstructions
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
              allowAgentMode = allowAgentMode
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
          composable(biometricKycRoute) {
            userId = userId ?: rememberSaveable { randomJobId() }
            jobId = jobId ?: rememberSaveable { randomJobId() }

            val idInfoMap = product.getMap("idInfo")
            if(idInfoMap == null || idInfoMap.idInfo() == null) {
              emitFailure(Throwable("idInfo is required for BiometricKYC"))
              return@composable
            }
            val partnerName =  product.getString("partnerName")
            if(partnerName == null) {
              emitFailure(Throwable("partnerName is required for BiometricKYC"))
              return@composable
            }
            val productName =  product.getString("productName")
            if(productName == null) {
              emitFailure(Throwable("productName is required for BiometricKYC"))
              return@composable
            }
            val partnerPrivacyPolicy =  product.getString("partnerPrivacyPolicy")
            if(partnerPrivacyPolicy == null || !URLUtil.isValidUrl(partnerPrivacyPolicy)) {
              emitFailure(Throwable("partnerPrivacyPolicy is required for BiometricKYC"))
              return@composable
            }
            val partnerPrivacyPolicyUrl = URL(partnerPrivacyPolicy)


            val logoResName = product.getString("partnerIcon")
            val partnerIcon = context.resources.getIdentifier(logoResName, "drawable", (context as? ReactApplicationContext)?.currentActivity?.packageName)

            SmileID.BiometricKYC(
              idInfo = idInfoMap.idInfo()!!,
              partnerIcon = painterResource(id = partnerIcon),
              partnerName = partnerName,
              productName = productName,
              partnerPrivacyPolicy = partnerPrivacyPolicyUrl,
              userId = userId!!,
              jobId = jobId!!,
              allowAgentMode = allowAgentMode,
              showAttribution = showInstructions,
              ) { result ->
              when (result) {
                is SmileIDResult.Success -> {
                  val json = try {
                    SmileID.moshi
                      .adapter(BiometricKycResult::class.java)
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
              documentType = product.getString("documentType"),
              showInstructions = product.getBoolean("showInstructions"),
              allowGalleryUpload = product.getBoolean("allowGalleryUpload"),
              captureBothSides = product.getBoolean("captureBothSides")
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
