import Link from 'next/link';
import { useState } from 'react';
import { User, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and numbers';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
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
      setSuccess('Account created successfully! Redirecting to login...');
      setFormData({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
      setTimeout(() => {
        // In real app, redirect to login
        setSuccess('');
      }, 2000);
    } catch (err) {
      setErrors({ email: 'Email already exists' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid gap-8 rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] lg:grid-cols-[0.95fr_1.05fr] sm:p-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">Register</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Create your Giftify account</h1>
          <p className="mt-4 text-base leading-8 text-slate-600">Save your profile, checkout faster, and keep all orders in one place.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
          {success && (
            <div className="sm:col-span-2 rounded-2xl bg-emerald-50 border border-emerald-200 p-3 flex items-center gap-2 text-emerald-700 text-sm">
              <CheckCircle className="h-5 w-5" />
              {success}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">First name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full rounded-2xl border pl-12 pr-4 py-3 text-sm outline-none transition focus:ring-4 ${
                  errors.firstName
                    ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-100'
                    : 'border-slate-200 bg-white focus:border-orange-300 focus:ring-orange-100'
                }`}
                placeholder="John"
                disabled={loading}
              />
            </div>
            {errors.firstName && (
              <div className="mt-1 flex items-center gap-1 text-red-600 text-sm">
                <AlertCircle className="h-4 w-4" />
                {errors.firstName}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Last name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full rounded-2xl border pl-12 pr-4 py-3 text-sm outline-none transition focus:ring-4 ${
                  errors.lastName
                    ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-100'
                    : 'border-slate-200 bg-white focus:border-orange-300 focus:ring-orange-100'
                }`}
                placeholder="Doe"
                disabled={loading}
              />
            </div>
            {errors.lastName && (
              <div className="mt-1 flex items-center gap-1 text-red-600 text-sm">
                <AlertCircle className="h-4 w-4" />
                {errors.lastName}
              </div>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full rounded-2xl border pl-12 pr-4 py-3 text-sm outline-none transition focus:ring-4 ${
                  errors.password
                    ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-100'
                    : 'border-slate-200 bg-white focus:border-orange-300 focus:ring-orange-100'
                }`}
                placeholder="••••••••"
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

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">Confirm password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full rounded-2xl border pl-12 pr-4 py-3 text-sm outline-none transition focus:ring-4 ${
                  errors.confirmPassword
                    ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-100'
                    : 'border-slate-200 bg-white focus:border-orange-300 focus:ring-orange-100'
                }`}
                placeholder="••••••••"
                disabled={loading}
              />
            </div>
            {errors.confirmPassword && (
              <div className="mt-1 flex items-center gap-1 text-red-600 text-sm">
                <AlertCircle className="h-4 w-4" />
                {errors.confirmPassword}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-70 disabled:cursor-not-allowed sm:col-span-2"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>

          <p className="text-sm text-slate-600 sm:col-span-2">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-orange-700 hover:text-orange-800">
              Sign in
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}