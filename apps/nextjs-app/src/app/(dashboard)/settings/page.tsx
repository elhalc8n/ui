'use client';

import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardDescription, GlassCardContent, GlassInput, GlassButton } from '@elhalc8n/ui';

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Next.js Settings
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Workspace and project configurations.
        </p>
      </div>

      <GlassCard padding="lg" variant="default">
        <GlassCardHeader>
          <GlassCardTitle>General Configuration</GlassCardTitle>
          <GlassCardDescription>
            Update project metadata and environment hooks.
          </GlassCardDescription>
        </GlassCardHeader>
        <GlassCardContent className="space-y-4">
          <GlassInput label="Application Name" defaultValue="GlassAdmin Next.js" />
          <GlassInput label="Deploy Webhook" defaultValue="https://api.vercel.com/v1/integrations/deploy" />
          <GlassButton variant="primary" size="sm">
            Save Preferences
          </GlassButton>
        </GlassCardContent>
      </GlassCard>
    </div>
  );
}

