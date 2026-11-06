import { useState, useRef, useEffect, useCallback } from 'react';
import { Bell, Check, ExternalLink } from 'lucide-react';
import { GlassButton } from '../primitives/glass-button';
import { cn } from '../utils/cn';

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read?: boolean;
  type?: 'info' | 'success' | 'warning' | 'danger';
  icon?: React.ReactNode;
}

export interface NotificationPopoverProps {
  notifications: NotificationItem[];
  onMarkAllAsRead?: () => void;
  onNotificationClick?: (id: string) => void;
  onViewAll?: () => void;
  align?: 'left' | 'right';
  className?: string;
}

export function NotificationPopover({
  notifications,
  onMarkAllAsRead,
  onNotificationClick,
  onViewAll,
  align = 'right',
  className,
}: NotificationPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

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

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      {/* Bell Trigger Button */}
      <GlassButton
        variant="glass"
        size="icon"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="View notifications"
        className="relative"
      >
        <Bell className="w-4 h-4 text-slate-600 dark:text-slate-300" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
          </span>
        )}
      </GlassButton>

      {/* Popover Card (Layer 3) */}
      {isOpen && (
        <div
          className={cn(
            'absolute z-50 mt-2 w-80 sm:w-96 rounded-2xl shadow-2xl transition-all overflow-hidden',
            'bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-slate-200/80 dark:border-white/10',
            'glass-specular-border animate-in fade-in zoom-in-95 duration-150',
            align === 'right' ? 'right-0 origin-top-right' : 'left-0 origin-top-left',
            className
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200/60 dark:border-white/10 bg-white/40 dark:bg-slate-900/60">
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-semibold text-slate-900 dark:text-white">
                Notifications
              </h4>
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  {unreadCount} new
                </span>
              )}
            </div>
            {onMarkAllAsRead && unreadCount > 0 && (
              <button
                type="button"
                onClick={onMarkAllAsRead}
                className="text-[11px] text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 transition-colors"
              >
                <Check className="w-3 h-3" />
                Mark all read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-200/40 dark:divide-white/5 glass-scrollbar">
            {notifications.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                No notifications right now.
              </div>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onNotificationClick?.(item.id);
                  }}
                  className={cn(
                    'flex items-start gap-3 p-3.5 transition-colors cursor-pointer select-none text-left',
                    !item.read
                      ? 'bg-indigo-50/40 dark:bg-indigo-950/20 hover:bg-indigo-50/70 dark:hover:bg-indigo-950/40'
                      : 'hover:bg-slate-100/60 dark:hover:bg-slate-800/40'
                  )}
                >
                  <div className="mt-0.5 shrink-0">
                    {item.icon || (
                      <div
                        className={cn(
                          'w-7 h-7 rounded-lg flex items-center justify-center text-xs border',
                          item.type === 'success' && 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
                          item.type === 'warning' && 'bg-amber-500/10 text-amber-600 border-amber-500/20',
                          item.type === 'danger' && 'bg-rose-500/10 text-rose-600 border-rose-500/20',
                          (!item.type || item.type === 'info') &&
                            'bg-indigo-500/10 text-indigo-600 border-indigo-500/20'
                        )}
                      >
                        <Bell className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                        {item.title}
                      </p>
                      <span className="text-[10px] text-slate-400 shrink-0">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                      {item.description}
                    </p>
                  </div>
                  {!item.read && (
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                  )}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {onViewAll && (
            <div className="p-2 border-t border-slate-200/60 dark:border-white/10 bg-white/40 dark:bg-slate-900/60">
              <button
                type="button"
                onClick={() => {
                  onViewAll();
                  setIsOpen(false);
                }}
                className="w-full py-1.5 text-center text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center justify-center gap-1 transition-colors"
              >
                <span>View all activity</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

