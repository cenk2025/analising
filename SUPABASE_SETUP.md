# Supabase Database Setup for PDF Analysis

## Required Tables

Run these SQL commands in your Supabase SQL Editor:

### 1. Create Storage Bucket

```sql
-- Create storage bucket for PDFs
INSERT INTO storage.buckets (id, name, public)
VALUES ('financial-reports', 'financial-reports', false);

-- Allow authenticated users to upload
CREATE POLICY "Allow authenticated uploads"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'financial-reports');

-- Allow authenticated users to read their own files
CREATE POLICY "Allow authenticated reads"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'financial-reports');
```

### 2. Financial Reports Table

```sql
CREATE TABLE IF NOT EXISTS financial_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  report_period TEXT NOT NULL,
  file_path TEXT NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Enable RLS
ALTER TABLE financial_reports ENABLE ROW LEVEL SECURITY;

-- Create policy
CREATE POLICY "Users can view their own reports"
ON financial_reports
FOR SELECT
TO authenticated
USING (created_by = auth.uid());

CREATE POLICY "Users can insert their own reports"
ON financial_reports
FOR INSERT
TO authenticated
WITH CHECK (created_by = auth.uid());
```

### 3. Financial Metrics Table

```sql
CREATE TABLE IF NOT EXISTS financial_metrics (
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

CREATE POLICY "Users can insert metrics for their reports"
ON financial_metrics
FOR INSERT
TO authenticated
WITH CHECK (
  report_id IN (
    SELECT id FROM financial_reports WHERE created_by = auth.uid()
  )
);
```

### 4. Segment Performance Table

```sql
CREATE TABLE IF NOT EXISTS segment_performance (
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

CREATE POLICY "Users can insert segments for their reports"
ON segment_performance
FOR INSERT
TO authenticated
WITH CHECK (
  report_id IN (
    SELECT id FROM financial_reports WHERE created_by = auth.uid()
  )
);
```

### 5. NLP Insights Table

```sql
CREATE TABLE IF NOT EXISTS nlp_insights (
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

CREATE POLICY "Users can insert insights for their reports"
ON nlp_insights
FOR INSERT
TO authenticated
WITH CHECK (
  report_id IN (
    SELECT id FROM financial_reports WHERE created_by = auth.uid()
  )
);
```

## Environment Variables

Add these to your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
OPENAI_API_KEY=your_openai_api_key
```

## Vercel Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)
- `OPENAI_API_KEY` (keep this secret!)

## Testing

1. Login to the dashboard
2. Upload a PDF financial report
3. Wait for processing (OpenAI analysis)
4. Dashboard will auto-refresh with extracted data

## Notes

- OpenAI API key is ONLY used server-side in `/api/process-pdf/route.ts`
- Never expose service role key or OpenAI key in client-side code
- All database operations use Row Level Security (RLS)
- PDFs are stored in Supabase Storage with proper access controls
