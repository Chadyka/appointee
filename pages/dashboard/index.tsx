/* eslint-disable @next/next/no-img-element */
import {
  BanknotesIcon,
  CalendarIcon,
  UsersIcon,
} from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { Booking, Customer } from '../../types/database/types'
import { db } from '../../utils/hooks/db'
import { useProfile } from '../../utils/hooks/useProfile'
import { useSession } from '../../utils/hooks/useSession'
import { supabase } from '../../utils/supabaseClient'
import { addDays, format, isSameDay } from 'date-fns'
import { Analytics } from '../../components/dashboard/Chart'
import { compareDesc } from 'date-fns'

export default function Dashboard() {
  const { session } = useSession()

  const { loading, error, profile } = useProfile(session)
  const [avatar_url, setAvatarUrl] = useState<string>('')
  const [loadingFetch, setLoadingFetch] = useState(false)
  const [bookings, setBookings] = useState<
    Array<Booking & { customers: Customer }>
  >([])
  const [customers, setCustomers] = useState<Customer[] | null>(null)

  useEffect(() => {
    if (avatar_url) downloadImage(avatar_url)
  }, [avatar_url])

  useEffect(() => {
    if (profile) {
      setAvatarUrl(profile.avatarUrl)
    }
  }, [profile])

  useEffect(() => {
    getBookings()
  }, [session])

  if (!session || error) {
    return <div>No session</div>
  }

  const today = new Date()
  const lastMonthDate = new Date(new Date().setDate(today.getDate() - 30))

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data!)
      setAvatarUrl(url)
    } catch (error: any) {
      console.log('Error downloading image: ', error.message)
    }
  }

  async function getBookings() {
    console.log('first')
    if (session) {
      try {
        setLoadingFetch(true)
        const { error, data } = await db.bookings().select(
          `
           *,
           customers (
             *
           ),
           services (
             *
           )`
        )

        setBookings(data ? data : [])

        const { error: customerError, data: customerData } = await db
          .customers()
          .select('*')
          .eq('provider_id', session.user.id)

        setCustomers(customerData)

        // if (serviceError) throw serviceError
        if (customerError) throw customerError
        if (error) throw error
      } catch (error) {
        console.error(error)
      } finally {
        setLoadingFetch(false)
      }
    }
  }

  const futureBookings = bookings.filter(
    (booking) => compareDesc(today, new Date(booking.starts_at!)) === 1
  )
  return (
    <DashboardLayout session={session}>
      <div className="grid w-full grid-cols-3 gap-12 rounded-xl border-4 border-zinc-400 p-6">
        <div className="col-span-3 flex w-full items-center justify-between">
          <h2 className="text-2xl font-bold">
            👋 Good {today.getHours() > 12 ? 'afternoon' : 'morning'},{' '}
            {profile?.first_name}
          </h2>
          <div className="flex items-center justify-center gap-x-6">
            <h3 className="font-medium">{profile?.website}</h3>
            {!loading && avatar_url ? (
              <img
                src={avatar_url}
                alt="Avatar"
                className="h-12 w-12 rounded-full"
              />
            ) : (
              <span className="h-12 w-12 animate-pulse rounded-full bg-zinc-400"></span>
            )}
          </div>
        </div>
        <div className="flex w-full items-center rounded-lg bg-zinc-50 p-6">
          <UsersIcon className="h-10 w-10 text-zinc-700" />
          <div className="ml-6 flex flex-col">
            <label className="font-medium text-zinc-500">Customers</label>
            <h3 className="text-xl font-bold">{customers?.length}</h3>
          </div>
        </div>
        <div className="flex w-full items-center rounded-lg bg-zinc-50 p-6">
          <CalendarIcon className="h-10 w-10 text-zinc-700" />
          <div className="ml-6 flex flex-col">
            <label className="font-medium text-zinc-500">
              Upcoming bookings
            </label>
            <h3 className="text-xl font-bold">{futureBookings?.length}</h3>
          </div>
        </div>
        <div className="flex w-full items-center rounded-lg bg-zinc-50 p-6">
          <BanknotesIcon className="h-10 w-10 text-zinc-700" />
          <div className="ml-6 flex flex-col">
            <label className="font-medium text-zinc-500">
              Upcoming revenue
            </label>
            <h3 className="text-xl font-bold">
              {futureBookings
                ?.reduce((accumulator, booking) => {
                  if (booking.price) {
                    return accumulator + booking.price
                  } else {
                    return accumulator
                  }
                }, 0)
                .toLocaleString('hu-HU', {
                  style: 'currency',
                  currency: 'HUF',
                  maximumFractionDigits: 0,
                })}
            </h3>
          </div>
        </div>
        <div className="col-span-3 h-72 w-full rounded-lg bg-zinc-50 p-6">
          <Analytics bookings={bookings} />
        </div>
        <div className="col-span-3 w-full rounded-lg bg-zinc-50 p-6">
          <h2 className="mb-6 text-2xl font-semibold">Next 3 days</h2>
          <div className="grid grid-cols-4">
            <div>
              <h4 className="text-lg font-medium">Today</h4>
              {bookings
                .filter((booking) =>
                  isSameDay(new Date(booking.starts_at!), today)
                )
                .map((booking) => (
                  <div key={booking.id} className="flex gap-x-3">
                    <p>{booking.customers.full_name}</p>
                    <p>
                      {format(new Date(booking.starts_at!), 'hh:mm')}
                      {' - '}
                      {format(new Date(booking.ends_at!), 'hh:mm')}
                    </p>
                  </div>
                ))}
            </div>
            <div>
              <h4 className="text-lg font-medium">Tomorrow</h4>
              {bookings
                .filter((booking) =>
                  isSameDay(new Date(booking.starts_at!), addDays(today, 1))
                )
                .map((booking) => (
                  <div key={booking.id} className="flex gap-x-3">
                    <p>{booking.customers.full_name}</p>
                    <p>
                      {format(new Date(booking.starts_at!), 'hh:mm')}
                      {' - '}
                      {format(new Date(booking.ends_at!), 'hh:mm')}
                    </p>
                  </div>
                ))}
            </div>
            <div>
              <h4>+2 days</h4>
              {bookings
                .filter((booking) =>
                  isSameDay(
                    new Date(booking.starts_at!),
                    addDays(new Date(booking.starts_at!), 2)
                  )
                )
                .map((booking) => (
                  <div key={booking.id}>{booking.customers.full_name}</div>
                ))}
            </div>
            <div>
              <h4>+3 days</h4>
              {bookings
                .filter((booking) =>
                  isSameDay(
                    new Date(booking.starts_at!),
                    addDays(new Date(booking.starts_at!), 3)
                  )
                )
                .map((booking) => (
                  <div key={booking.id}>{booking.customers.full_name}</div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
