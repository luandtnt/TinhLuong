/**
 * Design System - Spacing
 * Khoảng cách chuẩn cho toàn bộ dự án
 */

export const SPACING = {
  // Base spacing units (px)
  xs: '4px',
  sm: '8px',
  md: '12px',
  base: '16px',
  lg: '20px',
  xl: '24px',
  '2xl': '32px',
  '3xl': '40px',
  '4xl': '48px',
  '5xl': '64px',

  // Component-specific spacing
  component: {
    buttonGap: '12px',
    fieldGap: '20px',
    cardGap: '24px',
    sectionGap: '32px',
  },

  // Padding presets
  padding: {
    button: {
      x: '12px',
      y: '6px',
    },
    input: {
      x: '12px',
      y: '10px',
    },
    card: '24px',
    cardCompact: '16px',
    modal: '32px',
    container: '24px',
  },
} as const;

export const BORDER_RADIUS = {
  none: '0',
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  '2xl': '16px',
  full: '9999px',
} as const;

export const SHADOWS = {
  none: 'none',
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px rgba(0, 0, 0, 0.1)',
  lg: '0 8px 16px rgba(0, 0, 0, 0.1)',
  xl: '0 10px 40px rgba(0, 0, 0, 0.15)',
  '2xl': '0 20px 60px rgba(0, 0, 0, 0.2)',
  red: '0 4px 12px rgba(185, 0, 14, 0.3)',
  redLg: '0 6px 16px rgba(185, 0, 14, 0.4)',
} as const;
