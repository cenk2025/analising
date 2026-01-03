'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Upload, FileText, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface PDFUploaderProps {
    onUploadSuccess?: (reportId: string) => void;
}

export default function PDFUploader({ onUploadSuccess }: PDFUploaderProps) {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [status, setStatus] = useState<'idle' | 'uploading' | 'processing' | 'success' | 'error'>('idle');
    const [error, setError] = useState('');
    const [progress, setProgress] = useState(0);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
            setStatus('idle');
            setError('');
        } else {
            setError('Vain PDF-tiedostot ovat sallittuja');
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        setStatus('uploading');
        setProgress(0);
        setError('');

        try {
            // Simulate upload progress
            const progressInterval = setInterval(() => {
                setProgress(prev => Math.min(prev + 10, 90));
            }, 200);

            // Get current user
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                throw new Error('Käyttäjää ei ole kirjautunut sisään');
            }

            // Upload to Supabase Storage
            const fileName = `${user.id}/${Date.now()}_${file.name}`;
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('financial-reports')
                .upload(fileName, file);

            clearInterval(progressInterval);
            setProgress(100);

            if (uploadError) throw uploadError;

            // Process PDF with API
            setStatus('processing');
            setProcessing(true);

            const response = await fetch('/api/process-pdf', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    filePath: uploadData.path,
                    userId: user.id
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Käsittely epäonnistui');
            }

            const result = await response.json();

            setStatus('success');
            if (onUploadSuccess && result.reportId) {
                onUploadSuccess(result.reportId);
            }

            // Reset after success
            setTimeout(() => {
                setFile(null);
                setStatus('idle');
                setProgress(0);
            }, 3000);

        } catch (err: any) {
            console.error('Upload error:', err);
            setError(err.message || 'Lataus epäonnistui');
            setStatus('error');
        } finally {
            setUploading(false);
            setProcessing(false);
        }
    };

    const getStatusIcon = () => {
        switch (status) {
            case 'uploading':
            case 'processing':
                return <Loader2 className="w-5 h-5 animate-spin text-[var(--accent-primary)]" />;
            case 'success':
                return <CheckCircle className="w-5 h-5 text-[var(--accent-success)]" />;
            case 'error':
                return <AlertCircle className="w-5 h-5 text-[var(--accent-danger)]" />;
            default:
                return <FileText className="w-5 h-5 text-[var(--text-muted)]" />;
        }
    };

    const getStatusText = () => {
        switch (status) {
            case 'uploading':
                return 'Ladataan PDF-tiedostoa...';
            case 'processing':
                return 'Analysoidaan AI:lla...';
            case 'success':
                return 'Analyysi valmis!';
            case 'error':
                return error;
            default:
                return file ? file.name : 'Ei tiedostoa valittu';
        }
    };

    return (
        <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-xl flex items-center justify-center">
                    <Upload className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">Lataa Talousraportti</h3>
                    <p className="text-sm text-[var(--text-muted)]">PDF-muotoinen vuosiraportti</p>
                </div>
            </div>

            {/* File Input */}
            <div className="mb-6">
                <label className="block mb-3">
                    <div className={`
                        relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
                        transition-all duration-300
                        ${file
                            ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/5'
                            : 'border-[var(--border-secondary)] hover:border-[var(--accent-primary)] hover:bg-[var(--bg-tertiary)]'
                        }
                    `}>
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            disabled={uploading || processing}
                        />
                        <div className="flex flex-col items-center gap-3">
                            {getStatusIcon()}
                            <div>
                                <p className="text-[var(--text-primary)] font-medium">
                                    {getStatusText()}
                                </p>
                                {!file && !status && (
                                    <p className="text-sm text-[var(--text-muted)] mt-1">
                                        Klikkaa valitaksesi tai vedä tiedosto tähän
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </label>

                {/* Progress Bar */}
                {(uploading || processing) && (
                    <div className="mt-4">
                        <div className="h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <p className="text-xs text-[var(--text-muted)] mt-2 text-center">
                            {processing ? 'OpenAI analysoi dokumenttia...' : `${progress}% valmis`}
                        </p>
                    </div>
                )}

                {/* Error Message */}
                {status === 'error' && (
                    <div className="mt-4 p-4 bg-[var(--accent-danger)]/10 border border-[var(--accent-danger)]/30 rounded-xl">
                        <p className="text-sm text-[var(--accent-danger)]">{error}</p>
                    </div>
                )}

                {/* Success Message */}
                {status === 'success' && (
                    <div className="mt-4 p-4 bg-[var(--accent-success)]/10 border border-[var(--accent-success)]/30 rounded-xl">
                        <p className="text-sm text-[var(--accent-success)]">
                            ✓ PDF analysoitu onnistuneesti! Dashboard päivittyy automaattisesti.
                        </p>
                    </div>
                )}
            </div>

            {/* Upload Button */}
            <button
                onClick={handleUpload}
                disabled={!file || uploading || processing || status === 'success'}
                className="modern-btn w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {uploading || processing ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {processing ? 'Analysoidaan...' : 'Ladataan...'}
                    </>
                ) : (
                    <>
                        <Upload className="w-5 h-5" />
                        Lataa ja Analysoi
                    </>
                )}
            </button>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-[var(--accent-info)]/5 border border-[var(--accent-info)]/20 rounded-xl">
                <p className="text-xs text-[var(--text-muted)]">
                    <strong className="text-[var(--accent-info)]">Huom:</strong> PDF analysoidaan OpenAI:lla.
                    Talousmetriikat, segmentit ja AI-oivallukset poimitaan automaattisesti.
                </p>
            </div>
        </div>
    );
}
