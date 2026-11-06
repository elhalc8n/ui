'use client';

import { useState } from 'react';
import { UserPlus } from 'lucide-react';
import {
  DataTable,
  DataTableToolbar,
  GlassButton,
  GlassBadge,
} from '@elhalc8n/ui';

export default function UsersPage() {
  const [search, setSearch] = useState('');

  const users = [
    { id: '1', name: 'Alina Vance', email: 'alina@elhalc8n.dev', role: 'Owner', status: 'Active' },
    { id: '2', name: 'Marcus Chen', email: 'marcus@elhalc8n.dev', role: 'Maintainer', status: 'Active' },
    { id: '3', name: 'Sophia Miller', email: 'sophia@elhalc8n.dev', role: 'Contributor', status: 'Pending' },
  ];

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      key: 'name',
      header: 'Member',
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
        <GlassBadge variant={row.status === 'Active' ? 'success' : 'warning'} size="sm" withDot>
          {row.status}
        </GlassBadge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Team & Access Control
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Next.js App Router subpage rendering the shared @elhalc8n/ui DataTable.
          </p>
        </div>
        <GlassButton variant="primary" size="sm" iconLeft={<UserPlus className="w-3.5 h-3.5" />}>
          Invite Collaborator
        </GlassButton>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        toolbar={
          <DataTableToolbar
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Filter members..."
          />
        }
      />
    </div>
  );
}
