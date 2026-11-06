import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  LayoutDashboard,
} from 'lucide-react';
import { cn } from '../utils/cn';

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string | number;
  badgeVariant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  children?: Array<{
    id: string;
    label: string;
    href: string;
    icon?: React.ReactNode;
  }>;
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

export interface AppSidebarProps {
  sections: NavSection[];
  currentPath?: string;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  renderLink?: (props: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => React.ReactNode;
  logo?: React.ReactNode;
  appName?: string;
  footer?: React.ReactNode;
  className?: string;
}

export function AppSidebar({
  sections,
  currentPath = '/',
  collapsed: controlledCollapsed,
  onCollapsedChange,
  renderLink,
  logo,
  appName = 'GlassAdmin',
  footer,
  className,
}: AppSidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});

  const isCollapsed =
    controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;

  const toggleCollapsed = () => {
    const next = !isCollapsed;
    if (onCollapsedChange) {
      onCollapsedChange(next);
    } else {
      setInternalCollapsed(next);
    }
  };

  const toggleSubmenu = (id: string) => {
    setOpenSubmenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const defaultRenderLink = ({
    href,
    children,
    className: linkClass,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <a href={href} className={linkClass}>
      {children}
    </a>
  );

  const linkRenderer = renderLink || defaultRenderLink;

  return (
    <aside
      className={cn(
        'relative flex flex-col h-screen select-none transition-all duration-300 z-30',
        'bg-white/70 dark:bg-slate-900/65 backdrop-blur-md border-r border-slate-200/70 dark:border-white/10 shadow-sm dark:shadow-xl',
        isCollapsed ? 'w-20' : 'w-64',
        className
      )}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200/50 dark:border-white/10">
        <div className="flex items-center gap-3 overflow-hidden">
          {logo || (
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 shrink-0">
              <LayoutDashboard className="w-5 h-5" />
            </div>
          )}
          {!isCollapsed && (
            <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white truncate">
              {appName}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={toggleCollapsed}
          className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Nav Items List */}
      <div className="flex-1 px-3 py-4 space-y-6 overflow-y-auto glass-scrollbar">
        {sections.map((section, secIdx) => (
          <div key={secIdx} className="space-y-1">
            {section.title && !isCollapsed && (
              <p className="px-3 pb-2 text-[11px] font-semibold tracking-wider uppercase text-slate-400 dark:text-slate-500">
                {section.title}
              </p>
            )}

            {section.items.map((item) => {
              const isActive = currentPath === item.href;
              const hasChildren = item.children && item.children.length > 0;
              const isSubmenuOpen = !!openSubmenus[item.id];

              if (hasChildren && !isCollapsed) {
                return (
                  <div key={item.id} className="space-y-1">
                    <button
                      type="button"
                      onClick={() => toggleSubmenu(item.id)}
                      className={cn(
                        'w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl transition-colors',
                        'text-slate-600 dark:text-slate-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon && (
                          <span className="w-5 h-5 flex items-center justify-center shrink-0">
                            {item.icon}
                          </span>
                        )}
                        <span>{item.label}</span>
                      </div>
                      <ChevronDown
                        className={cn(
                          'w-4 h-4 transition-transform duration-200 text-slate-400',
                          isSubmenuOpen && 'transform rotate-180'
                        )}
                      />
                    </button>

                    {isSubmenuOpen && (
                      <div className="pl-9 pr-2 space-y-1 pt-1">
                        {item.children?.map((sub) => {
                          const isSubActive = currentPath === sub.href;
                          return (
                            <div key={sub.id}>
                              {linkRenderer({
                                href: sub.href,
                                className: cn(
                                  'flex items-center px-3 py-1.5 text-xs font-medium rounded-lg transition-colors',
                                  isSubActive
                                    ? 'bg-indigo-50/80 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold'
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                ),
                                children: sub.label,
                              })}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <div key={item.id}>
                  {linkRenderer({
                    href: item.href,
                    className: cn(
                      'flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-xl transition-all duration-150',
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white',
                      isCollapsed && 'justify-center px-0'
                    ),
                    children: (
                      <>
                        {item.icon && (
                          <span className="w-5 h-5 flex items-center justify-center shrink-0">
                            {item.icon}
                          </span>
                        )}
                        {!isCollapsed && (
                          <span className="flex-1 truncate">{item.label}</span>
                        )}
                        {!isCollapsed && item.badge !== undefined && (
                          <span
                            className={cn(
                              'text-[10px] px-2 py-0.5 rounded-full font-semibold',
                              isActive
                                ? 'bg-white/20 text-white'
                                : 'bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                            )}
                          >
                            {item.badge}
                          </span>
                        )}
                      </>
                    ),
                  })}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer Area */}
      {footer && (
        <div className="p-3 border-t border-slate-200/50 dark:border-white/10">
          {footer}
        </div>
      )}
    </aside>
  );
}

