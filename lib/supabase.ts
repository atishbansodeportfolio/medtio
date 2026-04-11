import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://itlzrlbfkrvuqhbowdcu.supabase.co'
const supabaseKey = 'sb_publishable_SosWrra40trxmPAzBkBOEQ_0NpqCSq2'

export const supabase = createClient(supabaseUrl, supabaseKey)