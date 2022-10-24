import { Fragment, useEffect, useState } from 'react'
import { PlusSmallIcon } from '@heroicons/react/24/solid'
import { Customer } from '../../../types/database/types'
import { db, getPagination } from '../../../utils/hooks/db'
import { useSession } from '../../../utils/hooks/useSession'
import Table from '../../../components/dashboard/Table'
import DashboardLayout from '../../../components/layout/DashboardLayout'
import { Transition } from '@headlessui/react'
import Link from 'next/link'

export default function Customers() {
  const { session } = useSession()
  const [loading, setLoading] = useState(false)
  const [customers, setCustomers] = useState<Customer[]>([])
  const [customersCount, setCustomersCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const pageSize = 10

  const fetchCustomers = async (from: number, to: number) => {
    try {
      setLoading(true)
      const { data, error, count } = await db
        .customers()
        .select('*', { count: 'exact' })
        .range(from, to)

      if (error) throw error
      setCustomers(data)
      setCustomersCount(count ?? 0)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const { from, to } = getPagination(currentPage - 1, pageSize)
    fetchCustomers(from, to)
  }, [currentPage])

  return (
    <DashboardLayout session={session}>
      <Transition
        as={Fragment}
        show={!!customersCount && !loading}
        enter="transition ease-in-out duration-300 transform"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="rounded-xl p-6">
          <div className="flex items-center justify-between pb-4">
            <div className="flex items-center justify-center gap-x-3">
              <h2 className="text-xl font-bold text-zinc-800">Customers</h2>
              <Link href="/dashboard/customers/add">
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
                  { length: Math.floor(customersCount / pageSize) + 1 },
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
          <Table customers={customers} />
        </div>
      </Transition>
    </DashboardLayout>
  )
}
