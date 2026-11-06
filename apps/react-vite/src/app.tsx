import { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Settings,
  Sun,
  Moon,
} from 'lucide-react';
import {
  DashboardLayout,
  GlassButton,
  BreadcrumbTrail,
} from '@elhalc8n/ui';
import { DashboardOverview } from './pages/dashboard-overview';
import { UserManagement } from './pages/user-management';
import { ProfileSettings } from './pages/profile-settings';

export function App() {
  const [currentPath, setCurrentPath] = useState('/dashboard');
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    if (next) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const navSections = [
    {
      title: 'Management',
      items: [
        {
          id: 'overview',
          label: 'Overview',
          href: '/dashboard',
          icon: <LayoutDashboard className="w-4 h-4" />,
        },
        {
          id: 'users',
          label: 'Users',
          href: '/users',
          icon: <Users className="w-4 h-4" />,
          badge: '5',
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
      appName="GlassAdmin Vite"
      logo={
        <img
          src="/logo.png"
          alt="GlassAdmin logo"
          className="w-9 h-9 rounded-xl object-contain shadow-md shadow-indigo-500/20"
        />
      }
      breadcrumbs={
        <BreadcrumbTrail
          items={[
            { label: 'Admin', href: '#' },
            {
              label:
                currentPath === '/dashboard'
                  ? 'Overview'
                  : currentPath === '/users'
                  ? 'User Management'
                  : 'Settings',
            },
          ]}
        />
      }
      topbarActions={
        <GlassButton
          variant="glass"
          size="icon"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {darkMode ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-indigo-600" />
          )}
        </GlassButton>
      }
      userMenu={
        <div className="flex items-center gap-2 pl-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-indigo-700 flex items-center justify-center text-white text-xs font-bold">
            AV
          </div>
        </div>
      }
    >
      {currentPath === '/dashboard' && <DashboardOverview />}
      {currentPath === '/users' && <UserManagement />}
      {currentPath === '/settings' && <ProfileSettings />}
    </DashboardLayout>
  );
}

