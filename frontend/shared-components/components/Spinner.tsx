import { COLORS } from '../constants';

interface SpinnerProps {
  size?: number;
  color?: string;
  thickness?: number;
}

export function Spinner({ size = 20, color = COLORS.primary.main, thickness = 2 }: SpinnerProps) {
  const spinnerStyle: React.CSSProperties = {
    display: 'inline-block',
    width: `${size}px`,
    height: `${size}px`,
    border: `${thickness}px solid ${COLORS.border.light}`,
    borderTopColor: color,
    borderRadius: '50%',
    animation: 'spin 0.6s linear infinite',
  };

  return (
    <>
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={spinnerStyle} />
    </>
  );
}

// Full page loading
interface LoadingProps {
  text?: string;
}

export function Loading({ text = 'Đang tải...' }: LoadingProps) {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    padding: '40px',
  };

  const textStyle: React.CSSProperties = {
    fontSize: '14px',
    color: COLORS.text.tertiary,
    fontFamily: '"Inter", sans-serif',
  };

  return (
    <div style={containerStyle}>
      <Spinner size={32} />
      {text && <div style={textStyle}>{text}</div>}
    </div>
  );
}
