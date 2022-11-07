import { Transition } from '@headlessui/react'
import { PlusSmallIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Table from '../../../components/dashboard/Table'
import DashboardLayout from '../../../components/layout/DashboardLayout'
import { Service } from '../../../types/database/types'
import { db, getPagination, getTableRows } from '../../../utils/hooks/db'
import { useSession } from '../../../utils/hooks/useSession'

export default function Services() {
  const { session } = useSession()

  const [loading, setLoading] = useState(false)
  const [services, setServices] = useState<Service[]>([])
  const [servicesCount, setServicesCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const pageSize = 10

  const getServices = async (from: number, to: number) => {
    if (session) {
      try {
        setLoading(true)
        const { data, error, count } = await db
          .services()
          .select('*', { count: 'exact' })
          .eq('provider_id', session.user.id)
          .order('slug')
          .range(from, to - 1)

        if (error) throw error
        setServices(data)
        setServicesCount(count ?? 0)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    const { from, to } = getPagination(currentPage - 1, pageSize)
    getServices(from, to)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, servicesCount, session])

  return (
    <DashboardLayout session={session}>
      <div className="rounded-xl p-6">
        <div className="flex items-center justify-between pb-4">
          <div className="flex items-center justify-center gap-x-3">
            <h2 className="text-xl font-bold text-zinc-800">Services</h2>
            <Link href="/dashboard/services/add">
              <div className="flex cursor-pointer items-center justify-center gap-x-2 rounded-lg bg-zinc-300 py-1 px-3 text-zinc-800 hover:text-sky-800">
                <span>Add new</span>
                <PlusSmallIcon className="h-4 w-4" />
              </div>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-x-6">
            <span>
              {getPagination(currentPage - 1, pageSize).from + 1}-
              {getPagination(currentPage - 1, pageSize).to + 1} results
            </span>
            <div className="flex divide-x-2 divide-zinc-300 rounded-lg border-2 border-zinc-300 bg-zinc-50">
              {Array.from(
                { length: Math.floor(servicesCount / pageSize) + 1 },
                (_, i) => i + 1
              ).map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`flex h-8 w-8 items-center justify-center ${
                    currentPage === num && 'bg-zinc-300'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </div>
        <Transition
          show={!!servicesCount && !loading}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Table
            headers={['Title', 'Duration', 'Price']}
            rows={getTableRows(services, [
              'id',
              'title',
              'slug',
              'duration',
              'price',
            ])}
            resourceUrl="services"
            // deleteRow={deleteCustomer}
          />
        </Transition>
      </div>
    </DashboardLayout>
  )
}
