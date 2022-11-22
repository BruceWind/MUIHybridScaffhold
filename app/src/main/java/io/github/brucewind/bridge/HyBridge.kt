package io.github.brucewind.bridge

import android.content.Context
import android.webkit.JavascriptInterface
import io.github.brucewind.BuildConfig

/**
 * @author BruceWind
 * HyBridge is a bridge between webview and native.
 *
 */
class HyBridge(val context: Context) {

    // to tell webview the app version.
    @JavascriptInterface
    fun getAppVersion() = BuildConfig.VERSION_NAME

}