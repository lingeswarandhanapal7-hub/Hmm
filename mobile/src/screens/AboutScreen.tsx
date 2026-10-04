import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../theme';
import { Header } from '../components/Header';
import { CONFIG } from '../config';

export const AboutScreen: React.FC = () => {
  const openUrl = (url: string) => {
    Linking.openURL(url).catch(err => console.warn('Could not open link:', err));
  };

  return (
    <View style={styles.screen}>
      <Header />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Brand Card */}
        <View style={styles.brandCard}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoH}>H</Text>
            <View style={styles.goldDot} />
          </View>

          <Text style={styles.brandTitle}>Hmm</Text>
          <Text style={styles.brandSubtitle}>
            Civilian-grade clarity for bureaucratic paper.
          </Text>

          <View style={styles.badgeRow}>
            <View style={styles.specBadge}>
              <Text style={styles.specText}>React Native CLI</Text>
            </View>
            <View style={styles.specBadge}>
              <Text style={styles.specText}>Kotlin Native Bridge</Text>
            </View>
            <View style={styles.specBadge}>
              <Text style={styles.specText}>Gemini AI</Text>
            </View>
          </View>
        </View>

        {/* Creator / Team Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeading}>Engineering & Vision</Text>
          <Text style={styles.bodyText}>
            Architected and engineered by <Text style={styles.boldText}>Linges.D.Waran</Text> as a
            public-interest technology experiment to bridge the linguistic divide between the
            Indian state and everyday citizens.
          </Text>

          <View style={styles.authorBadge}>
            <Text style={styles.authorRole}>Lead Designer & Fullstack Engineer</Text>
            <Text style={styles.authorName}>Linges.D.Waran</Text>
          </View>
        </View>

        {/* Open Source Links */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeading}>Open Source & Repository</Text>
          <Text style={styles.bodyText}>
            Hmm is built as transparent public digital infrastructure. The source code for the web
            frontend, Node proxy, Django RAG service, and this React Native Android app is hosted
            on GitHub.
          </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => openUrl(CONFIG.GITHUB_URL)}
            style={styles.githubButton}
          >
            <Text style={styles.githubBtnText}>⭐ View on GitHub Repository →</Text>
          </TouchableOpacity>
        </View>

        {/* Technical Architecture */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeading}>Technical Architecture</Text>
          
          <View style={styles.techRow}>
            <Text style={styles.techKey}>App Engine:</Text>
            <Text style={styles.techVal}>Bare React Native CLI 0.87 (Hermes Engine)</Text>
          </View>

          <View style={styles.techRow}>
            <Text style={styles.techKey}>Native Modules:</Text>
            <Text style={styles.techVal}>AudioBridgeModule (Kotlin + Android MediaPlayer)</Text>
          </View>

          <View style={styles.techRow}>
            <Text style={styles.techKey}>Typography:</Text>
            <Text style={styles.techVal}>Fraunces, Inter, & Noto Sans Indic family</Text>
          </View>

          <View style={styles.techRow}>
            <Text style={styles.techKey}>Backend API:</Text>
            <Text style={styles.techVal}>Multipart OCR + Gemini Grounded Pipeline</Text>
          </View>

          <View style={styles.techRow}>
            <Text style={styles.techKey}>Cloud TTS:</Text>
            <Text style={styles.techVal}>Neural SSML audio synthesis with regional voices</Text>
          </View>
        </View>

        {/* Contact / Inquiries */}
        <View style={styles.contactCard}>
          <Text style={styles.contactTitle}>Civic Tech Inquiries & Feedback</Text>
          <Text style={styles.contactBody}>
            Have suggestions for municipal document coverage or want to contribute statutory datasets?
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => openUrl('mailto:lingeswarandhanapal7@gmail.com?subject=Hmm%20App%20Inquiry')}
            style={styles.contactButton}
          >
            <Text style={styles.contactButtonText}>✉ Contact Maintainer</Text>
          </TouchableOpacity>
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
  brandCard: {
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.lg,
    borderWidth: 1.5,
    borderColor: COLORS.line,
    padding: SPACING.lg,
    alignItems: 'center',
    marginBottom: SPACING.lg,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  logoBadge: {
    width: 50,
    height: 50,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.paper,
    borderWidth: 1.5,
    borderColor: COLORS.clarityGold,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
    position: 'relative',
  },
  logoH: {
    fontFamily: FONTS.displaySemiBold,
    fontSize: 26,
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
  brandTitle: {
    fontFamily: FONTS.displaySemiBold,
    fontSize: 24,
    color: COLORS.ink,
  },
  brandSubtitle: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.inkSecondary,
    marginTop: 2,
    textAlign: 'center',
  },
  badgeRow: {
    flexDirection: 'row',
    marginTop: SPACING.md,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  specBadge: {
    backgroundColor: COLORS.goldMuted,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.clarityGold,
    marginHorizontal: 3,
    marginBottom: 4,
  },
  specText: {
    fontFamily: FONTS.medium,
    fontSize: 10,
    color: COLORS.ink,
  },
  sectionCard: {
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.line,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  sectionHeading: {
    fontFamily: FONTS.displaySemiBold,
    fontSize: 16,
    color: COLORS.ink,
    marginBottom: SPACING.xs,
  },
  bodyText: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.inkSecondary,
    lineHeight: 20,
    marginBottom: SPACING.sm,
  },
  boldText: {
    fontFamily: FONTS.semiBold,
    color: COLORS.ink,
  },
  authorBadge: {
    backgroundColor: COLORS.paper,
    padding: SPACING.sm,
    borderRadius: RADIUS.sm,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.clarityGold,
  },
  authorRole: {
    fontFamily: FONTS.regular,
    fontSize: 11,
    color: COLORS.inkTertiary,
  },
  authorName: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.ink,
    marginTop: 1,
  },
  githubButton: {
    backgroundColor: COLORS.ink,
    paddingVertical: 12,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    marginTop: SPACING.xs,
  },
  githubBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.paper,
  },
  techRow: {
    flexDirection: 'row',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F2EB',
  },
  techKey: {
    fontFamily: FONTS.semiBold,
    fontSize: 12,
    color: COLORS.ink,
    width: 110,
  },
  techVal: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.inkSecondary,
    flex: 1,
  },
  contactCard: {
    backgroundColor: COLORS.paperCard,
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    alignItems: 'center',
  },
  contactTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.ink,
    marginBottom: 4,
  },
  contactBody: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.inkSecondary,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: SPACING.md,
  },
  contactButton: {
    backgroundColor: COLORS.cardWhite,
    borderWidth: 1.5,
    borderColor: COLORS.line,
    paddingHorizontal: SPACING.lg,
    paddingVertical: 10,
    borderRadius: RADIUS.md,
  },
  contactButtonText: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.ink,
  },
});
