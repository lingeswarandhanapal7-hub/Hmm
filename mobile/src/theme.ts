export const COLORS = {
  paper: '#EFEBE1',
  ink: '#22262B',
  clarityGold: '#E7A928',
  sealRed: '#A63A2E',
  calmSage: '#7C8B7A',
  line: '#CFC7B4',
  paperCard: '#FAF8F3',
  cardWhite: '#FFFFFF',
  goldMuted: '#FBF3E0',
  goldBorder: '#D8991C',
  inkSecondary: '#5A626A',
  inkTertiary: '#7F8790',
  successGreen: '#2D7D46',
  successLight: '#E8F5E9',
  errorRed: '#C62828',
  errorLight: '#FFEBEE',
  shadowColor: '#22262B',
};

export const FONTS = {
  // Display & headlines
  displayMedium: 'Fraunces-Medium',
  displaySemiBold: 'Fraunces-SemiBold',

  // UI & body
  regular: 'Inter-Regular',
  medium: 'Inter-Medium',
  semiBold: 'Inter-SemiBold',

  // Regional script helpers
  getRegionalFont: (langCode: string, weight: 'regular' | 'medium' = 'regular') => {
    switch (langCode) {
      case 'ta':
        return weight === 'medium' ? 'NotoSansTamil-Medium' : 'NotoSansTamil-Regular';
      case 'hi':
      case 'mr':
        return weight === 'medium' ? 'NotoSansDevanagari-Medium' : 'NotoSansDevanagari-Regular';
      case 'te':
        return weight === 'medium' ? 'NotoSansTelugu-Medium' : 'NotoSansTelugu-Regular';
      case 'kn':
        return weight === 'medium' ? 'NotoSansKannada-Medium' : 'NotoSansKannada-Regular';
      case 'bn':
      case 'as':
        return weight === 'medium' ? 'NotoSansBengali-Medium' : 'NotoSansBengali-Regular';
      default:
        return weight === 'medium' ? 'Inter-Medium' : 'Inter-Regular';
    }
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  xxl: 36,
};

export const RADIUS = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  full: 9999,
};
