import { ReactNode } from 'react';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../constants';

export type AlertVariant = 'success' | 'warning' | 'error' | 'info';

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
  icon?: ReactNode;
  onClose?: () => void;
}

const variantStyles: Record<AlertVariant, React.CSSProperties> = {
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
};

export function Alert({ variant = 'info', title, children, icon, onClose }: AlertProps) {
  const baseStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: SPACING.md,
    padding: SPACING.base,
    borderRadius: BORDER_RADIUS.lg,
    fontFamily: TYPOGRAPHY.fontFamily.primary,
    ...variantStyles[variant],
  };

  const titleStyle: React.CSSProperties = {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    marginBottom: SPACING.xs,
  };

  const contentStyle: React.CSSProperties = {
    fontSize: TYPOGRAPHY.fontSize.sm,
    lineHeight: TYPOGRAPHY.lineHeight.normal,
  };

  const closeButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    padding: 0,
    marginLeft: 'auto',
    color: 'inherit',
    opacity: 0.7,
  };

  return (
    <div style={baseStyle}>
      {icon && <div style={{ flexShrink: 0, marginTop: '2px' }}>{icon}</div>}
      <div style={{ flex: 1 }}>
        {title && <div style={titleStyle}>{title}</div>}
        <div style={contentStyle}>{children}</div>
      </div>
      {onClose && (
        <button
          style={closeButtonStyle}
          onClick={onClose}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.7')}
        >
          ×
        </button>
      )}
    </div>
  );
}
