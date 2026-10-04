// Hmm Data & Translation Dictionary
// Ported from web frontend with single-source-of-truth language support

export interface Language {
  id: string;
  name: string;
  native: string;
  script: string;
  sample: string;
  phrase: string;
}

export const LANGUAGES: Language[] = [
  { id: 'en', name: 'English', native: 'Plain English', script: 'Inter', sample: 'This letter explains your municipal property tax notice in simple terms.', phrase: 'Oh. Now I get it.' },
  { id: 'ta', name: 'Tamil', native: 'தமிழ்', script: 'Noto Sans Tamil', sample: 'இந்த கடிதம் உங்கள் உள்ளாட்சி வரி கட்டணத்தை பற்றி விளக்குகிறது.', phrase: 'இப்ப புரியுது!' },
  { id: 'hi', name: 'Hindi', native: 'हिन्दी', script: 'Noto Sans Devanagari', sample: 'यह नोटिस आपके स्थानीय संपत्ति कर के बारे में बताता है।', phrase: 'अब समझ आया!' },
  { id: 'te', name: 'Telugu', native: 'తెలుగు', script: 'Noto Sans Telugu', sample: 'ఈ నోటీసు మీ మునిసిపల్ ఆస్తి పన్ను గురించి వివరిస్తుంది.', phrase: 'ఇప్పుడు అర్థమైంది!' },
  { id: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', script: 'Noto Sans Kannada', sample: 'ಈ ನೋಟಿಸ್ ನಿಮ್ಮ ಸ್ಥಳೀಯ ಪುರಸಭೆಯ ಆಸ್ತಿ ತೆರಿಗೆಯನ್ನು ವಿವರಿಸುತ್ತದೆ.', phrase: 'ಈಗ ಅರ್ಥವಾಯಿತು!' },
  { id: 'bn', name: 'Bengali', native: 'বাংলা', script: 'Noto Sans Bengali', sample: 'এই নোটিশটি আপনার স্থানীয় পৌর কর পরিশোধের বিবরণ দেয়।', phrase: 'এবার বুঝতে পারলাম!' },
];

export interface UITranslation {
  samplePrompt: string;
  demoErrorBtn: string;
  step1: string;
  step2: string;
  uploadOwn: string;
  takePhoto: string;
  chooseGallery: string;
  change: string;
  uploaded: string;
  rawOcr: string;
  simplifyBtn: string;
  simplifying: string;
  thinking0: string;
  thinking1: string;
  thinking2: string;
  clarityAchieved: string;
  plainExplanation: string;
  spokenIn: string;
  playAudio: string;
  pauseAudio: string;
  whatToDoNext: string;
  checklistHint: string;
  downloadSummary: string;
  shareWhatsApp: string;
  newDocument: string;
  errorTitle: string;
  resetSample: string;
  keyFactsTitle: string;
  documentSummary: string;
  legalDisclaimer: string;
  actionRequired: string;
  selectLanguagePrompt: string;
  selectPhotoPrompt: string;
}

export const UI_TRANSLATIONS: Record<string, UITranslation> = {
  en: {
    samplePrompt: 'Try a realistic sample:',
    demoErrorBtn: 'Demo Blurry Photo Error',
    step1: '1. Select Document',
    step2: '2. Choose Language',
    uploadOwn: 'Upload or capture document',
    takePhoto: 'Take Photo',
    chooseGallery: 'Choose from Gallery',
    change: 'Change Photo',
    uploaded: 'Document Ready',
    rawOcr: 'Document Excerpt (Raw OCR):',
    simplifyBtn: 'Simplify & Explain Document',
    simplifying: 'Simplifying...',
    thinking0: 'Extracting text and identifying statutory clauses...',
    thinking1: 'Translating into plain conversational language...',
    thinking2: 'Grounding action checklist against verified rules...',
    clarityAchieved: 'CLARITY ACHIEVED',
    plainExplanation: 'Plain Language Explanation',
    spokenIn: 'Spoken in',
    playAudio: 'Play Explanation',
    pauseAudio: 'Pause Explanation',
    whatToDoNext: 'What to do next — Action Card',
    checklistHint: 'Check off items as you complete them',
    downloadSummary: 'Save Summary',
    shareWhatsApp: 'Share via WhatsApp',
    newDocument: 'Scan Another Document',
    errorTitle: "Let's try a clearer photo",
    resetSample: 'Reset to Sample Document',
    keyFactsTitle: 'Key Facts At A Glance',
    documentSummary: 'Document Summary',
    legalDisclaimer: 'Hmm translates and grounds bureaucratic text into plain language for clarity. For official disputes, consult accredited legal aid.',
    actionRequired: 'Action Required',
    selectLanguagePrompt: 'Choose your regional language to translate and narrate',
    selectPhotoPrompt: 'Take a photo of your notice, bill, or legal document',
  },
  ta: {
    samplePrompt: 'மாதிரி ஆவணத்தை முயற்சிக்கவும்:',
    demoErrorBtn: 'மங்கலான புகைப்பட பிழை மாதிரி',
    step1: '1. ஆவணத்தைத் தேர்வுசெய்',
    step2: '2. மொழியைத் தேர்வுசெய்',
    uploadOwn: 'ஆவணத்தைப் பதிவேற்றவும் அல்லது படம் எடுக்கவும்',
    takePhoto: 'படம் எடுக்கவும்',
    chooseGallery: 'கேலரியில் இருந்து தேர்வு',
    change: 'படத்தை மாற்று',
    uploaded: 'ஆவணம் தயார்',
    rawOcr: 'ஆவணப் பகுதி (மூல OCR):',
    simplifyBtn: 'ஆவணத்தை எளிய மொழியில் விளக்குங்கள்',
    simplifying: 'விளக்கமளிக்கிறது...',
    thinking0: 'உரையைப் பிரித்தெடுத்து சட்ட விதிகளைக் கண்டறிகிறது...',
    thinking1: 'எளிய உரையாடல் மொழியில் மொழியாக்கம் செய்கிறது...',
    thinking2: 'சரிபார்க்கப்பட்ட விதிகளின்படி செயல் அட்டவணையை உருவாக்குகிறது...',
    clarityAchieved: 'தெளிவு கிடைத்தது',
    plainExplanation: 'எளிய மொழி விளக்கம்',
    spokenIn: 'பேசப்படும் மொழி',
    playAudio: 'விளக்கத்தைக் கேளுங்கள்',
    pauseAudio: 'நிறுத்துங்கள்',
    whatToDoNext: 'அடுத்து என்ன செய்ய வேண்டும் — செயல் அட்டை',
    checklistHint: 'முடித்த பணிகளை டிக் செய்யவும்',
    downloadSummary: 'சுருக்கத்தைச் சேமிக்க',
    shareWhatsApp: 'வாட்ஸ்அப்பில் பகிரவும்',
    newDocument: 'மறு ஆவணத்தை ஸ்கேன் செய்',
    errorTitle: 'தெளிவான புகைப்படத்தை முயற்சிப்போம்',
    resetSample: 'மாதிரி ஆவணத்திற்கு மீட்டமை',
    keyFactsTitle: 'முக்கிய தகவல்கள் ஒரு பார்வையில்',
    documentSummary: 'ஆவணச் சுருக்கம்',
    legalDisclaimer: 'அரசு ஆவணங்களை பொதுமக்கள் எளிதில் புரிந்துகொள்ள Hmm உதவுகிறது. அதிகாரப்பூர்வ தகவல்களுக்கு அரசு அலுவலகங்களை அணுகவும்.',
    actionRequired: 'தேவையான நடவடிக்கைகள்',
    selectLanguagePrompt: 'மொழிபெயர்ப்பு மற்றும் ஆடியோவிற்கான மொழியைத் தேர்ந்தெடுக்கவும்',
    selectPhotoPrompt: 'உங்கள் நோட்டீஸ் அல்லது கடிதத்தை புகைப்படம் எடுக்கவும்',
  },
  hi: {
    samplePrompt: 'एक वास्तविक नमूना आज़माएं:',
    demoErrorBtn: 'धुंधली फोटो त्रुटि का नमूना',
    step1: '1. दस्तावेज़ चुनें',
    step2: '2. भाषा चुनें',
    uploadOwn: 'दस्तावेज़ की फोटो लें या अपलोड करें',
    takePhoto: 'फोटो खींचें',
    chooseGallery: 'गैलरी से चुनें',
    change: 'फोटो बदलें',
    uploaded: 'दस्तावेज़ तैयार है',
    rawOcr: 'दस्तावेज़ का अंश (कच्चा OCR):',
    simplifyBtn: 'दस्तावेज़ को सरल भाषा में समझें',
    simplifying: 'सरल किया जा रहा है...',
    thinking0: 'टेक्स्ट निकाल कर कानूनी नियमों की पहचान की जा रही है...',
    thinking1: 'सरल बोलचाल की भाषा में अनुवाद किया जा रहा है...',
    thinking2: 'प्रमाणित नियमों के आधार पर कार्य सूची तैयार की जा रही है...',
    clarityAchieved: 'स्पष्टता प्राप्त हुई',
    plainExplanation: 'सरल भाषा में व्याख्या',
    spokenIn: 'में बोली जा रही है',
    playAudio: 'व्याख्या सुनें',
    pauseAudio: 'रोकें',
    whatToDoNext: 'आगे क्या करें — कार्य सूची',
    checklistHint: 'पूरे किए गए कार्यों को टिक करें',
    downloadSummary: 'विवरण सहेजें',
    shareWhatsApp: 'व्हाट्सएप पर शेयर करें',
    newDocument: 'दूसरा दस्तावेज़ स्कैन करें',
    errorTitle: 'आइए अधिक स्पष्ट फोटो का प्रयास करें',
    resetSample: 'नमूना दस्तावेज़ पर रीसेट करें',
    keyFactsTitle: 'मुख्य बिंदु एक नज़र में',
    documentSummary: 'दस्तावेज़ सारांश',
    legalDisclaimer: 'Hmm जटिल सरकारी भाषा को सरल बनाता है। आधिकारिक मामलों के लिए संबंधित कार्यालय से संपर्क करें।',
    actionRequired: 'आवश्यक कार्रवाई',
    selectLanguagePrompt: 'अनुवाद और आवाज़ के लिए अपनी भाषा चुनें',
    selectPhotoPrompt: 'अपने सरकारी नोटिस या बिल की फोटो लें',
  },
  te: {
    samplePrompt: 'ఒక నమూనా పత్రాన్ని ప్రయత్నించండి:',
    demoErrorBtn: 'మసక ఫోటో లోపం డెమో',
    step1: '1. పత్రాన్ని ఎంచుకోండి',
    step2: '2. భాషను ఎంచుకోండి',
    uploadOwn: 'పత్రం ఫోటో తీయండి లేదా అప్‌లోడ్ చేయండి',
    takePhoto: 'ఫోటో తీయండి',
    chooseGallery: 'గ్యాలరీ నుండి ఎంచుకోండి',
    change: 'ఫోటో మార్చండి',
    uploaded: 'పత్రం సిద్ధంగా ఉంది',
    rawOcr: 'పత్రం పాఠ్యం (రా OCR):',
    simplifyBtn: 'పత్రాన్ని సులభంగా అర్థం చేసుకోండి',
    simplifying: 'వివరిస్తోంది...',
    thinking0: 'పాఠ్యాన్ని సేకరించి నిబంధనలను గుర్తిస్తోంది...',
    thinking1: 'సులభమైన సంభాషణ భాషలోకి అనువదిస్తోంది...',
    thinking2: 'నిబంధనల ప్రకారం కార్యాచరణ జాబితాను రూపొందిస్తోంది...',
    clarityAchieved: 'స్పష్టత వచ్చింది',
    plainExplanation: 'సులభ భాషా వివరణ',
    spokenIn: 'మాట్లాడే భాష',
    playAudio: 'వివరణ వినండి',
    pauseAudio: 'ఆపండి',
    whatToDoNext: 'తర్వాత ఏమి చేయాలి — కార్యాచరణ కార్డు',
    checklistHint: 'పూర్తయిన పనులను టిక్ చేయండి',
    downloadSummary: 'సారాంశాన్ని సేవ్ చేయండి',
    shareWhatsApp: 'వాట్సాప్‌లో షేర్ చేయండి',
    newDocument: 'మరొక పత్రాన్ని స్కాన్ చేయండి',
    errorTitle: 'మరింత స్పష్టమైన ఫోటోను ప్రయత్నించండి',
    resetSample: 'నమూనా పత్రానికి రీసెట్ చేయండి',
    keyFactsTitle: 'ముఖ్యమైన అంశాలు',
    documentSummary: 'పత్ర సారాంశం',
    legalDisclaimer: 'ప్రభుత్వ పత్రాల వివరణ సులభతరం చేయడానికి Hmm రూపొందించబడింది. అధికారిక వివాదాలకు న్యాయవాదిని సంప్రదించండి.',
    actionRequired: 'చేయవలసిన పనులు',
    selectLanguagePrompt: 'అనువాదం మరియు ఆడియో కోసం మీ భాషను ఎంచుకోండి',
    selectPhotoPrompt: 'మీ నోటీసు లేదా బిల్లు ఫోటో తీయండి',
  },
  kn: {
    samplePrompt: 'ಮಾದರಿ ದಾಖಲೆಯನ್ನು ಪ್ರಯತ್ನಿಸಿ:',
    demoErrorBtn: 'ಮಸುಕಾದ ಫೋಟೋ ದೋಷದ ಡೆಮೊ',
    step1: '1. ದಾಖಲೆಯನ್ನು ಆರಿಸಿ',
    step2: '2. ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    uploadOwn: 'ದಾಖಲೆಯ ಫೋಟೋ ತೆಗೆಯಿರಿ ಅಥವಾ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
    takePhoto: 'ಫೋಟೋ ತೆಗೆಯಿರಿ',
    chooseGallery: 'ಗ್ಯಾಲರಿಯಿಂದ ಆರಿಸಿ',
    change: 'ಫೋಟೋ ಬದಲಾಯಿಸಿ',
    uploaded: 'ದಾಖಲೆ ಸಿದ್ಧವಾಗಿದೆ',
    rawOcr: 'ದಾಖಲೆಯ ಸಾರಾಂಶ (OCR):',
    simplifyBtn: 'ದಾಖಲೆಯನ್ನು ಸರಳವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ',
    simplifying: 'ವಿವರಿಸಲಾಗುತ್ತಿದೆ...',
    thinking0: 'ಪಠ್ಯವನ್ನು ಹೊರತೆಗೆದು ನಿಯಮಗಳನ್ನು ಗುರುತಿಸಲಾಗುತ್ತಿದೆ...',
    thinking1: 'ಸರಳ ಸಂಭಾಷಣಾ ಭಾಷೆಗೆ ಅನುವಾದಿಸಲಾಗುತ್ತಿದೆ...',
    thinking2: 'ನಿಯಮಗಳ ಪ್ರಕಾರ ಮುಂದಿನ ಕ್ರಮಗಳನ್ನು ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ...',
    clarityAchieved: 'ಸ್ಪಷ್ಟತೆ ದೊರೆತಿದೆ',
    plainExplanation: 'ಸರಳ ಭಾಷಾ ವಿವರಣೆ',
    spokenIn: 'ಮಾತನಾಡುವ ಭಾಷೆ',
    playAudio: 'ವಿವರಣೆ ಕೇಳಿ',
    pauseAudio: 'ವಿರಾಮಗೊಳಿಸಿ',
    whatToDoNext: 'ಮುಂದೆ ಏನು ಮಾಡಬೇಕು — ಕ್ರಿಯಾ ಕಾರ್ಡ್',
    checklistHint: 'ಮುಗಿದ ಕೆಲಸಗಳನ್ನು ಗುರುತು ಮಾಡಿ',
    downloadSummary: 'ಸಾರಾಂಶ ಉಳಿಸಿ',
    shareWhatsApp: 'ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳಿ',
    newDocument: 'ಇನ್ನೊಂದು ದಾಖಲೆ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ',
    errorTitle: 'ಸ್ಪಷ್ಟವಾದ ಫೋಟೋವನ್ನು ಪ್ರಯತ್ನಿಸಿ',
    resetSample: 'ಮಾದರಿ ದಾಖಲೆಗೆ ಮರುಹೊಂದಿಸಿ',
    keyFactsTitle: 'ಮುಖ್ಯಾಂಶಗಳು ಒಂದು ನೋಟದಲ್ಲಿ',
    documentSummary: 'ದಾಖಲೆ ಸಾರಾಂಶ',
    legalDisclaimer: 'ಸರ್ಕಾರಿ ಆದೇಶಗಳನ್ನು ಸಾಮಾನ್ಯ ಜನರಿಗೆ ಸರಳವಾಗಿ ವಿವರಿಸಲು Hmm ಸಹಕಾರಿಯಾಗಿದೆ.',
    actionRequired: 'ಅಗತ್ಯ ಕ್ರಮಗಳು',
    selectLanguagePrompt: 'ಅನುವಾದ ಮತ್ತು ಧ್ವನಿಗಾಗಿ ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆರಿಸಿ',
    selectPhotoPrompt: 'ನಿಮ್ಮ ನೋಟಿಸ್ ಅಥವಾ ರಸೀದಿಯ ಫೋಟೋ ತೆಗೆಯಿರಿ',
  },
  bn: {
    samplePrompt: 'একটি নমুনা নথি চেষ্টা করুন:',
    demoErrorBtn: 'অস্পষ্ট ছবির ত্রুটি ডেমো',
    step1: '১. নথি নির্বাচন করুন',
    step2: '২. ভাষা নির্বাচন করুন',
    uploadOwn: 'নথির ছবি তুলুন বা আপলোড করুন',
    takePhoto: 'ছবি তুলুন',
    chooseGallery: 'গ্যালারি থেকে বাছুন',
    change: 'ছবি পরিবর্তন করুন',
    uploaded: 'নথি প্রস্তুত',
    rawOcr: 'নথির পাঠ্য (OCR):',
    simplifyBtn: 'নথিটি সহজ ভাষায় বুঝুন',
    simplifying: 'ব্যাখ্যা করা হচ্ছে...',
    thinking0: 'আইনি ধারা ও মূল পাঠ্য শনাক্ত করা হচ্ছে...',
    thinking1: 'সহজ কথোপকথনের ভাষায় অনুবাদ করা হচ্ছে...',
    thinking2: 'যাচাইকৃত নিয়মের ভিত্তিতে করণীয় তালিকা তৈরি হচ্ছে...',
    clarityAchieved: 'স্পষ্টতা পাওয়া গেছে',
    plainExplanation: 'সহজ ভাষায় ব্যাখ্যা',
    spokenIn: 'বলার ভাষা',
    playAudio: 'ব্যাখ্যা শুনুন',
    pauseAudio: 'থামান',
    whatToDoNext: 'এখন কী করবেন — পদক্ষেপ কার্ড',
    checklistHint: 'সম্পন্ন কাজের পাশে টিক দিন',
    downloadSummary: 'সারসংক্ষেপ সংরক্ষণ করুন',
    shareWhatsApp: 'হোয়াটসঅ্যাপে শেয়ার করুন',
    newDocument: 'অন্য নথি স্ক্যান করুন',
    errorTitle: 'একটি স্পষ্ট ছবি দেওয়ার চেষ্টা করুন',
    resetSample: 'নমুনা নথিতে ফিরে যান',
    keyFactsTitle: 'এক নজরে গুরুত্বপূর্ণ তথ্য',
    documentSummary: 'নথির সংক্ষিপ্ত বিবরণ',
    legalDisclaimer: 'Hmm সরকারি ও আইনি নথিপত্রকে সাধারণ মানুষের বোধগম্য ভাষায় রূপান্তর করে।',
    actionRequired: 'প্রয়োজনীয় পদক্ষেপ',
    selectLanguagePrompt: 'অনুবাদ এবং শোনার জন্য আপনার ভাষা নির্বাচন করুন',
    selectPhotoPrompt: 'আপনার নোটিশ বা বিলের একটি ছবি তুলুন',
  },
};

export function getTranslation(langCode: string, key: keyof UITranslation): string {
  const dict = UI_TRANSLATIONS[langCode] || UI_TRANSLATIONS.en;
  return dict[key] || UI_TRANSLATIONS.en[key] || '';
}

export interface KeyFact {
  label: string;
  value: string;
  badge?: string;
  highlight?: boolean;
}

export interface NextStep {
  id: string;
  task: string;
  deadline?: string;
  critical?: boolean;
}

export interface ProcessedDocumentResult {
  title: string;
  documentType: string;
  issuingAuthority: string;
  urgency: 'low' | 'medium' | 'high';
  summary: string;
  keyFacts: KeyFact[];
  nextSteps: NextStep[];
  audioBase64?: string;
  audioDurationSec?: number;
  rawOcrPreview?: string;
}

export const MOCK_RESULTS: Record<string, ProcessedDocumentResult> = {
  en: {
    title: 'Property Tax Demand Notice (Assessment Year 2024-25)',
    documentType: 'Municipal Revenue Demand',
    issuingAuthority: 'Municipal Revenue Department (Sub-Division 4)',
    urgency: 'medium',
    summary:
      'This is an annual property tax demand notice for ₹14,250. It includes a penalty clause for late payment, but under the active municipal rebate window, the ₹2,850 late penalty will be 100% waived if paid on or before October 15, 2024. No court proceedings or legal attachment warrants are currently active.',
    keyFacts: [
      { label: 'Amount Payable', value: '₹14,250', badge: 'Base Tax', highlight: true },
      { label: 'Rebate Deadline', value: '15 Oct 2024', badge: 'Save ₹2,850 penalty' },
      { label: 'Ward & Assessment ID', value: 'Ward 42-B / SEC148-88492' },
      { label: 'Dispute Status', value: 'None — Normal Regular Assessment' },
    ],
    nextSteps: [
      { id: '1', task: 'Visit municipal portal or civic service center with your Property Assessment Number.', critical: true },
      { id: '2', task: 'Pay the principal amount of ₹14,250 before 15 October to claim full penalty waiver.', critical: true },
      { id: '3', task: 'Keep the computerized receipt for record and local tenancy proof.' },
    ],
    rawOcrPreview: `OFFICE OF THE REVENUE OFFICER — FORM VII (RULE 18)\nDEMURRAGE & RE-ASSESSMENT DEMAND NOTICE UNDER SEC 148(B)\nOutstanding principal municipal impost: INR 14,250.00\nAccrued penal demurrage: INR 2,850.00`,
  },
  ta: {
    title: 'சொத்து வரி செலுத்துகை அறிவிப்பு (2024-25)',
    documentType: 'உள்ளாட்சி வருவாய் நோட்டீஸ்',
    issuingAuthority: 'மாநகராட்சி வருவாய்த்துறை (மண்டலம் 4)',
    urgency: 'medium',
    summary:
      'இது 2024-25 ஆம் ஆண்டுக்கான நகராட்சி சொத்து வரி ₹14,250 செலுத்துவதற்கான நினைவூட்டல் கடிதம். அக்டோபர் 15, 2024-க்குள் செலுத்தினால் ₹2,850 அபராதக் கட்டணம் முழுமையாக தள்ளுபடி செய்யப்படும். தற்போது எவ்வித சட்டரீதியான பிடியாணையும் பிறப்பிக்கப்படவில்லை.',
    keyFacts: [
      { label: 'செலுத்த வேண்டிய தொகை', value: '₹14,250', badge: 'அசல் வரி', highlight: true },
      { label: 'தள்ளுபடி கடைசி நாள்', value: '15 அக்டோபர் 2024', badge: '₹2,850 சேமிப்பு' },
      { label: 'வார்டு எண்', value: 'வார்டு 42-B / SEC148-88492' },
      { label: 'வழக்கு நிலை', value: 'எந்த வழக்கும் இல்லை' },
    ],
    nextSteps: [
      { id: '1', task: 'உங்கள் சொத்து வரி எண்ணுடன் உள்ளாட்சி இ-சேவை மையம் அல்லது இணையதளத்தை அணுகவும்.', critical: true },
      { id: '2', task: 'அக்டோபர் 15-க்குள் அசல் தொகையான ₹14,250-ஐ செலுத்தி அபராதத்தை தவிர்க்கவும்.', critical: true },
      { id: '3', task: 'கணினி ரசீதை எதிர்கால ஆவணமாக பாதுகாத்து வைக்கவும்.' },
    ],
    rawOcrPreview: `நகராட்சி வருவாய் அலுவலர் அலுவலகம் — படிவம் VII (விதி 18)\nநிலுவைத் தொகை: ₹14,250.00\nதாமதக் கட்டணம்: ₹2,850.00`,
  },
  hi: {
    title: 'संपत्ति कर मांग सूचना (मूल्यांकन वर्ष 2024-25)',
    documentType: 'नगर निगम राजस्व मांग',
    issuingAuthority: 'नगर निगम राजस्व विभाग (प्रभाग 4)',
    urgency: 'medium',
    summary:
      'यह वर्ष 2024-25 के लिए ₹14,250 का संपत्ति कर नोटिस है। यदि आप 15 अक्टूबर 2024 तक भुगतान करते हैं, तो ₹2,850 का विलंब शुल्क (पेनल्टी) पूरी तरह माफ हो जाएगा। वर्तमान में कोई कानूनी या कुर्की कार्रवाई लंबित नहीं है।',
    keyFacts: [
      { label: 'देय राशि', value: '₹14,250', badge: 'मूल कर', highlight: true },
      { label: 'छूट की अंतिम तिथि', value: '15 अक्टूबर 2024', badge: '₹2,850 की बचत' },
      { label: 'वार्ड व निर्धारण सं.', value: 'वार्ड 42-B / SEC148-88492' },
      { label: 'कानूनी स्थिति', value: 'सामान्य नियमित कर' },
    ],
    nextSteps: [
      { id: '1', task: 'अपने संपत्ति कर नंबर के साथ नगर निगम पोर्टल या नागरिक सुविधा केंद्र जाएं।', critical: true },
      { id: '2', task: '15 अक्टूबर से पहले ₹14,250 का मूल भुगतान कर पेनल्टी से बचें।', critical: true },
      { id: '3', task: 'भुगतान के बाद डिजिटल रसीद अपने पास सुरक्षित रखें।' },
    ],
    rawOcrPreview: `कार्यालय राजस्व अधिकारी — प्रपत्र VII (नियम 18)\nबकाया संपत्ति कर: ₹14,250.00\nअधिरोपित पेनल्टी: ₹2,850.00`,
  },
  te: {
    title: 'ఆస్తి పన్ను డిమాండ్ నోటీసు (2024-25)',
    documentType: 'మునిసిపల్ రెవెన్యూ డిమాండ్',
    issuingAuthority: 'మునిసిపల్ రెవెన్యూ విభాగం (సబ్-డివిజన్ 4)',
    urgency: 'medium',
    summary:
      'ఇది 2024-25 సంవత్సరానికి ₹14,250 ఆస్తి పన్ను డిమాండ్ నోటీసు. అక్టోబర్ 15, 2024 లోపు చెల్లిస్తే ₹2,850 లేట్ ఫీజు జరిమానా పూర్తిగా రద్దవుతుంది. ప్రస్తుతం ఎలాంటి కోర్టు చర్యలు లేదా ఆస్తి జప్తు నోటీసులు లేవు.',
    keyFacts: [
      { label: 'చెల్లించాల్సిన మొత్తం', value: '₹14,250', badge: 'అసలు పన్ను', highlight: true },
      { label: 'రిబేట్ చివరి తేదీ', value: '15 అక్టోబర్ 2024', badge: '₹2,850 ఆదా' },
      { label: 'వార్డు నంబరు', value: 'వార్డు 42-B / SEC148-88492' },
      { label: 'చట్టపరమైన స్థితి', value: 'సాధారణ పన్ను మాత్రమే' },
    ],
    nextSteps: [
      { id: '1', task: 'మీ ఆస్తి పన్ను నంబరుతో పురపాలక కార్యాలయం లేదా ఆన్‌లైన్ పోర్టల్‌ను సందర్శించండి.', critical: true },
      { id: '2', task: 'అక్టోబర్ 15 లోపు ₹14,250 చెల్లించి జరిమానాను మినహాయించుకోండి.', critical: true },
      { id: '3', task: 'చెల్లింపు రసీదును భవిష్యత్ అవసరాల కోసం భద్రపరచుకోండి.' },
    ],
    rawOcrPreview: `రెవెన్యూ అధికారి కార్యాలయం — ఫారమ్ VII (రూల్ 18)\nబకాయి అసలు మొత్తం: ₹14,250.00\nలేట్ పెనాల్టీ: ₹2,850.00`,
  },
  kn: {
    title: 'ಆಸ್ತಿ ತೆರಿಗೆ ಬೇಡಿಕೆ ನೋಟಿಸ್ (2024-25)',
    documentType: 'ಪುರಸಭೆ ಕಂದಾಯ ಬೇಡಿಕೆ',
    issuingAuthority: 'ಪುರಸಭೆ ಕಂದಾಯ ಇಲಾಖೆ (ವಿಭಾಗ 4)',
    urgency: 'medium',
    summary:
      'ಇದು 2024-25 ರ ಸಾಲಿನ ₹14,250 ಆಸ್ತಿ ತೆರಿಗೆ ಪಾವತಿಯ ನೋಟಿಸ್ ಆಗಿದೆ. ಅಕ್ಟೋಬರ್ 15, 2024 ರೊಳಗೆ ಪಾವತಿಸಿದರೆ ₹2,850 ದಂಡ ಮನ್ನಾ ಆಗುತ್ತದೆ. ಯಾವುದೇ ನ್ಯಾಯಾಲಯದ ಪ್ರಕ್ರಿಯೆಗಳು ಜಾರಿಯಲ್ಲಿಲ್ಲ.',
    keyFacts: [
      { label: 'ಪಾವತಿಸಬೇಕಾದ ಮೊತ್ತ', value: '₹14,250', badge: 'ಮೂಲ ತೆರಿಗೆ', highlight: true },
      { label: 'ದಂಡ ಮನ್ನಾ ಕೊನೆಯ ದಿನ', value: '15 ಅಕ್ಟೋಬರ್ 2024', badge: '₹2,850 ಉಳಿತಾಯ' },
      { label: 'ವಾರ್ಡ್ ಸಂಖ್ಯೆ', value: 'ವಾರ್ಡ್ 42-B / SEC148-88492' },
      { label: 'ಕಾನೂನು ಸ್ಥಿತಿ', value: 'ಯಾವುದೇ ದಾವೆ ಇಲ್ಲ' },
    ],
    nextSteps: [
      { id: '1', task: 'ನಿಮ್ಮ ಆಸ್ತಿ ಸಂಖ್ಯೆಯೊಂದಿಗೆ ಪುರಸಭೆ ಕಚೇರಿ ಅಥವಾ ನಾಗರಿಕ ಕೇಂದ್ರಕ್ಕೆ ಭೇಟಿ ನೀಡಿ.', critical: true },
      { id: '2', task: 'ಅಕ್ಟೋಬರ್ 15 ರೊಳಗೆ ₹14,250 ಪಾವತಿಸಿ ದಂಡದಿಂದ ಮುಕ್ತಿ ಪಡೆಯಿರಿ.', critical: true },
      { id: '3', task: 'ಕಂಪ್ಯೂಟರ್ ರಸೀದಿಯನ್ನು ನಿಮ್ಮ ದಾಖಲೆಗಾಗಿ ಜೋಪಾನವಾಗಿ ಇರಿಸಿಕೊಳ್ಳಿ.' },
    ],
    rawOcrPreview: `ಕಂದಾಯ ಅಧಿಕಾರಿಗಳ ಕಚೇರಿ — ನಮೂನೆ VII (ನಿಯಮ 18)\nಬಾಕಿ ಮೊತ್ತ: ₹14,250.00\nದಂಡ ಶುಲ್ಕ: ₹2,850.00`,
  },
  bn: {
    title: 'সম্পত্তি কর দাবি নোটিশ (২০২৪-২৫)',
    documentType: 'পৌর রাজস্ব দাবি',
    issuingAuthority: 'পৌর রাজস্ব বিভাগ (উপ-বিভাগ ৪)',
    urgency: 'medium',
    summary:
      'এটি ২০২৪-২৫ সালের জন্য ₹১৪,২৫০ সম্পত্তি করের একটি নোটিশ। ১৫ অক্টোবর ২০২৪-এর মধ্যে বকেয়া পরিশোধ করলে ₹২,৮৫০ জরিমানা সম্পূর্ণ মকুব করা হবে। বর্তমানে কোনো আইনি পদক্ষেপ বা আদালতের কার্যক্রম সক্রিয় নেই।',
    keyFacts: [
      { label: 'প্রদেয় পরিমাণ', value: '₹১৪,২৫০', badge: 'মূল কর', highlight: true },
      { label: 'ছাড়ের শেষ তারিখ', value: '১৫ অক্টোবর ২০২৪', badge: '₹২,৮৫০ সাশ্রয়' },
      { label: 'ওয়ার্ড নম্বর', value: 'ওয়ার্ড ৪২-B / SEC148-88492' },
      { label: 'আইনি অবস্থা', value: 'নিয়মিত সাধারণ কর' },
    ],
    nextSteps: [
      { id: '1', task: 'আপনার প্রপার্টি অ্যাসেসমেন্ট নম্বর নিয়ে পৌর নাগরিক সেবা কেন্দ্রে যান বা অনলাইন পোর্টালে যান।', critical: true },
      { id: '2', task: '১৫ অক্টোবরের মধ্যে ₹১৪,২৫০ জমা দিয়ে জরিমানা মকুবের সুবিধা নিন।', critical: true },
      { id: '3', task: 'পেমেন্টের পর কম্পিউটার রশিদটি ভবিষ্যতে প্রমাণের জন্য সংরক্ষণ করুন।' },
    ],
    rawOcrPreview: `রাজস্ব কর্মকর্তার কার্যালয় — ফর্ম VII (বিধি ১৮)\nবকেয়া পৌর কর: ₹১৪,২৫০.০০\nবিলম্ব জরিমানা: ₹২,৮৫০.০০`,
  },
};
