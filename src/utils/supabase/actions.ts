import type { User } from '@supabase/supabase-js'
import { supabase } from '@/utils/supabase/supabase'

const login = async (email: string, pass: string): Promise<'failed' | 'success' | undefined> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: pass,
    })
    if (error) {
      return 'failed'
    } else if (data) {
      return 'success'
    }
  } catch (error) {
    console.log(error)
  }
}

const getUser = async (): Promise<User | null> => {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export { login, getUser }
