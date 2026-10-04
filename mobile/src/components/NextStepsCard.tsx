import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../theme';
import { NextStep, getTranslation } from '../data/mockData';

interface NextStepsCardProps {
  steps: NextStep[];
  langCode: string;
}

export const NextStepsCard: React.FC<NextStepsCardProps> = ({ steps, langCode }) => {
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const toggleStep = (id: string) => {
    setCompletedSteps(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const regionalFont = FONTS.getRegionalFont(langCode);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={[styles.title, { fontFamily: regionalFont }]}>
          {getTranslation(langCode, 'whatToDoNext')}
        </Text>
        <Text style={[styles.hint, { fontFamily: regionalFont }]}>
          {getTranslation(langCode, 'checklistHint')}
        </Text>
      </View>

      <View style={styles.stepsList}>
        {steps.map((step, idx) => {
          const isDone = Boolean(completedSteps[step.id]);

          return (
            <TouchableOpacity
              key={step.id || idx}
              activeOpacity={0.7}
              onPress={() => toggleStep(step.id)}
              style={[styles.stepRow, isDone && styles.stepRowDone]}
            >
              <View style={[styles.checkbox, isDone && styles.checkboxDone]}>
                {isDone && <Text style={styles.checkmark}>✓</Text>}
              </View>

              <View style={styles.stepContent}>
                <Text
                  style={[
                    styles.stepText,
                    { fontFamily: regionalFont },
                    isDone && styles.stepTextDone,
                  ]}
                >
                  {step.task}
                </Text>
                {step.deadline ? (
                  <Text style={styles.deadlineText}>Deadline: {step.deadline}</Text>
                ) : null}
              </View>
            </TouchableOpacity>
          );
        })}
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
    borderLeftWidth: 5,
    borderLeftColor: COLORS.clarityGold,
    padding: SPACING.lg,
    marginVertical: SPACING.md,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  header: {
    marginBottom: SPACING.md,
    paddingBottom: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.line,
  },
  title: {
    fontSize: 16,
    color: COLORS.ink,
    fontWeight: '700',
    marginBottom: 2,
  },
  hint: {
    fontSize: 12,
    color: COLORS.inkSecondary,
  },
  stepsList: {
    marginTop: 2,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: SPACING.sm + 2,
    borderBottomWidth: 1,
    borderBottomColor: '#F0EBE1',
  },
  stepRowDone: {
    opacity: 0.65,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.clarityGold,
    backgroundColor: COLORS.cardWhite,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
    marginTop: 2,
  },
  checkboxDone: {
    backgroundColor: COLORS.clarityGold,
    borderColor: COLORS.clarityGold,
  },
  checkmark: {
    color: COLORS.ink,
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 16,
  },
  stepContent: {
    flex: 1,
  },
  stepText: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.ink,
  },
  stepTextDone: {
    textDecorationLine: 'line-through',
    color: COLORS.inkTertiary,
  },
  deadlineText: {
    fontFamily: FONTS.medium,
    fontSize: 11,
    color: COLORS.sealRed,
    marginTop: 2,
  },
});
