import { ReactNode, useEffect } from 'react';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS, Z_INDEX } from '../constants';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnBackdropClick?: boolean;
}

const sizeStyles = {
  sm: '400px',
  md: '600px',
  lg: '900px',
  xl: '1200px',
};

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnBackdropClick = true,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const backdropStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: Z_INDEX.modalBackdrop,
    padding: SPACING.base,
  };

  const modalStyle: React.CSSProperties = {
    backgroundColor: COLORS.neutral.white,
    borderRadius: BORDER_RADIUS['2xl'],
    boxShadow: SHADOWS['2xl'],
    width: '100%',
    maxWidth: sizeStyles[size],
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    zIndex: Z_INDEX.modal,
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${SPACING.xl} ${SPACING['2xl']}`,
    borderBottom: `1px solid ${COLORS.border.light}`,
  };

  const titleStyle: React.CSSProperties = {
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.text.primary,
    margin: 0,
    fontFamily: TYPOGRAPHY.fontFamily.primary,
  };

  const bodyStyle: React.CSSProperties = {
    padding: `${SPACING.xl} ${SPACING['2xl']}`,
    overflowY: 'auto',
    flex: 1,
  };

  const footerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: SPACING.md,
    padding: `${SPACING.lg} ${SPACING['2xl']}`,
    borderTop: `1px solid ${COLORS.border.light}`,
  };

  const closeButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    color: COLORS.text.tertiary,
    cursor: 'pointer',
    padding: SPACING.xs,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDER_RADIUS.md,
    transition: 'all 0.2s',
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div style={backdropStyle} onClick={handleBackdropClick}>
      <div style={modalStyle}>
        {/* Header */}
        {title && (
          <div style={headerStyle}>
            <h2 style={titleStyle}>{title}</h2>
            <button
              style={closeButtonStyle}
              onClick={onClose}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = COLORS.background.light;
                e.currentTarget.style.color = COLORS.text.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = COLORS.text.tertiary;
              }}
            >
              ×
            </button>
          </div>
        )}

        {/* Body */}
        <div style={bodyStyle}>{children}</div>

        {/* Footer */}
        {footer && <div style={footerStyle}>{footer}</div>}
      </div>
    </div>
  );
}

// Modal with default footer
interface ModalWithActionsProps extends Omit<ModalProps, 'footer'> {
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmLoading?: boolean;
}

export function ModalWithActions({
  onConfirm,
  onCancel,
  confirmText = 'Xác nhận',
  cancelText = 'Hủy',
  confirmLoading = false,
  onClose,
  ...modalProps
}: ModalWithActionsProps) {
  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  const footer = (
    <>
      <Button label={cancelText} variant="ghost" onClick={handleCancel} />
      <Button
        label={confirmText}
        variant="primary"
        onClick={onConfirm}
        loading={confirmLoading}
      />
    </>
  );

  return <Modal {...modalProps} onClose={onClose} footer={footer} />;
}
