import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Platform,
  Share,
  Alert,
} from 'react-native';
import { launchCamera, launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import { COLORS, FONTS, SPACING, RADIUS } from '../theme';
import { Header } from '../components/Header';
import { LanguageChip } from '../components/LanguageChip';
import { KeyFactCard } from '../components/KeyFactCard';
import { NextStepsCard } from '../components/NextStepsCard';
import { AudioPlayer } from '../components/AudioPlayer';
import { ProcessingOverlay } from '../components/ProcessingOverlay';
import {
  LANGUAGES,
  UI_TRANSLATIONS,
  getTranslation,
  ProcessedDocumentResult,
  MOCK_RESULTS,
} from '../data/mockData';
import { ApiService } from '../services/apiService';

export const TryHmmScreen: React.FC = () => {
  // Single source of truth for language
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');

  // Selected document image
  const [selectedImage, setSelectedImage] = useState<{
    uri: string;
    type?: string;
    fileName?: string;
  } | null>({
    uri: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    fileName: 'sample_tax_demand.jpg',
    type: 'image/jpeg',
  });

  // Flow states
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [result, setResult] = useState<ProcessedDocumentResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const regionalFont = FONTS.getRegionalFont(selectedLanguage);

  // Request Android Camera permission at point of use
  const requestCameraPermission = async (): Promise<boolean> => {
    if (Platform.OS !== 'android') return true;
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Hmm Camera Permission',
          message:
            'Hmm needs camera access so you can photograph notices and legal documents for instant simplification.',
          buttonNeutral: 'Ask Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const handleTakePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission Required',
        'Camera permission is needed to take a photo of your document. You can also pick an image from your gallery.'
      );
      return;
    }

    launchCamera(
      {
        mediaType: 'photo',
        quality: 0.8,
        saveToPhotos: false,
      },
      (response: ImagePickerResponse) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          setErrorMessage(
            'Unable to open camera on this device. You can choose a document photo from your gallery instead.'
          );
          return;
        }
        if (response.assets && response.assets.length > 0) {
          const asset = response.assets[0];
          setSelectedImage({
            uri: asset.uri || '',
            type: asset.type || 'image/jpeg',
            fileName: asset.fileName || 'camera_photo.jpg',
          });
          setErrorMessage(null);
        }
      }
    );
  };

  const handleChooseGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
      },
      (response: ImagePickerResponse) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          setErrorMessage('Unable to select image from gallery. Please try again.');
          return;
        }
        if (response.assets && response.assets.length > 0) {
          const asset = response.assets[0];
          setSelectedImage({
            uri: asset.uri || '',
            type: asset.type || 'image/jpeg',
            fileName: asset.fileName || 'gallery_photo.jpg',
          });
          setErrorMessage(null);
        }
      }
    );
  };

  const handleProcessDocument = async (isDemoError = false) => {
    if (!selectedImage) return;

    setErrorMessage(null);
    setIsProcessing(true);
    setProcessingStep(0);

    try {
      const data = await ApiService.processDocument(
        {
          imageUri: selectedImage.uri,
          imageType: selectedImage.type,
          fileName: selectedImage.fileName,
          language: selectedLanguage,
          simulateError: isDemoError,
        },
        step => setProcessingStep(step)
      );

      setResult(data);
    } catch (err: any) {
      setErrorMessage(
        err?.message ||
          'Hmm could not connect to the document clarity service. Please check your network and try again.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // When language switches on results screen, update results dynamically
  const handleLanguageChange = (langId: string) => {
    setSelectedLanguage(langId);
    if (result) {
      // Re-ground the result dynamically for the selected language
      const localizedMock = MOCK_RESULTS[langId] || MOCK_RESULTS.en;
      setResult(prev =>
        prev
          ? {
              ...prev,
              title: localizedMock.title,
              summary: localizedMock.summary,
              keyFacts: localizedMock.keyFacts,
              nextSteps: localizedMock.nextSteps,
              rawOcrPreview: localizedMock.rawOcrPreview,
            }
          : null
      );
    }
  };

  // Share via WhatsApp / System Share Sheet
  const handleShare = async () => {
    if (!result) return;
    try {
      const shareContent = `*${result.title} — Explained via Hmm*\n\n${result.summary}\n\n*Next Steps:*\n${result.nextSteps
        .map((s, idx) => `${idx + 1}. ${s.task}`)
        .join('\n')}\n\n_Civilian-grade clarity by Hmm_`;

      await Share.share({
        message: shareContent,
        title: result.title,
      });
    } catch (e) {
      console.warn(e);
    }
  };

  const handleSaveSummary = () => {
    Alert.alert(
      getTranslation(selectedLanguage, 'downloadSummary'),
      'Document summary, key facts, and next steps checklist have been saved to your Hmm offline documents.'
    );
  };

  const handleReset = () => {
    setResult(null);
    setErrorMessage(null);
  };

  const isSubmitDisabled = !selectedImage || !selectedLanguage || isProcessing;

  return (
    <View style={styles.screen}>
      <Header
        rightAction={
          result ? (
            <TouchableOpacity onPress={handleReset} style={styles.newDocBtn}>
              <Text style={styles.newDocText}>
                {getTranslation(selectedLanguage, 'newDocument')}
              </Text>
            </TouchableOpacity>
          ) : undefined
        }
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Results Screen */}
        {result ? (
          <View style={styles.resultsWrapper}>
            {/* Clarity Achieved Badge */}
            <View style={styles.clarityBadge}>
              <Text style={styles.clarityBadgeText}>
                ✦ {getTranslation(selectedLanguage, 'clarityAchieved')}
              </Text>
            </View>

            <Text style={[styles.resultTitle, { fontFamily: regionalFont }]}>
              {result.title}
            </Text>
            <Text style={styles.authorityText}>{result.issuingAuthority}</Text>

            {/* Language Switcher on Result Screen */}
            <View style={styles.resultLangBar}>
              <Text style={styles.langBarLabel}>Language / மொழி:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsScroll}>
                {LANGUAGES.map(lang => (
                  <LanguageChip
                    key={lang.id}
                    language={lang}
                    isSelected={selectedLanguage === lang.id}
                    onSelect={handleLanguageChange}
                  />
                ))}
              </ScrollView>
            </View>

            {/* Audio Narration Card */}
            <AudioPlayer base64Audio={result.audioBase64} langCode={selectedLanguage} />

            {/* Plain Explanation Summary */}
            <View style={styles.summaryCard}>
              <Text style={[styles.sectionHeading, { fontFamily: regionalFont }]}>
                {getTranslation(selectedLanguage, 'plainExplanation')}
              </Text>
              <Text style={[styles.summaryText, { fontFamily: regionalFont }]}>
                {result.summary}
              </Text>
            </View>

            {/* Key Facts Cards */}
            <Text style={[styles.sectionHeading, styles.keyFactsHeader, { fontFamily: regionalFont }]}>
              {getTranslation(selectedLanguage, 'keyFactsTitle')}
            </Text>
            {result.keyFacts.map((fact, idx) => (
              <KeyFactCard key={idx} fact={fact} langCode={selectedLanguage} />
            ))}

            {/* Next Steps Checklist Card */}
            <NextStepsCard steps={result.nextSteps} langCode={selectedLanguage} />

            {/* Action Buttons: Save & Share */}
            <View style={styles.buttonRow}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleShare}
                style={[styles.actionBtn, styles.shareBtn]}
              >
                <Text style={styles.shareBtnText}>
                  💬 {getTranslation(selectedLanguage, 'shareWhatsApp')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleSaveSummary}
                style={[styles.actionBtn, styles.saveBtn]}
              >
                <Text style={styles.saveBtnText}>
                  📥 {getTranslation(selectedLanguage, 'downloadSummary')}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Legal Disclaimer */}
            <View style={styles.disclaimerBox}>
              <Text style={[styles.disclaimerText, { fontFamily: regionalFont }]}>
                {getTranslation(selectedLanguage, 'legalDisclaimer')}
              </Text>
            </View>
          </View>
        ) : (
          /* Input / Upload Flow */
          <View style={styles.inputWrapper}>
            {/* Step 1: Document Capture / Picker */}
            <View style={styles.stepSection}>
              <Text style={[styles.stepHeading, { fontFamily: regionalFont }]}>
                {getTranslation(selectedLanguage, 'step1')}
              </Text>
              <Text style={styles.stepSubtitle}>
                {getTranslation(selectedLanguage, 'selectPhotoPrompt')}
              </Text>

              {/* Photo Preview / Capture Card */}
              <View style={styles.uploadCard}>
                {selectedImage ? (
                  <View style={styles.imagePreviewContainer}>
                    <Image
                      source={{ uri: selectedImage.uri }}
                      style={styles.imagePreview}
                      resizeMode="cover"
                    />
                    <View style={styles.imageBadge}>
                      <Text style={styles.imageBadgeText}>
                        ✓ {getTranslation(selectedLanguage, 'uploaded')}
                      </Text>
                    </View>
                  </View>
                ) : null}

                <View style={styles.pickerButtonsRow}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.pickerBtn}
                    onPress={handleTakePhoto}
                  >
                    <Text style={styles.pickerBtnIcon}>📷</Text>
                    <Text style={styles.pickerBtnText}>
                      {getTranslation(selectedLanguage, 'takePhoto')}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.pickerBtn, styles.galleryBtn]}
                    onPress={handleChooseGallery}
                  >
                    <Text style={styles.pickerBtnIcon}>🖼️</Text>
                    <Text style={styles.pickerBtnText}>
                      {getTranslation(selectedLanguage, 'chooseGallery')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Step 2: Language Selector Chips */}
            <View style={styles.stepSection}>
              <Text style={[styles.stepHeading, { fontFamily: regionalFont }]}>
                {getTranslation(selectedLanguage, 'step2')}
              </Text>
              <Text style={styles.stepSubtitle}>
                {getTranslation(selectedLanguage, 'selectLanguagePrompt')}
              </Text>

              <View style={styles.chipsContainer}>
                {LANGUAGES.map(lang => (
                  <LanguageChip
                    key={lang.id}
                    language={lang}
                    isSelected={selectedLanguage === lang.id}
                    onSelect={setSelectedLanguage}
                  />
                ))}
              </View>
            </View>

            {/* Error Message Box */}
            {errorMessage && (
              <View style={styles.errorBox}>
                <Text style={styles.errorTitle}>
                  ⚠️ {getTranslation(selectedLanguage, 'errorTitle')}
                </Text>
                <Text style={styles.errorDesc}>{errorMessage}</Text>
              </View>
            )}

            {/* Step 3: Submit Button */}
            <TouchableOpacity
              activeOpacity={0.85}
              disabled={isSubmitDisabled}
              style={[styles.submitButton, isSubmitDisabled && styles.submitButtonDisabled]}
              onPress={() => handleProcessDocument(false)}
            >
              <Text style={styles.submitButtonText}>
                {getTranslation(selectedLanguage, 'simplifyBtn')} →
              </Text>
            </TouchableOpacity>

            {/* Demo Blurry Photo Error button */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleProcessDocument(true)}
              style={styles.demoErrorButton}
            >
              <Text style={styles.demoErrorText}>
                🧪 {getTranslation(selectedLanguage, 'demoErrorBtn')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Rotating Processing Micro-copy Modal */}
      <ProcessingOverlay
        visible={isProcessing}
        langCode={selectedLanguage}
        stepIndex={processingStep}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.paper,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxl + 20,
  },
  newDocBtn: {
    backgroundColor: COLORS.paperCard,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  newDocText: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.ink,
  },
  inputWrapper: {
    width: '100%',
  },
  stepSection: {
    marginBottom: SPACING.lg,
  },
  stepHeading: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.ink,
    marginBottom: 2,
  },
  stepSubtitle: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.inkSecondary,
    marginBottom: SPACING.sm,
  },
  uploadCard: {
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.lg,
    borderWidth: 1.5,
    borderColor: COLORS.line,
    padding: SPACING.md,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  imagePreviewContainer: {
    height: 160,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
  },
  imageBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(34, 38, 43, 0.85)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
  },
  imageBadgeText: {
    fontFamily: FONTS.medium,
    fontSize: 11,
    color: COLORS.cardWhite,
  },
  pickerButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pickerBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.goldMuted,
    borderWidth: 1.5,
    borderColor: COLORS.clarityGold,
    borderRadius: RADIUS.md,
    paddingVertical: 12,
    marginRight: SPACING.xs,
  },
  galleryBtn: {
    backgroundColor: COLORS.paper,
    borderColor: COLORS.line,
    marginRight: 0,
    marginLeft: SPACING.xs,
  },
  pickerBtnIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  pickerBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    color: COLORS.ink,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  submitButton: {
    backgroundColor: COLORS.clarityGold,
    borderRadius: RADIUS.md,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: SPACING.sm,
    shadowColor: COLORS.clarityGold,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButtonDisabled: {
    backgroundColor: '#D9D3C3',
    shadowOpacity: 0,
    elevation: 0,
  },
  submitButtonText: {
    fontFamily: FONTS.displaySemiBold,
    fontSize: 16,
    color: COLORS.ink,
  },
  demoErrorButton: {
    marginTop: SPACING.md,
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  demoErrorText: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.inkTertiary,
    textDecorationLine: 'underline',
  },
  errorBox: {
    backgroundColor: '#FFF0F0',
    borderWidth: 1.5,
    borderColor: COLORS.sealRed,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  errorTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.sealRed,
    marginBottom: 4,
  },
  errorDesc: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.ink,
    lineHeight: 18,
  },
  // Results view styles
  resultsWrapper: {
    width: '100%',
  },
  clarityBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.goldMuted,
    borderWidth: 1,
    borderColor: COLORS.clarityGold,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
    marginBottom: SPACING.xs,
  },
  clarityBadgeText: {
    fontFamily: FONTS.semiBold,
    fontSize: 10,
    color: COLORS.ink,
    letterSpacing: 0.5,
  },
  resultTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.ink,
    lineHeight: 28,
  },
  authorityText: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.inkSecondary,
    marginBottom: SPACING.md,
  },
  resultLangBar: {
    marginBottom: SPACING.sm,
  },
  langBarLabel: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.inkSecondary,
    marginBottom: 4,
  },
  chipsScroll: {
    flexDirection: 'row',
  },
  summaryCard: {
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.line,
    padding: SPACING.lg,
    marginVertical: SPACING.sm,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.ink,
    marginBottom: SPACING.sm,
  },
  keyFactsHeader: {
    marginTop: SPACING.md,
  },
  summaryText: {
    fontSize: 14,
    color: COLORS.ink,
    lineHeight: 22,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: SPACING.md,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    borderWidth: 1.5,
  },
  shareBtn: {
    backgroundColor: '#E7F5EC',
    borderColor: '#34A853',
    marginRight: SPACING.xs,
  },
  shareBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    color: '#1E6A34',
  },
  saveBtn: {
    backgroundColor: COLORS.cardWhite,
    borderColor: COLORS.line,
    marginLeft: SPACING.xs,
  },
  saveBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    color: COLORS.ink,
  },
  disclaimerBox: {
    backgroundColor: COLORS.paperCard,
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginTop: SPACING.sm,
  },
  disclaimerText: {
    fontSize: 11,
    color: COLORS.inkTertiary,
    lineHeight: 16,
    textAlign: 'center',
  },
});
