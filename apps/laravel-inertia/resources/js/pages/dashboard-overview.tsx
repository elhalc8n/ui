import { useState } from 'react';
import { Link } from '@inertiajs/react';
import {
  LayoutDashboard,
  Users,
  Settings,
  DollarSign,
  Activity,
  Server,
  Download,
} from 'lucide-react';
import {
  DashboardLayout,
  StatMetricCard,
  ChartContainer,
  DataTable,
  DataTableToolbar,
  GlassButton,
  GlassBadge,
} from '@elhalc8n/ui';

export default function DashboardOverview({
  user = { name: 'Laravel Admin', email: 'admin@laravel.local' },
  metrics = { revenue: '$142,800', activeUsers: '5,820', queueJobs: '1,240' },
}: {
  user?: { name: string; email: string };
  metrics?: { revenue: string; activeUsers: string; queueJobs: string };
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

  const jobs = [
    { id: 'job_891', queue: 'emails', status: 'Completed', attempts: '1/3', runtime: '0.42s' },
    { id: 'job_892', queue: 'reports', status: 'Processing', attempts: '1/3', runtime: '1.80s' },
    { id: 'job_893', queue: 'webhooks', status: 'Completed', attempts: '1/3', runtime: '0.15s' },
  ];

  const columns = [
    { key: 'id', header: 'Job ID', sortable: true },
    { key: 'queue', header: 'Queue Name' },
    {
      key: 'status',
      header: 'Job Status',
      cell: (row: typeof jobs[0]) => (
        <GlassBadge
          variant={row.status === 'Completed' ? 'success' : 'warning'}
          size="sm"
          withDot
        >
          {row.status}
        </GlassBadge>
      ),
    },
    { key: 'attempts', header: 'Attempts' },
    { key: 'runtime', header: 'Duration' },
  ];

  return (
    <DashboardLayout
      sections={navSections}
      currentPath="/dashboard"
      renderLink={({ href, children, className }) => (
        <Link href={href} className={className}>
          {children}
        </Link>
      )}
      appName="GlassAdmin Laravel"
      userMenu={
        <div className="flex items-center gap-2 pl-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
            LA
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Laravel 11 + Inertia.js Dashboard
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Welcome back, {user.name} ({user.email}). High-fidelity glassmorphism with Inertia client routing.
            </p>
          </div>
          <GlassButton variant="primary" size="sm" iconLeft={<Download className="w-3.5 h-3.5" />}>
            Export Telemetry
          </GlassButton>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatMetricCard
            title="Monthly Revenue"
            value={metrics.revenue}
            change={8.5}
            changeLabel="via Stripe billing"
            icon={<DollarSign className="w-5 h-5" />}
            iconGlow="indigo"
          />
          <StatMetricCard
            title="Active Eloquent Users"
            value={metrics.activeUsers}
            change={12.1}
            changeLabel="verified emails"
            icon={<Users className="w-5 h-5" />}
            iconGlow="cyan"
          />
          <StatMetricCard
            title="Horizon Queue Workers"
            value={metrics.queueJobs}
            change={0}
            changeLabel="healthy queue"
            icon={<Server className="w-5 h-5" />}
            iconGlow="emerald"
          />
        </div>

        <ChartContainer
          title="Horizon Queue Throughput"
          subtitle="Processed jobs per minute across default, reports, and emails queues."
          height={200}
        >
          <div className="flex items-center justify-center text-xs text-slate-400 gap-2">
            <Activity className="w-4 h-4 text-emerald-500" />
            <span>Horizon queues active and operating at peak throughput.</span>
          </div>
        </ChartContainer>

        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Recent Background Jobs
          </h2>
          <DataTable
            columns={columns}
            data={jobs.filter((j) =>
              j.queue.toLowerCase().includes(search.toLowerCase())
            )}
            toolbar={
              <DataTableToolbar
                searchValue={search}
                onSearchChange={setSearch}
                searchPlaceholder="Filter queue jobs..."
              />
            }
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
