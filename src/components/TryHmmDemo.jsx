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
  Sparkles,
  VolumeX
} from 'lucide-react';
import {
  LANGUAGES,
  SAMPLE_DOCUMENTS,
  getTranslation,
  getLocalizedDocumentContent,
  getFullSpokenScript,
  getTasksOnlySpokenScript
} from '../data/mockData';
import { API_ENDPOINTS } from '../config/api';

export default function TryHmmDemo({
  initialDocId = 'gov-notice',
  user = null,
  onRequireAuth = () => {},
  queuedFile = null,
  onClearQueuedFile = () => {}
}) {
  // Single source of truth for language selection
  const [selectedDocId, setSelectedDocId] = useState(initialDocId);
  const [customFile, setCustomFile] = useState(null);
  const [customFilePreview, setCustomFilePreview] = useState(null);
  const [selectedLang, setSelectedLang] = useState('en'); // Default to English as requested
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStepIndex, setProcessStepIndex] = useState(0);
  const [hasResult, setHasResult] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  // Backend Integration State (OCR + LLM + RAG + TTS proxy)
  const [backendStatus, setBackendStatus] = useState({ online: false, checking: true });
  const [liveResult, setLiveResult] = useState(null);
  const [cloudAudioBase64, setCloudAudioBase64] = useState(null);
  const htmlAudioRef = useRef(null);

  // Audio Player State
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioMode, setAudioMode] = useState('full'); // 'full' | 'tasks' | 'single'
  const [activeSpeakingTaskId, setActiveSpeakingTaskId] = useState(null);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(25); // seconds
  const [playbackRate, setPlaybackRate] = useState(1.0);

  // Refs for Chunked Speech Synthesis (Prevents premature timer cancellation & Chrome 15s freeze)
  const audioChunksRef = useRef([]);
  const activeChunkIndexRef = useRef(0);
  const isAudioCancelledRef = useRef(false);
  const keepAliveIntervalRef = useRef(null);
  const audioProgressIntervalRef = useRef(null);

  // Checklist state for "What to do next"
  const [checkedItems, setCheckedItems] = useState({});

  // Stop all speech synthesis and HTML5 audio cleanly
  const stopAudio = () => {
    isAudioCancelledRef.current = true;
    if (htmlAudioRef.current) {
      htmlAudioRef.current.pause();
      htmlAudioRef.current = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (keepAliveIntervalRef.current) {
      clearInterval(keepAliveIntervalRef.current);
      keepAliveIntervalRef.current = null;
    }
    if (audioProgressIntervalRef.current) {
      clearInterval(audioProgressIntervalRef.current);
      audioProgressIntervalRef.current = null;
    }
    setIsPlayingAudio(false);
    setAudioProgress(0);
    setActiveSpeakingTaskId(null);
    setAudioMode('full');
  };

  // Check backend server status on mount
  useEffect(() => {
    fetch(API_ENDPOINTS.HEALTH)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'online') {
          setBackendStatus({ online: true, checking: false, data });
        } else {
          setBackendStatus({ online: false, checking: false });
        }
      })
      .catch(() => setBackendStatus({ online: false, checking: false }));
  }, []);

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
      setLiveResult(null);
      setCloudAudioBase64(null);
      stopAudio();
    }
  }, [initialDocId]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  // Current active document data
  const currentDoc = SAMPLE_DOCUMENTS.find((d) => d.id === selectedDocId) || SAMPLE_DOCUMENTS[0];

  // Retrieve fully localized content (both explanation AND action items inherit selectedLang or live backend)
  const localizedContent = getLocalizedDocumentContent(currentDoc, selectedLang);
  const isLiveResultForCurrentLang = liveResult && liveResult.language === selectedLang;

  const activeSimplifiedText = isLiveResultForCurrentLang
    ? liveResult.summary
    : (localizedContent?.simplified || '');

  const activeActionItems = isLiveResultForCurrentLang && liveResult?.nextSteps
    ? liveResult.nextSteps.map((step, idx) => ({
        text: typeof step === 'string' ? step : (step.text || ''),
        priority: idx === 0 ? 'Urgent / Priority' : 'Actionable',
        done: false
      }))
    : (localizedContent?.actionItems || []);

  const activeGroundedRule = isLiveResultForCurrentLang
    ? (liveResult.groundedReference || '')
    : (localizedContent?.groundedRule || '');

  // Micro-copy sequence for processing state (deliberate nod to the name Hmm)
  const MICRO_COPIES = ['Hmm...', '...thinking', '...almost there'];

  // Automatically process queued file when user logs in with a pending upload
  useEffect(() => {
    if (queuedFile) {
      processUploadedFile(queuedFile);
      onClearQueuedFile();
    }
  }, [queuedFile]);

  // Handle Drag & Drop with authentication guard
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
      const droppedFile = e.dataTransfer.files[0];
      if (!user) {
        onRequireAuth('signup', droppedFile);
        return;
      }
      processUploadedFile(droppedFile);
    }
  };

  const handleTriggerUpload = (e) => {
    if (!user) {
      e.preventDefault();
      e.stopPropagation();
      onRequireAuth('signup', null);
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

  // Helper to render sample document onto an offscreen canvas for real OCR processing
  const createSampleDocImage = async (doc) => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 900;
      canvas.height = 700;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      // Clean off-white paper styling
      ctx.fillStyle = '#fbf9f5';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#d4cebe';
      ctx.lineWidth = 3;
      ctx.strokeRect(16, 16, canvas.width - 32, canvas.height - 32);

      ctx.fillStyle = '#1c1917';
      ctx.font = 'bold 22px serif';
      ctx.fillText(doc.issuingAuthority || 'OFFICIAL INTIMATION', 40, 60);

      ctx.fillStyle = '#57534e';
      ctx.font = '14px sans-serif';
      ctx.fillText(`Ref: ${doc.refNumber || 'REF-101'} | Date: ${doc.date || 'Current'}`, 40, 90);

      ctx.fillStyle = '#292524';
      ctx.font = '15px monospace';
      const lines = (doc.rawExcerpt || '').split('\n');
      let y = 140;
      for (const line of lines) {
        const words = line.split(' ');
        let currentLine = '';
        for (const w of words) {
          if ((currentLine + w).length > 65) {
            ctx.fillText(currentLine, 40, y);
            y += 24;
            currentLine = w + ' ';
          } else {
            currentLine += w + ' ';
          }
        }
        if (currentLine) {
          ctx.fillText(currentLine, 40, y);
          y += 24;
        }
      }

      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          if (!blob) return resolve(null);
          resolve(new File([blob], `${doc.id || 'sample'}.jpg`, { type: 'image/jpeg' }));
        }, 'image/jpeg', 0.95);
      });
    } catch {
      return null;
    }
  };

  // Submit and start processing
  const handleSimplifySubmit = async (e, langOverride = null) => {
    e?.preventDefault();
    const targetLanguage = langOverride || selectedLang;
    if (!selectedDocId || !targetLanguage) return;

    setIsProcessing(true);
    setHasResult(false);
    setHasError(false);
    setLiveResult(null);
    setCloudAudioBase64(null);
    stopAudio();
    setProcessStepIndex(0);

    const step1 = setTimeout(() => {
      setProcessStepIndex(1); // "...thinking"
    }, 800);

    const step2 = setTimeout(() => {
      setProcessStepIndex(2); // "...almost there"
    }, 1600);

    let processedByBackend = false;

    try {
      let fileToSend = customFile;
      if (!fileToSend && currentDoc) {
        fileToSend = await createSampleDocImage(currentDoc);
      }

      if (fileToSend) {
        const formData = new FormData();
        formData.append('image', fileToSend, fileToSend.name || 'document.jpg');
        formData.append('language', targetLanguage);
        if (user?.id) {
          formData.append('userId', user.id);
        }

        const response = await fetch(API_ENDPOINTS.PROCESS_DOCUMENT, {
          method: 'POST',
          body: formData
        });

        const data = await response.json();
        if (data.success) {
          setLiveResult({ ...data, language: targetLanguage });
          if (data.audioBase64) {
            setCloudAudioBase64(data.audioBase64);
          }
          processedByBackend = true;
          clearTimeout(step1);
          clearTimeout(step2);
          setIsProcessing(false);
          setHasResult(true);
          setCheckedItems({});
          return;
        } else if (data.error) {
          setHasError(true);
          setErrorMessage(data.error);
          clearTimeout(step1);
          clearTimeout(step2);
          setIsProcessing(false);
          return;
        }
      }
    } catch (err) {
      console.warn('Backend proxy unavailable, falling back to mock content:', err);
    }

    if (!processedByBackend) {
      setTimeout(() => {
        setIsProcessing(false);
        setHasResult(true);
        setCheckedItems({});
      }, 1500);
    }
  };

  // Dynamically change language and automatically re-generate all text and speech
  const handleLanguageChange = (newLang) => {
    if (newLang === selectedLang) return;

    // 1. Immediately stop any active audio from the previous language
    stopAudio();
    setCloudAudioBase64(null);

    // 2. Switch language
    setSelectedLang(newLang);

    // 3. If results are already showing, immediately refresh content in the new language!
    if (hasResult) {
      setCheckedItems({});
      if (liveResult && liveResult.language !== newLang) {
        setLiveResult(null);
      }
      handleSimplifySubmit(null, newLang);
    }
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

  // =========================================================================
  // Robust, Non-Stopping Speech Engine (Cloud TTS + Web Speech synthesis fallback)
  // =========================================================================
  const togglePlayAudio = () => {
    if (isPlayingAudio && audioMode === 'full') {
      stopAudio();
    } else {
      if (cloudAudioBase64 && liveResult?.language === selectedLang) {
        stopAudio();
        const audio = new Audio(`data:audio/mp3;base64,${cloudAudioBase64}`);
        htmlAudioRef.current = audio;
        audio.playbackRate = playbackRate;
        setAudioMode('full');
        setIsPlayingAudio(true);
        audio.onended = () => {
          setIsPlayingAudio(false);
          setAudioProgress(100);
        };
        audio.ontimeupdate = () => {
          if (audio.duration) {
            setAudioProgress(Math.round((audio.currentTime / audio.duration) * 100));
            setAudioDuration(Math.round(audio.duration));
          }
        };
        audio.play().catch(e => {
          console.warn('HTML5 audio play error, falling back to Web Speech API:', e);
          startAudio('full');
        });
      } else {
        startAudio('full');
      }
    }
  };

  const togglePlayTasksOnly = () => {
    if (isPlayingAudio && audioMode === 'tasks') {
      stopAudio();
    } else {
      startAudio('tasks');
    }
  };

  const speakSingleTask = (taskText, taskIndex) => {
    if (isPlayingAudio && activeSpeakingTaskId === taskIndex) {
      stopAudio();
    } else {
      startAudio('single', taskText, taskIndex);
    }
  };

  const startAudio = (mode = 'full', customText = null, taskId = null) => {
    stopAudio();
    isAudioCancelledRef.current = false;
    setAudioMode(mode);
    setActiveSpeakingTaskId(taskId);

    let textToSpeak = '';
    if (customText) {
      textToSpeak = customText;
    } else if (mode === 'tasks') {
      textToSpeak = activeActionItems.map((item, idx) => `Step ${idx + 1}: ${item.text}`).join('. ');
    } else {
      // Full narrative: reads the simplified explanation AND all next-step tasks in the current selected language!
      const tasksText = activeActionItems.map((item, idx) => `Step ${idx + 1}: ${item.text}`).join('. ');
      textToSpeak = `${activeSimplifiedText}. ${t('whatToDoNext')}: ${tasksText}`;
    }

    if (!textToSpeak) return;

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

    // Sentence splitter: splits across English and Indian scripts (. ! ? । \n)
    const splitSentences = (text) => {
      const matches = text.match(/[^.!?।\n]+[.!?।\n]*/g);
      if (!matches || matches.length === 0) return [text];
      return matches.map((s) => s.trim()).filter((s) => s.length > 0);
    };

    const chunks = splitSentences(textToSpeak);
    audioChunksRef.current = chunks;
    activeChunkIndexRef.current = 0;

    // Estimate total time based on length and playback speed (~10 characters per sec)
    const estDuration = Math.max(10, Math.round(textToSpeak.length / (10 * playbackRate)));
    setAudioDuration(estDuration);
    setAudioProgress(0);
    setIsPlayingAudio(true);

    if (!('speechSynthesis' in window)) {
      // Fallback for environments where speech API is unavailable
      const stepMs = 250;
      const increment = (stepMs / (estDuration * 1000)) * 100;
      audioProgressIntervalRef.current = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            stopAudio();
            return 0;
          }
          return prev + increment;
        });
      }, stepMs);
      return;
    }

    // Cancel any previous residual audio
    window.speechSynthesis.cancel();

    // Chrome 14-second Speech Freeze Keep-Alive Ping
    keepAliveIntervalRef.current = setInterval(() => {
      if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    }, 7000);

    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find((v) => v.lang.startsWith(targetLangCode.split('-')[0]));

    // Sequential chunk executor: each chunk is short (3-6s), never hitting Chrome's 14s timeout
    const playChunk = (index) => {
      if (isAudioCancelledRef.current) return;
      if (index >= chunks.length) {
        // Naturally reached the very end of all tasks!
        stopAudio();
        return;
      }

      const chunkText = chunks[index];
      const utterance = new SpeechSynthesisUtterance(chunkText);
      // CRITICAL: Anchor to window to prevent Chrome GC from dropping utterance mid-sentence!
      window.__hmmActiveUtterance = utterance;

      utterance.lang = targetLangCode;
      utterance.rate = playbackRate;
      if (matchedVoice) utterance.voice = matchedVoice;

      utterance.onend = () => {
        if (isAudioCancelledRef.current) return;
        activeChunkIndexRef.current = index + 1;
        const progress = Math.min(100, Math.round(((index + 1) / chunks.length) * 100));
        setAudioProgress(progress);
        playChunk(index + 1);
      };

      utterance.onerror = (e) => {
        if (isAudioCancelledRef.current) return;
        activeChunkIndexRef.current = index + 1;
        playChunk(index + 1);
      };

      window.speechSynthesis.speak(utterance);
    };

    playChunk(0);
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
      .join('\n')}\n\n${activeGroundedRule}\n\n— Hmm (Built by Linges.D.Waran)`;

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

                  {customFilePreview ? (
                    <div className="custom-preview-thumbnail">
                      <img src={customFilePreview} alt="Uploaded document preview" />
                    </div>
                  ) : (
                    <div className="custom-pdf-preview-box">
                      <span className="pdf-badge">PDF DOCUMENT</span>
                      <p className="pdf-doc-notice">Ready for AI text extraction & regional translation</p>
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
                className={`dropzone-box ${isDragOver ? 'dropzone-box--dragover' : ''} ${!user ? 'dropzone-box--auth-guarded' : ''}`}
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
                  disabled={!user}
                />
                <input
                  type="file"
                  id="doc-camera-capture"
                  className="visually-hidden"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileInput}
                  disabled={!user}
                />

                <div className="dropzone-content">
                  <div className="dropzone-icon-circle">
                    <Upload size={20} />
                  </div>
                  <div className="dropzone-text">
                    <span className="dropzone-heading">Upload Document, Photo, or PDF</span>
                    <span className="dropzone-sub">Drag & drop here, browse from device, or use camera</span>

                    <div className="dropzone-formats-badge">
                      <span className="format-tag">JPG</span>
                      <span className="format-tag">PNG</span>
                      <span className="format-tag">WEBP</span>
                      <span className="format-tag format-tag--pdf">PDF</span>
                      <span className="format-size-limit">Up to 10MB</span>
                    </div>
                  </div>

                  <div className="dropzone-buttons-row">
                    {/* Primary Button: Upload / Browse File (Image or PDF) */}
                    {user ? (
                      <label htmlFor="doc-file-upload" className="btn-dropzone-action btn-dropzone-action--primary">
                        <FileText size={15} />
                        <span>Upload Image / PDF</span>
                      </label>
                    ) : (
                      <button
                        type="button"
                        className="btn-dropzone-action btn-dropzone-action--primary"
                        onClick={handleTriggerUpload}
                      >
                        <FileText size={15} />
                        <span>Upload Image / PDF</span>
                      </button>
                    )}

                    {/* Secondary Button: Camera Photo Capture */}
                    {user ? (
                      <label htmlFor="doc-camera-capture" className="btn-dropzone-action btn-dropzone-action--secondary">
                        <Camera size={15} />
                        <span>Take Photo</span>
                      </label>
                    ) : (
                      <button
                        type="button"
                        className="btn-dropzone-action btn-dropzone-action--secondary"
                        onClick={handleTriggerUpload}
                      >
                        <Camera size={15} />
                        <span>Take Photo</span>
                      </button>
                    )}
                  </div>
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
                      onClick={() => handleLanguageChange(lang.id)}
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

                  {/* Pipeline Status Bar */}
                  <div className="pipeline-status-bar">
                    <span className="pipeline-badge pipeline-badge--live">
                      <span className="pipeline-badge--dot"></span>
                      {liveResult
                        ? liveResult.fromCache
                          ? 'Served from Backend Cache (0ms)'
                          : `Live Backend Pipeline: OCR + Gemini + RAG + TTS (${liveResult.processingTimeMs || 25}ms)`
                        : backendStatus.online
                        ? 'Backend Proxy Connected (:3001)'
                        : 'Demo Preview Mode'}
                    </span>
                    {liveResult?.urgency && (
                      <span className={`urgency-badge urgency-badge--${liveResult.urgency}`}>
                        {liveResult.urgency} urgency
                      </span>
                    )}
                  </div>

                  {/* Key Facts Grid — Structured Card Representation */}
                  {liveResult?.keyFacts && liveResult.keyFacts.length > 0 && (
                    <div className="key-facts-grid" aria-label="Key Facts">
                      {liveResult.keyFacts.map((fact, idx) => (
                        <div key={idx} className="key-fact-card">
                          <span className="key-fact-label">{fact.label}</span>
                          <strong className="key-fact-value">{fact.value}</strong>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Simplified Plain-Language Text Block */}
                  <div className="results-text-block">
                    <p className="results-body-text">{activeSimplifiedText}</p>
                  </div>

                  {/* Audio Player: Reads Full Narrative (Explanation + All Tasks) */}
                  <div className="audio-player-card">
                    <div className="audio-player-controls">
                      <button
                        type="button"
                        className={`btn-play-pause ${
                          isPlayingAudio && audioMode === 'full' ? 'btn-play-pause--playing' : ''
                        }`}
                        onClick={togglePlayAudio}
                        aria-label={isPlayingAudio && audioMode === 'full' ? t('pauseAudio') : t('playAudio')}
                        title={
                          isPlayingAudio && audioMode === 'full'
                            ? t('pauseAudio')
                            : `${t('playAudio')} (Explanation & Tasks)`
                        }
                      >
                        {isPlayingAudio && audioMode === 'full' ? (
                          <Pause size={18} />
                        ) : (
                          <Play size={18} fill="currentColor" />
                        )}
                      </button>

                      <div className="audio-progress-wrap">
                        <div className="audio-label-row">
                          <span className="audio-title">
                            <Volume2 size={14} />
                            {isPlayingAudio
                              ? audioMode === 'tasks'
                                ? `${t('spokenIn')} ${LANGUAGES.find((l) => l.id === selectedLang)?.name} — Tasks`
                                : `${t('spokenIn')} ${LANGUAGES.find((l) => l.id === selectedLang)?.name} — Full Summary & Tasks`
                              : `${t('spokenIn')} ${LANGUAGES.find((l) => l.id === selectedLang)?.name}`}
                          </span>
                          <span className="audio-timer">
                            {audioProgress}% • {audioDuration}s est.
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
                            startAudio(audioMode);
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

                      {/* Listen to Tasks Only Button */}
                      <button
                        type="button"
                        className={`btn-ghost btn-sm btn-tasks-audio ${
                          isPlayingAudio && audioMode === 'tasks' ? 'btn-tasks-audio--playing' : ''
                        }`}
                        onClick={togglePlayTasksOnly}
                        title="Read only the action tasks aloud"
                      >
                        {isPlayingAudio && audioMode === 'tasks' ? (
                          <>
                            <Pause size={13} />
                            <span>{t('pauseAudio')}</span>
                          </>
                        ) : (
                          <>
                            <Volume2 size={13} />
                            <span>Read tasks aloud</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="action-card-sub-row">
                      <span className="action-card-sub">
                        {t('checklistHint')}
                      </span>
                    </div>

                    <div className="action-checklist" role="list">
                      {activeActionItems.map((item, idx) => {
                        const isDone = !!checkedItems[idx];
                        const isSpeakingThis = isPlayingAudio && activeSpeakingTaskId === idx;
                        return (
                          <div
                            key={idx}
                            className={`checklist-item ${isDone ? 'checklist-item--checked' : ''} ${
                              isSpeakingThis ? 'checklist-item--speaking' : ''
                            }`}
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

                            {/* Individual task read button */}
                            <button
                              type="button"
                              className={`btn-single-task-audio ${isSpeakingThis ? 'btn-single-task-audio--active' : ''}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                speakSingleTask(item.text, idx);
                              }}
                              title="Listen to this task"
                              aria-label="Listen to this task"
                            >
                              {isSpeakingThis ? <VolumeX size={14} /> : <Volume2 size={14} />}
                            </button>
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
