import { defineStore } from 'pinia'
import { supabase } from '@/utilities/supabaseClient'
import { type StateTree } from 'pinia'

export const setUser = defineStore('users', {
  state: (): StateTree => ({
    userData: null,
  }),

  actions: {
    async loginUser(email: string, password: string) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        })
        if (!error) {
          this.userData = data
        } else {
          console.log(error)
        }
      } catch (error) {
        console.log(error)
        return false
      }
    },
  },
})
