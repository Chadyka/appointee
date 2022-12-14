import { AuthSession } from '@supabase/supabase-js'
import Link from 'next/link'
import Router from 'next/router'
import { supabase } from '../../utils/supabaseClient'

export interface Props {
  session: AuthSession | null
}

export function Menu({ session }: Props) {
  return (
    <ul className="flex space-x-4">
      {session && (
        <>
          <li>
            <Link href="/dashboard/profile">
              <a className="btn-link duration-300">My profile</a>
            </Link>
          </li>
          <li>
            <button
              className="btn-link"
              onClick={() => {
                supabase.auth.signOut()
                Router.push('/')
              }}
            >
              Sign out
            </button>
          </li>
        </>
      )}
    </ul>
  )
}
