import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../theme';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  rightAction?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'Hmm',
  subtitle = 'Civilian-grade clarity for bureaucratic paper',
  rightAction,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {/* Logo mark */}
        <View style={styles.logoBadge}>
          <Text style={styles.logoH}>H</Text>
          <View style={styles.goldDot} />
        </View>

        <View style={styles.textContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.brandTitle}>{title}</Text>
            <View style={styles.tagBadge}>
              <Text style={styles.tagText}>GOVT CLARITY</Text>
            </View>
          </View>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
      </View>

      {rightAction ? <View style={styles.rightContainer}>{rightAction}</View> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.paper,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.line,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoBadge: {
    width: 38,
    height: 38,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.cardWhite,
    borderWidth: 1.5,
    borderColor: COLORS.line,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
    position: 'relative',
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  logoH: {
    fontFamily: FONTS.displaySemiBold,
    fontSize: 20,
    color: COLORS.ink,
    lineHeight: 24,
  },
  goldDot: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.clarityGold,
  },
  textContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandTitle: {
    fontFamily: FONTS.displaySemiBold,
    fontSize: 22,
    color: COLORS.ink,
    letterSpacing: -0.5,
  },
  tagBadge: {
    backgroundColor: COLORS.goldMuted,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.clarityGold,
    marginLeft: SPACING.sm,
  },
  tagText: {
    fontFamily: FONTS.medium,
    fontSize: 9,
    color: COLORS.ink,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.inkSecondary,
    marginTop: 1,
  },
  rightContainer: {
    marginLeft: SPACING.sm,
  },
});
