'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { mockDashboardData } from '@/lib/mockData';
import ModernChart from '@/components/ModernChart';
import ModernMetricCard from '@/components/ModernMetricCard';
import PDFUploader from '@/components/PDFUploader';
import {
    DollarSign,
    TrendingUp,
    PieChart,
    Activity,
    BarChart3,
    Users,
    LogOut,
    Menu,
    X,
    Bell,
    Settings
} from 'lucide-react';

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState('overview');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [user, setUser] = useState<any>(null);
    const data = mockDashboardData;

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            window.location.href = '/login';
        } else {
            setUser(user);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = '/login';
    };

    const latestMetrics = data.metrics[data.metrics.length - 1];
    const previousMetrics = data.metrics[data.metrics.length - 2];

    const calculateChange = (current: number, previous: number) => {
        return ((current - previous) / previous) * 100;
    };

    const tabs = [
        { id: 'overview', label: 'Yleiskatsaus', icon: <Activity className="w-5 h-5" /> },
        { id: 'metrics', label: 'Taloudelliset Mittarit', icon: <BarChart3 className="w-5 h-5" /> },
        { id: 'segments', label: 'Segmenttianalyysi', icon: <PieChart className="w-5 h-5" /> },
        { id: 'insights', label: 'AI-Oivallukset', icon: <TrendingUp className="w-5 h-5" /> },
    ];

    return (
        <div className="min-h-screen flex bg-[var(--bg-primary)]">
            {/* Sidebar */}
            <aside className={`h-screen sticky top-0 bg-[var(--bg-elevated)] backdrop-blur-xl border-r border-[var(--border-secondary)] transition-all duration-300 flex-shrink-0 ml-4 ${sidebarOpen ? 'w-96' : 'w-24'}`}>
                <div className="h-full flex flex-col px-12 py-6">
                    {/* Logo Section */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between">
                            {sidebarOpen && (
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-2xl flex items-center justify-center shadow-lg animate-float">
                                        <BarChart3 className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-black text-gradient-primary">FinanceIQ</h1>
                                        <p className="text-xs text-[var(--text-muted)]">AI-Powered Analytics</p>
                                    </div>
                                </div>
                            )}
                            {!sidebarOpen && (
                                <div className="w-12 h-12 bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-2xl flex items-center justify-center shadow-lg mx-auto animate-float">
                                    <BarChart3 className="w-7 h-7 text-white" />
                                </div>
                            )}
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className={`p-2.5 hover:bg-[var(--accent-primary)]/10 rounded-xl transition-all hover:scale-110 hover:rotate-90 ${!sidebarOpen ? 'absolute top-6 right-4' : ''}`}
                            >
                                {sidebarOpen ? <X className="w-5 h-5 text-[var(--text-secondary)]" /> : <Menu className="w-5 h-5 text-[var(--text-secondary)]" />}
                            </button>
                        </div>
                    </div>

                    {/* Navigation - Modern Cards */}
                    <nav className="flex-1 space-y-3 overflow-y-auto">
                        {tabs.map((tab, index) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-medium relative overflow-hidden group ${activeTab === tab.id
                                    ? 'bg-gradient-to-r from-[var(--accent-primary)]/20 to-[var(--accent-secondary)]/20 border border-[var(--accent-primary)]/40 text-[var(--accent-primary)] shadow-lg scale-105'
                                    : 'text-[var(--text-muted)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] hover:scale-102 hover:shadow-md'
                                    }`}
                            >
                                {/* Active indicator */}
                                {activeTab === tab.id && (
                                    <div className="absolute left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-r-full"></div>
                                )}

                                {/* Icon with background */}
                                <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${activeTab === tab.id
                                    ? 'bg-[var(--accent-primary)]/20 shadow-md'
                                    : 'bg-[var(--bg-tertiary)] group-hover:bg-[var(--accent-primary)]/10'
                                    }`}>
                                    <div className={activeTab === tab.id ? 'animate-pulse' : ''}>
                                        {tab.icon}
                                    </div>
                                </div>

                                {sidebarOpen && (
                                    <span className="flex-1 text-left text-sm font-semibold">{tab.label}</span>
                                )}

                                {/* Hover effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-primary)]/0 via-[var(--accent-primary)]/5 to-[var(--accent-primary)]/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </button>
                        ))}
                    </nav>

                    {/* User Section */}
                    <div className="mt-6">
                        {sidebarOpen ? (
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-4 glass-card rounded-2xl border border-[var(--border-primary)]/20">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full flex items-center justify-center shadow-lg">
                                        <Users className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-[var(--text-primary)] truncate">
                                            {user?.email || 'Demo User'}
                                        </p>
                                        <p className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                                            <span className="w-2 h-2 bg-[var(--accent-success)] rounded-full animate-pulse"></span>
                                            Premium Plan
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[var(--accent-danger)]/10 hover:bg-[var(--accent-danger)]/20 border border-[var(--accent-danger)]/30 text-[var(--accent-danger)] rounded-2xl transition-all hover:scale-105 font-semibold"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span className="text-sm">Kirjaudu Ulos</span>
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="w-full p-4 bg-[var(--accent-danger)]/10 hover:bg-[var(--accent-danger)]/20 rounded-2xl transition-all hover:scale-110 border border-[var(--accent-danger)]/30"
                            >
                                <LogOut className="w-6 h-6 text-[var(--accent-danger)] mx-auto" />
                            </button>
                        )}
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {/* Top Bar */}
                <header className="sticky top-0 z-40 bg-[var(--bg-elevated)]/80 backdrop-blur-xl border-b border-[var(--border-secondary)]">
                    <div className="max-w-[90%] mx-auto px-8 py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-1">{data.companyName}</h2>
                                <p className="text-[var(--text-muted)]">Talousanalyysi Alusta • {data.reportPeriod}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <button className="p-3 glass-card hover:scale-110 transition-all relative">
                                    <Bell className="w-5 h-5 text-[var(--text-muted)]" />
                                    <span className="absolute top-2 right-2 w-2 h-2 bg-[var(--accent-primary)] rounded-full animate-pulse"></span>
                                </button>
                                <button className="p-3 glass-card hover:scale-110 transition-all">
                                    <Settings className="w-5 h-5 text-[var(--text-muted)]" />
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content - 80% width */}
                <div className="max-w-[80%] mx-auto p-8">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="space-y-8 animate-fade-in-up">
                            {/* PDF Uploader */}
                            <PDFUploader onUploadSuccess={() => window.location.reload()} />

                            {/* Metrics Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <ModernMetricCard
                                    title="Kokonaistulot"
                                    value={`$${(latestMetrics.revenue / 1000000).toFixed(1)}M`}
                                    change={calculateChange(latestMetrics.revenue, previousMetrics.revenue)}
                                    trend="up"
                                    icon={<DollarSign className="w-6 h-6" />}
                                    color="#6366f1"
                                />
                                <ModernMetricCard
                                    title="EBITDA"
                                    value={`$${(latestMetrics.ebitda / 1000000).toFixed(1)}M`}
                                    change={calculateChange(latestMetrics.ebitda, previousMetrics.ebitda)}
                                    trend="up"
                                    icon={<TrendingUp className="w-6 h-6" />}
                                    color="#8b5cf6"
                                />
                                <ModernMetricCard
                                    title="Nettotulos (PAT)"
                                    value={`$${(latestMetrics.pat / 1000000).toFixed(1)}M`}
                                    change={calculateChange(latestMetrics.pat, previousMetrics.pat)}
                                    trend="up"
                                    icon={<Activity className="w-6 h-6" />}
                                    color="#10b981"
                                />
                                <ModernMetricCard
                                    title="Osakekohtainen Tulos"
                                    value={`$${latestMetrics.eps.toFixed(2)}`}
                                    change={calculateChange(latestMetrics.eps, previousMetrics.eps)}
                                    trend="up"
                                    icon={<BarChart3 className="w-6 h-6" />}
                                    color="#f59e0b"
                                />
                            </div>

                            {/* Charts Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <ModernChart
                                    data={data.metrics.map(m => ({ year: m.year, value: m.revenue }))}
                                    title="Tulotrendi (5 Vuotta)"
                                    color="#6366f1"
                                    type="area"
                                />
                                <ModernChart
                                    data={data.metrics.map(m => ({ year: m.year, value: m.ebitda }))}
                                    title="EBITDA Kehitys"
                                    color="#8b5cf6"
                                    type="area"
                                />
                            </div>

                            {/* Summary Card */}
                            <div className="glass-card p-6">
                                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-3">
                                    <span className="w-1.5 h-8 bg-gradient-to-b from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full"></span>
                                    Johdon Yhteenveto
                                </h3>
                                <p className="text-[var(--text-secondary)] leading-relaxed">{data.summary}</p>
                            </div>
                        </div>
                    )}

                    {/* Financial Metrics Tab */}
                    {activeTab === 'metrics' && (
                        <div className="space-y-8 animate-fade-in-up">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <ModernMetricCard
                                    title="Voittomarginaali"
                                    value={`${latestMetrics.profitMargin.toFixed(2)}%`}
                                    change={calculateChange(latestMetrics.profitMargin, previousMetrics.profitMargin)}
                                    trend="up"
                                    color="#10b981"
                                />
                                <ModernMetricCard
                                    title="ROCE"
                                    value={`${latestMetrics.roce.toFixed(1)}%`}
                                    change={calculateChange(latestMetrics.roce, previousMetrics.roce)}
                                    trend="up"
                                    color="#6366f1"
                                />
                                <ModernMetricCard
                                    title="Velka/Oma Pääoma"
                                    value={latestMetrics.debtToEquity.toFixed(2)}
                                    change={calculateChange(latestMetrics.debtToEquity, previousMetrics.debtToEquity)}
                                    trend="down"
                                    color="#f59e0b"
                                />
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <ModernChart
                                    data={data.metrics.map(m => ({ year: m.year, value: m.pat }))}
                                    title="Nettotulos (PAT)"
                                    color="#10b981"
                                    type="area"
                                />
                                <ModernChart
                                    data={data.metrics.map(m => ({ year: m.year, value: m.eps }))}
                                    title="Osakekohtainen Tulos (EPS)"
                                    color="#f59e0b"
                                    type="line"
                                />
                                <ModernChart
                                    data={data.metrics.map(m => ({ year: m.year, value: m.roce }))}
                                    title="Pääoman Tuotto (ROCE)"
                                    color="#8b5cf6"
                                    type="bar"
                                />
                                <ModernChart
                                    data={data.metrics.map(m => ({ year: m.year, value: m.debtToEquity }))}
                                    title="Velka/Oma Pääoma Suhde"
                                    color="#ef4444"
                                    type="line"
                                />
                            </div>
                        </div>
                    )}

                    {/* Segments Tab */}
                    {activeTab === 'segments' && (
                        <div className="space-y-8 animate-fade-in-up">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {data.segments.map((segment, index) => (
                                    <div key={index} className="glass-card p-6">
                                        <div className="flex items-start justify-between mb-6">
                                            <div>
                                                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">{segment.segment}</h3>
                                                <p className="text-[var(--text-muted)]">Liiketoimintayksikön Suorituskyky</p>
                                            </div>
                                            <div className="status-badge success">
                                                +{segment.growth}%
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center p-4 bg-[var(--bg-tertiary)]/50 rounded-xl">
                                                <span className="text-[var(--text-muted)]">Tulot</span>
                                                <span className="text-2xl font-bold text-[var(--text-primary)]">
                                                    ${(segment.revenue / 1000000).toFixed(1)}M
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center p-4 bg-[var(--bg-tertiary)]/50 rounded-xl">
                                                <span className="text-[var(--text-muted)]">Kasvuvauhti</span>
                                                <span className="text-xl font-bold text-[var(--accent-success)]">
                                                    +{segment.growth}%
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center p-4 bg-[var(--bg-tertiary)]/50 rounded-xl">
                                                <span className="text-[var(--text-muted)]">Voittomarginaali</span>
                                                <span className="text-xl font-bold text-[var(--accent-primary)]">
                                                    {segment.margin}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* AI Insights Tab */}
                    {activeTab === 'insights' && (
                        <div className="space-y-8 animate-fade-in-up">
                            {/* Sentiment */}
                            <div className="glass-card p-6">
                                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Yleinen Sentimenttianalyysi</h3>
                                <div className="flex items-center gap-6">
                                    <div className="status-badge success text-lg px-6 py-3">
                                        {data.insights.sentiment.label.toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-4xl font-bold text-[var(--text-primary)]">
                                            {(data.insights.sentiment.score * 100).toFixed(1)}%
                                        </p>
                                        <p className="text-[var(--text-muted)]">Positiivinen Pistemäärä</p>
                                    </div>
                                </div>
                            </div>

                            {/* Themes */}
                            <div className="glass-card p-6">
                                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Keskeiset Teemat</h3>
                                <div className="flex flex-wrap gap-3">
                                    {data.insights.themes.map((theme, index) => (
                                        <span
                                            key={index}
                                            className="px-4 py-2 bg-gradient-to-r from-[var(--accent-primary)]/20 to-[var(--accent-secondary)]/20 border border-[var(--accent-primary)]/30 rounded-xl text-[var(--accent-primary)] font-medium"
                                        >
                                            {theme}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Risks & Opportunities */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="glass-card p-6">
                                    <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
                                        <span className="text-[var(--accent-danger)]">⚠️</span>
                                        Riskit
                                    </h3>
                                    <ul className="space-y-3">
                                        {data.insights.risks.map((risk, index) => (
                                            <li key={index} className="flex items-start gap-3 p-3 bg-[var(--accent-danger)]/5 border border-[var(--accent-danger)]/20 rounded-xl">
                                                <span className="text-[var(--accent-danger)] mt-1">•</span>
                                                <span className="text-[var(--text-secondary)] text-sm">{risk}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="glass-card p-6">
                                    <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
                                        <span className="text-[var(--accent-success)]">✓</span>
                                        Mahdollisuudet
                                    </h3>
                                    <ul className="space-y-3">
                                        {data.insights.opportunities.map((opp, index) => (
                                            <li key={index} className="flex items-start gap-3 p-3 bg-[var(--accent-success)]/5 border border-[var(--accent-success)]/20 rounded-xl">
                                                <span className="text-[var(--accent-success)] mt-1">•</span>
                                                <span className="text-[var(--text-secondary)] text-sm">{opp}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
