import React, { useState } from 'react';
import { AppSidebar, NavSection } from '../navigation/app-sidebar';
import { TopNavbar } from '../navigation/top-navbar';
import { GlassDrawer } from '../primitives/glass-drawer';
import { cn } from '../utils/cn';

export interface DashboardLayoutProps {
  sections: NavSection[];
  currentPath?: string;
  renderLink?: (props: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => React.ReactNode;
  logo?: React.ReactNode;
  appName?: string;
  breadcrumbs?: React.ReactNode;
  onSearchClick?: () => void;
  topbarActions?: React.ReactNode;
  userMenu?: React.ReactNode;
  sidebarFooter?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function DashboardLayout({
  sections,
  currentPath = '/',
  renderLink,
  logo,
  appName = 'GlassAdmin',
  breadcrumbs,
  onSearchClick,
  topbarActions,
  userMenu,
  sidebarFooter,
  children,
  className,
}: DashboardLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="glass-ambient-canvas flex h-screen overflow-hidden text-slate-900 dark:text-slate-100">
      {/* Desktop Sidebar (Layer 1) */}
      <div className="hidden lg:flex shrink-0">
        <AppSidebar
          sections={sections}
          currentPath={currentPath}
          renderLink={renderLink}
          logo={logo}
          appName={appName}
          footer={sidebarFooter}
          collapsed={sidebarCollapsed}
          onCollapsedChange={setSidebarCollapsed}
        />
      </div>

      {/* Mobile Sidebar in Glass Drawer */}
      <GlassDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        position="left"
        size="sm"
        title={appName}
      >
        <AppSidebar
          sections={sections}
          currentPath={currentPath}
          renderLink={(props) => {
            const childWithClose = React.cloneElement(
              renderLink ? (renderLink(props) as React.ReactElement) : <a {...props} />,
              {
                onClick: () => setMobileMenuOpen(false),
              }
            );
            return childWithClose;
          }}
          logo={logo}
          appName={appName}
          footer={sidebarFooter}
          collapsed={false}
          showToggle={false}
          className="w-full h-full border-none shadow-none bg-transparent"
        />
      </GlassDrawer>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        {/* Top Navbar (Layer 1) */}
        <TopNavbar
          breadcrumbs={breadcrumbs}
          onMenuClick={() => setMobileMenuOpen(true)}
          onSearchClick={onSearchClick}
          actions={topbarActions}
          userMenu={userMenu}
        />

        {/* Content Body */}
        <main
          className={cn(
            'flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 glass-scrollbar',
            className
          )}
        >
          <div className="max-w-7xl mx-auto space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
}

