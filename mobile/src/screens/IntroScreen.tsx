import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AccessibilityInfo,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { COLORS, FONTS, SPACING, RADIUS } from '../theme';

interface IntroScreenProps {
  onFinish: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onFinish }) => {
  const [reduceMotion, setReduceMotion] = useState(false);

  // Animation values
  const beforeOpacity = useSharedValue(1);
  const beforeScale = useSharedValue(0.95);

  const afterOpacity = useSharedValue(0);
  const afterTranslateY = useSharedValue(12);

  const underlineWidth = useSharedValue(0);
  const containerOpacity = useSharedValue(1);

  const handleFinish = () => {
    onFinish();
  };

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(enabled => {
      setReduceMotion(enabled);
      if (enabled) {
        // Skip animation if system reduce motion is active
        onFinish();
        return;
      }

      // 1. Initial text starts visible ("Hmm... what does this even mean?")
      // 2. At 800ms, fade out "Hmm..."
      beforeOpacity.value = withDelay(
        700,
        withTiming(0, { duration: 300, easing: Easing.out(Easing.quad) })
      );
      beforeScale.value = withDelay(
        700,
        withTiming(0.9, { duration: 300 })
      );

      // 3. At 950ms, fade and slide in "Oh. Now I get it."
      afterOpacity.value = withDelay(
        950,
        withTiming(1, { duration: 400, easing: Easing.out(Easing.cubic) })
      );
      afterTranslateY.value = withDelay(
        950,
        withTiming(0, { duration: 400, easing: Easing.out(Easing.cubic) })
      );

      // 4. Gold underline draws across
      underlineWidth.value = withDelay(
        1300,
        withTiming(160, { duration: 350, easing: Easing.out(Easing.quad) })
      );

      // 5. Fade out entire intro screen after ~1.9s and transition to app
      containerOpacity.value = withDelay(
        1850,
        withTiming(0, { duration: 250 }, (finished) => {
          if (finished) {
            runOnJS(handleFinish)();
          }
        })
      );
    });
  }, []);

  const beforeStyle = useAnimatedStyle(() => ({
    opacity: beforeOpacity.value,
    transform: [{ scale: beforeScale.value }],
  }));

  const afterStyle = useAnimatedStyle(() => ({
    opacity: afterOpacity.value,
    transform: [{ translateY: afterTranslateY.value }],
  }));

  const underlineStyle = useAnimatedStyle(() => ({
    width: underlineWidth.value,
  }));

  const containerStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
  }));

  if (reduceMotion) return null;

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.touchArea}
        onPress={handleFinish}
      >
        <View style={styles.content}>
          {/* Logo mark */}
          <View style={styles.logoBadge}>
            <Text style={styles.logoText}>H</Text>
            <View style={styles.goldDot} />
          </View>

          {/* Phase 1: Muted cramped text */}
          <Animated.View style={[styles.phaseContainer, beforeStyle]}>
            <Text style={styles.beforeText}>
              “Hmm... what does this even mean?”
            </Text>
            <Text style={styles.beforeSubtext}>
              Dense legal jargon · Threatening penalty font · Unclear dates
            </Text>
          </Animated.View>

          {/* Phase 2: Transformed clear text */}
          <Animated.View style={[styles.phaseContainer, styles.absoluteCenter, afterStyle]}>
            <Text style={styles.afterText}>
              “Oh. Now I get it.”
            </Text>
            <Animated.View style={[styles.goldUnderline, underlineStyle]} />
            <Text style={styles.afterSubtext}>
              Civilian clarity in your native tongue.
            </Text>
          </Animated.View>
        </View>

        {/* Skip hint */}
        <View style={styles.footer}>
          <Text style={styles.skipText}>Tap anywhere to skip</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.paper,
    zIndex: 9999,
  },
  touchArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: 220,
    position: 'relative',
  },
  logoBadge: {
    width: 54,
    height: 54,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.cardWhite,
    borderWidth: 2,
    borderColor: COLORS.line,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
    position: 'relative',
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  logoText: {
    fontFamily: FONTS.displaySemiBold,
    fontSize: 28,
    color: COLORS.ink,
  },
  goldDot: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.clarityGold,
  },
  phaseContainer: {
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  absoluteCenter: {
    position: 'absolute',
    top: 90,
  },
  beforeText: {
    fontFamily: FONTS.medium,
    fontSize: 18,
    color: '#8A9198',
    textAlign: 'center',
    letterSpacing: -0.2,
  },
  beforeSubtext: {
    fontFamily: FONTS.regular,
    fontSize: 11,
    color: '#ACB3B9',
    marginTop: SPACING.sm,
    textAlign: 'center',
  },
  afterText: {
    fontFamily: FONTS.displaySemiBold,
    fontSize: 26,
    color: COLORS.ink,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  goldUnderline: {
    height: 4,
    backgroundColor: COLORS.clarityGold,
    borderRadius: 2,
    marginTop: 6,
    marginBottom: SPACING.sm,
  },
  afterSubtext: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.inkSecondary,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: SPACING.xl + 10,
    alignItems: 'center',
  },
  skipText: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.inkTertiary,
  },
});
