import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../theme';
import { Language } from '../data/mockData';

interface LanguageChipProps {
  language: Language;
  isSelected: boolean;
  onSelect: (langId: string) => void;
}

export const LanguageChip: React.FC<LanguageChipProps> = ({
  language,
  isSelected,
  onSelect,
}) => {
  const regionalFont = FONTS.getRegionalFont(language.id, isSelected ? 'medium' : 'regular');

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => onSelect(language.id)}
      style={[
        styles.chip,
        isSelected ? styles.chipSelected : styles.chipUnselected,
      ]}
    >
      <View style={styles.content}>
        <Text
          style={[
            styles.nativeName,
            { fontFamily: regionalFont },
            isSelected ? styles.textSelected : styles.textUnselected,
          ]}
        >
          {language.native}
        </Text>
        <Text
          style={[
            styles.englishName,
            isSelected ? styles.subtextSelected : styles.subtextUnselected,
          ]}
        >
          {language.name}
        </Text>
      </View>
      {isSelected && <View style={styles.activeDot} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: 10,
    borderRadius: RADIUS.md,
    marginRight: SPACING.sm,
    marginBottom: SPACING.sm,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
  },
  chipUnselected: {
    backgroundColor: COLORS.cardWhite,
    borderColor: COLORS.line,
  },
  chipSelected: {
    backgroundColor: COLORS.goldMuted,
    borderColor: COLORS.clarityGold,
    shadowColor: COLORS.clarityGold,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 2,
  },
  content: {
    flexDirection: 'column',
  },
  nativeName: {
    fontSize: 15,
    lineHeight: 20,
  },
  englishName: {
    fontFamily: FONTS.regular,
    fontSize: 11,
    marginTop: 1,
  },
  textUnselected: {
    color: COLORS.ink,
  },
  textSelected: {
    color: COLORS.ink,
    fontWeight: '600',
  },
  subtextUnselected: {
    color: COLORS.inkTertiary,
  },
  subtextSelected: {
    color: COLORS.inkSecondary,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.clarityGold,
    marginLeft: SPACING.sm,
  },
});
