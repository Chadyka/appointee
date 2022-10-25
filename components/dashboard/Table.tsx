import Link from 'next/link'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'

export default function CustomerTable({
  headers,
  rows,
  deleteRow,
}: {
  headers: string[]
  rows: Array<any[]>
  deleteRow?(id: string): Promise<void>
}) {
  return (
    <div className="relative overflow-x-auto rounded-lg">
      <table className="w-full overflow-hidden rounded-t-lg text-left text-sm text-zinc-500">
        <thead className="rounded-t-lg bg-zinc-300 text-xs uppercase text-zinc-700">
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col" className="py-3 px-6">
                {header}
              </th>
            ))}
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr className="border-b bg-white hover:bg-zinc-50" key={row[0]}>
              <td
                scope="row"
                className="flex items-center whitespace-nowrap py-2 px-6 text-zinc-900"
              >
                <div>
                  <div className="text-base font-semibold">{row[1]}</div>
                  <div className="font-normal text-zinc-500">{row[2]}</div>
                </div>
              </td>
              {row.slice(3).map((cell) => (
                <td key={cell} className="py-4 px-6">
                  {cell}
                </td>
              ))}

              <td>
                <div className="flex h-full items-center justify-center gap-x-4">
                  <Link href={`/dashboard/customers/${row[0]}`}>
                    <PencilIcon className="h-5 w-5 cursor-pointer text-sky-700 hover:text-sky-600" />
                  </Link>
                  {deleteRow && (
                    <TrashIcon
                      className="h-5 w-5 cursor-pointer text-red-700 hover:text-red-600"
                      onClick={() =>
                        //   deleteCustomer(customer.id, customer.address_id)
                        deleteRow(row[0])
                      }
                    />
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
