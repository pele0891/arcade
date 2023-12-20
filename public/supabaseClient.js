import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient('https://fgfiigtbbzpjsiccdqxo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnZmlpZ3RiYnpwanNpY2NkcXhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI5NDIyMDgsImV4cCI6MjAxODUxODIwOH0.e3AYcV2_UrpJn-ANz79dA1AZPCicITHQaGpl2WkjTIw');

export default supabase;