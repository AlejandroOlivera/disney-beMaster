import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_APP_SUPABASE_ANON

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Las variables de entorno no estan definidas')
}

export const client = createClient(supabaseUrl, supabaseAnonKey)
