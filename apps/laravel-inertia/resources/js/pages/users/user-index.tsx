import { useState } from 'react';
import { Link } from '@inertiajs/react';
import {
  LayoutDashboard,
  Users,
  Settings,
  UserPlus,
} from 'lucide-react';
import {
  DashboardLayout,
  DataTable,
  DataTableToolbar,
  GlassButton,
  GlassBadge,
} from '@elhalc8n/ui';

export default function UserIndex({
  users = [
    { id: '1', name: 'Taylor Otwell', email: 'taylor@laravel.com', role: 'Architect', status: 'Active' },
    { id: '2', name: 'Jess Archer', email: 'jess@laravel.com', role: 'Maintainer', status: 'Active' },
    { id: '3', name: 'Nuno Maduro', email: 'nuno@laravel.com', role: 'Core Engineer', status: 'Active' },
  ],
}: {
  users?: Array<{ id: string; name: string; email: string; role: string; status: string }>;
}) {
  const [search, setSearch] = useState('');

  const navSections = [
    {
      title: 'Application',
      items: [
        {
          id: 'dashboard',
          label: 'Overview',
          href: '/dashboard',
          icon: <LayoutDashboard className="w-4 h-4" />,
        },
        {
          id: 'users',
          label: 'User Directory',
          href: '/users',
          icon: <Users className="w-4 h-4" />,
        },
      ],
    },
    {
      title: 'System',
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

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      key: 'name',
      header: 'User',
      cell: (row: typeof users[0]) => (
        <div>
          <div className="font-semibold text-slate-900 dark:text-white">{row.name}</div>
          <div className="text-[11px] text-slate-400">{row.email}</div>
        </div>
      ),
    },
    { key: 'role', header: 'Role' },
    {
      key: 'status',
      header: 'Status',
      cell: (row: typeof users[0]) => (
        <GlassBadge variant="success" size="sm" withDot>
          {row.status}
        </GlassBadge>
      ),
    },
  ];

  return (
    <DashboardLayout
      sections={navSections}
      currentPath="/users"
      renderLink={({ href, children, className }) => (
        <Link href={href} className={className}>
          {children}
        </Link>
      )}
      appName="GlassAdmin Laravel"
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Laravel Eloquent User Directory
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Inertia.js dataset bound directly to @elhalc8n/ui DataTable.
            </p>
          </div>
          <GlassButton variant="primary" size="sm" iconLeft={<UserPlus className="w-3.5 h-3.5" />}>
            New User
          </GlassButton>
        </div>

        <DataTable
          columns={columns}
          data={filtered}
          toolbar={
            <DataTableToolbar
              searchValue={search}
              onSearchChange={setSearch}
              searchPlaceholder="Filter Eloquent users..."
            />
          }
        />
      </div>
    </DashboardLayout>
  );
}

