import { ReactNode } from 'react';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../constants';

export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
}

const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
  success: {
    backgroundColor: COLORS.status.success.bg,
    border: `1px solid ${COLORS.status.success.border}`,
    color: COLORS.status.success.text,
  },
  warning: {
    backgroundColor: COLORS.status.warning.bg,
    border: `1px solid ${COLORS.status.warning.border}`,
    color: COLORS.status.warning.text,
  },
  error: {
    backgroundColor: COLORS.status.error.bg,
    border: `1px solid ${COLORS.status.error.border}`,
    color: COLORS.status.error.text,
  },
  info: {
    backgroundColor: COLORS.status.info.bg,
    border: `1px solid ${COLORS.status.info.border}`,
    color: COLORS.status.info.text,
  },
  neutral: {
    backgroundColor: COLORS.background.light,
    border: `1px solid ${COLORS.border.light}`,
    color: COLORS.text.secondary,
  },
};

const sizeStyles = {
  sm: {
    padding: `2px ${SPACING.sm}`,
    fontSize: TYPOGRAPHY.fontSize.xs,
  },
  md: {
    padding: `${SPACING.xs} ${SPACING.md}`,
    fontSize: TYPOGRAPHY.fontSize.sm,
  },
};

export function Badge({ children, variant = 'neutral', size = 'md' }: BadgeProps) {
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    fontFamily: TYPOGRAPHY.fontFamily.primary,
    borderRadius: BORDER_RADIUS.md,
    whiteSpace: 'nowrap',
    ...sizeStyles[size],
    ...variantStyles[variant],
  };

  return <span style={baseStyle}>{children}</span>;
}
