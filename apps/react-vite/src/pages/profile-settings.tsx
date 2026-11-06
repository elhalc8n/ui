import { useState } from 'react';
import { Save, Check, Bell } from 'lucide-react';
import {
  GlassCard,
  GlassCardHeader,
  GlassCardTitle,
  GlassCardDescription,
  GlassCardContent,
  GlassInput,
  GlassButton,
  GlassTabs,
} from '@elhalc8n/ui';

export function ProfileSettings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Account Settings
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Manage your personal details, workspace preferences, and security.
        </p>
      </div>

      {/* Tabs */}
      <GlassTabs
        variant="segmented"
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          { id: 'profile', label: 'Profile Details' },
          { id: 'notifications', label: 'Notifications' },
          { id: 'security', label: 'Security & Auth' },
        ]}
      />

      {activeTab === 'profile' && (
        <form onSubmit={handleSave} className="space-y-6">
          <GlassCard padding="lg" variant="default">
            <GlassCardHeader>
              <GlassCardTitle>Personal Information</GlassCardTitle>
              <GlassCardDescription>
                Update your identity and email address across the suite.
              </GlassCardDescription>
            </GlassCardHeader>
            <GlassCardContent className="space-y-4">
              <div className="flex items-center gap-4 pb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-indigo-700 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-indigo-500/25">
                  EL
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    Avatar Picture
                  </h3>
                  <p className="text-xs text-slate-500">JPG, PNG or GIF (max 2MB)</p>
                  <div className="mt-2">
                    <GlassButton variant="outline" size="xs">
                      Change Photo
                    </GlassButton>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <GlassInput label="First Name" defaultValue="Alina" />
                <GlassInput label="Last Name" defaultValue="Vance" />
              </div>
              <GlassInput label="Email Address" type="email" defaultValue="alina@elhalc8n.dev" />
              <GlassInput label="Job Title" defaultValue="Lead Systems Architect" />
            </GlassCardContent>
          </GlassCard>

          <div className="flex items-center justify-end gap-3">
            <GlassButton
              type="submit"
              variant="primary"
              size="md"
              iconLeft={saved ? <Check className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4" />}
            >
              {saved ? 'Changes Saved!' : 'Save Changes'}
            </GlassButton>
          </div>
        </form>
      )}

      {activeTab === 'notifications' && (
        <GlassCard padding="lg" variant="default" className="space-y-4">
          <GlassCardHeader>
            <GlassCardTitle>Alert Preferences</GlassCardTitle>
            <GlassCardDescription>
              Select how you want to be notified about platform events.
            </GlassCardDescription>
          </GlassCardHeader>
          <GlassCardContent className="space-y-3">
            {[
              { title: 'Security Alerts', desc: 'Critical login notices and token renewals.' },
              { title: 'Weekly Digest', desc: 'Summary of team activities and revenue performance.' },
              { title: 'Product Updates', desc: 'New components and template release announcements.' },
            ].map((item, idx) => (
              <label
                key={idx}
                className="flex items-start justify-between p-3.5 rounded-xl border border-slate-200/60 dark:border-white/10 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 cursor-pointer transition-colors"
              >
                <div className="flex items-start gap-3">
                  <Bell className="w-4 h-4 text-indigo-500 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-slate-900 dark:text-white">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-slate-500">{item.desc}</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
              </label>
            ))}
          </GlassCardContent>
        </GlassCard>
      )}

      {activeTab === 'security' && (
        <GlassCard padding="lg" variant="default" className="space-y-4">
          <GlassCardHeader>
            <GlassCardTitle>Password & Authentication</GlassCardTitle>
            <GlassCardDescription>
              Keep your credentials and sessions secure.
            </GlassCardDescription>
          </GlassCardHeader>
          <GlassCardContent className="space-y-4 max-w-md">
            <GlassInput label="Current Password" type="password" />
            <GlassInput label="New Password" type="password" />
            <GlassInput label="Confirm New Password" type="password" />
            <GlassButton variant="primary" size="sm">
              Update Password
            </GlassButton>
          </GlassCardContent>
        </GlassCard>
      )}
    </div>
  );
}
