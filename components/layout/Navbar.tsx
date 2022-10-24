import { AuthSession } from '@supabase/supabase-js'
import Link from 'next/link'
import Router from 'next/router'
import { supabase } from '../../utils/supabaseClient'

export interface Props {
  session: AuthSession | null
}

export function Navbar({ session }: Props) {
  return (
    <ul className="flex items-center justify-center space-x-6">
      {session ? (
        <>
          <li>
            <Link href="/profile">
              <a className="btn-secondary">My profile</a>
            </Link>
          </li>
          <li>
            <button
              className="text-zinc-50 underline underline-offset-4"
              onClick={() => {
                supabase.auth.signOut()
                Router.push('/')
              }}
            >
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link href="/signin">
              <a className="btn-link">Sign in/Sign up</a>
            </Link>
          </li>
        </>
      )}
    </ul>
  )
}
