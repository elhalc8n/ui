import { useState, type ReactNode } from 'react';
import { Copy, Check, Code, Eye } from 'lucide-react';
import { GlassButton } from '@elhalc8n/ui';

export interface FrameworkSnippets {
  react?: string;
  next?: string;
  inertia?: string;
}

export interface ComponentPreviewProps {
  title: string;
  description?: string;
  code: string | FrameworkSnippets;
  children: ReactNode;
}

export function ComponentPreview({
  title,
  description,
  code,
  children,
}: ComponentPreviewProps) {
  const [activeView, setActiveView] = useState<'preview' | 'code'>('preview');
  const [selectedFramework, setSelectedFramework] = useState<'react' | 'next' | 'inertia'>('react');
  const [copied, setCopied] = useState(false);

  const isMultiFramework = typeof code === 'object';

  const currentCode = isMultiFramework
    ? code[selectedFramework] || code.react || ''
    : code;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-slate-200/70 dark:border-white/10 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md overflow-hidden shadow-sm">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3.5 border-b border-slate-200/60 dark:border-white/10 bg-white/30 dark:bg-slate-900/60">
        <div>
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
            {title}
          </h4>
          {description && (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {description}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* Toggle Preview / Code */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200/60 dark:border-white/10">
            <button
              type="button"
              onClick={() => setActiveView('preview')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
                activeView === 'preview'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Preview
            </button>
            <button
              type="button"
              onClick={() => setActiveView('code')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
                activeView === 'code'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              Code
            </button>
          </div>

          {/* Copy Button */}
          <GlassButton
            variant="ghost"
            size="xs"
            onClick={handleCopy}
            className="text-slate-500 hover:text-slate-900 dark:hover:text-white"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span className="ml-1 text-[11px]">{copied ? 'Copied' : 'Copy'}</span>
          </GlassButton>
        </div>
      </div>

      {/* Framework Switcher (shown when code view is active and multi-framework is provided) */}
      {activeView === 'code' && isMultiFramework && (
        <div className="flex items-center gap-2 px-5 py-2 border-b border-slate-200/50 dark:border-white/10 bg-slate-50/50 dark:bg-slate-900/40 text-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">
            Framework:
          </span>
          {(['react', 'next', 'inertia'] as const).map((fw) => (
            <button
              key={fw}
              type="button"
              onClick={() => setSelectedFramework(fw)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedFramework === fw
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
              }`}
            >
              {fw === 'react' ? 'React (Vite)' : fw === 'next' ? 'Next.js' : 'Laravel Inertia'}
            </button>
          ))}
        </div>
      )}

      {/* Body Area */}
      {activeView === 'preview' ? (
        <div className="p-6 min-h-[160px] flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-transparent to-slate-100/20 dark:to-slate-950/20">
          {children}
        </div>
      ) : (
        <div className="p-4 bg-slate-950 text-slate-100 text-xs font-mono overflow-x-auto glass-scrollbar max-h-80">
          <pre>{currentCode}</pre>
        </div>
      )}
    </div>
  );
}
