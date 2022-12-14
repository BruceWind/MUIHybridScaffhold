package io.github.brucewind

import android.annotation.SuppressLint
import android.os.Build
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.view.*
import android.viewbinding.BuildConfig
import android.webkit.WebView
import io.github.brucewind.bridge.HyBridge
import io.github.brucewind.databinding.ActivityFullscreenBinding

/**
 * An example full-screen activity that shows and hides the system UI (i.e.
 * status bar and navigation/system bar) with user interaction.
 */
class FullscreenActivity : AppCompatActivity() {

    private lateinit var binding: ActivityFullscreenBinding
    private lateinit var webView: WebView

    companion object{
        private const val UI_ANIMATION_DELAY = 300L
    }

    @SuppressLint("ClickableViewAccessibility")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityFullscreenBinding.inflate(layoutInflater)
        setContentView(binding.root)
        supportActionBar?.hide()

        binding.root.postDelayed({
            setFullscreen()
        }, UI_ANIMATION_DELAY)
        initWebView()
    }

    private fun setFullscreen(){
        // Delayed removal of status and navigation bar
        if (Build.VERSION.SDK_INT >= 30) {
            binding.webviewContainer.windowInsetsController?.hide(WindowInsets.Type.statusBars())
        } else {
            // Note that some of these constants are new as of API 16 (Jelly Bean)
            // and API 19 (KitKat). It is safe to use them, as they are inlined
            // at compile-time and do nothing on earlier devices.
            binding.webviewContainer.systemUiVisibility =
                View.SYSTEM_UI_FLAG_LOW_PROFILE or
                        View.SYSTEM_UI_FLAG_FULLSCREEN or
                        View.SYSTEM_UI_FLAG_LAYOUT_STABLE or
                        View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
        }
    }
    // add webview into layout
    private fun initWebView(){
        WebView.setWebContentsDebuggingEnabled(BuildConfig.DEBUG)
        webView = WebView(this)

        webView.settings.javaScriptEnabled = true
        webView.settings.domStorageEnabled = true
        webView.settings.allowFileAccess = true
        webView.settings.allowFileAccessFromFileURLs = true
        webView.settings.allowUniversalAccessFromFileURLs = true
        webView.settings.mediaPlaybackRequiresUserGesture = false
        webView.settings.javaScriptCanOpenWindowsAutomatically = true
        webView.settings.setSupportMultipleWindows(true)

        // add webview
        binding.webviewContainer.addView(webView)
        // load url from assets.
        webView.loadUrl("file:///android_asset/web/index.html")
        webView.addJavascriptInterface(HyBridge(this@FullscreenActivity), "hybridge")

    }

    override fun onPause() {
        super.onPause()

        if(this::webView.isInitialized) {
            webView.loadUrl("javascript:onMessage('page', {fun:'onPause'});")
        }
    }

    override fun onResume() {
        super.onResume()

        if(this::webView.isInitialized) {
            webView.loadUrl("javascript:onMessage('page', {fun:'onResume'});")
        }
    }

    override fun onKeyDown(keyCode: Int, event: KeyEvent?): Boolean {

        // Check if the key event was the Back button and if there's history
        if (keyCode == KeyEvent.KEYCODE_BACK && webView.canGoBack()) {
            webView.loadUrl("javascript:onMessage('page', {fun:KEYCODE_BACK});")
            webView.goBack()
            return true
        }
        // If it wasn't the Back key or there's no web page history, bubble up to the default
        // system behavior (probably exit the activity)
        return super.onKeyDown(keyCode, event)
    }

    override fun onDestroy() {
        super.onDestroy()
        binding.webviewContainer.removeAllViews()

        webView.loadUrl("javascript:onMessage('page', {fun:onDestroy});")
    }
}