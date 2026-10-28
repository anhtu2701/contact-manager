import { MD3LightTheme } from 'react-native-paper';

import { palette } from '@/constants/palette';

export const theme = {
  ...MD3LightTheme,
  roundness: 3,
  colors: {
    ...MD3LightTheme.colors,
    primary: palette.teal,
    onPrimary: '#FFFFFF',
    primaryContainer: palette.tealSoft,
    onPrimaryContainer: palette.tealDark,
    secondaryContainer: palette.tealSoft,
    onSecondaryContainer: palette.tealDark,
    error: palette.red,
    background: palette.background,
    surface: palette.surface,
    outline: palette.border,
    onSurface: palette.text,
    onSurfaceVariant: palette.muted,
  },
};
