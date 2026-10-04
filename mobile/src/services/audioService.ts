import { NativeModules, NativeEventEmitter, Platform } from 'react-native';

const { AudioBridge } = NativeModules;
const audioEmitter = AudioBridge ? new NativeEventEmitter(AudioBridge) : null;

export class AudioService {
  private static isCurrentlyPlaying = false;
  private static completionListener: any = null;

  static async playAudio(base64Audio: string, onComplete?: () => void): Promise<boolean> {
    try {
      this.stopAudio();

      if (this.completionListener) {
        this.completionListener.remove();
        this.completionListener = null;
      }

      if (audioEmitter && onComplete) {
        this.completionListener = audioEmitter.addListener('onAudioPlaybackComplete', () => {
          this.isCurrentlyPlaying = false;
          onComplete();
        });
      }

      if (AudioBridge && AudioBridge.playBase64Audio) {
        await AudioBridge.playBase64Audio(base64Audio);
        this.isCurrentlyPlaying = true;
        return true;
      } else {
        // Fallback simulated playback timer if running on mock environment
        this.isCurrentlyPlaying = true;
        setTimeout(() => {
          this.isCurrentlyPlaying = false;
          if (onComplete) onComplete();
        }, 4000);
        return true;
      }
    } catch (error) {
      console.warn('Audio play error:', error);
      this.isCurrentlyPlaying = false;
      return false;
    }
  }

  static async pauseAudio(): Promise<boolean> {
    try {
      if (AudioBridge && AudioBridge.pauseAudio) {
        await AudioBridge.pauseAudio();
        this.isCurrentlyPlaying = false;
        return true;
      }
      this.isCurrentlyPlaying = false;
      return true;
    } catch (e) {
      return false;
    }
  }

  static async resumeAudio(): Promise<boolean> {
    try {
      if (AudioBridge && AudioBridge.resumeAudio) {
        await AudioBridge.resumeAudio();
        this.isCurrentlyPlaying = true;
        return true;
      }
      this.isCurrentlyPlaying = true;
      return true;
    } catch (e) {
      return false;
    }
  }

  static async stopAudio(): Promise<void> {
    try {
      if (AudioBridge && AudioBridge.stopAudio) {
        await AudioBridge.stopAudio();
      }
      this.isCurrentlyPlaying = false;
    } catch (e) {
      this.isCurrentlyPlaying = false;
    }
  }

  static isPlaying(): boolean {
    return this.isCurrentlyPlaying;
  }
}
