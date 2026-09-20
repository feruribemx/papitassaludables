import { createClient } from '@supabase/supabase-js'
const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY
// Si no hay llaves, la app sigue funcionando en modo local (sin tiempo real).
export const supabase = (url && key) ? createClient(url, key) : null
export const hayNube = !!supabase
