# PDF Analysis Integration Guide

This guide explains how to integrate real PDF analysis capabilities to extract financial data from customer reports.

## Overview

The dashboard currently uses mock data. To analyze real PDF reports, you'll need to:
1. Upload PDFs to Supabase Storage
2. Extract text from PDFs
3. Parse financial metrics using regex/NLP
4. Perform sentiment analysis on text sections

## Step 1: Set Up Supabase Storage

### Create Storage Bucket

1. Go to your Supabase dashboard
2. Navigate to Storage
3. Create a new bucket called `financial-reports`
4. Set the bucket to **private** (recommended) or **public** based on your needs

### Configure Storage Policies

```sql
-- Allow authenticated users to upload PDFs
CREATE POLICY "Allow authenticated uploads"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'financial-reports');

-- Allow authenticated users to read their own PDFs
CREATE POLICY "Allow authenticated reads"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'financial-reports');
```

## Step 2: Create Database Tables

### Financial Reports Table

```sql
CREATE TABLE financial_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  report_period TEXT NOT NULL,
  file_path TEXT NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE financial_reports ENABLE ROW LEVEL SECURITY;

-- Create policy
CREATE POLICY "Users can view their own reports"
ON financial_reports
FOR SELECT
TO authenticated
USING (created_by = auth.uid());
```

### Financial Metrics Table

```sql
CREATE TABLE financial_metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  report_id UUID REFERENCES financial_reports(id) ON DELETE CASCADE,
  year TEXT NOT NULL,
  revenue DECIMAL(15, 2),
  ebitda DECIMAL(15, 2),
  pat DECIMAL(15, 2),
  eps DECIMAL(10, 2),
  profit_margin DECIMAL(5, 2),
  roce DECIMAL(5, 2),
  debt_to_equity DECIMAL(5, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE financial_metrics ENABLE ROW LEVEL SECURITY;

-- Create policy
CREATE POLICY "Users can view metrics for their reports"
ON financial_metrics
FOR SELECT
TO authenticated
USING (
  report_id IN (
    SELECT id FROM financial_reports WHERE created_by = auth.uid()
  )
);
```

### Segment Performance Table

```sql
CREATE TABLE segment_performance (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  report_id UUID REFERENCES financial_reports(id) ON DELETE CASCADE,
  segment TEXT NOT NULL,
  revenue DECIMAL(15, 2),
  growth DECIMAL(5, 2),
  margin DECIMAL(5, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE segment_performance ENABLE ROW LEVEL SECURITY;

-- Create policy
CREATE POLICY "Users can view segments for their reports"
ON segment_performance
FOR SELECT
TO authenticated
USING (
  report_id IN (
    SELECT id FROM financial_reports WHERE created_by = auth.uid()
  )
);
```

### NLP Insights Table

```sql
CREATE TABLE nlp_insights (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  report_id UUID REFERENCES financial_reports(id) ON DELETE CASCADE,
  themes TEXT[],
  forward_looking_statements TEXT[],
  sentiment_score DECIMAL(3, 2),
  sentiment_label TEXT,
  risks TEXT[],
  opportunities TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE nlp_insights ENABLE ROW LEVEL SECURITY;

-- Create policy
CREATE POLICY "Users can view insights for their reports"
ON nlp_insights
FOR SELECT
TO authenticated
USING (
  report_id IN (
    SELECT id FROM financial_reports WHERE created_by = auth.uid()
  )
);
```

## Step 3: Install Additional Dependencies

```bash
npm install pdf-parse openai natural sentiment compromise
npm install --save-dev @types/pdf-parse
```

## Step 4: Create PDF Upload Component

Create `components/PDFUploader.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function PDFUploader() {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    try {
      // Upload to Supabase Storage
      const fileName = `${Date.now()}_${file.name}`;
      const { data, error } = await supabase.storage
        .from('financial-reports')
        .upload(fileName, file);

      if (error) throw error;

      // Trigger processing
      await fetch('/api/process-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filePath: data.path })
      });

      alert('PDF uploaded and processing started!');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="glass-card p-6">
      <h3 className="text-xl font-bold mb-4">Upload Financial Report</h3>
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="btn-primary"
      >
        {uploading ? 'Uploading...' : 'Upload PDF'}
      </button>
    </div>
  );
}
```

## Step 5: Create PDF Processing API Route

Create `app/api/process-pdf/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import pdf from 'pdf-parse';
import Sentiment from 'sentiment';

const sentiment = new Sentiment();

export async function POST(request: NextRequest) {
  try {
    const { filePath } = await request.json();

    // Download PDF from Supabase
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('financial-reports')
      .download(filePath);

    if (downloadError) throw downloadError;

    // Convert to buffer
    const buffer = Buffer.from(await fileData.arrayBuffer());

    // Extract text from PDF
    const pdfData = await pdf(buffer);
    const text = pdfData.text;

    // Extract financial metrics
    const metrics = extractFinancialMetrics(text);

    // Extract segments
    const segments = extractSegments(text);

    // Perform NLP analysis
    const insights = performNLPAnalysis(text);

    // Store in database
    const { data: report, error: reportError } = await supabase
      .from('financial_reports')
      .insert({
        company_name: extractCompanyName(text),
        report_period: extractReportPeriod(text),
        file_path: filePath,
        processed: true
      })
      .select()
      .single();

    if (reportError) throw reportError;

    // Store metrics
    await supabase.from('financial_metrics').insert(
      metrics.map(m => ({ ...m, report_id: report.id }))
    );

    // Store segments
    await supabase.from('segment_performance').insert(
      segments.map(s => ({ ...s, report_id: report.id }))
    );

    // Store insights
    await supabase.from('nlp_insights').insert({
      report_id: report.id,
      ...insights
    });

    return NextResponse.json({ success: true, reportId: report.id });
  } catch (error) {
    console.error('Processing error:', error);
    return NextResponse.json(
      { error: 'Processing failed' },
      { status: 500 }
    );
  }
}

function extractFinancialMetrics(text: string) {
  // Example regex patterns - customize based on your PDF format
  const metrics = [];
  
  // Extract revenue (example pattern)
  const revenuePattern = /Revenue[:\s]+\$?([\d,]+\.?\d*)\s*(million|M)?/gi;
  const revenueMatches = [...text.matchAll(revenuePattern)];
  
  // Extract EBITDA
  const ebitdaPattern = /EBITDA[:\s]+\$?([\d,]+\.?\d*)\s*(million|M)?/gi;
  const ebitdaMatches = [...text.matchAll(ebitdaPattern)];
  
  // Build metrics array for each year found
  // This is a simplified example - you'll need more sophisticated parsing
  
  return metrics;
}

function extractSegments(text: string) {
  // Extract segment information
  // This requires understanding your PDF structure
  const segments = [];
  
  return segments;
}

function performNLPAnalysis(text: string) {
  // Sentiment analysis
  const sentimentResult = sentiment.analyze(text);
  
  // Extract themes (simplified)
  const themes = extractThemes(text);
  
  // Extract forward-looking statements
  const forwardLooking = extractForwardLookingStatements(text);
  
  // Extract risks and opportunities
  const risks = extractRisks(text);
  const opportunities = extractOpportunities(text);
  
  return {
    themes,
    forward_looking_statements: forwardLooking,
    sentiment_score: sentimentResult.score / 100,
    sentiment_label: sentimentResult.score > 0 ? 'positive' : 
                     sentimentResult.score < 0 ? 'negative' : 'neutral',
    risks,
    opportunities
  };
}

function extractThemes(text: string): string[] {
  // Use keyword extraction or topic modeling
  const keywords = ['digital transformation', 'innovation', 'growth', 'efficiency'];
  return keywords.filter(k => text.toLowerCase().includes(k));
}

function extractForwardLookingStatements(text: string): string[] {
  // Look for future-oriented language
  const pattern = /(expect|anticipate|plan|forecast|project|intend|target)[^.]+\./gi;
  const matches = text.match(pattern) || [];
  return matches.slice(0, 5); // Top 5
}

function extractRisks(text: string): string[] {
  // Extract from risk section
  const riskSection = text.match(/risk factors?[:\s]+(.*?)(?=\n\n|\n[A-Z])/is);
  if (!riskSection) return [];
  
  const sentences = riskSection[1].split(/\.\s+/);
  return sentences.slice(0, 6);
}

function extractOpportunities(text: string): string[] {
  // Extract from opportunities section or positive statements
  const oppPattern = /(opportunity|potential|growth|expansion)[^.]+\./gi;
  const matches = text.match(oppPattern) || [];
  return matches.slice(0, 6);
}

function extractCompanyName(text: string): string {
  // Extract company name from header or title
  const pattern = /^([A-Z][A-Za-z\s&]+(?:Inc|Corp|Ltd|LLC)?)/m;
  const match = text.match(pattern);
  return match ? match[1].trim() : 'Unknown Company';
}

function extractReportPeriod(text: string): string {
  // Extract fiscal year or period
  const pattern = /FY\s*(\d{4})|fiscal year\s*(\d{4})/i;
  const match = text.match(pattern);
  return match ? `FY ${match[1] || match[2]}` : 'Unknown Period';
}
```

## Step 6: Update Dashboard to Use Real Data

Modify `app/page.tsx` to fetch data from Supabase:

```typescript
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { DashboardData } from '@/types/financial';

export default function Home() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    try {
      // Fetch latest report
      const { data: reports } = await supabase
        .from('financial_reports')
        .select('*')
        .order('uploaded_at', { ascending: false })
        .limit(1);

      if (!reports || reports.length === 0) {
        // Use mock data if no reports
        setData(mockDashboardData);
        return;
      }

      const report = reports[0];

      // Fetch metrics
      const { data: metrics } = await supabase
        .from('financial_metrics')
        .select('*')
        .eq('report_id', report.id)
        .order('year');

      // Fetch segments
      const { data: segments } = await supabase
        .from('segment_performance')
        .select('*')
        .eq('report_id', report.id);

      // Fetch insights
      const { data: insights } = await supabase
        .from('nlp_insights')
        .select('*')
        .eq('report_id', report.id)
        .single();

      setData({
        companyName: report.company_name,
        reportPeriod: report.report_period,
        summary: 'Auto-generated summary from PDF analysis',
        metrics: metrics || [],
        segments: segments || [],
        insights: insights || mockInsights
      });
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>No data available</div>;

  // Rest of your dashboard code...
}
```

## Step 7: Advanced NLP with OpenAI (Optional)

For better analysis, integrate OpenAI:

```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function analyzeWithAI(text: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a financial analyst. Extract key insights from this annual report."
      },
      {
        role: "user",
        content: `Analyze this financial report and provide:
1. Key themes (5-6 themes)
2. Forward-looking statements (5 statements)
3. Major risks (6 risks)
4. Key opportunities (6 opportunities)
5. Overall sentiment (positive/neutral/negative)

Report text:
${text.substring(0, 10000)}`
      }
    ]
  });

  return JSON.parse(completion.choices[0].message.content || '{}');
}
```

## Testing

1. Upload a sample PDF through the UI
2. Check Supabase Storage for the uploaded file
3. Verify data appears in database tables
4. Refresh dashboard to see extracted data

## Performance Optimization

- Use background jobs for PDF processing (consider Vercel Serverless Functions)
- Cache extracted data
- Implement pagination for large datasets
- Use database indexes on frequently queried columns

## Security Considerations

- Validate PDF files before processing
- Implement rate limiting on uploads
- Use Row Level Security (RLS) in Supabase
- Sanitize extracted text before storing
- Never expose service role keys in client-side code

---

**Note**: The regex patterns and extraction logic are simplified examples. You'll need to customize them based on your specific PDF format and structure.
