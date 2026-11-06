import React, { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { cn } from '../utils/cn';

export interface GlassModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  children?: React.ReactNode;
  footer?: React.ReactNode;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  className?: string;
}

export function GlassModal({
  isOpen,
  onClose,
  title,
  description,
  size = 'md',
  children,
  footer,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  className,
}: GlassModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (closeOnEsc && e.key === 'Escape') {
        onClose();
      }
    },
    [closeOnEsc, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[95vw] h-[90vh]',
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/40 dark:bg-slate-950/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={() => closeOnOverlayClick && onClose()}
      />

      {/* Modal Surface (Layer 3) */}
      <div
        className={cn(
          'relative w-full overflow-hidden rounded-2xl border text-slate-900 dark:text-slate-100',
          'bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border-slate-200/80 dark:border-white/15',
          'shadow-2xl glass-specular-border z-10 animate-in zoom-in-95 duration-200',
          sizeClasses[size],
          className
        )}
      >
        {/* Header */}
        {(title || description) && (
          <div className="flex items-start justify-between p-6 pb-4 border-b border-slate-200/50 dark:border-white/10">
            <div>
              {title && (
                <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                  {title}
                </h3>
              )}
              {description && (
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {description}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 -mr-1 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 overflow-y-auto max-h-[70vh] glass-scrollbar">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 p-6 pt-4 border-t border-slate-200/50 dark:border-white/10 bg-slate-50/50 dark:bg-slate-900/40">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

