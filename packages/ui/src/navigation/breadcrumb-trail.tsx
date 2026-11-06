import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '../utils/cn';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbTrailProps {
  items: BreadcrumbItem[];
  renderLink?: (props: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => React.ReactNode;
  showHome?: boolean;
  homeHref?: string;
  className?: string;
}

export function BreadcrumbTrail({
  items,
  renderLink,
  showHome = true,
  homeHref = '/',
  className,
}: BreadcrumbTrailProps) {
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
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center text-xs font-medium text-slate-500 dark:text-slate-400', className)}
    >
      <ol className="flex items-center space-x-2">
        {showHome && (
          <li className="flex items-center">
            {linkRenderer({
              href: homeHref,
              className:
                'hover:text-slate-900 dark:hover:text-white transition-colors p-1 rounded-md hover:bg-slate-100/60 dark:hover:bg-slate-800/60',
              children: <Home className="w-3.5 h-3.5" />,
            })}
          </li>
        )}

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center space-x-2">
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 shrink-0" />
              {isLast || !item.href ? (
                <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                  {item.icon && <span className="shrink-0">{item.icon}</span>}
                  {item.label}
                </span>
              ) : (
                linkRenderer({
                  href: item.href,
                  className:
                    'hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1.5 p-1 rounded-md hover:bg-slate-100/60 dark:hover:bg-slate-800/60',
                  children: (
                    <>
                      {item.icon && <span className="shrink-0">{item.icon}</span>}
                      {item.label}
                    </>
                  ),
                })
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

