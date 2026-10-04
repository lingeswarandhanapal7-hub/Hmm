import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../theme';
import { KeyFact } from '../data/mockData';

interface KeyFactCardProps {
  fact: KeyFact;
  langCode?: string;
}

export const KeyFactCard: React.FC<KeyFactCardProps> = ({ fact, langCode = 'en' }) => {
  const regionalFont = FONTS.getRegionalFont(langCode);

  return (
    <View style={[styles.card, fact.highlight && styles.cardHighlight]}>
      <View style={styles.topRow}>
        <Text style={[styles.label, { fontFamily: regionalFont }]}>{fact.label}</Text>
        {fact.badge ? (
          <View style={[styles.badge, fact.highlight && styles.badgeHighlight]}>
            <Text style={[styles.badgeText, fact.highlight && styles.badgeTextHighlight]}>
              {fact.badge}
            </Text>
          </View>
        ) : null}
      </View>
      <Text style={[styles.value, fact.highlight && styles.valueHighlight]}>{fact.value}</Text>
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
    marginBottom: SPACING.sm,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardHighlight: {
    borderColor: COLORS.clarityGold,
    backgroundColor: COLORS.goldMuted,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    color: COLORS.inkSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  badge: {
    backgroundColor: COLORS.paper,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  badgeHighlight: {
    backgroundColor: COLORS.clarityGold,
    borderColor: COLORS.clarityGold,
  },
  badgeText: {
    fontFamily: FONTS.medium,
    fontSize: 10,
    color: COLORS.inkSecondary,
  },
  badgeTextHighlight: {
    color: COLORS.ink,
    fontWeight: '700',
  },
  value: {
    fontFamily: FONTS.displaySemiBold,
    fontSize: 20,
    color: COLORS.ink,
    marginTop: 2,
  },
  valueHighlight: {
    color: COLORS.ink,
    fontSize: 22,
  },
});
