import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ukfhidzyeuxotzrwpwli.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrZmhpZHp5ZXV4b3R6cndwd2xpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4MTMxMDksImV4cCI6MjA1NzM4OTEwOX0.Wt1e9pXYiozQ9rHlKfjIbIKaBi26JjhK8tFBbIKo21g";

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
