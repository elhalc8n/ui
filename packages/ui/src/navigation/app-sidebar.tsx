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
  showToggle?: boolean;
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
  showToggle = true,
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
        'relative flex flex-col h-screen select-none transition-[width] duration-300 ease-in-out z-30 shrink-0',
        'bg-white/75 dark:bg-slate-900/70 backdrop-blur-md border-r border-slate-200/70 dark:border-white/10 shadow-sm dark:shadow-xl',
        isCollapsed ? 'w-[72px]' : 'w-64',
        className
      )}
    >
      {/* Edge Toggle Floating Pill Button */}
      {showToggle && (
        <button
          type="button"
          onClick={toggleCollapsed}
          className={cn(
            'absolute -right-3 top-5 z-40 w-6 h-6 rounded-full flex items-center justify-center',
            'bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/15',
            'text-slate-500 hover:text-slate-900 dark:hover:text-white shadow-md',
            'transition-all duration-150 hover:scale-110 active:scale-95'
          )}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-3.5 h-3.5" />
          ) : (
            <ChevronLeft className="w-3.5 h-3.5" />
          )}
        </button>
      )}

      {/* Brand Header */}
      <div
        className={cn(
          'relative flex items-center h-16 border-b border-slate-200/50 dark:border-white/10 transition-all duration-300',
          isCollapsed ? 'justify-center px-2' : 'justify-between px-4'
        )}
      >
        <div className="flex items-center gap-3 overflow-hidden min-w-0">
          <div className="shrink-0 flex items-center justify-center">
            {logo || (
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <LayoutDashboard className="w-5 h-5" />
              </div>
            )}
          </div>
          {!isCollapsed && (
            <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white truncate">
              {appName}
            </span>
          )}
        </div>
      </div>

      {/* Nav Items List */}
      <div className="flex-1 px-2.5 py-4 space-y-4 overflow-y-auto glass-scrollbar overflow-x-hidden">
        {sections.map((section, secIdx) => (
          <div key={secIdx} className="space-y-1">
            {section.title && (
              isCollapsed ? (
                <div className="my-2.5 flex justify-center" title={section.title}>
                  <div className="w-5 h-px bg-slate-200/70 dark:bg-white/10" />
                </div>
              ) : (
                <p className="px-3 pb-1 text-[11px] font-semibold tracking-wider uppercase text-slate-400 dark:text-slate-500 truncate">
                  {section.title}
                </p>
              )
            )}

            {section.items.map((item) => {
              const isActive = currentPath === item.href;
              const hasChildren = item.children && item.children.length > 0;
              const isSubmenuOpen = !!openSubmenus[item.id];

              // Expandable submenu in expanded state
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
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-5 h-5 flex items-center justify-center shrink-0 text-current">
                          {item.icon}
                        </div>
                        <span className="truncate">{item.label}</span>
                      </div>
                      <ChevronDown
                        className={cn(
                          'w-4 h-4 transition-transform duration-200 text-slate-400 shrink-0',
                          isSubmenuOpen && 'transform rotate-180'
                        )}
                      />
                    </button>

                    {isSubmenuOpen && (
                      <div className="pl-8 pr-2 space-y-1 pt-0.5">
                        {item.children?.map((sub) => {
                          const isSubActive = currentPath === sub.href;
                          return (
                            <div key={sub.id}>
                              {linkRenderer({
                                href: sub.href,
                                className: cn(
                                  'flex items-center px-3 py-1.5 text-xs font-medium rounded-lg transition-colors truncate',
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

              // Standard Nav Item (and collapsed parent with children)
              return (
                <div key={item.id} className="relative group">
                  {linkRenderer({
                    href: item.href,
                    className: cn(
                      'flex items-center rounded-xl font-medium transition-all duration-150 select-none relative',
                      isCollapsed
                        ? 'w-10 h-10 mx-auto justify-center p-0'
                        : 'w-full gap-3 px-3 py-2 text-xs',
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
                    ),
                    children: (
                      <>
                        <div className="w-5 h-5 flex items-center justify-center shrink-0">
                          {item.icon}
                        </div>

                        {!isCollapsed && (
                          <span className="flex-1 truncate">{item.label}</span>
                        )}

                        {!isCollapsed && item.badge !== undefined && (
                          <span
                            className={cn(
                              'text-[10px] px-2 py-0.5 rounded-full font-semibold shrink-0',
                              isActive
                                ? 'bg-white/20 text-white'
                                : 'bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                            )}
                          >
                            {item.badge}
                          </span>
                        )}

                        {/* Collapsed Status Dot */}
                        {isCollapsed && item.badge !== undefined && (
                          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-400 ring-2 ring-white dark:ring-slate-900" />
                        )}
                      </>
                    ),
                  })}

                  {/* Floating Glass Tooltip when sidebar is collapsed */}
                  {isCollapsed && (
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1.5 rounded-xl bg-slate-900/95 dark:bg-slate-800/95 text-white text-xs font-medium shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-50 backdrop-blur-md border border-white/15 flex items-center gap-2">
                      <span>{item.label}</span>
                      {item.badge !== undefined && (
                        <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500 text-white">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer Area */}
      {footer && (
        <div
          className={cn(
            'border-t border-slate-200/50 dark:border-white/10 transition-all duration-300',
            isCollapsed ? 'p-2 flex justify-center' : 'p-3'
          )}
        >
          {footer}
        </div>
      )}
    </aside>
  );
}
