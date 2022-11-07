import { AuthSession } from '@supabase/supabase-js'
import Head from 'next/head'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
import { Navbar } from './Navbar'

export interface Props {
  session: AuthSession | null
}

export function Layout({ session, children }: PropsWithChildren<Props>) {
  return (
    <>
      <Head>
        <title>appointee</title>
      </Head>
      <div className="flex min-h-screen flex-col bg-zinc-50">
        <header className="flex justify-between border-b bg-zinc-800 p-4">
          <h1>
            <Link href="/">
              <a className="text-xl font-black text-zinc-50">appointee</a>
            </Link>
          </h1>
          <Navbar session={session} />
        </header>
        <main className="flex-1 p-4">{children}</main>
        <footer className="bg-zinc-800 p-4 text-zinc-50">
          <h4 className="flex items-center justify-end">
            appointee&#8482; - preview build
            <span className="ml-2 text-center text-xs">(0.14.2)</span>
          </h4>
        </footer>
      </div>
    </>
  )
}
