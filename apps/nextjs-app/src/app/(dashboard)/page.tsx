'use client';

import { useState } from 'react';
import { DollarSign, Users, Activity, Server, Download } from 'lucide-react';
import {
  StatMetricCard,
  ChartContainer,
  DataTable,
  DataTableToolbar,
  GlassButton,
  GlassBadge,
} from '@elhalc8n/ui';

export default function OverviewPage() {
  const [search, setSearch] = useState('');

  const activities = [
    { id: '1', user: 'Sarah Connor', action: 'Deployed edge cluster', env: 'Production', time: '10m ago' },
    { id: '2', user: 'John Doe', action: 'Updated security firewall rules', env: 'Staging', time: '25m ago' },
    { id: '3', user: 'Alex Vance', action: 'Provisioned Redis cluster', env: 'Production', time: '1h ago' },
    { id: '4', user: 'Emily Thorne', action: 'Renewed SSL certificate', env: 'Global CDN', time: '3h ago' },
  ];

  const filtered = activities.filter(
    (a) =>
      a.user.toLowerCase().includes(search.toLowerCase()) ||
      a.action.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      key: 'user',
      header: 'Operator',
      sortable: true,
      cell: (row: typeof activities[0]) => (
        <span className="font-semibold text-slate-900 dark:text-white">
          {row.user}
        </span>
      ),
    },
    { key: 'action', header: 'Event Action' },
    {
      key: 'env',
      header: 'Target Environment',
      cell: (row: typeof activities[0]) => (
        <GlassBadge
          variant={row.env === 'Production' ? 'primary' : 'default'}
          size="sm"
          withDot
        >
          {row.env}
        </GlassBadge>
      ),
    },
    { key: 'time', header: 'Timestamp' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Next.js App Router Dashboard
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Powered by Next.js 14 App Router and @elhalc8n/ui Modern Glassmorphism.
          </p>
        </div>
        <GlassButton variant="primary" size="sm" iconLeft={<Download className="w-3.5 h-3.5" />}>
          Export Snapshot
        </GlassButton>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatMetricCard
          title="Serverless Invocations"
          value="4.2M"
          change={19.5}
          changeLabel="vs last week"
          icon={<Server className="w-5 h-5" />}
          iconGlow="cyan"
        />
        <StatMetricCard
          title="Edge Cache Hit Rate"
          value="98.7%"
          change={0.8}
          changeLabel="optimal cache"
          icon={<Activity className="w-5 h-5" />}
          iconGlow="emerald"
        />
        <StatMetricCard
          title="Monthly Recurring Rev"
          value="$96,400"
          change={11.2}
          changeLabel="vs target"
          icon={<DollarSign className="w-5 h-5" />}
          iconGlow="indigo"
        />
        <StatMetricCard
          title="Total Subscribers"
          value="12,450"
          change={5.4}
          changeLabel="vs last month"
          icon={<Users className="w-5 h-5" />}
          iconGlow="rose"
        />
      </div>

      <ChartContainer
        title="Edge Request Latency (p99)"
        subtitle="Global average response latency across 32 regional edge locations."
        height={220}
      >
        <div className="w-full h-full flex items-end justify-around gap-2 px-6 pb-2">
          {[
            { region: 'iad1', ms: 22 },
            { region: 'fra1', ms: 28 },
            { region: 'sin1', ms: 35 },
            { region: 'syd1', ms: 42 },
            { region: 'hnd1', ms: 31 },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end">
              <div
                className="w-12 rounded-t-xl bg-gradient-to-t from-sky-600/40 to-sky-400 flex items-center justify-center text-[10px] font-mono text-white"
                style={{ height: `${item.ms * 2.2}%` }}
              >
                {item.ms}ms
              </div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase">
                {item.region}
              </span>
            </div>
          ))}
        </div>
      </ChartContainer>

      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          System Audit Trail
        </h2>
        <DataTable
          columns={columns}
          data={filtered}
          toolbar={
            <DataTableToolbar
              searchValue={search}
              onSearchChange={setSearch}
              searchPlaceholder="Filter audit records by user or action..."
            />
          }
        />
      </div>
    </div>
  );
}

