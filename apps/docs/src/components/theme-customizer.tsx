import { useState, useEffect } from 'react';
import { Sliders, Copy, Check, Sparkles } from 'lucide-react';
import { GlassButton } from '@elhalc8n/ui';

export function ThemeCustomizer() {
  const [blurValue, setBlurValue] = useState(12);
  const [reducedTransp, setReducedTransp] = useState(false);
  const [accent, setAccent] = useState('indigo');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (reducedTransp) {
      root.style.setProperty('--elhalc8n-glass-blur-md', '0px');
      root.style.setProperty('--elhalc8n-glass-blur-sm', '0px');
    } else {
      root.style.setProperty('--elhalc8n-glass-blur-md', `${blurValue}px`);
      root.style.setProperty('--elhalc8n-glass-blur-sm', `${Math.max(2, Math.round(blurValue / 3))}px`);
    }
  }, [blurValue, reducedTransp]);

  const cssSnippet = `:root {
  --elhalc8n-glass-blur-sm: ${reducedTransp ? '0px' : `${Math.max(2, Math.round(blurValue / 3))}px`};
  --elhalc8n-glass-blur-md: ${reducedTransp ? '0px' : `${blurValue}px`};
  --elhalc8n-glass-accent: '${accent}';
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cssSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const accents = [
    { id: 'indigo', label: 'Indigo', color: 'bg-indigo-500' },
    { id: 'cyan', label: 'Cyan', color: 'bg-cyan-500' },
    { id: 'emerald', label: 'Emerald', color: 'bg-emerald-500' },
    { id: 'rose', label: 'Rose', color: 'bg-rose-500' },
    { id: 'purple', label: 'Purple', color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 pb-2 border-b border-slate-200/60 dark:border-white/10">
        <Sliders className="w-4 h-4 text-indigo-500" />
        <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
          Glass Theme Customizer
        </h4>
      </div>

      {/* Blur slider */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-slate-600 dark:text-slate-400 font-medium">
            Backdrop Blur
          </span>
          <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">
            {reducedTransp ? '0px (reduced)' : `${blurValue}px`}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="32"
          step="2"
          disabled={reducedTransp}
          value={blurValue}
          onChange={(e) => setBlurValue(Number(e.target.value))}
          className="w-full accent-indigo-600 cursor-pointer disabled:opacity-50"
        />
      </div>

      {/* Reduced Transparency Toggle */}
      <label className="flex items-center justify-between cursor-pointer text-xs">
        <span className="text-slate-600 dark:text-slate-400">
          Simulate Reduced Transparency
        </span>
        <input
          type="checkbox"
          checked={reducedTransp}
          onChange={(e) => setReducedTransp(e.target.checked)}
          className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
        />
      </label>

      {/* Accent selection */}
      <div className="space-y-2">
        <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
          Accent Glow Preset
        </span>
        <div className="flex items-center gap-2">
          {accents.map((acc) => (
            <button
              key={acc.id}
              type="button"
              onClick={() => setAccent(acc.id)}
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${acc.color} ${
                accent === acc.id
                  ? 'ring-2 ring-offset-2 ring-indigo-500 dark:ring-offset-slate-900 scale-110'
                  : 'opacity-70 hover:opacity-100'
              }`}
              title={acc.label}
            >
              {accent === acc.id && <Sparkles className="w-3.5 h-3.5 text-white" />}
            </button>
          ))}
        </div>
      </div>

      {/* Copy CSS config */}
      <div className="pt-2">
        <GlassButton
          variant="glass"
          size="sm"
          onClick={handleCopy}
          className="w-full justify-center"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-500 mr-1.5" />
          ) : (
            <Copy className="w-3.5 h-3.5 mr-1.5" />
          )}
          {copied ? 'Copied Configuration!' : 'Copy CSS Tokens'}
        </GlassButton>
      </div>
    </div>
  );
}
