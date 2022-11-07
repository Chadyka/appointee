import { z } from 'zod'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Controller, useController, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLongLeftIcon, CheckIcon } from '@heroicons/react/24/solid'

import { db } from '../../../utils/hooks/db'
import { useSession } from '../../../utils/hooks/useSession'
import DashboardLayout from '../../../components/layout/DashboardLayout'
import { useRouter } from 'next/router'
import Select from '../../../components/form-elements/Select'

export default function EditBooking() {
  const { session } = useSession()
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitSuccessful },
  } = useForm<UpdateServiceInput>({
    resolver: zodResolver(servicePartial),
  })

  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const durationOptions = [
    { value: 30, name: '30 minutes' },
    { value: 45, name: '45 minutes' },
    { value: 60, name: '1 hour' },
    { value: 90, name: '1 hour 30 minutes' },
    { value: 120, name: '2 hours' },
  ]

  const {
    field: { value: durationValue, onChange: onDurationChange },
  } = useController({
    control,
    name: 'duration',
    defaultValue: durationOptions[0],
  })

  const updateService = async (data: UpdateServiceInput) => {
    try {
      setLoading(true)
      const { error } = await db
        .services()
        .update({ ...data, duration: data.duration?.value })
        .eq('id', router.query.id)
      if (error) throw error
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const getServiceById = async (id: string | string[]) => {
    try {
      setLoading(true)
      const { data, error } = await db
        .services()
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      console.log(data)
      setValue(
        'duration',
        durationOptions.find((el) => el.value === data.duration)
      )
      console.log(data.price)
      setValue('price', data.price)
      setValue('title', data.title)
      setValue('provider_id', data.provider_id)
      setValue('slug', data.slug)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (router.query.id) {
      getServiceById(router.query.id)
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
          onSubmit={handleSubmit(updateService)}
          className="relative rounded-lg bg-white shadow"
        >
          <div className="flex items-start justify-between rounded-t border-b p-4">
            <h3 className="text-xl font-semibold text-gray-900">Add service</h3>
            <Link href="/dashboard/services">
              <div className="ml-auto inline-flex cursor-pointer items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900">
                <ArrowLongLeftIcon className="mr-3 h-6 w-6" />
                <span className="font-medium">Back</span>
              </div>
            </Link>
          </div>
          <div className="space-y-6 p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Title
                </label>
                <input
                  className={`block w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-sky-600 focus:ring-sky-600 sm:text-sm ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...register('title')}
                />
                {errors.title && (
                  <p className="pt-2 text-red-500">*{errors.title?.message}</p>
                )}
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="duration"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Duration
                </label>
                <Select
                  options={durationOptions}
                  value={durationValue!}
                  onChange={onDurationChange}
                  error={errors.duration}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="price"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Price
                </label>
                <Controller
                  name="price"
                  render={(props) => (
                    <input
                      type="number"
                      placeholder={props.field.value ? props.field.value : ''}
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

interface UpdateServiceInput {
  slug?: string
  title?: string
  duration?: { name: string; value: number }
  price?: string
  provider_id?: string
}

const updateServiceSchema = z
  .object({
    title: z.string().regex(/[A-Za-zÀ-ÿ]/, {
      message: 'Not a valid title',
    }),
    duration: z.object({
      value: z.number().positive(),
      name: z.string(),
    }),
    price: z.number().positive(),
  })
  .required()

const servicePartial = updateServiceSchema.partial()
