import React, { useState, useEffect, useRef } from 'react';
import {
  Upload,
  Camera,
  Play,
  Pause,
  RotateCcw,
  Check,
  Share2,
  Download,
  AlertCircle,
  FileText,
  Volume2,
  CheckCircle2,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import {
  LANGUAGES,
  SAMPLE_DOCUMENTS,
  getTranslation,
  getLocalizedDocumentContent
} from '../data/mockData';

export default function TryHmmDemo({ initialDocId = 'gov-notice' }) {
  // Single source of truth for language selection
  const [selectedDocId, setSelectedDocId] = useState(initialDocId);
  const [customFile, setCustomFile] = useState(null);
  const [customFilePreview, setCustomFilePreview] = useState(null);
  const [selectedLang, setSelectedLang] = useState('ta'); // Tamil default for regional demo
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStepIndex, setProcessStepIndex] = useState(0);
  const [hasResult, setHasResult] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  // Audio Player State
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(18); // seconds
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const audioIntervalRef = useRef(null);

  // Checklist state for "What to do next"
  const [checkedItems, setCheckedItems] = useState({});

  // Helper to translate any static UI string based on single source of truth (selectedLang)
  const t = (key) => getTranslation(selectedLang, key);

  // Sync initialDocId if changed from parent
  useEffect(() => {
    if (initialDocId) {
      setSelectedDocId(initialDocId);
      setCustomFile(null);
      setCustomFilePreview(null);
      setHasResult(false);
      setHasError(false);
      stopAudio();
    }
  }, [initialDocId]);

  // Current active document data
  const currentDoc = SAMPLE_DOCUMENTS.find((d) => d.id === selectedDocId) || SAMPLE_DOCUMENTS[0];

  // Retrieve fully localized content (both explanation AND action items inherit selectedLang)
  const localizedContent = getLocalizedDocumentContent(currentDoc, selectedLang);
  const activeSimplifiedText = localizedContent?.simplified || '';
  const activeAudioText = localizedContent?.audioText || '';
  const activeActionItems = localizedContent?.actionItems || [];
  const activeGroundedRule = localizedContent?.groundedRule || '';

  // Micro-copy sequence for processing state (deliberate nod to the name Hmm)
  const MICRO_COPIES = ['Hmm...', '...thinking', '...almost there'];

  // Handle Drag & Drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      processUploadedFile(e.target.files[0]);
    }
  };

  const processUploadedFile = (file) => {
    setHasError(false);
    setHasResult(false);
    stopAudio();

    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(jpg|jpeg|png|webp|pdf)$/i)) {
      setHasError(true);
      setErrorMessage(
        "We can only read photos or PDFs of documents. Please upload a clear JPG, PNG, or PDF file."
      );
      return;
    }

    setCustomFile(file);
    setSelectedDocId('custom');

    // Create preview if image
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setCustomFilePreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setCustomFilePreview(null);
    }
  };

  // Submit and start processing
  const handleSimplifySubmit = (e) => {
    e?.preventDefault();
    if (!selectedDocId || !selectedLang) return;

    setIsProcessing(true);
    setHasResult(false);
    setHasError(false);
    stopAudio();
    setProcessStepIndex(0);

    // Micro-copy step 0: "Hmm..."
    const step1 = setTimeout(() => {
      setProcessStepIndex(1); // "...thinking"
    }, 900);

    // Micro-copy step 2: "...almost there"
    const step2 = setTimeout(() => {
      setProcessStepIndex(2);
    }, 1800);

    // Final resolution
    const step3 = setTimeout(() => {
      setIsProcessing(false);
      setHasResult(true);
      setCheckedItems({});
    }, 2700);

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
    };
  };

  // Trigger plain language error state demo
  const triggerErrorDemo = () => {
    stopAudio();
    setHasResult(false);
    setIsProcessing(true);
    setProcessStepIndex(0);
    setTimeout(() => {
      setIsProcessing(false);
      setHasError(true);
      setErrorMessage(
        "We couldn't clearly read the bottom half of this page because the photo is blurry or shadowed. Could you retake it with a bit more light so we don't guess any numbers?"
      );
    }, 1200);
  };

  // Audio Playback using Web Speech API + timer progress
  const togglePlayAudio = () => {
    if (isPlayingAudio) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  const startAudio = () => {
    stopAudio();

    const textToSpeak = activeAudioText || activeSimplifiedText;

    const langCodeMap = {
      ta: 'ta-IN',
      hi: 'hi-IN',
      te: 'te-IN',
      kn: 'kn-IN',
      bn: 'bn-IN',
      mr: 'mr-IN',
      ml: 'ml-IN',
      en: 'en-US'
    };

    const targetLangCode = langCodeMap[selectedLang] || 'en-US';

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = targetLangCode;
      utterance.rate = playbackRate;

      // Find best available regional voice
      const voices = window.speechSynthesis.getVoices();
      const matchedVoice = voices.find((v) => v.lang.startsWith(targetLangCode.split('-')[0]));
      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }

      utterance.onend = () => {
        stopAudio();
      };
      utterance.onerror = () => {
        // Fallback to simulated audio ticker
      };

      window.speechSynthesis.speak(utterance);
    }

    // Audio progress ticker
    setIsPlayingAudio(true);
    setAudioProgress(0);
    const duration = Math.max(12, Math.round(textToSpeak.length / 14));
    setAudioDuration(duration);

    const stepMs = 200;
    const increment = (stepMs / (duration * 1000)) * 100;

    audioIntervalRef.current = setInterval(() => {
      setAudioProgress((prev) => {
        if (prev >= 100) {
          stopAudio();
          return 0;
        }
        return prev + increment;
      });
    }, stepMs);
  };

  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (audioIntervalRef.current) {
      clearInterval(audioIntervalRef.current);
      audioIntervalRef.current = null;
    }
    setIsPlayingAudio(false);
    setAudioProgress(0);
  };

  // Toggle checklist items
  const toggleCheckItem = (index) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // WhatsApp sharing using localized content
  const handleShareWhatsApp = () => {
    const text = `*${t('plainExplanation')} (${currentDoc.title})*:\n\n${activeSimplifiedText}\n\n*${t(
      'whatToDoNext'
    )}*:\n${activeActionItems
      .map((item, i) => `${i + 1}. ${item.text}`)
      .join('\n')}\n\n${activeGroundedRule}\n\n— Hmm (Gear5coders)`;

    const encoded = encodeURIComponent(text);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  // Download summary using localized content
  const handleDownloadSummary = () => {
    const content = `==========================================================
HMM — ${t('plainExplanation').toUpperCase()}
${activeGroundedRule}
==========================================================

${currentDoc.title}
${currentDoc.issuingAuthority}
Ref: ${currentDoc.refNumber}
Language: ${LANGUAGES.find((l) => l.id === selectedLang)?.name || selectedLang} (${selectedLang})

----------------------------------------------------------
${t('plainExplanation').toUpperCase()}:
----------------------------------------------------------
${activeSimplifiedText}

----------------------------------------------------------
${t('whatToDoNext').toUpperCase()}:
----------------------------------------------------------
${activeActionItems.map((item, i) => `[ ] ${i + 1}. ${item.text} (${item.priority})`).join('\n')}

----------------------------------------------------------
CITATION:
${activeGroundedRule}
==========================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Hmm_Summary_${currentDoc.id}_${selectedLang}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="demo-section" id="try-hmm" aria-labelledby="demo-heading">
      <div className="container">
        {/* Section Header */}
        <div className="demo-header">
          <div className="section-kicker">
            <span>Live Interactive Demo</span>
          </div>
          <h2 id="demo-heading" className="demo-title">
            Try Hmm with a real document right now.
          </h2>
          <p className="demo-subtitle">
            Pick one of our sample documents below or upload your own notice, prescription, or lab report.
          </p>
        </div>

        {/* The Main Demo Widget Surface */}
        <div className="demo-surface paper-sheet">
          {/* Top Bar: Sample Document Quick Switcher */}
          <div className="demo-sample-bar">
            <span className="sample-bar-label">{t('samplePrompt')}</span>
            <div className="sample-bar-chips" role="radiogroup" aria-label="Sample Documents">
              {SAMPLE_DOCUMENTS.map((doc) => (
                <button
                  key={doc.id}
                  type="button"
                  role="radio"
                  aria-checked={selectedDocId === doc.id}
                  className={`sample-chip ${selectedDocId === doc.id ? 'sample-chip--active' : ''}`}
                  onClick={() => {
                    setSelectedDocId(doc.id);
                    setCustomFile(null);
                    setCustomFilePreview(null);
                    setHasResult(false);
                    setHasError(false);
                    stopAudio();
                  }}
                >
                  <FileText size={14} className="sample-chip-icon" />
                  <span>{doc.badge}</span>
                </button>
              ))}

              <button
                type="button"
                className="sample-chip sample-chip--ghost"
                onClick={triggerErrorDemo}
                title="Test how Hmm handles unreadable or blurry pages with human empathy"
              >
                <span>{t('demoErrorBtn')}</span>
              </button>
            </div>
          </div>

          {/* Two-Column Workspace: Left = Document Input, Right = Translation & Result */}
          <div className="demo-workspace">
            {/* Left Column: Upload / Document Preview */}
            <div className="demo-col demo-col--input">
              <div className="input-group-label">
                <span className="step-badge">1</span>
                <strong>{t('step1')}</strong>
              </div>

              {selectedDocId === 'custom' && customFile ? (
                /* Custom File Preview */
                <div className="uploaded-file-card paper-sheet">
                  <div className="uploaded-file-top">
                    <FileText size={20} className="file-icon" />
                    <div className="uploaded-file-info">
                      <strong className="file-name">{customFile.name}</strong>
                      <span className="file-size">
                        {(customFile.size / 1024).toFixed(1)} KB — {t('uploaded')}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="btn-change-file"
                      onClick={() => {
                        setCustomFile(null);
                        setCustomFilePreview(null);
                        setSelectedDocId('gov-notice');
                        setHasResult(false);
                      }}
                      title="Choose another document"
                    >
                      <RotateCcw size={14} />
                      <span>{t('change')}</span>
                    </button>
                  </div>

                  {customFilePreview && (
                    <div className="custom-preview-thumbnail">
                      <img src={customFilePreview} alt="Uploaded document preview" />
                    </div>
                  )}
                </div>
              ) : (
                /* Sample Document Active Card */
                <div className="selected-doc-card paper-sheet">
                  <div className="doc-card-badge-row">
                    <span className="doc-type-tag">{currentDoc.badge}</span>
                    <span className="doc-date-tag">{currentDoc.date}</span>
                    <span className="rubber-stamp">{currentDoc.stamps[0]}</span>
                  </div>

                  <h3 className="doc-card-heading">{currentDoc.title}</h3>
                  <div className="doc-card-authority">{currentDoc.issuingAuthority}</div>
                  <div className="doc-card-ref">Ref: {currentDoc.refNumber}</div>

                  <div className="doc-card-raw-snippet">
                    <div className="snippet-caption">{t('rawOcr')}</div>
                    <pre>{currentDoc.rawExcerpt}</pre>
                  </div>
                </div>
              )}

              {/* Drag & Drop Upload Zone + Mobile Camera Trigger */}
              <div
                className={`dropzone-box ${isDragOver ? 'dropzone-box--dragover' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="doc-file-upload"
                  className="visually-hidden"
                  accept="image/jpeg,image/png,image/webp,application/pdf"
                  onChange={handleFileInput}
                />
                <input
                  type="file"
                  id="doc-camera-capture"
                  className="visually-hidden"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileInput}
                />

                <div className="dropzone-content">
                  <div className="dropzone-icon-circle">
                    <Upload size={20} />
                  </div>
                  <div className="dropzone-text">
                    <label htmlFor="doc-file-upload" className="dropzone-label-link">
                      {t('uploadOwn')}
                    </label>
                    <span className="dropzone-sub">{t('dragDrop')}</span>
                  </div>

                  {/* Mobile Camera Button */}
                  <label htmlFor="doc-camera-capture" className="btn-camera-capture">
                    <Camera size={15} />
                    <span>{t('takePhoto')}</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Language Selection + Submit + Result Panel */}
            <div className="demo-col demo-col--output">
              <div className="input-group-label">
                <span className="step-badge">2</span>
                <strong>{t('step2')}</strong>
              </div>

              {/* Language Selector Chips */}
              <div className="language-chip-grid" role="radiogroup" aria-label="Select Language">
                {LANGUAGES.map((lang) => {
                  const isSelected = selectedLang === lang.id;
                  return (
                    <button
                      key={lang.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      className={`lang-pill ${isSelected ? 'lang-pill--active' : ''}`}
                      onClick={() => {
                        setSelectedLang(lang.id);
                        if (isPlayingAudio) stopAudio();
                      }}
                    >
                      <span className="lang-pill__native" style={{ fontFamily: `var(--font-${lang.id}, sans-serif)` }}>
                        {lang.native}
                      </span>
                      <span className="lang-pill__english">{lang.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Submit CTA Button */}
              <div className="demo-submit-bar">
                <button
                  type="button"
                  className="btn-clarity btn-clarity--full demo-submit-btn"
                  onClick={handleSimplifySubmit}
                  disabled={isProcessing || !selectedLang}
                >
                  <Sparkles size={18} />
                  <span>
                    {isProcessing ? t('simplifying') : t('simplifyBtn')}
                  </span>
                </button>
              </div>

              {/* STATE 1: Processing / Loading with rotating "Hmm..." micro-copy */}
              {isProcessing && (
                <div className="processing-state-panel paper-sheet" role="status" aria-live="polite">
                  <div className="scan-line-animation"></div>
                  <div className="processing-inner">
                    <div className="processing-spinner">
                      <RefreshCw size={26} className="spinner-icon animate-spin" />
                    </div>
                    <div className="processing-microcopy">
                      <span className="microcopy-headline">
                        {MICRO_COPIES[processStepIndex]}
                      </span>
                      <p className="microcopy-sub">
                        {processStepIndex === 0 && t('thinking0')}
                        {processStepIndex === 1 && t('thinking1')}
                        {processStepIndex === 2 && t('thinking2')}
                      </p>
                    </div>
                    <div className="processing-dots-bar">
                      <span className={`p-dot ${processStepIndex >= 0 ? 'p-dot--active' : ''}`}></span>
                      <span className={`p-dot ${processStepIndex >= 1 ? 'p-dot--active' : ''}`}></span>
                      <span className={`p-dot ${processStepIndex >= 2 ? 'p-dot--active' : ''}`}></span>
                    </div>
                  </div>
                </div>
              )}

              {/* STATE 2: Error State (Warm, Plain-Language, Zero Jargon) */}
              {hasError && !isProcessing && (
                <div className="error-state-panel paper-sheet" role="alert">
                  <div className="error-icon-wrap">
                    <AlertCircle size={24} className="error-icon" />
                  </div>
                  <div className="error-content">
                    <h4 className="error-title">{t('errorTitle')}</h4>
                    <p className="error-desc">{errorMessage}</p>
                    <div className="error-actions">
                      <button
                        type="button"
                        className="btn-ghost btn-sm"
                        onClick={() => {
                          setHasError(false);
                          setSelectedDocId('gov-notice');
                        }}
                      >
                        {t('resetSample')}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* STATE 3: The Results Panel */}
              {hasResult && !isProcessing && !hasError && (
                <div className="results-panel paper-sheet" id="demo-results">
                  {/* Result Header Strip */}
                  <div className="results-header">
                    <div className="results-header-title">
                      <span className="rubber-stamp">{t('clarityAchieved')}</span>
                      <h4>{t('plainExplanation')}</h4>
                    </div>
                    <span className="results-lang-tag">
                      {LANGUAGES.find((l) => l.id === selectedLang)?.native} (
                      {LANGUAGES.find((l) => l.id === selectedLang)?.name})
                    </span>
                  </div>

                  {/* Simplified Plain-Language Text Block */}
                  <div className="results-text-block">
                    <p className="results-body-text">{activeSimplifiedText}</p>
                  </div>

                  {/* Audio Player to Hear It Spoken */}
                  <div className="audio-player-card">
                    <div className="audio-player-controls">
                      <button
                        type="button"
                        className={`btn-play-pause ${isPlayingAudio ? 'btn-play-pause--playing' : ''}`}
                        onClick={togglePlayAudio}
                        aria-label={isPlayingAudio ? t('pauseAudio') : t('playAudio')}
                        title={isPlayingAudio ? t('pauseAudio') : t('playAudio')}
                      >
                        {isPlayingAudio ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
                      </button>

                      <div className="audio-progress-wrap">
                        <div className="audio-label-row">
                          <span className="audio-title">
                            <Volume2 size={14} />
                            {t('spokenIn')} {LANGUAGES.find((l) => l.id === selectedLang)?.name}
                          </span>
                          <span className="audio-timer">
                            {Math.round((audioProgress / 100) * audioDuration)}s / {audioDuration}s
                          </span>
                        </div>

                        {/* Scrub Bar (Compositor-friendly transform: scaleX) */}
                        <div
                          className="audio-scrub-bar"
                          role="progressbar"
                          aria-valuenow={Math.round(audioProgress)}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        >
                          <div
                            className="audio-scrub-fill"
                            style={{
                              transform: `scaleX(${audioProgress / 100})`,
                              transformOrigin: 'left'
                            }}
                          ></div>
                        </div>
                      </div>

                      {/* Playback speed toggle */}
                      <button
                        type="button"
                        className="btn-speed-toggle"
                        onClick={() => {
                          const nextRate = playbackRate === 1.0 ? 1.25 : playbackRate === 1.25 ? 0.8 : 1.0;
                          setPlaybackRate(nextRate);
                          if (isPlayingAudio) {
                            startAudio();
                          }
                        }}
                        title="Adjust speech rate"
                      >
                        {playbackRate}x
                      </button>
                    </div>
                  </div>

                  {/* "What to do next" Action Card (Clarity Gold Left Border) */}
                  <div className="action-card-container">
                    <div className="action-card-header">
                      <div className="action-card-kicker">
                        <CheckCircle2 size={16} className="action-kicker-icon" />
                        <span>{t('whatToDoNext')}</span>
                      </div>
                      <span className="action-card-sub">
                        {t('checklistHint')}
                      </span>
                    </div>

                    <div className="action-checklist" role="list">
                      {activeActionItems.map((item, idx) => {
                        const isDone = !!checkedItems[idx];
                        return (
                          <div
                            key={idx}
                            className={`checklist-item ${isDone ? 'checklist-item--checked' : ''}`}
                            onClick={() => toggleCheckItem(idx)}
                            role="checkbox"
                            aria-checked={isDone}
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === ' ' || e.key === 'Enter') {
                                e.preventDefault();
                                toggleCheckItem(idx);
                              }
                            }}
                          >
                            <div className="checklist-box">
                              {isDone && <Check size={14} className="check-mark" />}
                            </div>
                            <div className="checklist-text-wrap">
                              <span className="checklist-text">{item.text}</span>
                              <span className="checklist-priority-badge">{item.priority}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="action-card-grounding">
                      <span className="grounding-note">{activeGroundedRule}</span>
                    </div>
                  </div>

                  {/* Result Actions: Download & Share via WhatsApp */}
                  <div className="results-actions-bar">
                    <button
                      type="button"
                      className="btn-ghost btn-sm"
                      onClick={handleDownloadSummary}
                    >
                      <Download size={15} />
                      <span>{t('downloadSummary')}</span>
                    </button>

                    <button
                      type="button"
                      className="btn-ghost btn-sm btn-whatsapp"
                      onClick={handleShareWhatsApp}
                    >
                      <Share2 size={15} />
                      <span>{t('shareWhatsApp')}</span>
                    </button>

                    <button
                      type="button"
                      className="btn-ghost btn-sm"
                      onClick={() => {
                        setHasResult(false);
                        stopAudio();
                      }}
                    >
                      <RotateCcw size={15} />
                      <span>{t('newDocument')}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Initial Idle Hint */}
              {!hasResult && !isProcessing && !hasError && (
                <div className="demo-idle-hint paper-sheet">
                  <p>{t('idleHint')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
