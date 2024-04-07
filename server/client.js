import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ziapwogxrlinwnniaiey.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppYXB3b2d4cmxpbndubmlhaWV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE2NjQ0NDEsImV4cCI6MjAyNzI0MDQ0MX0.U3LGBYbIU527Anwv9ceNgVws5a7N9xBmhJRmilQjbb0"
export const supabase = createClient(supabaseUrl, supabaseKey)