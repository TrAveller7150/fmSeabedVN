import { createClient } from '@supabase/supabase-js'

// Supabase 客户端配置
// 使用延迟初始化，避免在构建时检查环境变量
let supabaseClient: ReturnType<typeof createClient> | null = null

function getSupabaseClient() {
    if (!supabaseClient) {
        const supabaseUrl = process.env.SUPABASE_URL
        const supabaseKey = process.env.SUPABASE_ANON_KEY

        if (!supabaseUrl || !supabaseKey) {
            throw new Error('Missing Supabase environment variables: SUPABASE_URL and SUPABASE_ANON_KEY are required')
        }

        supabaseClient = createClient(supabaseUrl, supabaseKey)
    }

    return supabaseClient
}

// 导出函数而不是直接导出客户端，避免构建时初始化
export const supabase = new Proxy({} as ReturnType<typeof createClient>, {
    get(_target, prop) {
        return getSupabaseClient()[prop as keyof ReturnType<typeof createClient>]
    }
})
