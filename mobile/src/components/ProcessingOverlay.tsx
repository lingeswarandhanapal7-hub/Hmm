import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Modal } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../theme';
import { getTranslation } from '../data/mockData';

interface ProcessingOverlayProps {
  visible: boolean;
  langCode: string;
  stepIndex?: number;
}

export const ProcessingOverlay: React.FC<ProcessingOverlayProps> = ({
  visible,
  langCode,
  stepIndex = 0,
}) => {
  const [internalStep, setInternalStep] = useState(0);

  useEffect(() => {
    let interval: any;
    if (visible) {
      setInternalStep(0);
      interval = setInterval(() => {
        setInternalStep(s => (s < 2 ? s + 1 : 0));
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [visible]);

  if (!visible) return null;

  const currentStep = stepIndex || internalStep;
  const messages = [
    getTranslation(langCode, 'thinking0'),
    getTranslation(langCode, 'thinking1'),
    getTranslation(langCode, 'thinking2'),
  ];

  const regionalFont = FONTS.getRegionalFont(langCode);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.card}>
          {/* Logo stamp */}
          <View style={styles.iconCircle}>
            <Text style={styles.hmmText}>Hmm...</Text>
          </View>

          <ActivityIndicator size="large" color={COLORS.clarityGold} style={styles.spinner} />

          <Text style={styles.statusTitle}>
            {getTranslation(langCode, 'simplifying')}
          </Text>

          <Text style={[styles.stepMessage, { fontFamily: regionalFont }]}>
            {messages[currentStep] || messages[0]}
          </Text>

          <View style={styles.dotsRow}>
            {[0, 1, 2].map(idx => (
              <View
                key={idx}
                style={[
                  styles.dot,
                  idx === currentStep ? styles.dotActive : styles.dotInactive,
                ]}
              />
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(34, 38, 43, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  card: {
    backgroundColor: COLORS.paper,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
    borderWidth: 2,
    borderColor: COLORS.line,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  iconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: COLORS.cardWhite,
    borderWidth: 2,
    borderColor: COLORS.clarityGold,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  hmmText: {
    fontFamily: FONTS.displaySemiBold,
    fontSize: 16,
    color: COLORS.ink,
  },
  spinner: {
    marginBottom: SPACING.md,
  },
  statusTitle: {
    fontFamily: FONTS.displaySemiBold,
    fontSize: 18,
    color: COLORS.ink,
    marginBottom: SPACING.sm,
  },
  stepMessage: {
    fontSize: 14,
    color: COLORS.inkSecondary,
    textAlign: 'center',
    lineHeight: 20,
    minHeight: 40,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: COLORS.clarityGold,
    width: 18,
  },
  dotInactive: {
    backgroundColor: COLORS.line,
  },
});
