import { useState, type ReactNode } from 'react';
import { Copy, Check, Code, Eye } from 'lucide-react';
import { GlassButton } from '@elhalc8n/ui';

export interface ComponentPreviewProps {
  title: string;
  description?: string;
  code: string;
  children: ReactNode;
}

export function ComponentPreview({
  title,
  description,
  code,
  children,
}: ComponentPreviewProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-slate-200/70 dark:border-white/10 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md overflow-hidden shadow-sm">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200/60 dark:border-white/10 bg-white/30 dark:bg-slate-900/60">
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
        <div className="flex items-center gap-2">
          {/* Toggle Preview / Code */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200/60 dark:border-white/10">
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
                activeTab === 'preview'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Preview
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
                activeTab === 'code'
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

      {/* Body Area */}
      {activeTab === 'preview' ? (
        <div className="p-6 min-h-[160px] flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-transparent to-slate-100/20 dark:to-slate-950/20">
          {children}
        </div>
      ) : (
        <div className="p-4 bg-slate-950 text-slate-100 text-xs font-mono overflow-x-auto glass-scrollbar max-h-80">
          <pre>{code}</pre>
        </div>
      )}
    </div>
  );
}
