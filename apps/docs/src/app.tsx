import { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Settings,
  Layers,
  Sparkles,
  Sliders,
  DollarSign,
  UserCheck,
  Activity,
  Server,
  Sun,
  Moon,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  ShieldCheck,
  Send,
  MoreVertical,
} from 'lucide-react';
import {
  DashboardLayout,
  GlassButton,
  GlassInput,
  GlassSelect,
  GlassBadge,
  GlassTabs,
  GlassModal,
  GlassDrawer,
  GlassDropdown,
  StatMetricCard,
  DataTable,
  DataTableToolbar,
  CommandPalette,
  BreadcrumbTrail,
} from '@elhalc8n/ui';
import { ComponentPreview } from './components/component-preview';
import { ThemeCustomizer } from './components/theme-customizer';

export function App() {
  const [currentPath, setCurrentPath] = useState('/dashboard');
  const [darkMode, setDarkMode] = useState(true);
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('tab-1');
  const [tableSearch, setTableSearch] = useState('');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [tablePage, setTablePage] = useState(1);

  // Toggle Dark / Light mode on <html>
  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    if (next) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Nav sections for AppSidebar
  const navSections = [
    {
      title: 'Dashboard',
      items: [
        {
          id: 'overview',
          label: 'Overview & Showcase',
          href: '/dashboard',
          icon: <LayoutDashboard className="w-4 h-4" />,
        },
        {
          id: 'users',
          label: 'User Management',
          href: '/users',
          icon: <Users className="w-4 h-4" />,
          badge: '1.2k',
        },
      ],
    },
    {
      title: 'Components & UI',
      items: [
        {
          id: 'primitives',
          label: 'Glass Primitives',
          href: '/primitives',
          icon: <Layers className="w-4 h-4" />,
        },
        {
          id: 'settings',
          label: 'System Settings',
          href: '/settings',
          icon: <Settings className="w-4 h-4" />,
        },
      ],
    },
  ];

  // Command palette items
  const commandItems = [
    {
      id: 'dash',
      title: 'Go to Overview Dashboard',
      category: 'Navigation',
      shortcut: 'G D',
      icon: <LayoutDashboard className="w-4 h-4" />,
      onSelect: () => setCurrentPath('/dashboard'),
    },
    {
      id: 'users',
      title: 'Manage Team Users',
      category: 'Navigation',
      shortcut: 'G U',
      icon: <Users className="w-4 h-4" />,
      onSelect: () => setCurrentPath('/users'),
    },
    {
      id: 'modal',
      title: 'Trigger Demo Glass Modal',
      category: 'Actions',
      icon: <Layers className="w-4 h-4" />,
      onSelect: () => setModalOpen(true),
    },
    {
      id: 'theme',
      title: 'Toggle Light / Dark Mode',
      category: 'Preferences',
      shortcut: '⌘ T',
      icon: darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />,
      onSelect: toggleTheme,
    },
  ];

  // Dummy table data
  const sampleUsers = [
    { id: '1', name: 'Alina Vance', email: 'alina@elhalc8n.dev', role: 'Super Admin', status: 'Active', plan: 'Enterprise' },
    { id: '2', name: 'Marcus Chen', email: 'marcus@elhalc8n.dev', role: 'Product Lead', status: 'Active', plan: 'Pro' },
    { id: '3', name: 'Sophia Miller', email: 'sophia@elhalc8n.dev', role: 'Security Ops', status: 'Pending', plan: 'Pro' },
    { id: '4', name: 'David Kim', email: 'david@elhalc8n.dev', role: 'Developer', status: 'Inactive', plan: 'Starter' },
    { id: '5', name: 'Elena Rostova', email: 'elena@elhalc8n.dev', role: 'Designer', status: 'Active', plan: 'Pro' },
  ];

  const filteredUsers = sampleUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(tableSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(tableSearch.toLowerCase()) ||
      u.role.toLowerCase().includes(tableSearch.toLowerCase())
  );

  const tableColumns = [
    {
      key: 'name',
      header: 'User',
      sortable: true,
      cell: (row: typeof sampleUsers[0]) => (
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500 to-indigo-700 flex items-center justify-center text-white text-xs font-bold">
            {row.name.charAt(0)}
          </div>
          <div>
            <div className="font-semibold text-slate-900 dark:text-white">{row.name}</div>
            <div className="text-[11px] text-slate-400">{row.email}</div>
          </div>
        </div>
      ),
    },
    { key: 'role', header: 'Role', sortable: true },
    {
      key: 'status',
      header: 'Status',
      cell: (row: typeof sampleUsers[0]) => (
        <GlassBadge
          variant={
            row.status === 'Active'
              ? 'success'
              : row.status === 'Pending'
              ? 'warning'
              : 'default'
          }
          size="sm"
          withDot
        >
          {row.status}
        </GlassBadge>
      ),
    },
    { key: 'plan', header: 'Plan' },
    {
      key: 'actions',
      header: 'Action',
      align: 'right' as const,
      cell: () => (
        <GlassDropdown
          align="right"
          trigger={
            <GlassButton variant="ghost" size="icon" className="h-7 w-7">
              <MoreVertical className="w-3.5 h-3.5" />
            </GlassButton>
          }
          items={[
            { id: 'edit', label: 'Edit Profile', icon: <Edit3 className="w-3.5 h-3.5" /> },
            { id: 'perms', label: 'Permissions', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
            'divider',
            {
              id: 'delete',
              label: 'Revoke Access',
              icon: <Trash2 className="w-3.5 h-3.5" />,
              destructive: true,
            },
          ]}
        />
      ),
    },
  ];

  return (
    <>
      <DashboardLayout
        sections={navSections}
        currentPath={currentPath}
        renderLink={({ href, children, className: linkClass }) => (
          <button
            type="button"
            onClick={() => setCurrentPath(href)}
            className={linkClass}
          >
            {children}
          </button>
        )}
        appName="@elhalc8n/ui"
        breadcrumbs={
          <BreadcrumbTrail
            items={[
              { label: 'Suite', href: '#' },
              {
                label:
                  currentPath === '/dashboard'
                    ? 'Overview'
                    : currentPath.replace('/', ''),
              },
            ]}
          />
        }
        onSearchClick={() => setCommandPaletteOpen(true)}
        topbarActions={
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Theme Toggle Button */}
            <GlassButton
              variant="glass"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle light and dark mode"
              title="Toggle theme"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </GlassButton>

            {/* Customizer trigger */}
            <GlassButton
              variant="glass"
              size="sm"
              onClick={() => setCustomizerOpen(true)}
              iconLeft={<Sliders className="w-3.5 h-3.5 text-indigo-500" />}
            >
              <span className="hidden sm:inline">Customize</span>
            </GlassButton>
          </div>
        }
        userMenu={
          <div className="flex items-center gap-2 pl-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-indigo-500/20">
              EL
            </div>
          </div>
        }
      >
        {/* Hero Banner */}
        <div className="relative rounded-3xl p-6 sm:p-8 overflow-hidden bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900/60 backdrop-blur-md border border-white/15 shadow-xl glass-specular-border">
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Modern Glassmorphism Component Suite</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Modern Glassy Admin Dashboard & Component Suite
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Unified open-source React, Next.js, and Laravel Inertia component library built on npm workspaces.
              High contrast WCAG compliance, GPU-optimized 60 FPS backdrop blurs, and specular borders.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <GlassButton
                variant="primary"
                size="sm"
                onClick={() => setModalOpen(true)}
                iconLeft={<Sparkles className="w-4 h-4" />}
              >
                Launch Live Modal Demo
              </GlassButton>
              <GlassButton
                variant="glass"
                size="sm"
                onClick={() => setDrawerOpen(true)}
                iconLeft={<ExternalLink className="w-4 h-4" />}
              >
                Open Side Drawer
              </GlassButton>
            </div>
          </div>
        </div>

        {/* Metric Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatMetricCard
            title="Total Revenue"
            value="$128,450"
            change={14.8}
            changeLabel="vs last month"
            icon={<DollarSign className="w-5 h-5" />}
            iconGlow="indigo"
          />
          <StatMetricCard
            title="Active Users"
            value="38,200"
            change={8.4}
            changeLabel="vs last month"
            icon={<UserCheck className="w-5 h-5" />}
            iconGlow="cyan"
          />
          <StatMetricCard
            title="Conversion Rate"
            value="4.65%"
            change={-1.2}
            changeLabel="vs last week"
            icon={<Activity className="w-5 h-5" />}
            iconGlow="rose"
          />
          <StatMetricCard
            title="Server Load"
            value="24.8%"
            change={0}
            changeLabel="healthy status"
            icon={<Server className="w-5 h-5" />}
            iconGlow="emerald"
          />
        </div>

        {/* Interactive Data Table Showcase */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                Team Access Management
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Data Table component with search filter, sortable headers, and pagination.
              </p>
            </div>
            <GlassButton
              variant="primary"
              size="sm"
              iconLeft={<Plus className="w-4 h-4" />}
            >
              Add Member
            </GlassButton>
          </div>

          <DataTable
            columns={tableColumns}
            data={filteredUsers}
            selectable
            selectedIds={selectedRows}
            onSelectRow={(id) => {
              setSelectedRows((prev) =>
                prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
              );
            }}
            onSelectAll={() => {
              if (selectedRows.length === filteredUsers.length) {
                setSelectedRows([]);
              } else {
                setSelectedRows(filteredUsers.map((u) => u.id));
              }
            }}
            page={tablePage}
            pageSize={5}
            totalItems={filteredUsers.length}
            onPageChange={setTablePage}
            toolbar={
              <DataTableToolbar
                searchValue={tableSearch}
                onSearchChange={setTableSearch}
                searchPlaceholder="Filter members by name or role..."
                selectedCount={selectedRows.length}
                onClearSelection={() => setSelectedRows([])}
              />
            }
          />
        </div>

        {/* Component Sandbox & Previews */}
        <div className="space-y-6 pt-4">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              Component Primitives Sandbox
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Interactive demos with one-click code copy and framework switcher.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Buttons Preview */}
            <ComponentPreview
              title="GlassButton Variants"
              description="Supports primary CTA, translucent glass, outline, ghost, danger, and loading states."
              code={`import { GlassButton } from "@elhalc8n/ui";

<GlassButton variant="primary">Primary Action</GlassButton>
<GlassButton variant="glass">Glass Surface</GlassButton>
<GlassButton variant="outline">Outline</GlassButton>
<GlassButton variant="danger">Danger</GlassButton>
<GlassButton variant="primary" loading>Loading</GlassButton>`}
            >
              <div className="flex flex-wrap items-center justify-center gap-3">
                <GlassButton variant="primary" size="sm">
                  Primary Action
                </GlassButton>
                <GlassButton variant="glass" size="sm">
                  Glass Surface
                </GlassButton>
                <GlassButton variant="outline" size="sm">
                  Outline
                </GlassButton>
                <GlassButton variant="danger" size="sm">
                  Danger
                </GlassButton>
                <GlassButton variant="primary" size="sm" loading>
                  Saving
                </GlassButton>
              </div>
            </ComponentPreview>

            {/* Badges Preview */}
            <ComponentPreview
              title="GlassBadge Variants"
              description="High-contrast status indicators with optional pulsating indicator dot."
              code={`import { GlassBadge } from "@elhalc8n/ui";

<GlassBadge variant="primary" withDot>In Progress</GlassBadge>
<GlassBadge variant="success" withDot>Deployed</GlassBadge>
<GlassBadge variant="warning" withDot>Pending Review</GlassBadge>
<GlassBadge variant="danger" withDot>Outage</GlassBadge>`}
            >
              <div className="flex flex-wrap items-center justify-center gap-3">
                <GlassBadge variant="primary" withDot>
                  In Progress
                </GlassBadge>
                <GlassBadge variant="success" withDot>
                  Deployed
                </GlassBadge>
                <GlassBadge variant="warning" withDot>
                  Pending Review
                </GlassBadge>
                <GlassBadge variant="danger" withDot>
                  Outage
                </GlassBadge>
              </div>
            </ComponentPreview>

            {/* Form Inputs Preview */}
            <ComponentPreview
              title="Glass Inputs & Selects"
              description="Translucent form fields with crisp typography and subtle specular borders."
              code={`import { GlassInput, GlassSelect } from "@elhalc8n/ui";

<GlassInput label="Email Address" placeholder="alex@company.com" />
<GlassSelect
  label="Region"
  options={[
    { label: "US East (N. Virginia)", value: "us-east-1" },
    { label: "EU Central (Frankfurt)", value: "eu-central-1" },
  ]}
/>`}
            >
              <div className="w-full max-w-sm space-y-3">
                <GlassInput
                  label="Email Address"
                  placeholder="alex@company.com"
                  defaultValue="demo@elhalc8n.dev"
                />
                <GlassSelect
                  label="Region Target"
                  options={[
                    { label: 'US East (N. Virginia)', value: 'us-east-1' },
                    { label: 'EU Central (Frankfurt)', value: 'eu-central-1' },
                    { label: 'Asia Pacific (Jakarta)', value: 'ap-southeast-3' },
                  ]}
                />
              </div>
            </ComponentPreview>

            {/* Tabs Preview */}
            <ComponentPreview
              title="Glass Tabs"
              description="Segmented and pill tab switchers with smooth active states."
              code={`import { GlassTabs } from "@elhalc8n/ui";

<GlassTabs
  variant="segmented"
  activeTab={activeTab}
  onChange={setActiveTab}
  tabs={[
    { id: "tab-1", label: "Overview" },
    { id: "tab-2", label: "Analytics" },
    { id: "tab-3", label: "Settings" },
  ]}
/>`}
            >
              <div className="space-y-4 flex flex-col items-center">
                <GlassTabs
                  variant="segmented"
                  activeTab={activeTab}
                  onChange={setActiveTab}
                  tabs={[
                    { id: 'tab-1', label: 'Overview' },
                    { id: 'tab-2', label: 'Analytics' },
                    { id: 'tab-3', label: 'Settings' },
                  ]}
                />
                <GlassTabs
                  variant="underline"
                  activeTab={activeTab}
                  onChange={setActiveTab}
                  tabs={[
                    { id: 'tab-1', label: 'General' },
                    { id: 'tab-2', label: 'Billing' },
                    { id: 'tab-3', label: 'Integrations' },
                  ]}
                />
              </div>
            </ComponentPreview>
          </div>
        </div>
      </DashboardLayout>

      {/* Demo Glass Modal */}
      <GlassModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Deploy Production Release"
        description="This will deploy version v1.0.0 of the Glassy Admin Suite across all endpoints."
        footer={
          <>
            <GlassButton
              variant="outline"
              size="sm"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </GlassButton>
            <GlassButton
              variant="primary"
              size="sm"
              onClick={() => setModalOpen(false)}
              iconRight={<Send className="w-3.5 h-3.5" />}
            >
              Confirm Deployment
            </GlassButton>
          </>
        }
      >
        <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            The build artifacts have been compiled successfully into ESM and CJS formats.
            Zero runtime dependencies are required outside of React and Tailwind CSS.
          </p>
          <div className="p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/60 border border-slate-200/60 dark:border-white/10 font-mono text-[11px]">
            Target Repositories:
            <br />• apps/docs
            <br />• apps/react-vite
            <br />• apps/nextjs-app
            <br />• apps/laravel-inertia
          </div>
        </div>
      </GlassModal>

      {/* Demo Side Drawer */}
      <GlassDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        position="right"
        size="md"
        title="Quick Action Drawer"
        description="Inspect configurations or run background operations."
        footer={
          <GlassButton
            variant="glass"
            size="sm"
            onClick={() => setDrawerOpen(false)}
            className="w-full justify-center"
          >
            Close Panel
          </GlassButton>
        }
      >
        <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300">
          <p>
            Drawers provide seamless slide-over navigation or detailed record inspection
            without losing dashboard context.
          </p>
          <div className="space-y-2">
            <span className="font-semibold text-slate-900 dark:text-white">
              Environment Settings
            </span>
            <GlassInput label="API Endpoint" defaultValue="https://api.elhalc8n.dev/v1" />
            <GlassInput label="Cluster Region" defaultValue="ap-southeast-3" />
          </div>
        </div>
      </GlassDrawer>

      {/* Theme Customizer Drawer */}
      <GlassDrawer
        isOpen={customizerOpen}
        onClose={() => setCustomizerOpen(false)}
        position="right"
        size="sm"
        title="Visual Tokens Customizer"
        description="Adjust blur, radius, and specular borders live."
      >
        <ThemeCustomizer />
      </GlassDrawer>

      {/* Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        items={commandItems}
      />
    </>
  );
}
