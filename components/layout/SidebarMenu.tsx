import {
  HomeIcon,
  ChartPieIcon,
  CalendarDaysIcon,
  ShareIcon,
  UsersIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/solid'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function SidebarMenu() {
  const router = useRouter()
  const currentSlug = router.pathname.split('/')[2] ?? ''

  const links = [
    {
      title: 'Home',
      slug: '',
      icon: <HomeIcon className="h-6 w-6" />,
    },
    {
      title: 'Analytics',
      slug: 'analytics',
      icon: <ChartPieIcon className="h-6 w-6" />,
    },
    {
      title: 'Calendar',
      slug: 'calendar',
      icon: <CalendarDaysIcon className="h-6 w-6" />,
    },
    {
      title: 'Customers',
      slug: 'customers',
      icon: <UsersIcon className="h-6 w-6" />,
    },
    {
      title: 'Services',
      slug: 'services',
      icon: <ShareIcon className="h-6 w-6" />,
    },
    {
      title: 'Settings',
      slug: 'settings',
      icon: <Cog6ToothIcon className="h-6 w-6" />,
    },
  ]

  return (
    <>
      <ul className="flex flex-col p-6 text-xl font-semibold text-zinc-500">
        {links.map((link) => (
          <li key={link.slug}>
            <Link href={`/dashboard/${link.slug}`}>
              <div
                className={`mr-12 flex cursor-pointer gap-x-3 rounded-xl py-3 px-6 hover:text-sky-900 ${
                  link.slug === currentSlug
                    ? 'bg-zinc-200 text-sky-800'
                    : 'hover:bg-zinc-200/40'
                }`}
              >
                {link.icon}
                <h4>{link.title}</h4>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
