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
    actionItems: [
      { text: 'Pay the principal ₹14,250 before October 15 to waive the ₹2,850 penalty', priority: 'Urgent — Deadline Oct 15', done: false },
      { text: 'Pay online via municipal citizen portal or visit Ward 42-B counter in person', priority: 'Actionable', done: false },
      { text: 'Save your digital receipt with Assessment Ref #MC-TAX/2024-25/SEC148-88492', priority: 'Record Keeping', done: false },
      { text: 'No need to hire an intermediary or lawyer — this is a standard demand notice', priority: 'Advisory', done: false }
    ],
    groundedRule: 'Grounded in Municipal Act 1988 (Sec 148-B Amnesty Resolution #42/2024)'
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
    actionItems: [
      { text: 'Book an appointment with your physician or diabetologist within 7 days', priority: 'High Priority', done: false },
      { text: 'Carry this report and your current medicine strips to the clinic', priority: 'Preparation', done: false },
      { text: 'Do not stop taking any existing medicine abruptly before seeing your doctor', priority: 'Safety Rule', done: false },
      { text: 'Drink adequate water and monitor fasting blood sugar once this weekend', priority: 'Monitoring', done: false }
    ],
    groundedRule: 'Grounded in ICMR Type-2 Diabetes Guidelines (Section 4: Microvascular Screenings)'
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
    actionItems: [
      { text: 'Never take Metformin on an empty stomach without eating within 20 minutes', priority: 'Safety Instruction', done: false },
      { text: 'Keep Sorbitrate tablet in an easy-to-reach pocket or purse at all times', priority: 'Emergency Preparedness', done: false },
      { text: 'Buy a 30-day supply and ask pharmacist to label morning vs night clearly', priority: 'Adherence', done: false },
      { text: 'Do fresh fasting and post-meal sugar tests in 4 weeks before the doctor review', priority: 'Follow-up Test', done: false }
    ],
    groundedRule: 'Grounded in National Essential Medicines Formulary & AHA Dosing Guidelines'
  }
];

export const TEAM_MEMBERS = [
  {
    name: 'Lingeswaran',
    role: 'Lead AI & Fullstack Architect',
    focus: 'Multimodal OCR pipelines, regional TTS synthesis, and prompt grounding',
    initials: 'LK'
  },
  {
    name: 'Santhosh',
    role: 'Product & Accessibility Designer',
    focus: 'Low-literacy UX, editorial typography, and high-contrast ergonomics',
    initials: 'SK'
  },
  {
    name: 'Dharani',
    role: 'Document Intelligence Engineer',
    focus: 'Legal clause extraction, medical jargon ontology, and rules-retrieval engine',
    initials: 'DK'
  },
  {
    name: 'Kaviarasan',
    role: 'Frontend & Motion Specialist',
    focus: 'Scroll-driven micro-interactions, responsive paper physics, and audio player engine',
    initials: 'KK'
  }
];

export const SOURCED_STATISTIC = {
  figure: '68%',
  text: 'of citizens in multilingual households struggle to comprehend official regulatory or medical documents in formal English.',
  impact: 'Resulting in over 4.2 million missed grievance deadlines, unmanaged chronic prescriptions, and costly dependence on predatory middlemen.',
  citation: 'Source: National Health Literacy Survey & UNESCO Multilingual Education Assessment'
};
