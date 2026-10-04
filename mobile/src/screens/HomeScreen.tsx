import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../theme';
import { Header } from '../components/Header';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <Header />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.pillRow}>
            <View style={styles.heroPill}>
              <Text style={styles.heroPillText}>AI PUBLIC SERVICE INFRASTRUCTURE</Text>
            </View>
          </View>

          <Text style={styles.heroHeading}>
            Civilian-grade clarity for bureaucratic paper.
          </Text>

          <Text style={styles.heroBody}>
            Got an intimidating legal notice, tax demand, or municipal letter? Hmm translates
            bureaucratic confusion into plain language, action cards, and voice narration in your
            mother tongue.
          </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.heroButton}
            onPress={() => navigation.navigate('TryHmm')}
          >
            <Text style={styles.heroButtonText}>Try Hmm with a Document →</Text>
          </TouchableOpacity>
        </View>

        {/* Section: The Problem */}
        <View style={styles.section}>
          <View style={styles.sectionTag}>
            <Text style={styles.sectionTagText}>THE CHALLENGE</Text>
          </View>
          <Text style={styles.sectionHeading}>The Bureaucratic Paper Wall</Text>
          <Text style={styles.sectionBody}>
            Over 400M citizens across India regularly receive official notices filled with archaic
            clauses, threatening legal citations, and confusing deadlines. A routine ₹200 property
            re-assessment looks like an impending arrest warrant.
          </Text>
        </View>

        {/* Section: How It Works (4 Steps) */}
        <View style={styles.section}>
          <View style={styles.sectionTag}>
            <Text style={styles.sectionTagText}>SIMPLE 4-STEP PIPELINE</Text>
          </View>
          <Text style={styles.sectionHeading}>How Hmm Solves It</Text>

          <View style={styles.stepCard}>
            <View style={styles.stepNumberBadge}>
              <Text style={styles.stepNumber}>01</Text>
            </View>
            <View style={styles.stepTextContent}>
              <Text style={styles.stepTitle}>Snap or Upload</Text>
              <Text style={styles.stepDesc}>
                Take a quick photo of your document with your phone camera or select an image from gallery.
              </Text>
            </View>
          </View>

          <View style={styles.stepCard}>
            <View style={styles.stepNumberBadge}>
              <Text style={styles.stepNumber}>02</Text>
            </View>
            <View style={styles.stepTextContent}>
              <Text style={styles.stepTitle}>Pick Your Regional Language</Text>
              <Text style={styles.stepDesc}>
                Select Tamil, Hindi, Telugu, Kannada, Bengali, or Plain English. All labels and speech adapt dynamically.
              </Text>
            </View>
          </View>

          <View style={styles.stepCard}>
            <View style={styles.stepNumberBadge}>
              <Text style={styles.stepNumber}>03</Text>
            </View>
            <View style={styles.stepTextContent}>
              <Text style={styles.stepTitle}>Grounded Simplification</Text>
              <Text style={styles.stepDesc}>
                AI identifies statutory clauses, cuts the intimidating noise, and grounds the advice against verified civic rules.
              </Text>
            </View>
          </View>

          <View style={styles.stepCard}>
            <View style={styles.stepNumberBadge}>
              <Text style={styles.stepNumber}>04</Text>
            </View>
            <View style={styles.stepTextContent}>
              <Text style={styles.stepTitle}>Action Checklist & Audio</Text>
              <Text style={styles.stepDesc}>
                Get key facts at a glance, an interactive checklist of what to do next, and listen to spoken audio.
              </Text>
            </View>
          </View>
        </View>

        {/* Section: Why Hmm is Different */}
        <View style={styles.section}>
          <View style={styles.sectionTag}>
            <Text style={styles.sectionTagText}>WHY HMM IS DIFFERENT</Text>
          </View>
          <Text style={styles.sectionHeading}>Designed for Trust</Text>

          <View style={styles.featureGrid}>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🏛️</Text>
              <Text style={styles.featureTitle}>Statutory Grounding</Text>
              <Text style={styles.featureDesc}>
                No hallucinated advice. Anchored to actual municipal laws and rebate rules.
              </Text>
            </View>

            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🇮🇳</Text>
              <Text style={styles.featureTitle}>Bundled Indian Scripts</Text>
              <Text style={styles.featureDesc}>
                Custom typography for regional languages. Zero tofu boxes on any device.
              </Text>
            </View>

            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🎙️</Text>
              <Text style={styles.featureTitle}>Natural Voice Audio</Text>
              <Text style={styles.featureDesc}>
                Full audio readouts so anyone can understand, regardless of literacy level.
              </Text>
            </View>

            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🛡️</Text>
              <Text style={styles.featureTitle}>No Bureaucratic Panic</Text>
              <Text style={styles.featureDesc}>
                Demystifies penalty warnings and highlights immediate rebate windows.
              </Text>
            </View>
          </View>
        </View>

        {/* Responsible by Design Note */}
        <View style={styles.disclaimerCard}>
          <Text style={styles.disclaimerTitle}>Responsible by Design</Text>
          <Text style={styles.disclaimerText}>
            Hmm is built as an assistive clarity companion. It does not replace professional legal
            counsel. Official court summons and legal filings should always be confirmed with
            registered advocates or civic offices.
          </Text>
        </View>

        {/* Team Credit */}
        <View style={styles.creditContainer}>
          <Text style={styles.creditText}>
            Architected & Built by <Text style={styles.creditBold}>Linges.D.Waran</Text>
          </Text>
          <Text style={styles.techText}>React Native CLI · Kotlin Native Bridge · Gemini AI</Text>
        </View>
      </ScrollView>
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
  heroCard: {
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.lg,
    borderWidth: 1.5,
    borderColor: COLORS.line,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },
  pillRow: {
    flexDirection: 'row',
    marginBottom: SPACING.sm,
  },
  heroPill: {
    backgroundColor: COLORS.goldMuted,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.clarityGold,
  },
  heroPillText: {
    fontFamily: FONTS.semiBold,
    fontSize: 10,
    color: COLORS.ink,
    letterSpacing: 0.5,
  },
  heroHeading: {
    fontFamily: FONTS.displaySemiBold,
    fontSize: 24,
    color: COLORS.ink,
    lineHeight: 30,
    marginTop: SPACING.xs,
    marginBottom: SPACING.sm,
  },
  heroBody: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.inkSecondary,
    lineHeight: 22,
    marginBottom: SPACING.lg,
  },
  heroButton: {
    backgroundColor: COLORS.clarityGold,
    paddingVertical: 12,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    shadowColor: COLORS.clarityGold,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  heroButtonText: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.ink,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTag: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.paperCard,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.line,
    marginBottom: SPACING.xs,
  },
  sectionTagText: {
    fontFamily: FONTS.semiBold,
    fontSize: 10,
    color: COLORS.inkSecondary,
    letterSpacing: 0.5,
  },
  sectionHeading: {
    fontFamily: FONTS.displaySemiBold,
    fontSize: 20,
    color: COLORS.ink,
    marginBottom: SPACING.sm,
  },
  sectionBody: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.inkSecondary,
    lineHeight: 22,
  },
  stepCard: {
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.line,
    padding: SPACING.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  stepNumberBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.paper,
    borderWidth: 1,
    borderColor: COLORS.clarityGold,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
    marginTop: 2,
  },
  stepNumber: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    color: COLORS.ink,
  },
  stepTextContent: {
    flex: 1,
  },
  stepTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.ink,
    marginBottom: 2,
  },
  stepDesc: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.inkSecondary,
    lineHeight: 18,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItem: {
    width: '48%',
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.line,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  featureIcon: {
    fontSize: 22,
    marginBottom: SPACING.xs,
  },
  featureTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.ink,
    marginBottom: 4,
  },
  featureDesc: {
    fontFamily: FONTS.regular,
    fontSize: 11,
    color: COLORS.inkSecondary,
    lineHeight: 16,
  },
  disclaimerCard: {
    backgroundColor: COLORS.paperCard,
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },
  disclaimerTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    color: COLORS.sealRed,
    marginBottom: 4,
  },
  disclaimerText: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.inkSecondary,
    lineHeight: 18,
  },
  creditContainer: {
    alignItems: 'center',
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.line,
  },
  creditText: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.inkSecondary,
  },
  creditBold: {
    fontFamily: FONTS.semiBold,
    color: COLORS.ink,
  },
  techText: {
    fontFamily: FONTS.regular,
    fontSize: 11,
    color: COLORS.inkTertiary,
    marginTop: 4,
  },
});
