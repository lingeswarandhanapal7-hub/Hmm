const fs = require('fs');
const path = require('path');
const https = require('https');

// We use sharp from backend
const sharp = require(path.resolve(__dirname, '../../backend/node_modules/sharp'));

const FONTS_DIR = path.resolve(__dirname, '../src/assets/fonts');
const ANDROID_FONTS_DIR = path.resolve(__dirname, '../android/app/src/main/assets/fonts');
const ANDROID_RES_DIR = path.resolve(__dirname, '../android/app/src/main/res');

fs.mkdirSync(FONTS_DIR, { recursive: true });
fs.mkdirSync(ANDROID_FONTS_DIR, { recursive: true });

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
      }
      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
      fileStream.on('error', reject);
    }).on('error', reject);
  });
}

const FONTS_TO_DOWNLOAD = [
  {
    name: 'Fraunces-Medium.ttf',
    url: 'https://fonts.gstatic.com/s/fraunces/v38/6NUh8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0K7iN7hzFUPJH58nib1603gg7S2nfgRYIchRujDvTUhUo.ttf'
  },
  {
    name: 'Fraunces-SemiBold.ttf',
    url: 'https://fonts.gstatic.com/s/fraunces/v38/6NUh8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0K7iN7hzFUPJH58nib1603gg7S2nfgRYIcaRyjDvTUhUo.ttf'
  },
  {
    name: 'Inter-Regular.ttf',
    url: 'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZhrj72A.ttf'
  },
  {
    name: 'Inter-Medium.ttf',
    url: 'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fMZhrj72A.ttf'
  },
  {
    name: 'Inter-SemiBold.ttf',
    url: 'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYMZhrj72A.ttf'
  },
  {
    name: 'NotoSansTamil-Regular.ttf',
    url: 'https://fonts.gstatic.com/s/notosanstamil/v31/ieVc2YdFI3GCY6SyQy1KfStzYKZgzN1z4LKDbeZce-0429tBManUktuex7vGo70RqKbt_Q.ttf'
  },
  {
    name: 'NotoSansTamil-Medium.ttf',
    url: 'https://fonts.gstatic.com/s/notosanstamil/v31/ieVc2YdFI3GCY6SyQy1KfStzYKZgzN1z4LKDbeZce-0429tBManUktuex7v0o70RqKbt_Q.ttf'
  },
  {
    name: 'NotoSansDevanagari-Regular.ttf',
    url: 'https://fonts.gstatic.com/s/notosansdevanagari/v30/TuGoUUFzXI5FBtUq5a8bjKYTZjtRU6Sgv3NaV_SNmI0b8QQCQmHn6B2OHjbL_08AlXQly-AzploX.ttf'
  },
  {
    name: 'NotoSansDevanagari-Medium.ttf',
    url: 'https://fonts.gstatic.com/s/notosansdevanagari/v30/TuGoUUFzXI5FBtUq5a8bjKYTZjtRU6Sgv3NaV_SNmI0b8QQCQmHn6B2OHjbL_08AlUYly-AzploX.ttf'
  },
  {
    name: 'NotoSansTelugu-Regular.ttf',
    url: 'https://fonts.gstatic.com/s/notosanstelugu/v30/0FlxVOGZlE2Rrtr-HmgkMWJNjJ5_RyT8o8c7fHkeg-esVC5dzHkHIJQqrEntezbqQUbZ-3o.ttf'
  },
  {
    name: 'NotoSansTelugu-Medium.ttf',
    url: 'https://fonts.gstatic.com/s/notosanstelugu/v30/0FlxVOGZlE2Rrtr-HmgkMWJNjJ5_RyT8o8c7fHkeg-esVC5dzHkHIJQqrEntSTbqQUbZ-3o.ttf'
  },
  {
    name: 'NotoSansKannada-Regular.ttf',
    url: 'https://fonts.gstatic.com/s/notosanskannada/v32/8vIs7xs32H97qzQKnzfeXycxXZyUmySvZWItmf1fe6TVmgop9ndpS-BqHEyGrDvNzSIMKMPL.ttf'
  },
  {
    name: 'NotoSansKannada-Medium.ttf',
    url: 'https://fonts.gstatic.com/s/notosanskannada/v32/8vIs7xs32H97qzQKnzfeXycxXZyUmySvZWItmf1fe6TVmgop9ndpS-BqHEyGrAnNzSIMKMPL.ttf'
  },
  {
    name: 'NotoSansBengali-Regular.ttf',
    url: 'https://fonts.gstatic.com/s/notosansbengali/v33/Cn-SJsCGWQxOjaGwMQ6fIiMywrNJIky6nvd8BjzVMvJx2mcSPVFpVEqE-6KmsolLudCk9CzJ.ttf'
  },
  {
    name: 'NotoSansBengali-Medium.ttf',
    url: 'https://fonts.gstatic.com/s/notosansbengali/v33/Cn-SJsCGWQxOjaGwMQ6fIiMywrNJIky6nvd8BjzVMvJx2mcSPVFpVEqE-6KmsrtLudCk9CzJ.ttf'
  }
];

async function setupFonts() {
  console.log('Downloading fonts...');
  for (const item of FONTS_TO_DOWNLOAD) {
    const dest1 = path.join(FONTS_DIR, item.name);
    const dest2 = path.join(ANDROID_FONTS_DIR, item.name);
    console.log(`Downloading ${item.name}...`);
    await downloadFile(item.url, dest1);
    fs.copyFileSync(dest1, dest2);
  }
  console.log('All fonts downloaded and copied to android/app/src/main/assets/fonts!');
}

async function setupIcons() {
  console.log('Generating adaptive and standard Android app icons...');
  
  // Icon SVGs
  const standardSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="512" height="512">
    <rect width="64" height="64" rx="14" fill="#EFEBE1"/>
    <rect x="2" y="2" width="60" height="60" rx="12" stroke="#CFC7B4" stroke-width="2" fill="none"/>
    <path d="M14 44V20h7.5v9.2h9V20H38v24h-7.5v-9.2h-9V44H14z" fill="#22262B"/>
    <circle cx="47" cy="40" r="5" fill="#E7A928"/>
    <circle cx="47" cy="40" r="3" fill="#22262B"/>
  </svg>`;

  const roundSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="512" height="512">
    <circle cx="32" cy="32" r="32" fill="#EFEBE1"/>
    <circle cx="32" cy="32" r="30" stroke="#CFC7B4" stroke-width="2" fill="none"/>
    <path d="M14 44V20h7.5v9.2h9V20H38v24h-7.5v-9.2h-9V44H14z" fill="#22262B"/>
    <circle cx="47" cy="40" r="5" fill="#E7A928"/>
    <circle cx="47" cy="40" r="3" fill="#22262B"/>
  </svg>`;

  // Adaptive foreground SVG (108x108 standard adaptive icon canvas, safe zone 72x72)
  // dx = (108 - 64)/2 = 22, dy = 22
  const foregroundSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 108 108" width="512" height="512">
    <g transform="translate(22, 22)">
      <path d="M14 44V20h7.5v9.2h9V20H38v24h-7.5v-9.2h-9V44H14z" fill="#22262B"/>
      <circle cx="47" cy="40" r="5" fill="#E7A928"/>
      <circle cx="47" cy="40" r="3" fill="#22262B"/>
    </g>
  </svg>`;

  const densities = [
    { dir: 'mipmap-mdpi', iconSize: 48, adaptiveSize: 108 },
    { dir: 'mipmap-hdpi', iconSize: 72, adaptiveSize: 162 },
    { dir: 'mipmap-xhdpi', iconSize: 96, adaptiveSize: 216 },
    { dir: 'mipmap-xxhdpi', iconSize: 144, adaptiveSize: 324 },
    { dir: 'mipmap-xxxhdpi', iconSize: 192, adaptiveSize: 432 },
  ];

  for (const d of densities) {
    const targetDir = path.join(ANDROID_RES_DIR, d.dir);
    fs.mkdirSync(targetDir, { recursive: true });

    // ic_launcher.png
    await sharp(Buffer.from(standardSvg))
      .resize(d.iconSize, d.iconSize)
      .png()
      .toFile(path.join(targetDir, 'ic_launcher.png'));

    // ic_launcher_round.png
    await sharp(Buffer.from(roundSvg))
      .resize(d.iconSize, d.iconSize)
      .png()
      .toFile(path.join(targetDir, 'ic_launcher_round.png'));

    // ic_launcher_foreground.png
    await sharp(Buffer.from(foregroundSvg))
      .resize(d.adaptiveSize, d.adaptiveSize)
      .png()
      .toFile(path.join(targetDir, 'ic_launcher_foreground.png'));
  }

  // Create colors.xml with ic_launcher_background = #EFEBE1
  const valuesDir = path.join(ANDROID_RES_DIR, 'values');
  fs.mkdirSync(valuesDir, { recursive: true });
  const colorsXml = `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="ic_launcher_background">#EFEBE1</color>
</resources>
`;
  fs.writeFileSync(path.join(valuesDir, 'colors.xml'), colorsXml);

  // Create mipmap-anydpi-v26 xmls
  const anyDpiDir = path.join(ANDROID_RES_DIR, 'mipmap-anydpi-v26');
  fs.mkdirSync(anyDpiDir, { recursive: true });

  const adaptiveXml = `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/ic_launcher_background"/>
    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>
</adaptive-icon>
`;
  fs.writeFileSync(path.join(anyDpiDir, 'ic_launcher.xml'), adaptiveXml);
  fs.writeFileSync(path.join(anyDpiDir, 'ic_launcher_round.xml'), adaptiveXml);

  console.log('App icons generated for all densities (standard + round + adaptive v26)!');
}

(async () => {
  try {
    await setupFonts();
    await setupIcons();
    console.log('Fonts and icons setup finished successfully.');
  } catch (err) {
    console.error('Setup failed:', err);
    process.exit(1);
  }
})();
