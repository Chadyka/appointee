import { PencilIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { Customer } from '../../types/database/types'
import EditModal from './EditModal'

export default function Table({ customers }: { customers: Customer[] }) {
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
                <td className="py-4 px-6">
                  <Link href={`/dashboard/customers/${customer.id}`}>
                    <div className="flex cursor-pointer items-center justify-center gap-x-3 font-medium text-sky-700 hover:text-sky-600 hover:underline">
                      <PencilIcon className="h-6 w-6" />
                      <span>Edit</span>
                    </div>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
