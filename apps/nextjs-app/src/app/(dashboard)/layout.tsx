'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Settings,
} from 'lucide-react';
import {
  DashboardLayout,
  BreadcrumbTrail,
} from '@elhalc8n/ui';

export default function NextDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navSections = [
    {
      title: 'Navigation',
      items: [
        {
          id: 'overview',
          label: 'Overview',
          href: '/',
          icon: <LayoutDashboard className="w-4 h-4" />,
        },
        {
          id: 'users',
          label: 'Users & Roles',
          href: '/users',
          icon: <Users className="w-4 h-4" />,
          badge: 'Team',
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          id: 'settings',
          label: 'Settings',
          href: '/settings',
          icon: <Settings className="w-4 h-4" />,
        },
      ],
    },
  ];

  return (
    <DashboardLayout
      sections={navSections}
      currentPath={pathname}
      renderLink={({ href, children: linkChildren, className }) => (
        <Link href={href} className={className}>
          {linkChildren}
        </Link>
      )}
      appName="GlassAdmin Next.js"
      logo={
        <img
          src="/logo.png"
          alt="GlassAdmin Next.js logo"
          className="w-9 h-9 rounded-xl object-contain shadow-md shadow-sky-500/20"
        />
      }
      breadcrumbs={
        <BreadcrumbTrail
          items={[
            { label: 'Next App', href: '/' },
            {
              label:
                pathname === '/'
                  ? 'Overview'
                  : pathname.replace('/', '').toUpperCase(),
            },
          ]}
        />
      }
      userMenu={
        <div className="flex items-center gap-2 pl-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
            NX
          </div>
        </div>
      }
    >
      {children}
    </DashboardLayout>
  );
}

