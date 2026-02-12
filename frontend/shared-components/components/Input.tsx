import { InputHTMLAttributes, forwardRef } from 'react';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, TRANSITIONS } from '../constants';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  fullWidth?: boolean;
  inputSize?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
  sm: { height: '36px', fontSize: TYPOGRAPHY.fontSize.sm },
  md: { height: '40px', fontSize: TYPOGRAPHY.fontSize.base },
  lg: { height: '44px', fontSize: TYPOGRAPHY.fontSize.lg },
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      required = false,
      fullWidth = true,
      inputSize = 'md',
      className = '',
      ...props
    },
    ref
  ) => {
    const sizeStyle = sizeStyles[inputSize];

    const inputStyle: React.CSSProperties = {
      width: fullWidth ? '100%' : 'auto',
      height: sizeStyle.height,
      padding: `0 ${SPACING.md}`,
      fontSize: sizeStyle.fontSize,
      fontFamily: TYPOGRAPHY.fontFamily.primary,
      color: COLORS.text.primary,
      backgroundColor: COLORS.neutral.white,
      border: `1px solid ${error ? COLORS.status.error.border : COLORS.border.light}`,
      borderRadius: BORDER_RADIUS.lg,
      outline: 'none',
      transition: `all ${TRANSITIONS.base} ${TRANSITIONS.easing}`,
    };

    const labelStyle: React.CSSProperties = {
      display: 'block',
      fontSize: TYPOGRAPHY.fontSize.base,
      fontWeight: TYPOGRAPHY.fontWeight.semibold,
      color: COLORS.text.secondary,
      marginBottom: SPACING.sm,
      fontFamily: TYPOGRAPHY.fontFamily.primary,
    };

    const errorStyle: React.CSSProperties = {
      fontSize: TYPOGRAPHY.fontSize.sm,
      color: COLORS.status.error.text,
      marginTop: SPACING.xs,
      fontFamily: TYPOGRAPHY.fontFamily.primary,
    };

    const helperStyle: React.CSSProperties = {
      fontSize: TYPOGRAPHY.fontSize.sm,
      color: COLORS.text.muted,
      marginTop: SPACING.xs,
      fontFamily: TYPOGRAPHY.fontFamily.primary,
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      e.target.style.borderColor = COLORS.primary.main;
      e.target.style.boxShadow = `0 0 0 2px ${COLORS.primary.main}33`;
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      e.target.style.borderColor = error ? COLORS.status.error.border : COLORS.border.light;
      e.target.style.boxShadow = 'none';
    };

    return (
      <div style={{ marginBottom: SPACING.lg }}>
        {label && (
          <label style={labelStyle}>
            {label}
            {required && (
              <span style={{ color: COLORS.primary.main, marginLeft: '4px' }}>*</span>
            )}
          </label>
        )}
        <input
          ref={ref}
          style={inputStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={className}
          {...props}
        />
        {error && <div style={errorStyle}>{error}</div>}
        {!error && helperText && <div style={helperStyle}>{helperText}</div>}
      </div>
    );
  }
);

Input.displayName = 'Input';
