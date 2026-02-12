import { ReactNode, ButtonHTMLAttributes } from 'react';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, TRANSITIONS } from '../constants';

export type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  label?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
}

const sizeStyles = {
  sm: {
    height: '32px',
    padding: `${SPACING.xs} ${SPACING.md}`,
    fontSize: TYPOGRAPHY.fontSize.sm,
  },
  md: {
    height: '36px',
    padding: `6px ${SPACING.md}`,
    fontSize: TYPOGRAPHY.fontSize.base,
  },
  lg: {
    height: '44px',
    padding: `${SPACING.sm} ${SPACING.base}`,
    fontSize: TYPOGRAPHY.fontSize.lg,
  },
};

export function Button({
  label,
  icon,
  iconPosition = 'left',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const sizeStyle = sizeStyles[size];
  
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    height: sizeStyle.height,
    padding: sizeStyle.padding,
    fontSize: sizeStyle.fontSize,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    fontFamily: TYPOGRAPHY.fontFamily.primary,
    borderRadius: BORDER_RADIUS.lg,
    border: 'none',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled || loading ? 0.5 : 1,
    transition: `all ${TRANSITIONS.base} ${TRANSITIONS.easing}`,
    width: fullWidth ? '100%' : 'auto',
    whiteSpace: 'nowrap',
  };

  const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
    primary: {
      backgroundColor: COLORS.primary.main,
      color: COLORS.neutral.white,
    },
    outline: {
      backgroundColor: COLORS.neutral.white,
      color: COLORS.primary.main,
      border: `1px solid ${COLORS.primary.main}`,
    },
    ghost: {
      backgroundColor: 'transparent',
      color: COLORS.text.secondary,
    },
    danger: {
      backgroundColor: COLORS.status.error.text,
      color: COLORS.neutral.white,
    },
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;
    
    const target = e.currentTarget;
    if (variant === 'primary') {
      target.style.backgroundColor = COLORS.primary.hover;
    } else if (variant === 'outline') {
      target.style.backgroundColor = COLORS.background.light;
    } else if (variant === 'ghost') {
      target.style.backgroundColor = COLORS.background.light;
    } else if (variant === 'danger') {
      target.style.backgroundColor = '#7d0000';
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;
    
    const target = e.currentTarget;
    if (variant === 'primary') {
      target.style.backgroundColor = COLORS.primary.main;
    } else if (variant === 'outline') {
      target.style.backgroundColor = COLORS.neutral.white;
    } else if (variant === 'ghost') {
      target.style.backgroundColor = 'transparent';
    } else if (variant === 'danger') {
      target.style.backgroundColor = COLORS.status.error.text;
    }
  };

  return (
    <button
      style={{ ...baseStyle, ...variantStyles[variant] }}
      disabled={disabled || loading}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
      {...props}
    >
      {loading && (
        <span
          style={{
            display: 'inline-block',
            width: '16px',
            height: '16px',
            border: '2px solid currentColor',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 0.6s linear infinite',
          }}
        />
      )}
      {!loading && icon && iconPosition === 'left' && <span>{icon}</span>}
      {label && <span>{label}</span>}
      {!loading && icon && iconPosition === 'right' && <span>{icon}</span>}
    </button>
  );
}
