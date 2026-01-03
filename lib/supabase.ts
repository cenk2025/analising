import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yttqhzimwdkbkbfhsomo.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0dHFoemltd2RrYmtiZmhzb21vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczOTI0OTgsImV4cCI6MjA4Mjk2ODQ5OH0.vvfA3F7frc1aC6yz-s_PKAjU6wqrl2YiHJi0gjJ_5u0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
    }
});

