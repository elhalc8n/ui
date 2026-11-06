import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import {
  AuthLayout,
  GlassInput,
  GlassButton,
} from '@elhalc8n/ui';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // simulated Inertia post
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your Glassy Admin dashboard to continue."
      logo={
        <img
          src="/logo.png"
          alt="Brand logo"
          className="w-14 h-14 rounded-2xl object-contain shadow-xl shadow-indigo-500/20"
        />
      }
      footer={
        <p>
          Don&apos;t have an account yet?{' '}
          <Link
            href="/register"
            className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Create an account
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <GlassInput
          label="Email Address"
          type="email"
          placeholder="admin@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          iconLeft={<Mail className="w-4 h-4" />}
        />

        <GlassInput
          label="Password"
          type="password"
          placeholder="••••••••"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          iconLeft={<Lock className="w-4 h-4" />}
        />

        <div className="flex items-center justify-between text-xs pt-1">
          <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-300">
            <input
              type="checkbox"
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            />
            Remember me
          </label>
          <a
            href="/forgot-password"
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Forgot password?
          </a>
        </div>

        <div className="pt-2">
          <GlassButton
            type="submit"
            variant="primary"
            size="md"
            loading={loading}
            className="w-full justify-center"
            iconRight={<ArrowRight className="w-4 h-4" />}
          >
            Sign In to Dashboard
          </GlassButton>
        </div>
      </form>
    </AuthLayout>
  );
}
