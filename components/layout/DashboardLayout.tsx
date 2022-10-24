import Head from 'next/head'
import Link from 'next/link'
import { Fragment, PropsWithChildren, useState } from 'react'
import { AuthSession } from '@supabase/supabase-js'
import { Bars3Icon } from '@heroicons/react/24/solid'
import { Transition } from '@headlessui/react'
import { Navbar } from './Navbar'
import SidebarMenu from './SidebarMenu'

export interface Props {
  session: AuthSession | null
}

export default function DashboardLayout({
  session,
  children,
}: PropsWithChildren<Props>) {
  const [sidebarMenuOpen, setSidebarMenuOpen] = useState(true)

  return (
    <>
      <Head>
        <title>appointee</title>
      </Head>
      <div className="flex h-screen w-screen flex-col bg-zinc-200">
        <header className="fixed left-0 right-0 top-0 z-50 flex h-16 justify-between border-b bg-zinc-800 px-6">
          <div className="flex items-center justify-center gap-x-6">
            <Bars3Icon
              className="h-8 w-8 cursor-pointer text-zinc-50"
              onClick={() => setSidebarMenuOpen(!sidebarMenuOpen)}
            />
            <h1>
              <Link href="/">
                <a className="text-xl font-black text-zinc-50">appointee</a>
              </Link>
            </h1>
          </div>
          <Navbar session={session} />
        </header>
        <main className="flex h-full w-full pt-16">
          <Transition
            as={Fragment}
            show={sidebarMenuOpen}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <section className="h-full bg-zinc-50">
              <SidebarMenu />
            </section>
          </Transition>
          <section className="h-full w-full overflow-y-scroll bg-zinc-200 p-12">
            {children}
          </section>
        </main>
        <footer className=""></footer>
      </div>
    </>
  )
}
