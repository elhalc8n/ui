import { useState } from 'react';
import {
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Users,
  Download,
  Calendar,
} from 'lucide-react';
import {
  StatMetricCard,
  ChartContainer,
  DataTable,
  DataTableToolbar,
  GlassButton,
  GlassBadge,
} from '@elhalc8n/ui';

export function DashboardOverview() {
  const [search, setSearch] = useState('');

  const recentTransactions = [
    { id: 'TX-1049', customer: 'Acme Corp', amount: '$4,250.00', status: 'Completed', date: '2026-11-06' },
    { id: 'TX-1050', customer: 'Starlight Media', amount: '$1,890.00', status: 'Processing', date: '2026-11-06' },
    { id: 'TX-1051', customer: 'Nexus Cloud Ltd', amount: '$7,300.00', status: 'Completed', date: '2026-11-05' },
    { id: 'TX-1052', customer: 'Hyperion Labs', amount: '$940.00', status: 'Failed', date: '2026-11-04' },
    { id: 'TX-1053', customer: 'Krypton Design', amount: '$3,120.00', status: 'Completed', date: '2026-11-04' },
  ];

  const filtered = recentTransactions.filter(
    (t) =>
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.customer.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { key: 'id', header: 'Invoice ID', sortable: true },
    {
      key: 'customer',
      header: 'Customer',
      sortable: true,
      cell: (row: typeof recentTransactions[0]) => (
        <span className="font-semibold text-slate-900 dark:text-white">
          {row.customer}
        </span>
      ),
    },
    { key: 'amount', header: 'Amount', sortable: true },
    {
      key: 'status',
      header: 'Status',
      cell: (row: typeof recentTransactions[0]) => (
        <GlassBadge
          variant={
            row.status === 'Completed'
              ? 'success'
              : row.status === 'Processing'
              ? 'warning'
              : 'danger'
          }
          size="sm"
          withDot
        >
          {row.status}
        </GlassBadge>
      ),
    },
    { key: 'date', header: 'Date' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Welcome & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Performance Overview
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time analytics and platform performance metrics.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <GlassButton variant="outline" size="sm" iconLeft={<Calendar className="w-3.5 h-3.5" />}>
            Last 30 Days
          </GlassButton>
          <GlassButton variant="primary" size="sm" iconLeft={<Download className="w-3.5 h-3.5" />}>
            Export Report
          </GlassButton>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatMetricCard
          title="Total Gross Revenue"
          value="$84,290"
          change={12.4}
          changeLabel="vs last month"
          icon={<DollarSign className="w-5 h-5" />}
          iconGlow="indigo"
        />
        <StatMetricCard
          title="Active Subscriptions"
          value="1,420"
          change={6.1}
          changeLabel="vs last month"
          icon={<Users className="w-5 h-5" />}
          iconGlow="cyan"
        />
        <StatMetricCard
          title="Completed Orders"
          value="4,892"
          change={18.3}
          changeLabel="vs last month"
          icon={<ShoppingCart className="w-5 h-5" />}
          iconGlow="emerald"
        />
        <StatMetricCard
          title="Net Profit Growth"
          value="+32.4%"
          change={4.2}
          changeLabel="vs Q3 forecast"
          icon={<TrendingUp className="w-5 h-5" />}
          iconGlow="rose"
        />
      </div>

      {/* Analytics Chart Showcase */}
      <ChartContainer
        title="Revenue & Growth Trajectory"
        subtitle="Monthly recurring revenue distribution (MRR) across all regions."
        height={240}
        actions={
          <div className="flex items-center gap-2">
            <GlassBadge variant="primary">Updated Just Now</GlassBadge>
          </div>
        }
      >
        <div className="w-full h-full flex items-end justify-between gap-3 px-4 pb-2">
          {[
            { month: 'Jun', val: 40 },
            { month: 'Jul', val: 55 },
            { month: 'Aug', val: 70 },
            { month: 'Sep', val: 65 },
            { month: 'Oct', val: 85 },
            { month: 'Nov', val: 95 },
          ].map((bar, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
              <div
                className="w-full max-w-[48px] rounded-t-xl bg-gradient-to-t from-indigo-600/40 to-indigo-500 hover:to-indigo-400 transition-all cursor-pointer relative group"
                style={{ height: `${bar.val}%` }}
              >
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-white shadow-xs pointer-events-none">
                  {bar.val}k
                </div>
              </div>
              <span className="text-[11px] text-slate-400">{bar.month}</span>
            </div>
          ))}
        </div>
      </ChartContainer>

      {/* Recent Invoices Table */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          Recent Invoices
        </h2>
        <DataTable
          columns={columns}
          data={filtered}
          toolbar={
            <DataTableToolbar
              searchValue={search}
              onSearchChange={setSearch}
              searchPlaceholder="Filter invoice by customer or ID..."
            />
          }
        />
      </div>
    </div>
  );
}

