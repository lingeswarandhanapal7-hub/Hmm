package com.hmm.app

import android.media.MediaPlayer
import android.util.Base64
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import java.io.File
import java.io.FileOutputStream

class AudioBridgeModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String = "AudioBridge"

    private var mediaPlayer: MediaPlayer? = null
    private var isPaused: Boolean = false

    private fun sendEvent(eventName: String, params: WritableMap?) {
        try {
            reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit(eventName, params)
        } catch (_: Exception) {}
    }

    @ReactMethod
    fun saveBase64Audio(base64Data: String, promise: Promise) {
        try {
            val cleanBase64 = if (base64Data.contains(",")) {
                base64Data.substringAfter(",")
            } else {
                base64Data
            }
            val audioBytes = Base64.decode(cleanBase64, Base64.DEFAULT)
            val audioFile = File(reactApplicationContext.cacheDir, "hmm_audio_playback.mp3")
            FileOutputStream(audioFile).use { fos ->
                fos.write(audioBytes)
                fos.flush()
            }
            promise.resolve(audioFile.absolutePath)
        } catch (e: Exception) {
            promise.reject("AUDIO_SAVE_ERROR", e.message, e)
        }
    }

    @ReactMethod
    fun playBase64Audio(base64Data: String, promise: Promise) {
        try {
            stopAudioInternal()
            val cleanBase64 = if (base64Data.contains(",")) {
                base64Data.substringAfter(",")
            } else {
                base64Data
            }
            val audioBytes = Base64.decode(cleanBase64, Base64.DEFAULT)
            val audioFile = File(reactApplicationContext.cacheDir, "hmm_audio_playback.mp3")
            FileOutputStream(audioFile).use { fos ->
                fos.write(audioBytes)
                fos.flush()
            }

            mediaPlayer = MediaPlayer().apply {
                setDataSource(audioFile.absolutePath)
                prepare()
                setOnCompletionListener {
                    val map = Arguments.createMap().apply {
                        putBoolean("completed", true)
                    }
                    sendEvent("onAudioPlaybackComplete", map)
                }
                start()
            }
            isPaused = false
            promise.resolve(true)
        } catch (e: Exception) {
            promise.reject("PLAY_ERROR", e.message, e)
        }
    }

    @ReactMethod
    fun pauseAudio(promise: Promise) {
        try {
            if (mediaPlayer?.isPlaying == true) {
                mediaPlayer?.pause()
                isPaused = true
                promise.resolve(true)
            } else {
                promise.resolve(false)
            }
        } catch (e: Exception) {
            promise.reject("PAUSE_ERROR", e.message, e)
        }
    }

    @ReactMethod
    fun resumeAudio(promise: Promise) {
        try {
            if (mediaPlayer != null && isPaused) {
                mediaPlayer?.start()
                isPaused = false
                promise.resolve(true)
            } else {
                promise.resolve(false)
            }
        } catch (e: Exception) {
            promise.reject("RESUME_ERROR", e.message, e)
        }
    }

    @ReactMethod
    fun stopAudio(promise: Promise) {
        try {
            stopAudioInternal()
            promise.resolve(true)
        } catch (e: Exception) {
            promise.reject("STOP_ERROR", e.message, e)
        }
    }

    private fun stopAudioInternal() {
        try {
            mediaPlayer?.let {
                if (it.isPlaying) {
                    it.stop()
                }
                it.release()
            }
        } catch (_: Exception) {}
        mediaPlayer = null
        isPaused = false
    }

    @ReactMethod
    fun isPlaying(promise: Promise) {
        try {
            promise.resolve(mediaPlayer?.isPlaying == true)
        } catch (e: Exception) {
            promise.resolve(false)
        }
    }

    @ReactMethod
    fun addListener(eventName: String) {}

    @ReactMethod
    fun removeListeners(count: Int) {}
}
