import { z } from 'zod'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLongLeftIcon, CheckIcon } from '@heroicons/react/24/solid'

import { db } from '../../../utils/hooks/db'
import { useSession } from '../../../utils/hooks/useSession'
import DashboardLayout from '../../../components/layout/DashboardLayout'
import { useRouter } from 'next/router'

export default function AddCustomer() {
  const { session } = useSession()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitSuccessful },
  } = useForm<UpdateCustomerInput>({
    resolver: zodResolver(customerPartial),
  })

  const [loading, setLoading] = useState(false)
  const [addressId, setAddressId] = useState('')

  const router = useRouter()

  const updateCustomer = async (data: UpdateCustomerInput) => {
    try {
      setLoading(true)
      const { error } = await db
        .customers()
        .update({
          full_name: `${data.last_name} ${data.first_name}`,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          phone: data.phone,
          country_code: data.country_code,
        })
        .eq('id', router.query.id)
      const { error: addressErr } = await db
        .addresses()
        .update({
          country: data.country,
          zip: data.zip,
          city: data.city,
          street_address: data.street_address,
        })
        .eq('id', addressId)

      if (error || addressErr) throw error
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const getCustomerById = async (id: string | string[]) => {
    try {
      setLoading(true)
      const { data, error } = await db
        .customers()
        .select(
          `
          *,
          addresses (
            *
          )
        `
        )
        .eq('id', id)
        .single()

      if (error) throw error
      setValue('first_name', data.first_name)
      setValue('last_name', data.last_name)
      setValue('email', data.email)
      setValue('phone', data.phone)
      setValue('country_code', data.country_code)
      setValue('country', data.addresses.country)
      setValue('zip', +data.addresses.zip)
      setValue('city', data.addresses.city)
      setValue('street_address', data.addresses.street_address)
      setAddressId(data.addresses.id)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (router.query.id) {
      getCustomerById(router.query.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.id])

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
          onSubmit={handleSubmit(updateCustomer)}
          className="relative rounded-lg bg-white shadow"
        >
          <div className="flex items-start justify-between rounded-t border-b p-4">
            <h3 className="text-xl font-semibold text-gray-900">
              Edit customer
            </h3>
            <Link href="/dashboard/customers">
              <div className="ml-auto inline-flex cursor-pointer items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900">
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
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  First Name
                </label>
                <input
                  className={`block w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-sky-600 focus:ring-sky-600 sm:text-sm ${
                    errors.first_name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...register('first_name')}
                />
                {errors.first_name && (
                  <p className="pt-2 text-red-500">
                    *{errors.first_name?.message}
                  </p>
                )}
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Last Name
                </label>
                <input
                  className={`block w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-sky-600 focus:ring-sky-600 sm:text-sm ${
                    errors.last_name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...register('last_name')}
                />
                {errors.last_name && (
                  <p className="pt-2 text-red-500">
                    *{errors.last_name?.message}
                  </p>
                )}
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  className={`block w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-sky-600 focus:ring-sky-600 sm:text-sm ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...register('email')}
                />
                {errors.email && (
                  <p className="pt-2 text-red-500">*{errors.email?.message}</p>
                )}
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="phone-number"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Phone Number
                </label>
                <input
                  className={`block w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-sky-600 focus:ring-sky-600 sm:text-sm ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...register('phone')}
                />
                {errors.phone && (
                  <p className="pt-2 text-red-500">*{errors.phone?.message}</p>
                )}
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="current-password"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Country Code
                </label>
                <input
                  className={`block w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-sky-600 focus:ring-sky-600 sm:text-sm ${
                    errors.country_code ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...register('country_code')}
                />
                {errors.country_code && (
                  <p className="pt-2 text-red-500">
                    *{errors.country_code?.message}
                  </p>
                )}
              </div>
              <div className="col-span-12 text-xl font-semibold text-gray-900 sm:col-span-6">
                Address
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="current-password"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Country
                </label>
                <input
                  className={`block w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-sky-600 focus:ring-sky-600 sm:text-sm ${
                    errors.country ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...register('country')}
                />
                {errors.country && (
                  <p className="pt-2 text-red-500">
                    *{errors.country?.message}
                  </p>
                )}
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="current-password"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Zip
                </label>
                <input
                  type="number"
                  className={`block w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-sky-600 focus:ring-sky-600 sm:text-sm ${
                    errors.zip ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...register('zip', { valueAsNumber: true })}
                />
                {errors.zip && (
                  <p className="pt-2 text-red-500">*{errors.zip?.message}</p>
                )}
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="current-password"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  City
                </label>
                <input
                  className={`block w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-sky-600 focus:ring-sky-600 sm:text-sm ${
                    errors.city ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...register('city')}
                />
                {errors.city && (
                  <p className="pt-2 text-red-500">*{errors.city?.message}</p>
                )}
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="current-password"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Street address
                </label>
                <input
                  className={`block w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-sky-600 focus:ring-sky-600 sm:text-sm ${
                    errors.street_address ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...register('street_address')}
                />
                {errors.street_address && (
                  <p className="pt-2 text-red-500">
                    *{errors.street_address?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 rounded-b border-t border-gray-200 p-6">
            {!isSubmitSuccessful ? (
              <button
                type="submit"
                className="rounded-lg bg-sky-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-4 focus:ring-sky-300"
              >
                Update
              </button>
            ) : (
              <button
                disabled={true}
                className="flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-sky-300"
              >
                Updated
                <CheckIcon className="ml-3 h-4 w-4" />
              </button>
            )}
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}

interface UpdateCustomerInput {
  first_name?: string
  last_name?: string
  email?: string
  phone?: string
  country_code?: string
  country?: string
  zip?: number
  city?: string
  street_address?: string
}

const updateCustomerSchema = z.object({
  first_name: z.string().regex(/[A-Za-zÀ-ÿ]/, {
    message: 'Not a valid firstname',
  }),
  last_name: z.string().regex(/[A-Za-zÀ-ÿ]/, {
    message: 'Not a valid lastname',
  }),
  email: z.string().email({ message: 'Not a valid email' }),
  phone: z
    .string()
    .regex(
      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
      { message: 'Not a valid phone number' }
    ),
  country_code: z.string().length(2, { message: 'Must be only 2 characters' }),
  country: z.string(),
  zip: z.number().positive(),
  city: z.string(),
  street_address: z.string(),
})

const customerPartial = updateCustomerSchema.partial()
