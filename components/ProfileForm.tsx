import { ArrowLongLeftIcon } from '@heroicons/react/24/solid'
import { AuthSession } from '@supabase/supabase-js'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { db } from '../utils/hooks/db'
import { useProfile } from '../utils/hooks/useProfile'
import { supabase } from '../utils/supabaseClient'
import { EditAvatar } from './EditAvatar'

export interface Props {
  session: AuthSession
}

export function ProfileForm({ session }: Props) {
  const [updating, setUpdating] = useState(false)
  const [username, setUsername] = useState<string>('')
  const [website, setWebsite] = useState<string>('')
  const [avatar_url, setAvatarUrl] = useState<string>('')
  const { loading, error, profile } = useProfile(session)

  useEffect(() => {
    if (profile) {
      setUsername(profile.username)
      setWebsite(profile.website)
      setAvatarUrl(profile.avatarUrl)
    }
  }, [profile])

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string
    website: string
    avatar_url: string
  }) {
    try {
      setUpdating(true)
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        const updates = {
          id: user.id,
          username,
          website,
          avatar_url,
          updated_at: new Date(),
        }

        const { error } = await supabase.from('profiles').upsert(updates)

        if (error) {
          throw error
        }
      }
    } catch (error: any) {
      alert(error.message)
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return <p>Loading…</p>
  }

  if (error) {
    return <p>An error occured when fetching your profile information.</p>
  }

  return (
    <form className="relative rounded-lg bg-zinc-50 shadow-md">
      <div className="flex items-start justify-between rounded-t border-b p-4">
        <h3 className="text-xl font-semibold text-gray-900">Edit profile</h3>
        <Link href="/dashboard/">
          <div className="ml-auto inline-flex cursor-pointer items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900">
            <ArrowLongLeftIcon className="mr-3 h-6 w-6" />
            <span className="font-medium">Back</span>
          </div>
        </Link>
      </div>

      <div className="space-y-6 p-6">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <EditAvatar
              url={avatar_url}
              onUpload={(url) => setAvatarUrl(url)}
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label className="label" htmlFor="email">
              Email (can&apos;t update)
            </label>
            <input
              className="block w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-sky-600 focus:ring-sky-600 sm:text-sm"
              id="email"
              type="text"
              value={session.user.email}
              disabled
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label className="label" htmlFor="username">
              Name
            </label>
            <input
              className="block w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-sky-600 focus:ring-sky-600 sm:text-sm"
              disabled={updating}
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label className="label" htmlFor="website">
              Website
            </label>
            <input
              className="block w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-sky-600 focus:ring-sky-600 sm:text-sm"
              disabled={updating}
              id="website"
              type="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center space-x-2 rounded-b border-t border-gray-200 p-6">
          <button
            type="submit"
            onClick={() => updateProfile({ username, website, avatar_url })}
            disabled={updating}
            className="rounded-lg bg-sky-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-4 focus:ring-sky-300"
          >
            {updating ? 'Updating…' : 'Update'}
          </button>
        </div>
      </div>
    </form>
  )
}
