import React, { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { cn } from '../utils/cn';

export interface GlassDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: 'left' | 'right' | 'top' | 'bottom';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  className?: string;
}

export function GlassDrawer({
  isOpen,
  onClose,
  position = 'right',
  size = 'md',
  title,
  description,
  children,
  footer,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  className,
}: GlassDrawerProps) {
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

  const positionClasses = {
    right: 'inset-y-0 right-0 h-full border-l',
    left: 'inset-y-0 left-0 h-full border-r',
    top: 'inset-x-0 top-0 w-full border-b',
    bottom: 'inset-x-0 bottom-0 w-full border-t',
  };

  const horizontalSizeClasses = {
    sm: 'max-w-xs w-full',
    md: 'max-w-md w-full',
    lg: 'max-w-lg w-full',
    xl: 'max-w-2xl w-full',
  };

  const verticalSizeClasses = {
    sm: 'max-h-60 h-full',
    md: 'max-h-96 h-full',
    lg: 'max-h-[70vh] h-full',
    xl: 'max-h-[85vh] h-full',
  };

  const sizeClass =
    position === 'left' || position === 'right'
      ? horizontalSizeClasses[size]
      : verticalSizeClasses[size];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/40 dark:bg-slate-950/70 backdrop-blur-sm transition-opacity"
        onClick={() => closeOnOverlayClick && onClose()}
      />

      {/* Drawer Surface */}
      <div
        className={cn(
          'fixed z-50 flex flex-col bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl',
          'border-slate-200/80 dark:border-white/10 shadow-2xl transition-transform duration-300',
          positionClasses[position],
          sizeClass,
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200/50 dark:border-white/10">
          <div>
            {title && (
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                {title}
              </h3>
            )}
            {description && (
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-5 overflow-y-auto glass-scrollbar">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 p-4 border-t border-slate-200/50 dark:border-white/10 bg-slate-50/50 dark:bg-slate-900/40">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

