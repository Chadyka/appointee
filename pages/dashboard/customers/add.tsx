import { ArrowLongLeftIcon, XMarkIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import DashboardLayout from '../../../components/layout/DashboardLayout'
import { db } from '../../../utils/hooks/db'
import { useSession } from '../../../utils/hooks/useSession'

type AddCustomerInput = {
  first_name: string
  last_name: string
  email: string
  phone: string
  country_code: string
}

export default function AddCustomer() {
  const { session } = useSession()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AddCustomerInput>()

  const [loading, setLoading] = useState(false)

  const insertCustomer = async (data: AddCustomerInput) => {
    try {
      setLoading(true)
      const { error } = await db.customers().insert(data)

      if (error) throw error
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <DashboardLayout session={session}>
        <div>Loading...</div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout session={session}>
      <div className="relative h-full w-full">
        <form
          onSubmit={handleSubmit(insertCustomer)}
          className="relative rounded-lg bg-white shadow dark:bg-gray-700"
        >
          <div className="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Edit customer
            </h3>
            <Link href="/dashboard/customers">
              <div className="ml-auto inline-flex cursor-pointer items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
                <ArrowLongLeftIcon className="mr-3 h-6 w-6" />
                <span className="font-medium">Vissza</span>
              </div>
            </Link>
          </div>
          <div className="space-y-6 p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  First Name
                </label>
                <input
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-blue-600 focus:ring-blue-600 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  {...register('first_name', { required: true })}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last Name
                </label>
                <input
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-blue-600 focus:ring-blue-600 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  {...register('last_name', { required: true })}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-blue-600 focus:ring-blue-600 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  placeholder="example@company.com"
                  {...register('email', { required: true })}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="phone-number"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone Number
                </label>
                <input
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-blue-600 focus:ring-blue-600 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  placeholder="e.g. +(12)3456 789"
                  {...register('phone', { required: true })}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="current-password"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Country Code
                </label>
                <input
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-blue-600 focus:ring-blue-600 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  placeholder="HU"
                  {...register('country_code', { required: true })}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600">
            <button
              type="submit"
              className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Save all
            </button>
            {errors.first_name &&
              errors.last_name &&
              errors.email &&
              errors.phone &&
              errors.country_code && (
                <span className="flex items-center justify-center gap-x-3 pl-12 text-red-600">
                  <XMarkIcon className="h-6 w-6" />
                  <p>All fields are required</p>
                </span>
              )}
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}
