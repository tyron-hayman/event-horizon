// import supbase from '@/utils/supabase/supabase';

const login = (email: string, pass: string) => {
  return { emailUser: email, passUser: pass }
}

export { login }
