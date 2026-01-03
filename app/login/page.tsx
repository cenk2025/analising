'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { LogIn, Mail, Lock, TrendingUp } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            // Redirect to dashboard
            window.location.href = '/dashboard';
        } catch (error: any) {
            setError(error.message || 'Kirjautuminen epäonnistui');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-float-delayed"></div>

            <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center relative z-10">
                {/* Left Side - Branding */}
                <div className="hidden lg:block space-y-8 animate-fade-in-up">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-2xl flex items-center justify-center animate-glow">
                                <TrendingUp className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-5xl font-black gradient-text">FinanceIQ</h1>
                        </div>
                        <p className="text-2xl text-gray-300 font-light">
                            Visualisoi <span className="neon-glow text-cyan-400">Taloustietosi</span>
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="glass-card p-6 animate-slide-in-right">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <span className="text-2xl">📊</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Edistynyt Analytiikka</h3>
                                    <p className="text-gray-400">Seuraa reaaliaikaisia taloudellisia mittareita ja trendejä</p>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-6 animate-slide-in-right-delayed">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <span className="text-2xl">🤖</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">AI-Pohjaiset Oivallukset</h3>
                                    <p className="text-gray-400">Analysoi talousraporttisi tekoälyn avulla</p>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-6 animate-slide-in-right-delayed-2">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <span className="text-2xl">🔒</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Turvallinen Alusta</h3>
                                    <p className="text-gray-400">Tietosi ovat salattuja ja turvassa</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="glass-card p-8 lg:p-12 animate-scale-in">
                    <div className="mb-8">
                        <h2 className="text-4xl font-bold text-white mb-2">Tervetuloa</h2>
                        <p className="text-gray-400">Kirjaudu tilillesi</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                Sähköposti
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="modern-input"
                                placeholder="esimerkki@email.com"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                <Lock className="w-4 h-4" />
                                Salasana
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="modern-input"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded border-gray-600 bg-gray-800" />
                                Muista minut
                            </label>
                            <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                                Unohditko salasanan?
                            </a>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="modern-btn w-full flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <div className="spinner w-5 h-5 border-2"></div>
                            ) : (
                                <>
                                    <LogIn className="w-5 h-5" />
                                    Kirjaudu Sisään
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-400">
                            Eikö sinulla ole tiliä?{' '}
                            <a href="/signup" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
                                Rekisteröidy
                            </a>
                        </p>
                    </div>

                    {/* Demo Credentials */}
                    <div className="mt-8 p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-xl">
                        <p className="text-xs text-gray-400 mb-2">Demo-tili:</p>
                        <p className="text-sm text-cyan-400">test@financeiq.com / test123</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
