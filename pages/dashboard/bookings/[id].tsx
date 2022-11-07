import { z } from 'zod'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Controller, useController, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLongLeftIcon, CheckIcon } from '@heroicons/react/24/solid'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { db } from '../../../utils/hooks/db'
import { useSession } from '../../../utils/hooks/useSession'
import DashboardLayout from '../../../components/layout/DashboardLayout'
import { useRouter } from 'next/router'
import { Booking, Customer, Service } from '../../../types/database/types'
import SelectService from '../../../components/form-elements/SelectService'
import SelectCustomer from '../../../components/form-elements/SelectCustomer'

export default function EditBooking() {
  const { session } = useSession()
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitSuccessful },
  } = useForm<UpdateBookingInput>({
    resolver: zodResolver(bookingPartial),
  })

  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const [booking, setBooking] = useState<Booking>()
  const [bookingOptions, setBookingOptions] = useState<{
    services: Array<any>
    customers: Array<any>
  }>({
    services: [],
    customers: [],
  })

  const {
    field: { value: customerValue, onChange: onCustomerChange },
  } = useController({
    control,
    name: 'customer',
  })
  const {
    field: { value: serviceValue, onChange: onServiceChange },
  } = useController({
    control,
    name: 'service',
  })
  const {
    field: { value: startsAtValue },
  } = useController({
    control,
    name: 'starts_at',
    defaultValue: new Date(),
  })
  const {
    field: { value: endsAtValue },
  } = useController({
    control,
    name: 'ends_at',
    defaultValue: new Date(),
  })

  const updateBooking = async (data: UpdateBookingInput) => {
    console.log(data)
    try {
      setLoading(true)
      const { error } = await db
        .bookings()
        .update({
          starts_at: data.starts_at.toISOString(),
          ends_at: data.ends_at.toISOString(),
          service_id: data.service.id,
          customer_id: data.customer.id,
          price: data.price,
        })
        .eq('id', router.query.id)

      if (error) throw error
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  async function getBookingById(id: string | string[]) {
    if (session) {
      try {
        setLoading(true)
        const { error, data } = await db
          .bookings()
          .select(
            `
           *,
           customers (
             *
           ),
           services (
             *
           )`
          )
          .eq('id', id)
          .single()

        const { error: serviceError, data: serviceData } = await db
          .services()
          .select('*')
          .eq('provider_id', session.user.id)
        const { error: customerError, data: customerData } = await db
          .customers()
          .select('*')
          .eq('provider_id', session.user.id)

        if (serviceError) throw serviceError
        if (customerError) throw customerError
        if (error) throw error

        setBooking(data)
        setBookingOptions({ services: serviceData, customers: customerData })
        setValue('customer', data.customers)
        setValue('service', data.services)
        setValue('price', data.services.price)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    if (router.query.id) {
      getBookingById(router.query.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.id, session])

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
          onSubmit={handleSubmit(updateBooking)}
          className="relative rounded-lg bg-white shadow"
        >
          <div className="flex items-start justify-between rounded-t border-b p-4">
            <h3 className="text-xl font-semibold text-gray-900">Add booking</h3>
            <Link href="/dashboard/bookings">
              <div className="ml-auto inline-flex cursor-pointer items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900">
                <ArrowLongLeftIcon className="mr-3 h-6 w-6" />
                <span className="font-medium">Back</span>
              </div>
            </Link>
          </div>
          <div className="space-y-6 p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="starts_at">Start time</label>
                <DatePicker
                  selected={startsAtValue}
                  onChange={(date) => date && setValue('starts_at', date)}
                  // locale="en-GB"
                  showTimeSelect
                  timeFormat="p"
                  timeIntervals={15}
                  dateFormat="Pp"
                  className="block w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-sky-600 focus:ring-sky-600 sm:text-sm"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="ends_at">End time</label>
                <DatePicker
                  selected={endsAtValue}
                  onChange={(date) => date && setValue('ends_at', date)}
                  // locale="en-GB"
                  showTimeSelect
                  timeFormat="p"
                  timeIntervals={15}
                  dateFormat="Pp"
                  className="block w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-sky-600 focus:ring-sky-600 sm:text-sm"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="customer">Customer</label>
                <SelectCustomer
                  options={bookingOptions.customers}
                  value={customerValue}
                  onChange={onCustomerChange}
                  error={errors.customer}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="service">Service</label>
                <SelectService
                  options={bookingOptions.services}
                  value={serviceValue}
                  onChange={onServiceChange}
                  error={errors.service}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="service">Price</label>
                <Controller
                  name="price"
                  render={(props) => (
                    <input
                      type="number"
                      placeholder={`${booking?.price}`}
                      className={`block w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-sky-600 focus:ring-sky-600 sm:text-sm ${
                        errors.price ? 'border-red-500' : 'border-gray-300'
                      }`}
                      onChange={(e) => {
                        props.field.onChange(parseInt(e.target.value, 10))
                      }}
                    />
                  )}
                  control={control}
                />
                {errors.price && (
                  <p className="pt-2 text-red-500">*{errors.price?.message}</p>
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
                Save
              </button>
            ) : (
              <button
                disabled={true}
                className="flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-sky-300"
              >
                Saved
                <CheckIcon className="ml-3 h-4 w-4" />
              </button>
            )}
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}

interface UpdateBookingInput {
  customer: Customer
  service: Service
  starts_at: Date
  ends_at: Date
  price: number
}

const updateBookingSchema = z
  .object({
    customer: z.any(),
    service: z.any(),
    starts_at: z.date(),
    ends_at: z.date(),
    price: z.number().positive(),
  })
  .required()

const bookingPartial = updateBookingSchema.partial()
