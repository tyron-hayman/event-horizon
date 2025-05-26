import type { User } from '@supabase/supabase-js'
import { supabase } from '@/utils/supabase/supabase'

type Users = {
  id: number
  created_at: string
  email: string
  first_name: string
  last_name: string
  userID: number
  status: boolean
  role: string
}

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

const getUserData = async (id: string): Promise<Users[] | null | void> => {
  try {
    const { data: users } = await supabase.from('users').select('*').eq('userID', id)
    return users
  } catch {
    console.error('There was an error retrieving user data.')
  }
}

export { login, getUser, getUserData }
