# Hmm — React Native Android Application

**Civilian-grade clarity for bureaucratic paper.**

This is the standalone React Native CLI Android application for **Hmm**, built alongside the web frontend and backend services. It provides a native mobile interface to photograph, simplify, translate, and narrate complex bureaucratic notices and legal demands into plain regional language.

---

## Architecture Overview

```
/mobile
  /src
    /assets/fonts         # Bundled Fraunces, Inter, and Noto Sans Indic fonts
    /components
      Header.tsx          # Brand header with logo mark & tags
      LanguageChip.tsx    # Regional script chip selector
      KeyFactCard.tsx     # Fact cards with badges and highlighted amounts
      NextStepsCard.tsx   # Interactive action checklist (Clarity gold left border)
      AudioPlayer.tsx     # Voice playback & progress tracking
      ProcessingOverlay.tsx # Rotating microcopy during extraction
    /screens
      IntroScreen.tsx     # Reanimated signature intro ("Hmm..." -> "Oh. Now I get it.")
      HomeScreen.tsx      # Problem, 4-step pipeline, features, disclaimer
      TryHmmScreen.tsx    # Core document scanning, selection & results
      AboutScreen.tsx     # Technical architecture, credits, open-source links
    /navigation
      AppNavigator.tsx    # Bottom tab navigator (Home · Try Hmm · About)
    /services
      apiService.ts       # Backend connection (/api/process-document) & mock fallback
      audioService.ts     # Native MediaPlayer & AudioBridge wrapper
    /config.ts            # Centralized API URLs & timeouts
    /theme.ts             # Palette (Paper, Ink, Clarity Gold, Seal Red, Calm Sage)
    /data
      mockData.ts         # Single-source-of-truth translations & test fixtures
  android/
    app/src/main/java/com/hmm/app/
      AudioBridgeModule.kt # Kotlin native module for MediaPlayer & Base64 caching
      AudioBridgePackage.kt
      MainActivity.kt
      MainApplication.kt
    app/src/main/res/drawable/
      ic_launcher_foreground.xml # Vector adaptive app icon
```

---

## Design System Tokens

| Role | Token Name | Hex Code |
|---|---|---|
| **Paper (Background)** | `COLORS.paper` | `#EFEBE1` |
| **Ink (Primary Text)** | `COLORS.ink` | `#22262B` |
| **Clarity Gold (Accent)** | `COLORS.clarityGold` | `#E7A928` |
| **Seal Red (Rare Accent)** | `COLORS.sealRed` | `#A63A2E` |
| **Calm Sage (Supporting)** | `COLORS.calmSage` | `#7C8B7A` |
| **Line (Borders)** | `COLORS.line` | `#CFC7B4` |

### Bundled Regional Fonts
Web `@font-face` links don't run natively on Android. The app bundles full `.ttf` fonts in `android/app/src/main/assets/fonts/`:
- **Display / Headlines:** Fraunces Medium & SemiBold
- **UI & English Body:** Inter Regular, Medium & SemiBold
- **Regional Languages (Zero tofu boxes):**
  - Tamil: `NotoSansTamil-Regular`, `NotoSansTamil-Medium`
  - Hindi / Marathi: `NotoSansDevanagari-Regular`, `NotoSansDevanagari-Medium`
  - Telugu: `NotoSansTelugu-Regular`, `NotoSansTelugu-Medium`
  - Kannada: `NotoSansKannada-Regular`, `NotoSansKannada-Medium`
  - Bengali / Assamese: `NotoSansBengali-Regular`, `NotoSansBengali-Medium`

---

## Core Features

1. **The Intro Moment:**
   - On app launch, "Hmm... what does this even mean?" appears in cramped muted grey, then transforms with Reanimated into "Oh. Now I get it." with a Clarity gold underline.
   - Fully skippable with a tap.
   - Respects Android's system `Remove animations` / reduce motion setting.

2. **Document Capture & Selection:**
   - **Take Photo** via camera with runtime permission request (`CAMERA`) handled at the point of use via `PermissionsAndroid`.
   - **Choose from Gallery** for pre-captured document photos or scans.

3. **Dynamic Regional Language Switching:**
   - Select between Tamil, Hindi, Telugu, Kannada, Bengali, and Plain English.
   - The selected language is the single source of truth driving:
     - The request payload to the backend
     - Every label, checklist item, badge, and explanation on the results screen
     - The spoken audio readout

4. **Results Screen:**
   - Plain-language summary explaining the document without bureaucratic jargon.
   - Key facts as labeled cards (Amount Payable, Deadlines, Ward ID, Dispute Status).
   - "What to do next" action card with Clarity gold border and interactive checkboxes.
   - Audio narration player with play/pause and progress bar.
   - Instant WhatsApp sharing via React Native's built-in `Share` sheet.
   - Offline save summary action.

5. **Resilient Backend Connection:**
   - Targets `http://10.0.2.2:5000` for Android emulator or LAN IP for physical device.
   - If the backend server is offline or experiencing network drops, it automatically falls back to high-fidelity realistic grounded responses, ensuring demos never fail.
   - Includes a "Demo Blurry Photo Error" button to showcase the civilian-friendly error state.

---

## Running the App

### 1. Start Metro Bundler
From the `/mobile` directory:
```bash
npm start
```

### 2. Launch on Android Emulator or Device
```bash
npm run android
```
*(Or compile directly with Gradle: `cd android && gradlew assembleDebug`)*

### 3. Windows Path Note
When building on Windows in an environment where OneDrive contains multibyte or non-ASCII characters (e.g. `画像`), map the repo to a virtual drive letter before compiling native C++ CMake/Ninja targets:
```powershell
subst H: <repo_root>
cd H:\mobile\android
.\gradlew assembleDebug
```
The build produces `mobile/android/app/build/outputs/apk/debug/app-debug.apk` directly.

---

## Demo Checklist

- [x] Full Try Hmm flow working (take photo / gallery → language chips → submit → results)
- [x] Every result label and explanation dynamically switches when changing languages
- [x] Regional Indian scripts render cleanly with zero tofu boxes
- [x] Native audio player plays voice readout with progress tracking
- [x] WhatsApp share sheet launches with formatted markdown summary
- [x] Intro moment is skippable and respects accessibility motion settings
- [x] Cleartext HTTP permitted in debug build for local host connectivity
