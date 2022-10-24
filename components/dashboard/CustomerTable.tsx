import Link from 'next/link'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import { TailSpin } from 'react-loader-spinner'

import { Customer } from '../../types/database/types'
import { db } from '../../utils/hooks/db'
import { Dispatch, SetStateAction, useState } from 'react'

export default function CustomerTable({
  customers,
  setCustomers,
}: {
  customers: Customer[]
  setCustomers: Dispatch<SetStateAction<Customer[]>>
}) {
  const [loading, setLoading] = useState(false)

  const deleteCustomer = async (id: string, addressId: string | undefined) => {
    try {
      setLoading(true)
      const { error } = await db.customers().delete().eq('id', id)
      if (addressId) {
        const { error: addressErr } = await db
          .addresses()
          .delete()
          .eq('id', addressId)
        if (addressErr) throw addressErr
      }
      setCustomers(() => customers.filter((customer) => customer.id !== id))
      if (error) throw error
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  return (
    <>
      <div className="relative overflow-x-auto rounded-lg">
        <table className="w-full overflow-hidden rounded-t-lg text-left text-sm text-zinc-500">
          <thead className="rounded-t-lg bg-zinc-300 text-xs uppercase text-zinc-700">
            <tr>
              <th scope="col" className="py-3 px-6">
                Name
              </th>
              <th scope="col" className="py-3 px-6">
                Phone
              </th>
              <th scope="col" className="py-3 px-6">
                Location
              </th>
              <th scope="col" className="py-3 px-6">
                Bookings
              </th>
              <th scope="col" className="py-3 px-6">
                Spent
              </th>
              <th scope="col" className="py-3 px-6"></th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr
                className="border-b bg-white hover:bg-zinc-50"
                key={customer.id}
              >
                <th
                  scope="row"
                  className="flex items-center whitespace-nowrap py-2 px-6 text-zinc-900"
                >
                  <div>
                    <div className="text-base font-semibold">
                      {customer.last_name} {customer.first_name}
                    </div>
                    <div className="font-normal text-zinc-500">
                      {customer.email}
                    </div>
                  </div>
                </th>
                <td className="py-4 px-6">{customer.phone}</td>
                <td className="py-4 px-6">{customer.country_code}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center">3</div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    {(22500.0).toLocaleString('hu-HU', {
                      style: 'currency',
                      currency: 'HUF',
                    })}
                  </div>
                </td>
                <td>
                  <div className="flex h-full items-center justify-center gap-x-4">
                    <Link href={`/dashboard/customers/${customer.id}`}>
                      <PencilIcon className="h-5 w-5 cursor-pointer text-sky-700 hover:text-sky-600" />
                    </Link>
                    {!loading && (
                      <TrashIcon
                        className="h-5 w-5 cursor-pointer text-red-700 hover:text-red-600"
                        onClick={() =>
                          deleteCustomer(customer.id, customer.address_id)
                        }
                      />
                    )}
                    <TailSpin
                      height="20"
                      width="20"
                      color="#18181b"
                      ariaLabel="tail-spin-loading"
                      radius="1"
                      visible={loading}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
