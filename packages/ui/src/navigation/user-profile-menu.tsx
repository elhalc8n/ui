import { useState, useRef, useEffect, useCallback } from 'react';
import { User, Settings, CreditCard, LogOut, ChevronDown, Shield } from 'lucide-react';
import { cn } from '../utils/cn';

export interface UserProfileInfo {
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

export interface UserProfileMenuProps {
  user: UserProfileInfo;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onBillingClick?: () => void;
  onSignOut?: () => void;
  align?: 'left' | 'right';
  className?: string;
}

export function UserProfileMenu({
  user,
  onProfileClick,
  onSettingsClick,
  onBillingClick,
  onSignOut,
  align = 'right',
  className,
}: UserProfileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClickOutside, handleKeyDown]);

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          'flex items-center gap-2 p-1 rounded-xl transition-all outline-none',
          'hover:bg-slate-100/70 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-200'
        )}
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-8 h-8 rounded-xl object-contain border border-slate-200/60 dark:border-white/10"
          />
        ) : (
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-indigo-700 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-indigo-500/20">
            {initials}
          </div>
        )}
        <div className="hidden md:flex flex-col text-left">
          <span className="text-xs font-semibold leading-tight text-slate-900 dark:text-white">
            {user.name}
          </span>
          {user.role && (
            <span className="text-[10px] text-slate-400 font-medium">
              {user.role}
            </span>
          )}
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
      </button>

      {/* Menu Card (Layer 3) */}
      {isOpen && (
        <div
          className={cn(
            'absolute z-50 mt-2 w-56 rounded-2xl p-1.5 shadow-2xl transition-all',
            'bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-slate-200/80 dark:border-white/10',
            'glass-specular-border animate-in fade-in zoom-in-95 duration-150',
            align === 'right' ? 'right-0 origin-top-right' : 'left-0 origin-top-left',
            className
          )}
        >
          {/* Header Info */}
          <div className="px-3 py-2.5 border-b border-slate-200/60 dark:border-white/10">
            <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
              {user.name}
            </p>
            <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
            {user.role && (
              <div className="mt-1.5 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/40">
                <Shield className="w-2.5 h-2.5" />
                <span>{user.role}</span>
              </div>
            )}
          </div>

          {/* Action Links */}
          <div className="py-1 space-y-0.5">
            {onProfileClick && (
              <button
                type="button"
                onClick={() => {
                  onProfileClick();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Profile Details</span>
              </button>
            )}

            {onSettingsClick && (
              <button
                type="button"
                onClick={() => {
                  onSettingsClick();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <Settings className="w-3.5 h-3.5 text-slate-400" />
                <span>Account Settings</span>
              </button>
            )}

            {onBillingClick && (
              <button
                type="button"
                onClick={() => {
                  onBillingClick();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                <span>Billing & Subscription</span>
              </button>
            )}
          </div>

          {/* Sign Out */}
          {onSignOut && (
            <div className="pt-1 border-t border-slate-200/60 dark:border-white/10">
              <button
                type="button"
                onClick={() => {
                  onSignOut();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

