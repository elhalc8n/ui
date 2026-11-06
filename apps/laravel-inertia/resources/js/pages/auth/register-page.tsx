import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Lock, Mail, User, ArrowRight } from 'lucide-react';
import {
  AuthLayout,
  GlassInput,
  GlassButton,
} from '@elhalc8n/ui';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <AuthLayout
      title="Create Workspace Account"
      subtitle="Join your team on the Modern Glassy Admin dashboard."
      footer={
        <p>
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Sign in
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <GlassInput
          label="Full Name"
          placeholder="Jane Doe"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          iconLeft={<User className="w-4 h-4" />}
        />

        <GlassInput
          label="Work Email"
          type="email"
          placeholder="jane@company.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          iconLeft={<Mail className="w-4 h-4" />}
        />

        <GlassInput
          label="Create Password"
          type="password"
          placeholder="••••••••"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          iconLeft={<Lock className="w-4 h-4" />}
        />

        <div className="pt-2">
          <GlassButton
            type="submit"
            variant="primary"
            size="md"
            loading={loading}
            className="w-full justify-center"
            iconRight={<ArrowRight className="w-4 h-4" />}
          >
            Complete Registration
          </GlassButton>
        </div>
      </form>
    </AuthLayout>
  );
}
