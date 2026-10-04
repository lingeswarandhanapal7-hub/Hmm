import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../theme';
import { AudioService } from '../services/audioService';
import { getTranslation, LANGUAGES } from '../data/mockData';

interface AudioPlayerProps {
  base64Audio?: string;
  langCode: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ base64Audio, langCode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const selectedLang = LANGUAGES.find(l => l.id === langCode) || LANGUAGES[0];
  const regionalFont = FONTS.getRegionalFont(langCode);

  useEffect(() => {
    return () => {
      AudioService.stopAudio();
    };
  }, []);

  const togglePlayback = async () => {
    if (isPlaying) {
      await AudioService.pauseAudio();
      setIsPlaying(false);
    } else {
      setIsLoading(true);
      const success = await AudioService.playAudio(base64Audio || 'mock_audio', () => {
        setIsPlaying(false);
        setProgress(1);
        setTimeout(() => setProgress(0), 1000);
      });
      setIsLoading(false);
      if (success) {
        setIsPlaying(true);
      }
    }
  };

  // Simulated progress tick while playing
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(p => (p >= 1 ? 0 : p + 0.05));
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <View style={styles.card}>
      <View style={styles.leftRow}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={togglePlayback}
          style={styles.playButton}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={COLORS.ink} />
          ) : (
            <Text style={styles.playIcon}>{isPlaying ? '❚❚' : '▶'}</Text>
          )}
        </TouchableOpacity>

        <View style={styles.infoCol}>
          <Text style={[styles.spokenText, { fontFamily: regionalFont }]}>
            {getTranslation(langCode, 'spokenIn')} {selectedLang.native} ({selectedLang.name})
          </Text>
          <Text style={styles.actionPrompt}>
            {isPlaying
              ? getTranslation(langCode, 'pauseAudio')
              : getTranslation(langCode, 'playAudio')}
          </Text>
        </View>
      </View>

      {/* Progress Track */}
      <View style={styles.trackContainer}>
        <View style={[styles.trackFill, { width: `${Math.round(progress * 100)}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.line,
    padding: SPACING.md,
    marginVertical: SPACING.sm,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.clarityGold,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
    shadowColor: COLORS.clarityGold,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  playIcon: {
    color: COLORS.ink,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 2,
  },
  infoCol: {
    flex: 1,
  },
  spokenText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.ink,
  },
  actionPrompt: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.inkSecondary,
    marginTop: 2,
  },
  trackContainer: {
    height: 4,
    backgroundColor: '#E5DFC9',
    borderRadius: 2,
    marginTop: SPACING.sm,
    overflow: 'hidden',
  },
  trackFill: {
    height: '100%',
    backgroundColor: COLORS.clarityGold,
    borderRadius: 2,
  },
});
