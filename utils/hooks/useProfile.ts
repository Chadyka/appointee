import { AuthSession } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { db } from './db'

export interface Profile {
  username: string
  website: string
  avatarUrl: string
  first_name: string
}

export function useProfile(session: AuthSession) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    ;(async function () {
      try {
        setLoading(true)
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (user) {
          const { data, error, status } = await db
            .profiles()
            .select(`username, website, avatar_url, first_name`)
            .eq('id', user.id)
            .single()

          if (error && status !== 406) {
            throw error
          }

          if (data) {
            setProfile({
              username: data.username ?? '',
              website: data.website ?? '',
              avatarUrl: data.avatar_url ?? '',
              first_name: data.first_name ?? '',
            })
          }
        }
      } catch (error: any) {
        setError(error)
      } finally {
        setLoading(false)
      }
    })()
  }, [session])

  return { loading, error, profile }
}
