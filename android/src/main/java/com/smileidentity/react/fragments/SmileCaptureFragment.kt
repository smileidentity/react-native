package com.smileidentity.react.fragments

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.smileidentity.react.views.SmileIDView
import com.smileidentity.react.views.SmileViewListener


class SmileCaptureFragment : Fragment() , SmileViewListener {
  lateinit var smileIdView: SmileIDView
  private var args: ReadableMap? = null
  private var reactContext: ReactContext? = null

  override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
    super.onCreateView(inflater, container, savedInstanceState)
    return smileIdView
  }

  fun setSmileIDView(smileIDView: SmileIDView){
    smileIdView = smileIDView
    smileIdView.smileViewListener = this
  }

  fun setReactContext(reactContext: ReactContext){
    this.reactContext = reactContext

  }

  override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
    super.onViewCreated(view, savedInstanceState)
    Log.v("SmileCaptureFragment", "onViewCreated 1")
    args?.let {
      Log.v("SmileCaptureFragment", "onViewCreated 2")
      smileIdView.renderContent()
    }
  }

  override fun emitSuccess(map: WritableMap) {
    reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      ?.emit("onSmileResult", map)
//    activity?.onBackPressed()
  }
}
