import { ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  fullWidth?: boolean;
}

export function Button({
  label,
  icon,
  iconPosition = 'left',
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  type = 'button',
  className = '',
  fullWidth = false,
}: ButtonProps) {
  // Primary button (nền đỏ)
  if (variant === 'primary') {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`bg-[#b9000e] content-stretch flex gap-[8px] h-[36px] items-center px-[12px] py-[6px] relative rounded-[8px] shrink-0 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#a00000] transition-colors ${fullWidth ? 'w-full' : ''} ${className}`}
      >
        {icon && iconPosition === 'left' && (
          <div className="text-white shrink-0">
            {icon}
          </div>
        )}
        {label && (
          <p className="font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
            {label}
          </p>
        )}
        {icon && iconPosition === 'right' && (
          <div className="text-white shrink-0">
            {icon}
          </div>
        )}
      </button>
    );
  }

  // Outline button (viền đỏ, nền trắng)
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-white relative rounded-[8px] shrink-0 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip px-[12px] py-[6px] relative rounded-[inherit]">
        {icon && iconPosition === 'left' && (
          <div className="text-[#b9000e] shrink-0">
            {icon}
          </div>
        )}
        {label && (
          <p className="font-medium leading-[20px] not-italic relative shrink-0 text-[#b9000e] text-[14px] whitespace-nowrap">
            {label}
          </p>
        )}
        {icon && iconPosition === 'right' && (
          <div className="text-[#b9000e] shrink-0">
            {icon}
          </div>
        )}
      </div>
      <div aria-hidden="true" className="absolute border border-[#b9000e] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </button>
  );
}
