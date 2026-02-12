/**
 * Design System - Colors
 * Màu sắc chuẩn cho toàn bộ dự án
 */

export const COLORS = {
  // Primary Colors (Màu chính)
  primary: {
    main: '#b9000e',
    hover: '#a00000',
    active: '#7d0000',
    light: '#d4001a',
  },

  // Neutral Colors (Màu trung tính)
  neutral: {
    white: '#ffffff',
    black: '#000000',
    gray: {
      50: '#f8f9fa',
      100: '#f5f5f5',
      200: '#f3f4f6',
      300: '#efefef',
      400: '#e5e7eb',
      500: '#d1d5db',
      600: '#c9cdd4',
      700: '#bdbdbd',
      800: '#999999',
      900: '#666666',
    },
  },

  // Text Colors (Màu chữ)
  text: {
    primary: '#1a1a1a',
    secondary: '#333333',
    tertiary: '#666666',
    muted: '#999999',
    disabled: '#adb5bd',
  },

  // Border Colors (Màu viền)
  border: {
    light: '#e5e7eb',
    medium: '#d1d5db',
    dark: '#c9cdd4',
  },

  // Background Colors (Màu nền)
  background: {
    white: '#ffffff',
    light: '#f8f9fa',
    gray: '#f5f5f5',
  },

  // Status Colors (Màu trạng thái)
  status: {
    success: {
      bg: '#f0fdf4',
      border: '#bbf7d0',
      text: '#166534',
    },
    warning: {
      bg: '#fffbeb',
      border: '#fde68a',
      text: '#92400e',
    },
    error: {
      bg: '#fef2f2',
      border: '#fecaca',
      text: '#991b1b',
    },
    info: {
      bg: '#f0f7ff',
      border: '#bfdbfe',
      text: '#1e40af',
    },
  },
} as const;

// Export individual color groups for convenience
export const PRIMARY_COLORS = COLORS.primary;
export const NEUTRAL_COLORS = COLORS.neutral;
export const TEXT_COLORS = COLORS.text;
export const BORDER_COLORS = COLORS.border;
export const BACKGROUND_COLORS = COLORS.background;
export const STATUS_COLORS = COLORS.status;
