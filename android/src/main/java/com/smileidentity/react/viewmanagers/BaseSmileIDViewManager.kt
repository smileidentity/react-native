package com.smileidentity.react.viewmanagers

import android.view.Choreographer
import android.view.View
import android.view.View.MeasureSpec
import android.view.ViewGroup
import android.widget.FrameLayout
import androidx.fragment.app.FragmentManager
import com.facebook.react.ReactActivity
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.smileidentity.react.fragments.SmileCaptureFragment
import com.smileidentity.react.views.SmileIDView

abstract class BaseSmileIDViewManager<T : SmileIDView>(
  private val reactApplicationContext: ReactApplicationContext
) : SimpleViewManager<FrameLayout>() {
  private var smileCaptureFragment: SmileCaptureFragment? = null
  protected var smileIDView: T? = null
  override fun getExportedCustomBubblingEventTypeConstants(): Map<String, Any> {
    return mapOf(
      "onSmileResult" to mapOf(
        "phasedRegistrationNames" to mapOf(
          "bubbled" to "onResult"
        )
      )
    )
  }

  private fun createFragment(
    root: FrameLayout,
    reactNativeViewId: Int,
  ) {
    val parentView = root.findViewById<ViewGroup>(reactNativeViewId)
    setupLayout(parentView)

    if (smileCaptureFragment == null) {
      smileCaptureFragment = SmileCaptureFragment()
      smileCaptureFragment?.setReactContext(reactApplicationContext)
      smileCaptureFragment?.setSmileIDView(createSmileView())
      smileCaptureFragment?.let {
        val activity = reactApplicationContext.currentActivity as ReactActivity
        val manager = activity.supportFragmentManager
        manager.popBackStackImmediate(null, FragmentManager.POP_BACK_STACK_INCLUSIVE);
        manager.beginTransaction().remove(it).commit()
        manager.executePendingTransactions()
        manager.beginTransaction()
          .replace(reactNativeViewId, it, reactNativeViewId.toString())
          .commit();
      }
    }
  }

  abstract fun createSmileView(): T
  abstract fun applyArgs(view: T, args: ReadableMap?)

  private fun setupLayout(view: View) {
    Choreographer.getInstance().postFrameCallback(object : Choreographer.FrameCallback {
      override fun doFrame(frameTimeNanos: Long) {
        manuallyLayoutChildren(view)
        view.viewTreeObserver.dispatchOnGlobalLayout()
        Choreographer.getInstance().postFrameCallback(this)
      }
    })
  }

  /**
   * Layout all children properly
   */
  private fun manuallyLayoutChildren(view: View) {
    // propWidth and propHeight coming from react-native props
    val width = view.measuredWidth
    val height = view.measuredHeight
    view.measure(
      MeasureSpec.makeMeasureSpec(width, MeasureSpec.EXACTLY),
      MeasureSpec.makeMeasureSpec(height, MeasureSpec.EXACTLY)
    )

    view.layout(0, 0, width, height)
  }

  override fun createViewInstance(p0: ThemedReactContext): FrameLayout {
    return FrameLayout(p0)
  }

  override fun getCommandsMap(): Map<String, Int> {
    return mapOf("setParams" to COMMAND_SET_PARAMS, "create" to COMMAND_CREATE)
  }

  override fun receiveCommand(
    view: FrameLayout,
    commandId: String?,
    args: ReadableArray?
  ) {
    super.receiveCommand(view, commandId, args)
    when (commandId?.toInt()) {
      COMMAND_CREATE -> {
        val reactNativeViewId = requireNotNull(args).getInt(0)
        createFragment(view, reactNativeViewId)
      }

      COMMAND_SET_PARAMS -> {
        val params = args?.getMap(1)
        smileIDView?.let {
          applyArgs(it, params)
        }
      }
    }
  }

  companion object {
    const val COMMAND_SET_PARAMS = 1
    const val COMMAND_CREATE = 2
  }
}
