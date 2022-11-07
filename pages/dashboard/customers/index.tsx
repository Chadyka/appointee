import Link from 'next/link'
import { Transition } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { PlusSmallIcon } from '@heroicons/react/24/solid'

import { Customer } from '../../../types/database/types'
import { db, getPagination, getTableRows } from '../../../utils/hooks/db'
import { useSession } from '../../../utils/hooks/useSession'
import CustomerTable from '../../../components/dashboard/CustomerTable'
import DashboardLayout from '../../../components/layout/DashboardLayout'
import Table from '../../../components/dashboard/Table'

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
        .order('email')
        .range(from, to - 1)

      if (error) throw error
      setCustomers(data)
      setCustomersCount(count ?? 0)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  async function deleteCustomer(customerId: string) {
    const currentCustomer = customers.find(
      (customer) => customer.id === customerId
    ) as Customer
    try {
      setLoading(true)
      const { error } = await db
        .customers()
        .delete()
        .eq('id', currentCustomer.id)
      if (currentCustomer.address_id) {
        const { error: addressErr } = await db
          .addresses()
          .delete()
          .eq('id', currentCustomer.address_id)
        if (addressErr) throw addressErr
      }
      setCustomersCount(customersCount - 1)
      if (error) throw error
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    const { from, to } = getPagination(currentPage - 1, pageSize)
    fetchCustomers(from, to)
  }, [currentPage, customersCount])

  return (
    <DashboardLayout session={session}>
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
        <Transition
          show={!!customersCount && !loading}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {/* <CustomerTable customers={customers} setCustomers={setCustomers} /> */}
          <Table
            headers={['Name', 'Phone', 'Location']}
            rows={getTableRows(customers, [
              'id',
              'full_name',
              'email',
              'phone',
              'country_code',
            ])}
            deleteRow={deleteCustomer}
            resourceUrl="customers"
          />
        </Transition>
      </div>
    </DashboardLayout>
  )
}
