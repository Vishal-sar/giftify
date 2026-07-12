import Link from 'next/link';
import { useState } from 'react';
import { Mail, Lock, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess('Login successful! Redirecting...');
      setEmail('');
      setPassword('');
      setTimeout(() => {
        // In real app, redirect to dashboard
        setSuccess('');
      }, 2000);
    } catch (err) {
      setErrors({ email: 'Invalid credentials' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid gap-8 rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] lg:grid-cols-[0.95fr_1.05fr] sm:p-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">Login</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Welcome back to Giftify</h1>
          <p className="mt-4 text-base leading-8 text-slate-600">Sign in to track orders, save addresses, and manage your gifting history.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4">
          {success && (
            <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-3 flex items-center gap-2 text-emerald-700 text-sm">
              <span className="text-lg">✓</span>
              {success}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                className={`w-full rounded-2xl border pl-12 pr-4 py-3 text-sm outline-none transition focus:ring-4 ${
                  errors.email
                    ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-100'
                    : 'border-slate-200 bg-white focus:border-orange-300 focus:ring-orange-100'
                }`}
                placeholder="you@example.com"
                disabled={loading}
              />
            </div>
            {errors.email && (
              <div className="mt-1 flex items-center gap-1 text-red-600 text-sm">
                <AlertCircle className="h-4 w-4" />
                {errors.email}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: undefined });
                }}
                className={`w-full rounded-2xl border pl-12 pr-4 py-3 text-sm outline-none transition focus:ring-4 ${
                  errors.password
                    ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-100'
                    : 'border-slate-200 bg-white focus:border-orange-300 focus:ring-orange-100'
                }`}
                placeholder="••••••"
                disabled={loading}
              />
            </div>
            {errors.password && (
              <div className="mt-1 flex items-center gap-1 text-red-600 text-sm">
                <AlertCircle className="h-4 w-4" />
                {errors.password}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>

          <p className="text-sm text-slate-600">
            New here?{' '}
            <Link href="/register" className="font-semibold text-orange-700 hover:text-orange-800">
              Create an account
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}