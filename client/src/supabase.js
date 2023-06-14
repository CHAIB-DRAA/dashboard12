// utils/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://qhwyewvxefzhfrtxhclv.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFod3lld3Z4ZWZ6aGZydHhoY2x2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU3ODU0MjIsImV4cCI6MjAwMTM2MTQyMn0.oqWI_01RN-Qa8NT-jiSQcZdyZIB2WIYmI1Ie2Dck93s"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)