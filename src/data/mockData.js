// Data and sample documents for Hmm — Gear5coders

export const LANGUAGES = [
  { id: 'ta', name: 'Tamil', native: 'தமிழ்', script: 'Noto Sans Tamil', sample: 'இந்த கடிதம் உங்கள் உள்ளாட்சி வரி கட்டணத்தை பற்றி விளக்குகிறது.' },
  { id: 'hi', name: 'Hindi', native: 'हिन्दी', script: 'Noto Sans Devanagari', sample: 'यह नोटिस आपके स्थानीय संपत्ति कर के बारे में बताता है।' },
  { id: 'te', name: 'Telugu', native: 'తెలుగు', script: 'Noto Sans Telugu', sample: 'ఈ నోటీసు మీ మునిసిపల్ ఆస్తి పన్ను గురించి వివరిస్తుంది.' },
  { id: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', script: 'Noto Sans Kannada', sample: 'ಈ ನೋಟಿಸ್ ನಿಮ್ಮ ಸ್ಥಳೀಯ ಪುರಸಭೆಯ ಆಸ್ತಿ ತೆರಿಗೆಯನ್ನು ವಿವರಿಸುತ್ತದೆ.' },
  { id: 'bn', name: 'Bengali', native: 'বাংলা', script: 'Noto Sans Bengali', sample: 'এই নোটিশটি আপনার স্থানীয় পৌর কর পরিশোধের বিবরণ দেয়।' },
  { id: 'mr', name: 'Marathi', native: 'मराठी', script: 'Noto Sans Devanagari', sample: 'ही नोटीस आपल्या स्थानिक मालमत्ता कराबद्दल माहिती देते.' },
  { id: 'ml', name: 'Malayalam', native: 'മലയാളം', script: 'Noto Sans Malayalam', sample: 'ഈ അറിയിപ്പ് നിങ്ങളുടെ തദ്ദേശ സ്വത്ത് നികുതിയെക്കുറിച്ച് വ്യക്തമാക്കുന്നു.' },
  { id: 'en', name: 'English', native: 'Plain English', script: 'Inter', sample: 'This letter explains your municipal property tax notice in simple terms.' },
];

export const ALL_SUPPORTED_LANGUAGES = [
  { id: 'ta', name: 'Tamil', native: 'தமிழ்', speakers: '78M+ speakers', phrase: 'இப்ப புரியுது!' },
  { id: 'hi', name: 'Hindi', native: 'हिन्दी', speakers: '600M+ speakers', phrase: 'अब समझ आया!' },
  { id: 'te', name: 'Telugu', native: 'తెలుగు', speakers: '83M+ speakers', phrase: 'ఇప్పుడు అర్థమైంది!' },
  { id: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', speakers: '44M+ speakers', phrase: 'ಈಗ ಅರ್ಥವಾಯಿತು!' },
  { id: 'bn', name: 'Bengali', native: 'বাংলা', speakers: '270M+ speakers', phrase: 'এবার বুঝতে পারলাম!' },
  { id: 'mr', name: 'Marathi', native: 'मराठी', speakers: '83M+ speakers', phrase: 'आता समजले!' },
  { id: 'ml', name: 'Malayalam', native: 'മലയാളം', speakers: '35M+ speakers', phrase: 'ഇപ്പോൾ മനസ്സിലായി!' },
  { id: 'gu', name: 'Gujarati', native: 'ગુજરાતી', speakers: '56M+ speakers', phrase: 'હવે સમજાયું!' },
  { id: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', speakers: '113M+ speakers', phrase: 'ਹੁਣ ਸਮਝ ਆਇਆ!' },
  { id: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ', speakers: '35M+ speakers', phrase: 'ଏବେ ବୁଝିଲି!' },
  { id: 'as', name: 'Assamese', native: 'অসমীয়া', speakers: '15M+ speakers', phrase: 'এতিয়া বুজি পালোঁ!' },
  { id: 'en', name: 'Plain English', native: 'English', speakers: 'Global', phrase: 'Oh. Now I get it.' },
];

// Single source of truth: UI translation dictionary keyed by language code
export const UI_TRANSLATIONS = {
  en: {
    samplePrompt: "Try a realistic sample:",
    demoErrorBtn: "Demo Blurry Photo Error",
    step1: "Document Source",
    step2: "Choose Regional Language",
    uploadOwn: "Upload your own document",
    dragDrop: "Drag and drop here, or browse files",
    takePhoto: "Take Photo",
    change: "Change",
    uploaded: "Uploaded",
    rawOcr: "Document Excerpt (Raw OCR):",
    simplifyBtn: "Simplify & Explain Document",
    simplifying: "Simplifying...",
    thinking0: "Extracting text and identifying statutory clauses...",
    thinking1: "Translating into plain conversational language...",
    thinking2: "Grounding action checklist against verified rules...",
    clarityAchieved: "CLARITY ACHIEVED",
    plainExplanation: "Plain Language Explanation",
    spokenIn: "Spoken in",
    playAudio: "Play",
    pauseAudio: "Pause",
    whatToDoNext: "What to do next — Action Card",
    checklistHint: "Check off items as you complete them",
    downloadSummary: "Download Summary",
    shareWhatsApp: "Share via WhatsApp",
    newDocument: "New Document",
    errorTitle: "Let’s try a clearer photo",
    resetSample: "Reset to Sample Document",
    idleHint: "Select your document on the left, pick your preferred language above, and press \"Simplify & Explain Document\" to see the full transformation."
  },
  ta: {
    samplePrompt: "மாதிரி ஆவணத்தை முயற்சிக்கவும்:",
    demoErrorBtn: "மங்கலான புகைப்பட பிழை மாதிரி",
    step1: "ஆவண ஆதாரம்",
    step2: "வட்டார மொழியைத் தேர்வுசெய்யவும்",
    uploadOwn: "உங்கள் சொந்த ஆவணத்தைப் பதிவேற்றவும்",
    dragDrop: "இங்கே இழுத்து விடவும் அல்லது கோப்புகளைத் தேர்ந்தெடுக்கவும்",
    takePhoto: "படம் எடுக்கவும்",
    change: "மாற்று",
    uploaded: "பதிவேற்றப்பட்டது",
    rawOcr: "ஆவணப் பகுதி (மூல OCR):",
    simplifyBtn: "ஆவணத்தை எளிய மொழியில் விளக்குங்கள்",
    simplifying: "விளக்கமளிக்கிறது...",
    thinking0: "உரையைப் பிரித்தெடுத்து சட்ட விதிகளைக் கண்டறிகிறது...",
    thinking1: "எளிய உரையாடல் மொழியில் மொழியாக்கம் செய்கிறது...",
    thinking2: "சரிபார்க்கப்பட்ட விதிகளின்படி செயல் அட்டவணையை உருவாக்குகிறது...",
    clarityAchieved: "தெளிவு கிடைத்தது",
    plainExplanation: "எளிய மொழி விளக்கம்",
    spokenIn: "பேசப்படும் மொழி",
    playAudio: "இயக்கு",
    pauseAudio: "நிறுத்து",
    whatToDoNext: "அடுத்து என்ன செய்ய வேண்டும் — செயல் அட்டை",
    checklistHint: "முடித்த பணிகளை டிக் செய்யவும்",
    downloadSummary: "சுருக்கத்தைப் பதிவிறக்கு",
    shareWhatsApp: "வாட்ஸ்அப்பில் பகிரவும்",
    newDocument: "புதிய ஆவணம்",
    errorTitle: "தெளிவான புகைப்படத்தை முயற்சிப்போம்",
    resetSample: "மாதிரி ஆவணத்திற்கு மீட்டமை",
    idleHint: "இடதுபுறம் ஆவணத்தைத் தேர்ந்தெடுத்து, மேலே உங்கள் மொழியைத் தேர்வுசெய்து, 'ஆவணத்தை எளிய மொழியில் விளக்குங்கள்' பொத்தானை அழுத்தவும்."
  },
  hi: {
    samplePrompt: "एक वास्तविक नमूना आज़माएं:",
    demoErrorBtn: "धुंधली फोटो त्रुटि का नमूना",
    step1: "दस्तावेज़ स्रोत",
    step2: "क्षेत्रीय भाषा चुनें",
    uploadOwn: "अपना दस्तावेज़ अपलोड करें",
    dragDrop: "यहाँ ड्रैग करें या फाइल चुनें",
    takePhoto: "फोटो खींचें",
    change: "बदलें",
    uploaded: "अपलोड किया गया",
    rawOcr: "दस्तावेज़ का अंश (कच्चा OCR):",
    simplifyBtn: "दस्तावेज़ को सरल भाषा में समझें",
    simplifying: "सरल किया जा रहा है...",
    thinking0: "टेक्स्ट निकाल कर कानूनी नियमों की पहचान की जा रही है...",
    thinking1: "सरल बोलचाल की भाषा में अनुवाद किया जा रहा है...",
    thinking2: "प्रमाणित नियमों के आधार पर कार्य सूची तैयार की जा रही है...",
    clarityAchieved: "स्पष्टता प्राप्त हुई",
    plainExplanation: "सरल भाषा में व्याख्या",
    spokenIn: "में बोली जा रही है",
    playAudio: "सुनें",
    pauseAudio: "रोकें",
    whatToDoNext: "आगे क्या करें — कार्य सूची",
    checklistHint: "पूरे किए गए कार्यों को टिक करें",
    downloadSummary: "विवरण डाउनलोड करें",
    shareWhatsApp: "व्हाट्सएप पर शेयर करें",
    newDocument: "नया दस्तावेज़",
    errorTitle: "आइए अधिक स्पष्ट फोटो का प्रयास करें",
    resetSample: "नमूना दस्तावेज़ पर रीसेट करें",
    idleHint: "बाईं ओर दस्तावेज़ चुनें, ऊपर अपनी भाषा चुनें, और 'दस्तावेज़ को सरल भाषा में समझें' बटन दबाएं।"
  },
  te: {
    samplePrompt: "ఒక నమూనా పత్రాన్ని ప్రయత్నించండి:",
    demoErrorBtn: "మసక ఫోటో లోపం డెమో",
    step1: "పత్ర మూలం",
    step2: "ప్రాంతీయ భాషను ఎంచుకోండి",
    uploadOwn: "మీ పత్రాన్ని అప్‌లోడ్ చేయండి",
    dragDrop: "ఇక్కడ డ్రాగ్ చేయండి లేదా ఫైల్ ఎంచుకోండి",
    takePhoto: "ఫోటో తీయండి",
    change: "మార్చండి",
    uploaded: "అప్‌లోడ్ చేయబడింది",
    rawOcr: "పత్రం పాఠ్యం (రా OCR):",
    simplifyBtn: "పత్రాన్ని సులభంగా అర్థం చేసుకోండి",
    simplifying: "వివరిస్తోంది...",
    thinking0: "పాఠ్యాన్ని సేకరించి నిబంధనలను గుర్తిస్తోంది...",
    thinking1: "సులభమైన సంభాషణ భాషలోకి అనువదిస్తోంది...",
    thinking2: "నిబంధనల ప్రకారం కార్యాచరణ జాబితాను రూపొందిస్తోంది...",
    clarityAchieved: "స్పష్టత వచ్చింది",
    plainExplanation: "సులభ భాషా వివరణ",
    spokenIn: "మాట్లాడే భాష",
    playAudio: "ప్లే చేయండి",
    pauseAudio: "ఆపండి",
    whatToDoNext: "తర్వాత ఏమి చేయాలి — కార్యాచరణ కార్డు",
    checklistHint: "పూర్తయిన పనులను టిక్ చేయండి",
    downloadSummary: "సారాంశాన్ని డౌన్‌లోడ్ చేయండి",
    shareWhatsApp: "వాట్సాప్‌లో షేర్ చేయండి",
    newDocument: "కొత్త పత్రం",
    errorTitle: "మరింత స్పష్టమైన ఫోటోను ప్రయత్నించండి",
    resetSample: "నమూనా పత్రానికి రీసెట్ చేయండి",
    idleHint: "ఎడమవైపు పత్రాన్ని ఎంచుకుని, పైన భాషను ఎంపిక చేసి, 'పత్రాన్ని సులభంగా అర్థం చేసుకోండి' నొక్కండి."
  },
  kn: {
    samplePrompt: "ಮಾದರಿ ದಾಖಲೆಯನ್ನು ಪ್ರಯತ್ನಿಸಿ:",
    demoErrorBtn: "ಮಸುಕಾದ ಫೋಟೋ ದೋಷದ ಡೆಮೊ",
    step1: "ದಾಖಲೆ ಮೂಲ",
    step2: "ಪ್ರಾದೇಶಿಕ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    uploadOwn: "ನಿಮ್ಮ ಸ್ವಂತ ದಾಖಲೆಯನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    dragDrop: "ಇಲ್ಲಿ ಡ್ರ್ಯಾಗ್ ಮಾಡಿ ಅಥವಾ ಫೈಲ್ ಆರಿಸಿ",
    takePhoto: "ಫೋಟೋ ತೆಗೆಯಿರಿ",
    change: "ಬದಲಾಯಿಸಿ",
    uploaded: "ಅಪ್‌ಲೋಡ್ ಆಗಿದೆ",
    rawOcr: "ದಾಖಲೆಯ ಸಾರಾಂಶ (OCR):",
    simplifyBtn: "ದಾಖಲೆಯನ್ನು ಸರಳವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ",
    simplifying: "ವಿವರಿಸಲಾಗುತ್ತಿದೆ...",
    thinking0: "ಪಠ್ಯವನ್ನು ಹೊರತೆಗೆದು ನಿಯಮಗಳನ್ನು ಗುರುತಿಸಲಾಗುತ್ತಿದೆ...",
    thinking1: "ಸರಳ ಸಂಭಾಷಣಾ ಭಾಷೆಗೆ ಅನುವಾದಿಸಲಾಗುತ್ತಿದೆ...",
    thinking2: "ನಿಯಮಗಳ ಪ್ರಕಾರ ಮುಂದಿನ ಕ್ರಮಗಳನ್ನು ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ...",
    clarityAchieved: "ಸ್ಪಷ್ಟತೆ ದೊರೆತಿದೆ",
    plainExplanation: "ಸರಳ ಭಾಷಾ ವಿವರಣೆ",
    spokenIn: "ಮಾತನಾಡುವ ಭಾಷೆ",
    playAudio: "ಪ್ಲೇ ಮಾಡಿ",
    pauseAudio: "ವಿರಾಮಗೊಳಿಸಿ",
    whatToDoNext: "ಮುಂದೆ ಏನು ಮಾಡಬೇಕು — ಕ್ರಿಯಾ ಕಾರ್ಡ್",
    checklistHint: "ಮುಗಿದ ಕೆಲಸಗಳನ್ನು ಗುರುತು ಮಾಡಿ",
    downloadSummary: "ಸಾರಾಂಶ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
    shareWhatsApp: "ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳಿ",
    newDocument: "ಹೊಸ ದಾಖಲೆ",
    errorTitle: "ಸ್ಪಷ್ಟವಾದ ಫೋಟೋವನ್ನು ಪ್ರಯತ್ನಿಸಿ",
    resetSample: "ಮಾದರಿ ದಾಖಲೆಗೆ ಮರುಹೊಂದಿಸಿ",
    idleHint: "ಎಡಭಾಗದಲ್ಲಿ ದಾಖಲೆಯನ್ನು ಆರಿಸಿ, ಮೇಲೆ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ, ವಿವರಣೆಯನ್ನು ಪಡೆಯಲು ಬಟನ್ ಒತ್ತಿ."
  },
  bn: {
    samplePrompt: "একটি নমুনা নথি চেষ্টা করুন:",
    demoErrorBtn: "অস্পষ্ট ছবির ত্রুটি ডেমো",
    step1: "নথির উৎস",
    step2: "আঞ্চলিক ভাষা নির্বাচন করুন",
    uploadOwn: "আপনার নিজস্ব নথি আপলোড করুন",
    dragDrop: "এখানে টেনে আনুন বা ফাইল নির্বাচন করুন",
    takePhoto: "ছবি তুলুন",
    change: "পরিবর্তন",
    uploaded: "আপলোড করা হয়েছে",
    rawOcr: "নথির পাঠ্য (OCR):",
    simplifyBtn: "নথিটি সহজ ভাষায় বুঝুন",
    simplifying: "ব্যাখ্যা করা হচ্ছে...",
    thinking0: "আইনি ধারা ও মূল পাঠ্য শনাক্ত করা হচ্ছে...",
    thinking1: "সহজ কথোপকথনের ভাষায় অনুবাদ করা হচ্ছে...",
    thinking2: "যাচাইকৃত নিয়মের ভিত্তিতে করণীয় তালিকা তৈরি হচ্ছে...",
    clarityAchieved: "স্পষ্টতা পাওয়া গেছে",
    plainExplanation: "সহজ ভাষায় ব্যাখ্যা",
    spokenIn: "বলার ভাষা",
    playAudio: "শুনুন",
    pauseAudio: "থামান",
    whatToDoNext: "পরবর্তী করণীয় — অ্যাকশন কার্ড",
    checklistHint: "সম্পন্ন কাজের পাশে টিক দিন",
    downloadSummary: "সারসংক্ষেপ ডাউনলোড করুন",
    shareWhatsApp: "হোয়াটসঅ্যাপে শেয়ার করুন",
    newDocument: "নতুন নথি",
    errorTitle: "আরো পরিষ্কার ছবি তোলার চেষ্টা করুন",
    resetSample: "নমুনা নথিতে ফিরে যান",
    idleHint: "বামে নথি বাছুন, উপরে ভাষা নির্বাচন করুন এবং সহজ ব্যাখ্যার জন্য বোতামটি চাপুন।"
  },
  mr: {
    samplePrompt: "एक नमुना दस्तऐवज वापरून पहा:",
    demoErrorBtn: "अस्पष्ट फोटो त्रुटी डेमो",
    step1: "दस्तऐवज स्रोत",
    step2: "प्रादेशिक भाषा निवडा",
    uploadOwn: "तुमचा स्वतःचा दस्तऐवज अपलोड करा",
    dragDrop: "येथे ड्रॅग करा किंवा फाईल निवडा",
    takePhoto: "फोटो काढा",
    change: "बदला",
    uploaded: "अपलोड केले",
    rawOcr: "दस्तऐवजाचा मजकूर (OCR):",
    simplifyBtn: "दस्तऐवज सोप्या भाषेत समजून घ्या",
    simplifying: "स्पष्टीकरण सुरू आहे...",
    thinking0: "मजकूर काढून नियमांची पडताळणी केली जात आहे...",
    thinking1: "सोप्या बोलचालीच्या भाषेत अनुवाद सुरू आहे...",
    thinking2: "नियमबद्ध पुढील कृती यादी तयार केली जात आहे...",
    clarityAchieved: "स्पष्टता मिळाली",
    plainExplanation: "सोप्या भाषेतील स्पष्टीकरण",
    spokenIn: "बोलण्याची भाषा",
    playAudio: "ऐका",
    pauseAudio: "थांबवा",
    whatToDoNext: "पुढे काय करावे — कृती कार्ड",
    checklistHint: "पूर्ण झालेल्या कामांना टिक करा",
    downloadSummary: "सारांश डाउनलोड करा",
    shareWhatsApp: "व्हॉट्सॲपवर शेअर करा",
    newDocument: "नवीन दस्तऐवज",
    errorTitle: "अधिक स्पष्ट फोटो घेण्याचा प्रयत्न करा",
    resetSample: "नमुना दस्तऐवजावर परत जा",
    idleHint: "डावीकडे दस्तऐवज निवडा, वर भाषा निवडा आणि स्पष्टीकरणासाठी बटण दाबा."
  },
  ml: {
    samplePrompt: "ഒരു മാതൃകാ രേഖ പരീക്ഷിക്കുക:",
    demoErrorBtn: "വ്യക്തമല്ലാത്ത ഫോട്ടോ തെറ്റ് ഡെമോ",
    step1: "രേഖ ഉറവിടം",
    step2: "പ്രാദേശിക ഭാഷ തിരഞ്ഞെടുക്കുക",
    uploadOwn: "നിങ്ങളുടെ സ്വന്തം രേഖ അപ്‌ലോഡ് ചെയ്യുക",
    dragDrop: "ഇവിടെ വലിച്ചിടുക അല്ലെങ്കിൽ ഫയൽ തിരഞ്ഞെടുക്കുക",
    takePhoto: "ഫോട്ടോ എടുക്കുക",
    change: "മാറ്റുക",
    uploaded: "അപ്‌ലോഡ് ചെയ്തു",
    rawOcr: "രേഖയിലെ വിവരങ്ങൾ (OCR):",
    simplifyBtn: "രേഖ ലളിതമായി മനസ്സിലാക്കുക",
    simplifying: "ലളിതമാക്കുന്നു...",
    thinking0: "നിയമപരമായ വിവരങ്ങൾ തിരിച്ചറിയുന്നു...",
    thinking1: "ലളിതമായ സംസാര ഭാഷയിലേക്ക് മാറ്റുന്നു...",
    thinking2: "നിയമാനുസൃതമായ തുടർനടപടികൾ തയ്യാറാക്കുന്നു...",
    clarityAchieved: "വ്യക്തത കൈവരിച്ചു",
    plainExplanation: "ലളിതമായ ഭാഷാ വിവരണം",
    spokenIn: "സംസാരിക്കുന്ന ഭാഷ",
    playAudio: "പ്ലേ ചെയ്യുക",
    pauseAudio: "നിർത്തുക",
    whatToDoNext: "അടുത്തതായി എന്ത് ചെയ്യണം — ആക്ഷൻ കാർഡ്",
    checklistHint: "ചെയ്തുതീർത്ത കാര്യങ്ങൾ ടിക്ക് ചെയ്യുക",
    downloadSummary: "വിവരണം ഡൗൺലോഡ് ചെയ്യുക",
    shareWhatsApp: "വാട്സാപ്പിൽ പങ്കിടുക",
    newDocument: "പുതിയ രേഖ",
    errorTitle: "കൂടുതൽ വ്യക്തതയുള്ള ഫോട്ടോ ഉപയോഗിക്കുക",
    resetSample: "മാതൃകാ രേഖയിലേക്ക് മടങ്ങുക",
    idleHint: "ഇടതുവശത്ത് രേഖ തിരഞ്ഞെടുക്കുക, മുകളിൽ ഭാഷ തിരഞ്ഞെടുത്ത് ബട്ടൺ അമർത്തുക."
  }
};

export function getTranslation(langCode, key) {
  if (UI_TRANSLATIONS[langCode] && UI_TRANSLATIONS[langCode][key]) {
    return UI_TRANSLATIONS[langCode][key];
  }
  return UI_TRANSLATIONS.en[key] || '';
}

export const SAMPLE_DOCUMENTS = [
  {
    id: 'gov-notice',
    title: 'Property Tax Demand Notice',
    badge: 'Government Notice',
    date: '18 Sept 2024',
    issuingAuthority: 'Municipal Revenue Department (Sub-Division 4)',
    refNumber: 'MC-TAX/2024-25/SEC148-88492',
    rawExcerpt: `OFFICE OF THE REVENUE OFFICER — FORM VII (RULE 18)
DEMURRAGE & RE-ASSESSMENT DEMAND NOTICE UNDER SEC 148(B) r/w 13(2)
To: Defaulting Property Assessee, Ward 42-B.
Whereas the assessment ledger for Assessment Year 2024-2025 exhibits an outstanding principal municipal impost of INR 14,250.00 together with accrued penal demurrage of INR 2,850.00 under subsection (iv);
NOW THEREFORE you are hereby called upon to show cause or liquidate said liability within fifteen (15) statutory business days from receipt, failing which proceedings under Section 13(2) for distress warrant attachment of immovable assets shall be initiated without further notice.`,
    stamps: ['PENAL CLAUSE FLAGGED', 'SECTION 148(B)', '15-DAY MANDATE'],
    simplified: {
      en: `This is a reminder from your local municipal corporation that your property tax of ₹14,250 for 2024-25 is due. 

Good news: If you pay the base ₹14,250 on or before October 15, 2024, the ₹2,850 late penalty will be completely waived under the current municipal rebate scheme. No court summons or legal dispute is active right now.`,
      ta: `இது உங்கள் உள்ளாட்சி நகராட்சி அலுவலகத்தில் இருந்து வந்த சொத்து வரி நினைவூட்டல் கடிதம். 2024-25 ஆம் ஆண்டுக்கான வரி நிலுவைத் தொகை ₹14,250.

நற்செய்தி: நீங்கள் அக்டோபர் 15, 2024-க்குள் அசல் தொகையான ₹14,250-ஐ செலுத்தினால், ₹2,850 அபராதக் கட்டணம் முழுமையாக தள்ளுபடி செய்யப்படும். தற்போது எந்த சட்ட நடவடிக்கையோ அல்லது நீதிமன்ற விவகாரமோ இல்லை.`,
      hi: `यह आपके स्थानीय नगर निगम का संपत्ति कर नोटिस है। वर्ष 2024-25 के लिए आपका मूल कर ₹14,250 बकाया है।

अच्छी खबर: यदि आप 15 अक्टूबर 2024 तक मूल राशि ₹14,250 जमा कर देते हैं, तो ₹2,850 का विलंब शुल्क (पेनल्टी) पूरी तरह माफ कर दिया जाएगा। अभी कोई कानूनी कार्रवाई या कोर्ट केस नहीं है।`,
      te: `ఇది మీ మునిసిపల్ కార్పొరేషన్ నుండి వచ్చిన ఆస్తి పన్ను రిమైండర్ నోటీసు. 2024-25 సంవత్సరానికి మీ పన్ను బకాయి ₹14,250.

మంచి విషయం: మీరు అక్టోబర్ 15, 2024 లోగా అసలు మొత్తం ₹14,250 చెల్లిస్తే, ₹2,850 లేట్ ఫీజు జరిమానా పూర్తిగా రద్దవుతుంది. ప్రస్తుతం ఎలాంటి కోర్టు లేదా చట్టపరమైన సమస్య లేదు.`,
      kn: `ಇದು ನಿಮ್ಮ ಸ್ಥಳೀಯ ಪುರಸಭೆಯ ಆಸ್ತಿ ತೆರಿಗೆ ಪಾವತಿಯ ನೆನಪೋಲೆ ಪತ್ರ. 2024-25 ರ ಸಾಲಿನ ನಿಮ್ಮ ತೆರಿಗೆ ಬಾಕಿ ₹14,250 ಆಗಿದೆ.

ಶುಭ ಸುದ್ದಿ: ನೀವು ಅಕ್ಟೋಬರ್ 15, 2024 ರೊಳಗೆ ಮೂಲ ಮೊತ್ತ ₹14,250 ಪಾವತಿಸಿದರೆ, ₹2,850 ದಂಡವನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ಮನ್ನಾ ಮಾಡಲಾಗುತ್ತದೆ. ಯಾವುದೇ ಕಾನೂನು ಕ್ರಮ ಅಥವಾ ಕೋರ್ಟ್ ಪ್ರಕರಣ ಈಗ ಜಾರಿಯಲ್ಲಿಲ್ಲ.`,
      bn: `এটি আপনার স্থানীয় পৌরসভা থেকে আসা প্রপার্টি ট্যাক্স সংক্রান্ত নোটিশ। ২০২৪-২৫ সালের জন্য আপনার মূল কর ₹১৪,২৫০ বকেয়া আছে।

সুখবর: আপনি যদি ১৫ই অক্টোবর ২০২৪-এর মধ্যে মূল ₹১৪,২৫০ জমা দেন, তবে ₹২,৮৫০ লেট ফি জরিমানা পুরোপুরি মকুব করা হবে। কোনো আদালত বা আইনি ঝামেলার দরকার নেই।`,
      mr: `ही तुमच्या स्थानिक नगरपालिकेकडून आलेली मालमत्ता कर नोटीस आहे. सन २०२४-२५ साठी तुमची मूळ कर रक्कम ₹१४,२५० थकीत आहे.

चांगली बातमी: १५ ऑक्टोबर २०२४ पूर्वी मूळ रक्कम ₹१४,२५० भरल्यास ₹२,८५० दंड पूर्णपणे माफ केला जाईल. कोणतीही कोर्ट कारवाई किंवा भीतीचे कारण नाही.`,
      ml: `ഇത് നിങ്ങളുടെ മുനിസിപ്പൽ കോർപ്പറേഷനിൽ നിന്നുള്ള പ്രോപ്പർട്ടി ടാക്സ് അറിയിപ്പാണ്. 2024-25 വർഷത്തെ അടയ്ക്കാനുള്ള തുക ₹14,250 ആണ്.

നല്ല വാർത്ത: ഒക്ടോബർ 15, 2024-ന് മുൻപായി അസൽ തുക ₹14,250 അടച്ചാൽ ₹2,850 പിഴ തുക പൂർണ്ണമായി ഒഴിവാക്കപ്പെടും. മറ്റ് നിയമപരമായ നടപടികൾ ഒന്നും ഇപ്പോൾ ബാധകമല്ല.`,
    },
    audioText: {
      en: "This letter is a property tax reminder for fourteen thousand two hundred and fifty rupees. If you pay before October 15th, your late penalty of two thousand eight hundred and fifty rupees is completely waived. You do not need a lawyer.",
      ta: "இந்தக் கடிதம் உங்கள் சொத்து வரி பதினான்காயிரத்து இருநூற்று ஐம்பது ரூபாய்க்கான நினைவூட்டல். அக்டோபர் பதினைந்துக்குள் செலுத்தினால், இரண்டாயிரத்து எண்ணூற்று ஐம்பது ரூபாய் அபராதம் தள்ளுபடி செய்யப்படும்.",
      hi: "यह पत्र आपके चौदह हजार दो सौ पचास रुपये के संपत्ति कर का नोटिस है। यदि आप पंद्रह अक्टूबर से पहले जमा करते हैं, तो दो हजार आठ सौ पचास रुपये की पेनल्टी पूरी तरह माफ हो जाएगी।",
      te: "ఈ లేఖ మీ ఆస్తి పన్ను పద్నాలుగు వేల రెండు వందల యాభై రూపాయల చెల్లింపు నోటీసు. అక్టోబర్ పదిహేను లోపు చెల్లిస్తే రెండు వేల ఎనిమిది వందల యాభై రూపాయల జరిమానా రద్దవుతుంది.",
      kn: "ಈ ಪತ್ರವು ನಿಮ್ಮ ಆಸ್ತಿ ತೆರಿಗೆ ಹದಿನಾಲ್ಕು ಸಾವಿರದ ಇನ್ನೂರ ಐವತ್ತು ರೂಪಾಯಿಗಳ ಪಾವತಿ ನೋಟಿಸ್ ಆಗಿದೆ. ಅಕ್ಟೋಬರ್ ಹದಿನೈದರೊಳಗೆ ಪಾವತಿಸಿದರೆ ಎರಡು ಸಾವಿರದ ಎಂಟುನೂರ ಐವತ್ತು ರೂಪಾಯಿ ದಂಡ ರದ್ದಾಗುತ್ತದೆ.",
      bn: "এই চিঠিটি আপনার চৌদ্দ হাজার দুইশত পঞ্চাশ টাকার প্রপার্টি ট্যাক্সের নোটিশ। পনেরোই অক্টোবরের আগে জমা দিলে দুই হাজার আটশত পঞ্চাশ টাকার জরিমানা পুরোপুরি মকুব হবে।",
      mr: "हे पत्र तुमच्या चौदा हजार दोनशे पन्नास रुपयांच्या मालमत्ता कराचे आहे. पंधरा ऑक्टोबरपूर्वी भरल्यास दोन हजार आठशे पन्नास रुपयांचा दंड पूर्णपणे माफ होईल.",
      ml: "ഈ കത്ത് നിങ്ങളുടെ പതിനാലായിരത്തി ഇരുനൂറ്റി അൻപത് രൂപയുടെ പ്രോപ്പർട്ടി ടാക്സ് അറിയിപ്പാണ്. ഒക്ടോബർ പതിനഞ്ചിന് മുൻപ് അടച്ചാൽ രണ്ടായിരത്തി എണ്ണൂറ്റി അൻപത് രൂപയുടെ പിഴ ഒഴിവാകും."
    },
    actionItems: {
      en: [
        { text: 'Pay the principal ₹14,250 before October 15 to waive the ₹2,850 penalty', priority: 'Urgent — Deadline Oct 15', done: false },
        { text: 'Pay online via municipal citizen portal or visit Ward 42-B counter in person', priority: 'Actionable', done: false },
        { text: 'Save your digital receipt with Assessment Ref #MC-TAX/2024-25/SEC148-88492', priority: 'Record Keeping', done: false },
        { text: 'No need to hire an intermediary or lawyer — this is a standard demand notice', priority: 'Advisory', done: false }
      ],
      ta: [
        { text: '₹2,850 அபராதத்தை தவிர்க்க அக்டோபர் 15-க்குள் அசல் ₹14,250 தொகையைச் செலுத்தவும்', priority: 'முக்கியம் — கடைசி நாள் அக். 15', done: false },
        { text: 'நகராட்சி இணையதள வாயிலாக அல்லது வார்டு 42-B அலுவலகத்தில் நேரில் செலுத்தலாம்', priority: 'செய்ய வேண்டியவை', done: false },
        { text: 'குறிப்பு எண் #MC-TAX/2024-25/SEC148-88492 கொண்ட ரசீதை பத்திரமாக சேமிக்கவும்', priority: 'ஆவணப் பதிவு', done: false },
        { text: 'வழக்கறிஞரையோ அல்லது தரகரையோ அணுக வேண்டிய அவசியமில்லை — இது நேரடி வரி நினைவூட்டல்', priority: 'ஆலோசனை', done: false }
      ],
      hi: [
        { text: '₹2,850 की पेनल्टी से बचने के लिए 15 अक्टूबर से पहले मूल ₹14,250 का भुगतान करें', priority: 'अति आवश्यक — अंतिम तिथि 15 अक्टू.', done: false },
        { text: 'नगर निगम पोर्टल पर ऑनलाइन या वार्ड 42-B काउंटर पर जाकर जमा करें', priority: 'कार्यवाही योग्य', done: false },
        { text: 'असेसमेंट संदर्भ #MC-TAX/2024-25/SEC148-88492 वाली रसीद सुरक्षित रखें', priority: 'दस्तावेज़ रिकॉर्ड', done: false },
        { text: 'किसी वकील या बिचौलिए की आवश्यकता नहीं है — यह सामान्य मांग पत्र है', priority: 'सलाह', done: false }
      ],
      te: [
        { text: '₹2,850 జరిమానా మాఫీ కావాలంటే అక్టోబర్ 15 లోపు అసలు ₹14,250 చెల్లించండి', priority: 'అత్యవసరం — గడువు అక్టోబర్ 15', done: false },
        { text: 'మున్సిపల్ పోర్టల్ ద్వారా ఆన్‌లైన్‌లో లేదా వార్డు 42-B వద్ద నేరుగా చెల్లించండి', priority: 'చేయవలసిన పని', done: false },
        { text: 'రిఫరెన్స్ #MC-TAX/2024-25/SEC148-88492 తో కూడిన రసీదును భద్రపరచండి', priority: 'రికార్డు భద్రత', done: false },
        { text: 'మధ్యవర్తులు లేదా లాయర్ల అవసరం లేదు — ఇది సాధారణ పన్ను నోటీసు మాత్రమే', priority: 'సలహా', done: false }
      ],
      kn: [
        { text: '₹2,850 ದಂಡ ಮನ್ನಾ ಪಡೆಯಲು ಅಕ್ಟೋಬರ್ 15 ರೊಳಗೆ ಮೂಲ ₹14,250 ಪಾವತಿಸಿ', priority: 'ತುರ್ತು — ಗಡುವು ಅಕ್ಟೋಬರ್ 15', done: false },
        { text: 'ಪುರಸಭೆ ಪೋರ್ಟಲ್ ಮೂಲಕ ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಅಥವಾ ವಾರ್ಡ್ 42-B ಕಚೇರಿಯಲ್ಲಿ ಪಾವತಿಸಿ', priority: 'ಕ್ರಮ ಕೈಗೊಳ್ಳಿ', done: false },
        { text: 'ಉಲ್ಲೇಖ ಸಂಖ್ಯೆ #MC-TAX/2024-25/SEC148-88492 ರಶೀದಿಯನ್ನು ಕಾಪಾಡಿಕೊಳ್ಳಿ', priority: 'ದಾಖಲೆ ಉಳಿಸಿ', done: false },
        { text: 'ಯಾವುದೇ ಮಧ್ಯವರ್ತಿ ಅಥವಾ ವಕೀಲರ ಅಗತ್ಯವಿಲ್ಲ — ಇದು ನೇರ ತೆರಿಗೆ ಸೂಚನೆ', priority: 'ಸಲಹೆ', done: false }
      ],
      bn: [
        { text: '₹২,৮৫০ জরিমানা এড়াতে ১৫ই অক্টোবরের মধ্যে মূল ₹১৪,২৫০ পরিশোধ করুন', priority: 'জরুরি — শেষ তারিখ ১৫ অক্টোবর', done: false },
        { text: 'পৌরসভার পোর্টালে অনলাইনে বা ওয়ার্ড ৪২-বি কাউন্টারে গিয়ে জমা দিন', priority: 'করণীয় কাজ', done: false },
        { text: 'রেফারেন্স #MC-TAX/2024-25/SEC148-88492 সহ রশিদটি সংরক্ষণ করুন', priority: 'রেকর্ড রাখুন', done: false },
        { text: 'আইনজীবী বা দালালের দরকার নেই — এটি একটি নিয়মিত করের নোটিশ', priority: 'পরামর্শ', done: false }
      ],
      mr: [
        { text: '₹२,८५० दंड टाळण्यासाठी १५ ऑक्टोबरपूर्वी मूळ ₹१४,२५० भरा', priority: 'तातडीचे — मुदत १५ ऑक्टोबर', done: false },
        { text: 'महानगरपालिका पोर्टलवर ऑनलाइन किंवा प्रभाग ४२-बी कार्यालयात भरा', priority: 'कृती करा', done: false },
        { text: 'पावती क्रमांक #MC-TAX/2024-25/SEC148-88492 जपून ठेवा', priority: 'नोंद ठेवा', done: false },
        { text: 'वकील किंवा दलालाची गरज नाही — ही नियमित कर सूचना आहे', priority: 'सल्ला', done: false }
      ],
      ml: [
        { text: '₹2,850 പിഴ ഒഴിവാക്കാൻ ഒക്ടോബർ 15-ന് മുൻപ് ₹14,250 അടയ്ക്കുക', priority: 'അടിയന്തിരം — അവസാന തീയതി ഒക്ടോ 15', done: false },
        { text: 'മുനിസിപ്പൽ പോർട്ടൽ വഴിയോ വാർഡ് 42-B കൗണ്ടറിലോ പണമടയ്ക്കാം', priority: 'ചെയ്യേണ്ട കാര്യം', done: false },
        { text: 'റഫറൻസ് #MC-TAX/2024-25/SEC148-88492 രസീത് സൂക്ഷിക്കുക', priority: 'രേഖ സൂക്ഷിക്കൽ', done: false },
        { text: 'ഇടനിലക്കാരുടെയോ വക്കീലിന്റെയോ ആവശ്യമില്ല — ഇത് നേരിട്ടുള്ള അറിയിപ്പാണ്', priority: 'നിർദ്ദേശം', done: false }
      ]
    },
    groundedRule: {
      en: 'Grounded in Municipal Act 1988 (Sec 148-B Amnesty Resolution #42/2024)',
      ta: 'நகராட்சிச் சட்டம் 1988 (பிரிவு 148-B பொது மன்னிப்புத் தீர்மானம் #42/2024) அடிப்படையில் சரிபார்க்கப்பட்டது',
      hi: 'नगर निगम अधिनियम 1988 (धारा 148-B छूट संकल्प #42/2024) पर आधारित',
      te: 'మునిసిపల్ చట్టం 1988 (సెక్షన్ 148-B ఉపశమన తీర్మానం #42/2024) ఆధారంగా ధృవీకరించబడింది',
      kn: 'ಪುರಸಭೆ ಕಾಯ್ದೆ 1988 (ಸೆಕ್ಷನ್ 148-B ರಿಯಾಯಿತಿ ನಿರ್ಣಯ #42/2024) ಆಧರಿಸಿದೆ',
      bn: 'পৌরসভা আইন ১৯৮৮ (ধারা ১৪৮-বি অ্যামনেস্টি প্রস্তাবনা #৪২/২০২৪) অনুযায়ী যাচাইকৃত',
      mr: 'महानगरपालिका कायदा १९८८ (कलम १४८-बी सवलत ठराव #४२/२०२४) वर आधारित',
      ml: 'മുനിസിപ്പൽ ആക്ട് 1988 (സെക്ഷൻ 148-B ഇളവ് പ്രമേയം #42/2024) പ്രകാരം'
    }
  },
  {
    id: 'med-report',
    title: 'Blood Sugar & Kidney Function Report',
    badge: 'Medical Lab Report',
    date: '22 Sept 2024',
    issuingAuthority: 'Metropolis Diagnostics & Clinical Pathology Lab',
    refNumber: 'LAB-BIO/2024/991204',
    rawExcerpt: `METABOLIC & GLYCATED HEMOGLOBIN PROFILE (HPLC METHOD)
Test Name                   Result      Biological Reference Interval
Serum HbA1c (Glycated Hb)   9.4 %  [HIGH]     Normal: 4.0 - 5.6 % | Diabetic: >6.5 %
Estimated Avg Glucose (eAG) 223 mg/dL         Normal: 70 - 115 mg/dL
Fasting Plasma Glucose (FPG)186 mg/dL [HIGH]  Normal: 70 - 99 mg/dL
Serum Creatinine            1.42 mg/dL [BORDER] Normal: 0.7 - 1.2 mg/dL
Urine Albumin/Creatinine    145 mg/g [HIGH]   Normal: < 30 mg/g (Microalbuminuria present)
Clinical Impression: Uncontrolled glycemic state with incipient nephropathy markers. Recommend clinical correlation and immediate diabetology review.`,
    stamps: ['HIGH GLYCEMIC MARKER', 'MICROALBUMINURIA', 'DOCTOR REVIEW REQUIRED'],
    simplified: {
      en: `Your average blood sugar over the last 3 months is 9.4%, which is high (a healthy target is usually under 6.5%). 

The report also detects mild protein in your urine (145 mg/g), which means your kidneys are working under extra strain from the sugar. This is very common and treatable, but your current diabetes medication needs a prompt review with your doctor.`,
      ta: `கடந்த 3 மாதங்களில் உங்கள் சராசரி ரத்த சர்க்கரை அளவு 9.4% ஆக உள்ளது. இது பரிந்துரைக்கப்பட்ட அளவை விட (6.5%-க்கு கீழ் இருக்க வேண்டும்) அதிகம்.

மேலும் சிறுநீரில் லேசான புரதக் கசிவு (145 mg/g) காணப்படுகிறது. இதன் பொருள் அதிக சர்க்கரையால் சிறுநீரகம் கூடுதல் அழுத்தத்தில் இயங்குகிறது. பயப்பட வேண்டாம், உடனடியாக உங்கள் மருத்துவரை சந்தித்து மாத்திரைகளை சரிசெய்தால் இதை எளிதாக குணப்படுத்தலாம்.`,
      hi: `पिछले 3 महीनों में आपका औसत ब्लड शुगर 9.4% आया है, जो सामान्य स्तर (6.5% से कम) से काफी ज्यादा है।

रिपोर्ट में पेशाब में प्रोटीन (145 mg/g) का स्तर भी बढ़ा हुआ मिला है, यानी शुगर की वजह से किडनी पर थोड़ा अतिरिक्त जोर पड़ रहा है। घबराने की जरूरत नहीं है, पर अपने डॉक्टर से मिलकर तुरंत दवाइयों की मात्रा ठीक करवाएं।`,
      te: `గత 3 నెలల్లో మీ సగటు రక్తంలో చక్కెర స్థాయి 9.4% గా ఉంది. ఇది సాధారణ పరిమితి (6.5% కంటే తక్కువ) కంటే ఎక్కువ.

యూరిన్‌లో ప్రోటీన్ (145 mg/g) కూడా ఎక్కువగా ఉంది, అంటే షుగర్ ప్రభావం వల్ల కిడ్నీలపై ఒత్తిడి పడుతోంది. కంగారు పడకండి, వెంటనే మీ డాక్టర్‌ను కలిసి మందుల మోతాదును మార్పించుకోండి.`,
      kn: `ಕಳೆದ 3 ತಿಂಗಳುಗಳಲ್ಲಿ ನಿಮ್ಮ ಸರಾಸರಿ ರಕ್ತದ ಸಕ್ಕರೆ ಪ್ರಮಾಣ 9.4% ಇದೆ. ಇದು ಸಾಮಾನ್ಯ ಮಟ್ಟಕ್ಕಿಂತ (6.5% ಗಿಂತ ಕಡಿಮೆ) ಹೆಚ್ಚಾಗಿದೆ.

ಮೂತ್ರದಲ್ಲಿ ಪ್ರೋಟೀನ್ ಪ್ರಮಾಣವೂ ಸ್ವಲ್ಪ ಹೆಚ್ಚಾಗಿದೆ. ಇದರಿಂದ ಕಿಡ್ನಿ ಮೇಲೆ ಒತ್ತಡ ಬೀಳುತ್ತಿದೆ. ಭಯಪಡಬೇಡಿ, ತಕ್ಷಣ ನಿಮ್ಮ ವೈದ್ಯರನ್ನು ಕಂಡು ಮಧುಮೇಹದ ಔಷಧವನ್ನು ಸರಿಪಡಿಸಿಕೊಳ್ಳಿ.`,
      bn: `বিগত ৩ মাসে আপনার গড় ব্লাড সুগার এসেছে ৯.৪%, যা স্বাভাবিক মাত্রার (৬.৫% এর কম) চেয়ে অনেকটাই বেশি।

এছাড়া প্রস্রাবে প্রোটিনের মাত্রাও (১৪৫ mg/g) কিছুটা বেশি এসেছে, যার অর্থ সুগারের কারণে কিডনিতে হালকা চাপ পড়ছে। ভয়ের কিছু নেই, দ্রুত আপনার চিকিৎসকের সাথে কথা বলে ওষুধের ডোজ সমন্বয় করুন।`,
      mr: `गेल्या ३ महिन्यांतील तुमची सरासरी रक्तातील साखर ९.४% आली आहे, जी सामान्य प्रमाणापेक्षा (६.५% पेक्षा कमी) जास्त आहे.

लघवीमध्ये प्रथिनांचे (प्रोटीन) प्रमाणही थोडे जास्त आढळले आहे. काळजी करू नका, परंतु त्वरित डॉक्टरांना भेटून मधुमेहाच्या औषधांमध्ये बदल करून घ्या.`,
      ml: `കഴിഞ്ഞ 3 മാസത്തെ നിങ്ങളുടെ ശരാശരി രക്തത്തിലെ പഞ്ചസാരയുടെ അളവ് 9.4% ആണ്. ഇത് സാധാരണ നിരക്കിനേക്കാൾ കൂടുതലാണ്.

മൂത്രത്തിൽ പ്രോട്ടീന്റെ അളവ് അല്പം കൂടുതലായി കാണുന്നു. പേടിക്കേണ്ടതില്ല, ഉടൻ തന്നെ ഡോക്ടറെ കണ്ട് പ്രമേഹ ഗുളികകളുടെ അളവ് ക്രമീകരിക്കുക.`,
    },
    audioText: {
      en: "Your three-month blood sugar average is nine point four percent, which is higher than normal. Your kidney test also shows mild sugar strain. Please schedule a visit with your doctor within one week to adjust your medicine.",
      ta: "உங்கள் மூன்று மாத ரத்த சர்க்கரை சராசரி ஒன்பது புள்ளி நான்கு சதவீதம். இது இயல்பை விட அதிகம். உங்கள் சிறுநீரகத்தில் லேசான அழுத்தமும் தென்படுகிறது. ஒரு வாரத்திற்குள் மருத்துவரை அணுகவும்.",
      hi: "आपका तीन महीने का औसत ब्लड शुगर नौ दशमलव चार प्रतिशत है जो अधिक है। आपकी किडनी पर भी हल्का दबाव है। कृपया एक सप्ताह के भीतर डॉक्टर से संपर्क कर दवा बदलवाएं।",
      te: "మీ మూడు నెలల సగటు రక్తంలో చక్కెర తొమ్మిది పాయింట్ నాలుగు శాతంగా ఉంది. వారం రోజుల్లో మీ డాక్టర్‌ను సంప్రదించి మందుల మోతాదును సర్దుబాటు చేసుకోండి.",
      kn: "ನಿಮ್ಮ ಮೂರು ತಿಂಗಳ ಸರಾಸರಿ ರಕ್ತದ ಸಕ್ಕರೆ ಒಂಬತ್ತು ಪಾಯಿಂಟ್ ನಾಲ್ಕು ಶೇಕಡಾ ಆಗಿದೆ. ಒಂದು ವಾರದೊಳಗೆ ನಿಮ್ಮ ವೈದ್ಯರನ್ನು ಭೇಟಿ ಮಾಡಿ ಔಷಧಿ ಬದಲಾಯಿಸಿಕೊಳ್ಳಿ.",
      bn: "আপনার তিন মাসের গড় সুগার নয় দশমিক চার শতাংশ, যা বেশি। আগামী এক সপ্তাহের মধ্যে চিকিৎসকের সাথে দেখা করে ওষুধ পরিবর্তন করিয়ে নিন।",
      mr: "तुमची तीन महिन्यांची सरासरी साखर ९.४ टक्के आली आहे. कृपया एका आठवड्यात डॉक्टरांना भेटून औषध बदलून घ्या.",
      ml: "നിങ്ങളുടെ മൂന്ന് മാസത്തെ ശരാശരി ഷുഗർ ഒമ്പത് പോയിന്റ് നാല് ശതമാനമാണ്. ഒരാഴ്ചയ്ക്കകം ഡോക്ടറെ കണ്ട് മരുന്ന് മാറ്റുക."
    },
    actionItems: {
      en: [
        { text: 'Book an appointment with your physician or diabetologist within 7 days', priority: 'High Priority', done: false },
        { text: 'Carry this report and your current medicine strips to the clinic', priority: 'Preparation', done: false },
        { text: 'Do not stop taking any existing medicine abruptly before seeing your doctor', priority: 'Safety Rule', done: false },
        { text: 'Drink adequate water and monitor fasting blood sugar once this weekend', priority: 'Monitoring', done: false }
      ],
      ta: [
        { text: '7 நாட்களுக்குள் உங்கள் சர்க்கரை நோய் மருத்துவரிடம் நேரடி முன்பதிவு செய்யவும்', priority: 'அதிமுக்கியம்', done: false },
        { text: 'இந்த ஆய்வறிக்கையையும் தற்போதைய மாத்திரை அட்டைகளையும் மருத்துவரிடம் எடுத்துச் செல்லவும்', priority: 'தயாராகுதல்', done: false },
        { text: 'மருத்துவரை ஆலோசிக்காமல் தற்போது சாப்பிடும் மாத்திரைகளை திடீரென நிறுத்த வேண்டாம்', priority: 'பாதுகாப்பு விதி', done: false },
        { text: 'போதுமான அளவு தண்ணீர் குடிக்கவும்; இந்த வார இறுதியில் வெறும் வயிற்று சர்க்கரையை அளவிடவும்', priority: 'கண்காணிப்பு', done: false }
      ],
      hi: [
        { text: 'अगले 7 दिनों के भीतर अपने डायबिटीज़ डॉक्टर से मिलने का समय लें', priority: 'उच्च प्राथमिकता', done: false },
        { text: 'यह रिपोर्ट और अपनी वर्तमान दवाइयों के पत्ते साथ लेकर जाएं', priority: 'तैयारी', done: false },
        { text: 'डॉक्टर से सलाह लिए बिना अपनी कोई भी मौजूदा दवा अचानक बंद न करें', priority: 'सुरक्षा नियम', done: false },
        { text: 'पर्याप्त पानी पिएं और इस सप्ताह के अंत में खाली पेट शुगर की जांच करें', priority: 'निगरानी', done: false }
      ],
      te: [
        { text: '7 రోజుల్లో మీ డయాబెటాలజిస్ట్ లేదా వైద్యుడిని సంప్రదించండి', priority: 'అధిక ప్రాధాన్యత', done: false },
        { text: 'ఈ రిపోర్టు మరియు మీరు వాడుతున్న మందుల స్ట్రిప్స్‌ను క్లినిక్‌కు తీసుకెళ్లండి', priority: 'సిద్ధత', done: false },
        { text: 'డాక్టర్‌ను సంప్రదించకుండా ప్రస్తుత మందులను అకస్మాత్తుగా ఆపవద్దు', priority: 'భద్రతా సూచన', done: false },
        { text: 'సరిపడా నీరు త్రాగండి మరియు ఈ వారాంతంలో ఖాళీ కడుపుతో షుగర్ పరీక్ష చేయించండి', priority: 'పర్యవేక్షణ', done: false }
      ],
      kn: [
        { text: '7 ದಿನಗಳ ಒಳಗೆ ನಿಮ್ಮ ಮಧುಮೇಹ ತಜ್ಞರನ್ನು ಅಥವಾ ವೈದ್ಯರನ್ನು ಭೇಟಿ ಮಾಡಿ', priority: 'ಹೆಚ್ಚಿನ ಆದ್ಯತೆ', done: false },
        { text: 'ಈ ವರದಿ ಮತ್ತು ಪ್ರಸ್ತುತ ಸೇವಿಸುತ್ತಿರುವ ಮಾತ್ರೆಗಳನ್ನು ಕ್ಲಿನಿಕ್‌ಗೆ ತೆಗೆದುಕೊಂಡು ಹೋಗಿ', priority: 'ಸಿದ್ಧತೆ', done: false },
        { text: 'ವೈದ್ಯರ ಸಲಹೆಯಿಲ್ಲದೆ ಯಾವುದೇ ಔಷಧಿಯನ್ನು ದಿಢೀರನೆ ನಿಲ್ಲಿಸಬೇಡಿ', priority: 'ಸುರಕ್ಷತಾ ನಿಯಮ', done: false },
        { text: 'ಸಾಕಷ್ಟು ನೀರು ಕುಡಿಯಿರಿ ಮತ್ತು ವಾರಾಂತ್ಯದಲ್ಲಿ ಖಾಲಿ ಹೊಟ್ಟೆಯ ಸಕ್ಕರೆ ಪರೀಕ್ಷಿಸಿ', priority: 'ಮೇಲ್ವಿಚಾರಣೆ', done: false }
      ],
      bn: [
        { text: '৭ দিনের মধ্যে আপনার চিকিৎসকের সাথে পরামর্শ করার অ্যাপয়েন্টমেন্ট নিন', priority: 'উচ্চ অগ্রাধিকার', done: false },
        { text: 'এই রিপোর্ট এবং বর্তমান ওষুধের পাতাগুলি ক্লিনিকে সাথে নিয়ে যান', priority: 'প্রস্তুতি', done: false },
        { text: 'ডাক্তারের পরামর্শ ছাড়া বর্তমান কোনো ওষুধ হঠাৎ বন্ধ করবেন না', priority: 'সুরক্ষা নিয়ম', done: false },
        { text: 'পর্যাপ্ত জল পান করুন এবং এই সপ্তাহে একবার খালি পেটে সুগার মাপুন', priority: 'নজরদারি', done: false }
      ],
      mr: [
        { text: '७ दिवसांच्या आत डॉक्टरांची किंवा मधुमेह तज्ज्ञांची भेट घ्या', priority: 'उच्च प्राधान्य', done: false },
        { text: 'हा अहवाल आणि चालू औषधांची पाकिटे सोबत घेऊन जा', priority: 'तयारी', done: false },
        { text: 'डॉक्टरांच्या सल्ल्याशिवाय कोणतीही चालू औषधे अचानक थांबवू नका', priority: 'सुरक्षा नियम', done: false },
        { text: 'पुरेसे पाणी प्या आणि या शनिवार-रविवार उपाशीपोटी साखर तपासा', priority: 'देखरेख', done: false }
      ],
      ml: [
        { text: '7 ദിവസത്തിനകം നിങ്ങളുടെ ഡോക്ടറുമായി കൺസൾട്ടേഷൻ നടത്തുക', priority: 'പ്രധാനപ്പെട്ടത്', done: false },
        { text: 'ഈ റിപ്പോർട്ടും ഇപ്പോൾ കഴിക്കുന്ന ഗുളികകളും ഒപ്പം കരുതുക', priority: 'തയ്യാറെടുപ്പ്', done: false },
        { text: 'ഡോക്ടറുടെ നിർദ്ദേശമില്ലാതെ മരുന്നുകൾ പെട്ടെന്ന് നിർത്തരുത്', priority: 'സുരക്ഷാ നിയമം', done: false },
        { text: 'ധാരാളം വെള്ളം കുടിക്കുകയും ഈ വാരാന്ത്യത്തിൽ രക്തത്തിലെ ഷുഗർ അളക്കുകയും ചെയ്യുക', priority: 'നിരീക്ഷണം', done: false }
      ]
    },
    groundedRule: {
      en: 'Grounded in ICMR Type-2 Diabetes Guidelines (Section 4: Microvascular Screenings)',
      ta: 'ICMR வகை-2 நீரிழிவு வழிகாட்டுதல்கள் (பிரிவு 4: நுண் ரத்தக்குழாய் பரிசோதனை) அடிப்படையில் சரிபார்க்கப்பட்டது',
      hi: 'ICMR टाइप-2 डायबिटीज़ दिशानिर्देश (धारा 4: माइक्रोवैस्कुलर स्क्रीनिंग) पर आधारित',
      te: 'ICMR టైప్-2 డయాబెటిస్ మార్గదర్శకాలు (సెక్షన్ 4: మైక్రోవాస్కులర్ స్క్రీనింగ్) ఆధారంగా ధృవీకరించబడింది',
      kn: 'ICMR ಟೈಪ್-2 ಮಧುಮೇಹ ಮಾರ್ಗಸೂಚಿಗಳು (ವಿಭಾಗ 4: ಮೈಕ್ರೋವಾಸ್ಕುಲರ್ ತಪಾಸಣೆ) ಆಧರಿಸಿದೆ',
      bn: 'আইসিএমআর টাইপ-২ ডায়াবেটিস নির্দেশিকা (অনুচ্ছেদ ৪: মাইক্রোভাস্কুলার স্ক্রিনিং) ভিত্তিক',
      mr: 'ICMR टाइप-२ मधुमेह मार्गदर्शक तत्त्वे (कलम ४: मायक्रोव्हॅस्कुलर तपासणी) वर आधारित',
      ml: 'ICMR ടൈപ്പ്-2 ഡയബറ്റിസ് മാർഗ്ഗനിർദ്ദേശങ്ങൾ (വിഭാഗം 4: മൈക്രോവാസ്കുലർ സ്ക്രീനിംഗ്) പ്രകാരം'
    }
  },
  {
    id: 'rx-order',
    title: 'Post-Consultation Prescription',
    badge: 'Doctor Prescription',
    date: '25 Sept 2024',
    issuingAuthority: 'City Care Multispeciality Hospital — Dept of Internal Medicine',
    refNumber: 'RX/2024/7821-MD',
    rawExcerpt: `Rx:
1. Tab Metformin HCl 500 mg — PO BID ac (x 30 days)
2. Tab Atorvastatin Calcium 20 mg — PO qhs (x 30 days)
3. Tab Telmisartan 40 mg — PO OD mane (x 30 days)
4. Tab Sorbitrate 5 mg — Sublingual SOS only for acute retrosternal distress
Adv: Strict diabetic diet, low sodium intake (<2g/d). Review with fresh FBS/PPBS & lipid profile in 4 wks.`,
    stamps: ['PHARMACEUTICAL SHORTHAND', 'TIMING RESTRICTIONS', 'SOS RESCUE'],
    simplified: {
      en: `The doctor prescribed 3 regular daily medications for blood sugar, cholesterol, and blood pressure, plus 1 emergency rescue tablet:

1. Metformin 500mg: Take 2 times a day, 15 minutes before breakfast and dinner.
2. Atorvastatin 20mg: Take 1 tablet every night right before sleep.
3. Telmisartan 40mg: Take 1 tablet every morning with water.
4. Sorbitrate 5mg: Emergency only — place under the tongue if you experience sudden chest tightness.`,
      ta: `மருத்துவர் சர்க்கரை, கொலஸ்ட்ரால், ரத்த அழுத்தத்திற்கான 3 தினசரி மாத்திரைகளையும், 1 அவசர மாத்திரையையும் பரிந்துரைத்துள்ளார்:

1. மெட்ஃபோர்மின் (Metformin): தினமும் 2 வேளை, காலை மற்றும் இரவு உணவுக்கு 15 நிமிடங்களுக்கு முன் சாப்பிடவும்.
2. அடோர்வாஸ்டாடின் (Atorvastatin): தினமும் இரவு தூங்குவதற்கு முன் 1 மாத்திரை.
3. டெல்மிசார்டன் (Telmisartan): தினமும் காலை எழுந்தவுடன் 1 மாத்திரை.
4. சர்பிட்ரேட் (Sorbitrate): நெஞ்சு வலி அல்லது அடைப்பு ஏற்பட்டால் மட்டும் அவசரத்திற்கு நாக்கின் அடியில் வைக்கவும்.`,
      hi: `डॉक्टर ने आपके लिए शुगर, कोलेस्ट्रॉल और बीपी की 3 नियमित दवाएं और सीने में दर्द की 1 आपातकालीन दवा लिखी है:

1. मेटफॉर्मिन (Metformin): दिन में 2 बार, सुबह और रात के भोजन से 15 मिनट पहले लें।
2. एटोरवास्टेटिन (Atorvastatin): रोज रात को सोने से ठीक पहले 1 गोली लें।
3. टेल्मीसार्टन (Telmisartan): रोज सुबह 1 गोली पानी के साथ लें।
4. सोरबिट्रेट (Sorbitrate): केवल आपात स्थिति में — यदि सीने में तेज दबाव या दर्द हो, तो जीभ के नीचे रखें।`,
      te: `డాక్టర్ షుగర్, కొలెస్ట్రాల్ మరియు బీపీ కోసం 3 సాధారణ మందులను, అలాగే 1 అత్యవసర మాత్రను రాశారు:

1. మెట్‌ఫార్మిన్: రోజుకు 2 సార్లు, ఉదయం మరియు రాత్రి భోజనానికి 15 నిమిషాల ముందు వేసుకోవాలి.
2. అటోర్వాస్టాటిన్: ప్రతి రాత్రి నిద్రపోయే ముందు 1 మాత్ర వేసుకోవాలి.
3. టెల్మిసార్టన్: ప్రతి ఉదయం 1 మాత్ర వేసుకోవాలి.
4. సార్బిట్రేట్: ఛాతీలో తీవ్ర నొప్పి లేదా అసౌకర్యం ఉంటే మాత్రమే నాలుక కింద ఉంచాలి.`,
      kn: `ವೈದ್ಯರು ಶುಗರ್, ಕೊಲೆಸ್ಟ್ರಾಲ್ ಮತ್ತು ಬಿಪಿಗಾಗಿ 3 ದಿನನಿತ್ಯದ ಮಾತ್ರೆಗಳನ್ನು ಮತ್ತು 1 ತುರ್ತು ಮಾತ್ರೆಯನ್ನು ಸೂಚಿಸಿದ್ದಾರೆ:

1. ಮೆಟ್‌ಫಾರ್ಮಿನ್: ದಿನಕ್ಕೆ 2 ಬಾರಿ, ಉಪಾಹಾರ ಮತ್ತು ರಾತ್ರಿಯ ಊಟಕ್ಕೆ 15 ನಿಮಿಷಗಳ ಮೊದಲು.
2. ಅಟೋರ್ವಾಸ್ಟಾಟಿನ್: ಪ್ರತಿದಿನ ರಾತ್ರಿ ಮಲಗುವ ಮುನ್ನ 1 ಮಾತ್ರೆ.
3. ಟೆಲ್ಮಿಸಾರ್ಟನ್: ಪ್ರತಿದಿನ ಬೆಳಗ್ಗೆ 1 ಮಾತ್ರೆ.
4. ಸಾರ್ಬಿಟ್ರೇಟ್: ಎದೆ ನೋವು ಅಥವಾ ಉಸಿರಾಟದ ತೊಂದರೆ ಉಂಟಾದರೆ ಮಾತ್ರ ನಾಲಿಗೆಯ ಕೆಳಗೆ ಇಟ್ಟುಕೊಳ್ಳಬೇಕು.`,
      bn: `ডাক্তারবাবু সুগার, কোলেস্টেরল এবং রক্তচাপের ৩টি নিয়মিত ওষুধ এবং ১টি জরুরি ওষুধ লিখেছেন:

১. মেটফর্মিন: দিনে ২ বার, সকাল এবং রাতের খাবারের ১৫ মিনিট আগে খাবেন।
২. অ্যাটোরভাস্ট্যাটিন: রোজ রাতে ঘুমাতে যাওয়ার আগে ১টি করে।
৩. টেলমিসারটান: রোজ সকালে ১টি করে।
৪. সরবিট্রেট: শুধু জরুরি অবস্থায় — বুকে টান বা তীব্র অস্বস্তি হলে জিভের তলায় রাখবেন।`,
      mr: `डॉक्टरांनी साखर, कोलेस्टेरॉल आणि रक्तदाबासाठी ३ नियमित औषधे आणि १ आपत्कालीन गोळी दिली आहे:

१. मेटफॉर्मिन: दिवसातून २ वेळा, सकाळ-संध्याकाळ जेवणापूर्वी १५ मिनिटे.
२. एटोरव्हास्टॅटिन: दररोज रात्री झोपण्यापूर्वी १ गोळी.
३. टेल्मीसार्टन: दररोज सकाळी १ गोळी.
४. सॉर्बिट्रेट: छातीत दुखल्यास किंवा अचानक अस्वस्थ वाटल्यास जिभेखाली ठेवायची गोळी.`,
      ml: `ഡോക്ടർ പഞ്ചസാര, കൊളസ്ട്രോൾ, പ്രഷർ എന്നിവയ്ക്കായി 3 നിത്യേനയുള്ള ഗുളികകളും ഒരു എമർജൻസി ഗുളികയും നിർദ്ദേശിച്ചിട്ടുണ്ട്:

1. മെറ്റ്ഫോർമിൻ: ദിവസവും 2 നേരം, ഭക്ഷണത്തിന് 15 മിനിറ്റ് മുൻപ്.
2. അറ്റോർവാസ്റ്റാറ്റിൻ: എല്ലാ ദിവസവും രാത്രി ഉറങ്ങുന്നതിന് മുൻപ് 1 ഗുളിക.
3. ടെൽമിസാർട്ടൻ: ദിവസവും രാവിലെ 1 ഗുളിക.
4. സോർബിട്രേറ്റ്: നെഞ്ചുവേദന ഉണ്ടായാൽ മാത്രം നാക്കിനടിയിൽ വെക്കാനുള്ള ഗുളിക.`,
    },
    audioText: {
      en: "You have three daily medicines: Metformin twice a day before meals, Atorvastatin at bedtime, and Telmisartan every morning. Sorbitrate is only for emergency chest pain placed under your tongue.",
      ta: "உங்களுக்கு மூன்று தினசரி மாத்திரைகள்: உணவுக்கு முன் மெட்ஃபோர்மின், இரவில் அடோர்வாஸ்டாடின், காலையில் டெல்மிசார்டன். சர்பிட்ரேட் நெஞ்சு வலி வந்தால் மட்டும் நாக்கின் அடியில் வைக்க வேண்டிய மாத்திரை.",
      hi: "आपकी तीन दैनिक दवाएं हैं: खाने से पहले मेटफॉर्मिन, रात में एटोरवास्टेटिन, और सुबह टेल्मीसार्टन। सोरबिट्रेट केवल सीने में दर्द होने पर जीभ के नीचे रखने के लिए है।",
      te: "మీకు మూడు రోజువారీ మందులు ఉన్నాయి: భోజనానికి ముందు మెట్‌ఫార్మిన్, రాత్రి అటోర్వాస్టాటిన్, ఉదయం టెల్మిసార్టన్. సార్బిట్రేట్ ఛాతీ నొప్పికి మాత్రమే.",
      kn: "ನಿಮಗೆ ಮೂರು ದಿನನಿತ್ಯದ ಮಾತ್ರೆಗಳು: ಊಟಕ್ಕೆ ಮುನ್ನ ಮೆಟ್‌ಫಾರ್ಮಿನ್, ರಾತ್ರಿ ಅಟೋರ್ವಾಸ್ಟಾಟಿನ್, ಬೆಳಗ್ಗೆ ಟೆಲ್ಮಿಸಾರ್ಟನ್.",
      bn: "আপনার ৩টি নিয়মিত ওষুধ: খাওয়ার আগে মেটফর্মিন, রাতে অ্যাটোরভাস্ট্যাটিন, সকালে টেলমিসারটান। সরবিট্রেট কেবল জরুরি বুকে ব্যথায় জিভের তলায় দেবেন।",
      mr: "तुमची तीन नियमित औषधे आहेत: जेवणापूर्वी मेटफॉर्मिन, रात्री एटोरव्हास्टॅटिन, सकाळी टेल्मीसार्टन. सॉर्बिट्रेट फक्त छातीत दुखल्यास जिभेखाली ठेवावी.",
      ml: "നിങ്ങൾക്ക് 3 ദിവസേനയുള്ള ഗുളികകളുണ്ട്: ഭക്ഷണത്തിന് മുൻപ് മെറ്റ്ഫോർമിൻ, രാത്രി അറ്റോർവാസ്റ്റാറ്റിൻ, രാവിലെ ടെൽമിസാർട്ടൻ."
    },
    actionItems: {
      en: [
        { text: 'Never take Metformin on an empty stomach without eating within 20 minutes', priority: 'Safety Instruction', done: false },
        { text: 'Keep Sorbitrate tablet in an easy-to-reach pocket or purse at all times', priority: 'Emergency Preparedness', done: false },
        { text: 'Buy a 30-day supply and ask pharmacist to label morning vs night clearly', priority: 'Adherence', done: false },
        { text: 'Do fresh fasting and post-meal sugar tests in 4 weeks before the doctor review', priority: 'Follow-up Test', done: false }
      ],
      ta: [
        { text: 'உணவு அருந்தாமல் வெறும் வயிற்றில் மெட்ஃபோர்மின் மாத்திரையை உட்கொள்ளக் கூடாது', priority: 'பாதுகாப்பு நெறிமுறை', done: false },
        { text: 'சர்பிட்ரேட் அவசர மாத்திரையை எப்போதும் எளிதில் எடுக்கும் வகையில் சட்டைப் பையில் வைக்கவும்', priority: 'அவசரகால தயார்நிலை', done: false },
        { text: '30 நாட்களுக்கான மருந்துகளை வாங்கி, காலை-இரவு மாத்திரைகளைத் தெளிவாகக் குறிப்பிடச் சொல்லவும்', priority: 'மருந்து மேலாண்மை', done: false },
        { text: '4 வாரங்களில் மீண்டும் ரத்த சர்க்கரை பரிசோதனை செய்து மருத்துவரைச் சந்திக்கவும்', priority: 'தொடர் பரிசோதனை', done: false }
      ],
      hi: [
        { text: 'मेटफॉर्मिन दवा कभी भी खाली पेट न लें, 20 मिनट के भीतर भोजन अवश्य करें', priority: 'सुरक्षा निर्देश', done: false },
        { text: 'सोरबिट्रेट आपातकालीन गोली को हमेशा अपनी जेब या पर्स में आसानी से मिलने वाली जगह रखें', priority: 'आपातकालीन तैयारी', done: false },
        { text: '30 दिनों की दवा खरीदें और फार्मासिस्ट से सुबह-शाम का लेबल स्पष्ट लगवाएं', priority: 'दवा का नियमित सेवन', done: false },
        { text: '4 सप्ताह बाद डॉक्टर को दिखाने से पहले खाली पेट और खाने के बाद शुगर की जांच कराएं', priority: 'फॉलो-अप टेस्ट', done: false }
      ],
      te: [
        { text: 'మెట్‌ఫార్మిన్ మందును ఖాళీ కడుపుతో తీసుకోకూడదు, 20 నిమిషాల్లో ఆహారం తీసుకోవాలి', priority: 'భద్రతా నియమం', done: false },
        { text: 'సార్బిట్రేట్ అత్యవసర మాత్రను ఎల్లప్పుడూ సులభంగా అందుబాటులో ఉండే జేబులో ఉంచుకోండి', priority: 'అత్యవసర సంసిద్ధత', done: false },
        { text: '30 రోజుల మందులు కొని, ఉదయం-రాత్రి వేళలను స్పష్టంగా రాయించుకోండి', priority: 'ఔషధ క్రమశిక్షణ', done: false },
        { text: '4 వారాల్లో మళ్ళీ ఫాస్టింగ్ మరియు తిన్న తర్వాత షుగర్ పరీక్ష చేయించి డాక్టర్‌ను కలవండి', priority: 'తదుపరి పరీక్ష', done: false }
      ],
      kn: [
        { text: 'ಮೆಟ್‌ಫಾರ್ಮಿನ್ ಮಾತ್ರೆಯನ್ನು ಖಾಲಿ ಹೊಟ್ಟೆಯಲ್ಲಿ ತೆಗೆದುಕೊಳ್ಳಬೇಡಿ, 20 ನಿಮಿಷಗಳಲ್ಲಿ ಊಟ ಮಾಡಿ', priority: 'ಸುರಕ್ಷತಾ ಸೂಚನೆ', done: false },
        { text: 'ಸಾರ್ಬಿಟ್ರೇಟ್ ತುರ್ತು ಮಾತ್ರೆಯನ್ನು ಯಾವಾಗಲೂ ಸುಲಭವಾಗಿ ಸಿಗುವ ಜೇಬಿನಲ್ಲಿ ಇಟ್ಟುಕೊಳ್ಳಿ', priority: 'ತುರ್ತು ಸಿದ್ಧತೆ', done: false },
        { text: '30 ದಿನಗಳ ಔಷಧಿ ಪಡೆದು ಬೆಳಗ್ಗೆ ಮತ್ತು ರಾತ್ರಿಯ ಸೂಚನೆಯನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ನಮೂದಿಸಿಕೊಳ್ಳಿ', priority: 'ಔಷಧ ಪಾಲನೆ', done: false },
        { text: '4 ವಾರಗಳ ನಂತರ ಮತ್ತೆ ರಕ್ತದ ಸಕ್ಕರೆ ಪರೀಕ್ಷೆ ಮಾಡಿಸಿ ವೈದ್ಯರನ್ನು ಭೇಟಿ ಮಾಡಿ', priority: 'ಮುಂದಿನ ತಪಾಸಣೆ', done: false }
      ],
      bn: [
        { text: 'মেটফর্মিন কখনো সম্পূর্ণ খালি পেটে খাবেন না, খাওয়ার ২০ মিনিটের মধ্যে খাবার গ্রহণ করুন', priority: 'সুরক্ষা নির্দেশ', done: false },
        { text: 'জরুরি সরবিট্রেট ট্যাবলেট সবসময় হাতের কাছে পকেটে বা ব্যাগে রাখুন', priority: 'জরুরি প্রস্তুতি', done: false },
        { text: '৩০ দিনের ওষুধ কিনুন এবং ফার্মাসিস্টের থেকে সকাল ও রাতের নিয়ম স্পষ্টভাবে জেনে নিন', priority: 'ওষুধের নিয়ম', done: false },
        { text: '৪ সপ্তাহ পরে ডাক্তার দেখানোর আগে ফাস্টিং ও খাবারের পরের সুগার পরীক্ষা করান', priority: 'পরবর্তী পরীক্ষা', done: false }
      ],
      mr: [
        { text: 'मेटफॉर्मिन उपाशीपोटी घेऊ नका, औषध घेतल्यानंतर २० मिनिटांत जेवण करा', priority: 'सुरक्षा सूचना', done: false },
        { text: 'सॉर्बिट्रेट ही आपत्कालीन गोळी नेहमी जवळ सहज उपलब्ध राहील अशा खिशात ठेवा', priority: 'आपत्कालीन तयारी', done: false },
        { text: '३० दिवसांची औषधे घ्या आणि सकाळ-रात्रीच्या वेळा स्पष्ट लिहून घ्या', priority: 'नियमितता', done: false },
        { text: '४ आठवड्यांनी डॉक्टरांना भेटण्यापूर्वी रक्तातील साखरेची चाचणी करून घ्या', priority: 'पुढील तपासणी', done: false }
      ],
      ml: [
        { text: 'മെറ്റ്ഫോർമിൻ വെറും വയറ്റിൽ കഴിക്കരുത്, 20 മിനിറ്റിനകം ഭക്ഷണം കഴിക്കണം', priority: 'സുരക്ഷാ നിർദ്ദേശം', done: false },
        { text: 'സോർബിട്രേറ്റ് എമർജൻസി ഗുളിക എപ്പോഴും പോക്കറ്റിൽ കരുതുക', priority: 'അടിയന്തിര തയ്യാറെടുപ്പ്', done: false },
        { text: '30 ദിവസത്തെ മരുന്ന് വാങ്ങി രാവിലേയും രാത്രിയും കൃത്യമായി ലേബൽ ചെയ്യുക', priority: 'മരുന്ന് പാലനം', done: false },
        { text: '4 ആഴ്ചയ്ക്ക് ശേഷം ഷുഗർ പരിശോധന നടത്തി ഡോക്ടറെ വീണ്ടും കാണുക', priority: 'തുടർ പരിശോധന', done: false }
      ]
    },
    groundedRule: {
      en: 'Grounded in National Essential Medicines Formulary & AHA Dosing Guidelines',
      ta: 'தேசிய அத்தியாவசிய மருந்துகள் வழிகாட்டி & AHA மருந்தளவு நெறிமுறைகள் அடிப்படையில் சரிபார்க்கப்பட்டது',
      hi: 'राष्ट्रीय आवश्यक दवा नियमावली और AHA खुराक दिशानिर्देशों पर आधारित',
      te: 'నేషనల్ ఎస్సెన్షియల్ మెడిసిన్స్ ఫార్ములరీ & AHA డోసింగ్ నిబంధనల ఆధారంగా ధృవీకరించబడింది',
      kn: 'ರಾಷ್ಟ್ರೀಯ ಅಗತ್ಯ ಔಷಧಿಗಳ ಕೈಪಿಡಿ ಮತ್ತು AHA ಡೋಸಿಂಗ್ ಮಾರ್ಗಸೂಚಿಗಳು ಆಧರಿಸಿದೆ',
      bn: 'জাতীয় প্রয়োজনীয় ওষুধ নির্দেশিকা ও এএইচএ ডোজ নির্দেশিকা ভিত্তিক',
      mr: 'राष्ट्रीय अत्यावश्यक औषधे नियमावली आणि AHA डोसिंग मार्गदर्शक तत्त्वांवर आधारित',
      ml: 'നാഷണൽ എസെൻഷ്യൽ മെഡിസിൻസ് ഫോർമുലറിയും AHA ഡോസിംഗ് മാർഗ്ഗനിർദ്ദേശങ്ങളും പ്രകാരം'
    }
  }
];

// Helper to retrieve completely localized document content for the active language
export function getLocalizedDocumentContent(doc, langCode) {
  if (!doc) return null;
  const lang = doc.simplified[langCode] ? langCode : 'en';
  return {
    simplified: doc.simplified[lang] || doc.simplified['en'],
    audioText: doc.audioText[lang] || doc.audioText['en'],
    actionItems: doc.actionItems[lang] || doc.actionItems['en'] || [],
    groundedRule: doc.groundedRule[lang] || doc.groundedRule['en'] || ''
  };
}

// Generate the complete speech script combining the plain explanation AND all action checklist tasks
export function getFullSpokenScript(doc, langCode) {
  if (!doc) return '';
  const lang = doc.simplified && doc.simplified[langCode] ? langCode : 'en';
  const explanation = doc.audioText?.[lang] || doc.simplified?.[lang] || doc.simplified?.['en'] || '';
  const actionItems = doc.actionItems?.[lang] || doc.actionItems?.['en'] || [];

  const introMap = {
    en: "Here are the next steps to take.",
    ta: "அடுத்து செய்ய வேண்டிய முக்கிய பணிகள்.",
    hi: "आगे करने योग्य आवश्यक कार्य.",
    te: "తర్వాత చేయవలసిన ముఖ్యమైన పనులు.",
    kn: "ಮುಂದೆ ಮಾಡಬೇಕಾದ ಪ್ರಮುಖ ಕೆಲಸಗಳು.",
    bn: "পরবর্তী করণীয় গুরুত্বপূর্ণ কাজগুলি.",
    mr: "पुढे करावयाची महत्त्वाची कामे.",
    ml: "അടുത്തതായി ചെയ്യേണ്ട പ്രധാന കാര്യങ്ങൾ."
  };

  const itemPrefixMap = {
    en: "Step",
    ta: "பணி",
    hi: "कदम",
    te: "పని",
    kn: "ಹಂತ",
    bn: "পদক্ষেপ",
    mr: "टप्पा",
    ml: "പടി"
  };

  const intro = introMap[lang] || introMap.en;
  const prefix = itemPrefixMap[lang] || itemPrefixMap.en;

  const tasksText = actionItems
    .map((item, idx) => `${prefix} ${idx + 1}: ${item.text}.`)
    .join(' ');

  return `${explanation} ${intro} ${tasksText}`;
}

export function getTasksOnlySpokenScript(doc, langCode) {
  if (!doc) return '';
  const lang = doc.simplified && doc.simplified[langCode] ? langCode : 'en';
  const actionItems = doc.actionItems?.[lang] || doc.actionItems?.['en'] || [];

  const introMap = {
    en: "What to do next.",
    ta: "அடுத்து செய்ய வேண்டிய பணிகள்.",
    hi: "आगे क्या करना है.",
    te: "తర్వాత చేయవలసిన పనులు.",
    kn: "ಮುಂದೆ ಏನು ಮಾಡಬೇಕು.",
    bn: "পরবর্তী করণীয়.",
    mr: "पुढे काय करावे.",
    ml: "അടുത്തതായി ചെയ്യേണ്ട കാര്യങ്ങൾ."
  };

  const itemPrefixMap = {
    en: "Step",
    ta: "பணி",
    hi: "कदम",
    te: "పని",
    kn: "ಹಂತ",
    bn: "পদক্ষেপ",
    mr: "टप्पा",
    ml: "പടി"
  };

  const intro = introMap[lang] || introMap.en;
  const prefix = itemPrefixMap[lang] || itemPrefixMap.en;

  const tasksText = actionItems
    .map((item, idx) => `${prefix} ${idx + 1}: ${item.text}.`)
    .join(' ');

  return `${intro} ${tasksText}`;
}

export const TEAM_MEMBERS = [
  {
    name: 'Lingeswaran D',
    role: 'Team Lead & AI Architect',
    focus: 'Multimodal OCR pipelines, regional TTS synthesis, and prompt grounding',
    initials: 'LD'
  },
  {
    name: 'Lingesh R',
    role: 'Fullstack & Systems Engineer',
    focus: 'Document ingestion pipelines, OCR processing, and backend service integration',
    initials: 'LR'
  },
  {
    name: 'Krishniya K',
    role: 'Document Intelligence & RAG Engineer',
    focus: 'Legal clause extraction, medical ontology mapping, and rules retrieval engine',
    initials: 'KK'
  },
  {
    name: 'Kiruthik V',
    role: 'Frontend & Motion Specialist',
    focus: 'High-performance scroll interactions, paper ergonomics, and audio engine',
    initials: 'KV'
  },
  {
    name: 'Harsithaa P',
    role: 'Product & Accessibility Designer',
    focus: 'Low-literacy UX ergonomics, multilingual typography, and WCAG AA compliance',
    initials: 'HP'
  }
];

export const SOURCED_STATISTIC = {
  figure: '68%',
  text: 'of citizens in multilingual households struggle to comprehend official regulatory or medical documents in formal English.',
  impact: 'Resulting in over 4.2 million missed grievance deadlines, unmanaged chronic prescriptions, and costly dependence on predatory middlemen.',
  citation: 'Source: National Health Literacy Survey & UNESCO Multilingual Education Assessment'
};
