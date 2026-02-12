import { ReactNode, HTMLAttributes } from 'react';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../constants';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  border?: boolean;
  hoverable?: boolean;
}

const paddingStyles = {
  none: '0',
  sm: SPACING.base,
  md: SPACING.xl,
  lg: SPACING['2xl'],
};

export function Card({
  children,
  padding = 'md',
  shadow = 'lg',
  border = true,
  hoverable = false,
  className = '',
  style,
  ...props
}: CardProps) {
  const cardStyle: React.CSSProperties = {
    backgroundColor: COLORS.neutral.white,
    borderRadius: BORDER_RADIUS.xl,
    padding: paddingStyles[padding],
    boxShadow: SHADOWS[shadow],
    border: border ? `1px solid ${COLORS.border.light}` : 'none',
    transition: hoverable ? 'all 0.2s ease' : 'none',
    ...style,
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hoverable) {
      e.currentTarget.style.boxShadow = SHADOWS.xl;
      e.currentTarget.style.transform = 'translateY(-2px)';
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hoverable) {
      e.currentTarget.style.boxShadow = SHADOWS[shadow];
      e.currentTarget.style.transform = 'translateY(0)';
    }
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
}

// Card with Header
interface CardWithHeaderProps extends CardProps {
  title: string;
  headerAction?: ReactNode;
}

export function CardWithHeader({
  title,
  headerAction,
  children,
  ...cardProps
}: CardWithHeaderProps) {
  return (
    <Card padding="none" {...cardProps}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: SPACING.xl,
          borderBottom: `1px solid ${COLORS.border.light}`,
          backgroundColor: COLORS.background.light,
        }}
      >
        <h3
          style={{
            fontSize: '18px',
            fontWeight: 600,
            color: COLORS.text.primary,
            margin: 0,
          }}
        >
          {title}
        </h3>
        {headerAction && <div>{headerAction}</div>}
      </div>
      <div style={{ padding: SPACING.xl }}>{children}</div>
    </Card>
  );
}
