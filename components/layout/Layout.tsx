import { AuthSession } from '@supabase/supabase-js'
import Head from 'next/head'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
import { Menu } from './Menu'

export interface Props {
  session: AuthSession | null
}

export function Layout({ session, children }: PropsWithChildren<Props>) {
  return (
    <>
      <Head>
        <title>appointee</title>
      </Head>
      <div className="flex min-h-screen flex-col bg-gray-50">
        <header className="flex justify-between border-b bg-white p-4">
          <h1>
            <Link href="/">
              <a className="text-xl font-black text-zinc-800">appointee</a>
            </Link>
          </h1>
          <Menu session={session} />
        </header>
        <main className="flex-1 p-4">{children}</main>
        <footer className="bg-sky-700 p-4 text-white"></footer>
      </div>
    </>
  )
}
