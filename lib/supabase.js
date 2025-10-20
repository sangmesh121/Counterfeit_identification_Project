import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://rscsxqoiyfbgoaizyzsr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzY3N4cW9peWZiZ29haXp5enNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MDQ5NTYsImV4cCI6MjA3NjI4MDk1Nn0.M0XUBniLuduU3i1E_qLgS09_lcXzZB3RLoxZ_GL9XWs';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
