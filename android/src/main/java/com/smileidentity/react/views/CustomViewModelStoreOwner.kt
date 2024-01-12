package com.smileidentity.react.views

import androidx.lifecycle.ViewModelStore
import androidx.lifecycle.ViewModelStoreOwner

class CustomViewModelStoreOwner : ViewModelStoreOwner {
  override val viewModelStore: ViewModelStore = ViewModelStore()

  fun clear() {
    viewModelStore.clear()
  }
}
