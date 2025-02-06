import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabaseClient'

type Profile = {
  id: string
  email: string
  premium_access: boolean
}

type AuthContextType = {
  user: User | null
  profile: Profile | null
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signUp: (email: string, password: string) => Promise<{ error?: string, success?: boolean }>
  signOut: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  signIn: async () => ({}),
  signUp: async () => ({}),
  signOut: async () => {},
  loading: true
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = async (userId: string) => {
    try {
      console.log('Fetching profile for user:', userId)
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching profile:', error)
        return null
      }

      console.log('Profile fetched:', data)
      setProfile(data)
      return data
    } catch (error) {
      console.error('Error in fetchProfile:', error)
      return null
    }
  }

  const createProfile = async (userId: string, email: string) => {
    try {
      console.log('Creating profile for user:', userId)
      const { data, error } = await supabase
        .from('profiles')
        .insert([
          {
            id: userId,
            email: email,
            premium_access: false
          }
        ])
        .select()
        .single()

      if (error) {
        console.error('Error creating profile:', error)
        throw error
      }

      console.log('Profile created:', data)
      return data
    } catch (error) {
      console.error('Error in createProfile:', error)
      throw error
    }
  }

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        console.log('Current session:', session)
        
        if (session?.user) {
          setUser(session.user)
          const profile = await fetchProfile(session.user.id)
          if (!profile) {
            console.log('No profile found, creating one...')
            await createProfile(session.user.id, session.user.email!)
          }
        }
      } catch (error) {
        console.error('Auth init error:', error)
      } finally {
        setLoading(false)
      }
    }

    initAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth event:', event, session)
      
      if (session?.user) {
        setUser(session.user)
        const profile = await fetchProfile(session.user.id)
        if (!profile && event === 'SIGNED_IN') {
          await createProfile(session.user.id, session.user.email!)
        }
      } else {
        setUser(null)
        setProfile(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true)
      console.log('Starting signup process...')

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (signUpError) throw signUpError

      if (!data.user) {
        throw new Error('No user data returned')
      }

      console.log('User created:', data.user)

      try {
        await createProfile(data.user.id, email)
      } catch (profileError) {
        console.error('Profile creation error:', profileError)
      }

      return { success: true }
    } catch (error: any) {
      console.error('Signup error:', error)
      return { error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      if (data.user) {
        const profile = await fetchProfile(data.user.id)
        if (!profile) {
          await createProfile(data.user.id, email)
        }
      }

      return {}
    } catch (error: any) {
      console.error('SignIn error:', error)
      return { error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      console.log('Starting signout process...')
      
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      setUser(null)
      setProfile(null)
      
      localStorage.clear()
      sessionStorage.clear()
      
      document.cookie.split(";").forEach(function(c) { 
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/")
      })
      
      console.log('Signout successful')
      window.location.href = '/'
      
    } catch (error) {
      console.error('SignOut error:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      signIn,
      signUp,
      signOut,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
