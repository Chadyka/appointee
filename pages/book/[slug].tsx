/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import { CheckIcon } from '@heroicons/react/24/solid'
import { useForm } from 'react-hook-form'
import ServicePicker from '../../components/reservation/ServicePicker'
import { Booking, Profile, Service } from '../../types/database/types'
import { db } from '../../utils/hooks/db'
import { z } from 'zod'
import { useMultistepForm } from '../../utils/hooks/useMultistepForm'
import { supabase } from '../../utils/supabaseClient'
import BookingForm from '../../components/reservation/BookingForm'
import CustomerForm from '../../components/reservation/CustomerForm'
import 'react-datepicker/dist/react-datepicker.css'
import AddressForm from '../../components/reservation/AddressForm'
import { zodResolver } from '@hookform/resolvers/zod'
import { addMinutes } from 'date-fns'
import Overview from '../../components/reservation/Overview'

export default function Home(props: {
  data: Profile & { services: Service[] & { bookings: Booking[] } }
}) {
  const {
    data: profile,
    data: { services },
  } = props

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors, isSubmitSuccessful },
  } = useForm<NewReservationInput>({
    resolver: zodResolver(newReservationSchema),
  })

  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState(false)

  async function createNewReservation(data: NewReservationInput) {
    try {
      setLoading(true)

      const { data: customerData, error: customerError } = await db
        .customers()
        .insert({
          full_name: `${data.last_name} ${data.first_name}`,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          phone: data.phone,
        })
        .select('id')
        .single()

      const { error: addressErr } = await db.addresses().insert({
        country: data.country,
        zip: data.zip,
        city: data.city,
        street_address: data.street_address,
      })

      const { error: bookingError } = await db.bookings().insert({
        starts_at: data.starts_at.toISOString(),
        ends_at: addMinutes(
          data.starts_at,
          selectedService?.duration ? selectedService?.duration : 30
        ).toISOString(),
        service_id: selectedService?.id,
        customer_id: customerData?.id,
        price: selectedService?.price,
      })

      if (bookingError) throw bookingError
      if (customerError) throw customerError
      if (addressErr) throw addressErr
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const {
    step,
    steps,
    currentStepIndex,
    nextStep,
    backStep,
    goTo,
    isFirstStep,
    isLastStep,
  } = useMultistepForm([
    <ServicePicker
      key={0}
      profile={profile}
      services={services}
      selectService={selectService}
    />,
    <BookingForm
      key={1}
      service={selectedService}
      setFormValue={setValue}
      control={control}
    />,
    <CustomerForm key={2} register={register} errors={errors} />,
    <AddressForm key={3} register={register} errors={errors} />,
  ])

  if (profile.avatar_url) {
    downloadImage(profile.avatar_url)
  }

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data!)
      setAvatarUrl(url)
    } catch (error: any) {
      console.error('Error downloading image: ', error.message)
    }
  }

  function selectService(service: Service) {
    setSelectedService(service)
    nextStep()
  }

  if (!props.data) {
    return null
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-zinc-200">
      <form
        className="flex h-fit w-[24rem] flex-col items-center justify-center gap-y-6"
        onSubmit={handleSubmit(createNewReservation, () => console.log(errors))}
      >
        <div className="flex w-full items-center justify-between">
          <h1 className="text-xl font-bold">{profile.website}</h1>
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Avatar"
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <span className="h-12 w-12 animate-pulse rounded-full bg-zinc-200"></span>
          )}
        </div>
        <div className="mt-6 mb-3 flex h-3 w-full items-center justify-between rounded-full bg-zinc-800 duration-300">
          {Array.from(Array(steps.length).keys()).map((stepNum) => (
            <button
              key={stepNum}
              onClick={() => {
                stepNum < currentStepIndex && goTo(stepNum)
              }}
              className={`flex h-10 w-10 items-center justify-center rounded-full font-medium ${
                currentStepIndex >= stepNum
                  ? 'bg-zinc-800 text-zinc-50'
                  : 'bg-zinc-50 text-zinc-800'
              } ${currentStepIndex == stepNum && 'scale-125'}`}
            >
              {currentStepIndex > stepNum || isSubmitSuccessful ? (
                <CheckIcon className="h-6 w-6" />
              ) : (
                stepNum + 1
              )}
            </button>
          ))}
        </div>
        <div className="w-full rounded-lg bg-white p-6 shadow-md">
          {loading ? (
            <>Loading...</>
          ) : isSubmitSuccessful ? (
            <Overview formValues={getValues()} service={selectedService} />
          ) : (
            <>{step}</>
          )}
          {!isFirstStep && !isSubmitSuccessful && (
            <div className=" mt-12 flex w-full justify-between">
              <button
                type="button"
                className="rounded-lg border-2 border-zinc-800 py-2 px-3 duration-150 hover:scale-110"
                onClick={() => backStep()}
              >
                Back
              </button>
              {!isLastStep ? (
                <button
                  type="button"
                  className="rounded-lg border-2 border-zinc-800 bg-zinc-800 py-2 px-3 text-zinc-50 duration-150 hover:scale-110"
                  onClick={() => nextStep()}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="rounded-lg border-2 border-zinc-800 bg-zinc-800 py-2 px-3 text-zinc-50 duration-150 hover:scale-110"
                >
                  Finish
                </button>
              )}
            </div>
          )}
        </div>
        <div className="flex gap-x-3">
          <span>powered by</span>
          <img className="h-6" src="/logo.svg" alt="logo" />
        </div>
      </form>
    </div>
  )
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  try {
    const { data, error } = await db
      .profiles()
      .select('*, services(*, bookings(*))')
      .eq('website', params.slug)
      .single()

    if (error) throw error

    return {
      props: {
        data,
      },
      revalidate: 60,
    }
  } catch (error) {
    console.error(error)
  }
}

export async function getStaticPaths() {
  try {
    const { data, error } = await db.profiles().select('*')

    if (error) throw error

    const paths = data.map((profile) => ({
      params: { slug: profile.website },
    }))

    return { paths, fallback: 'blocking' }
  } catch (error) {
    console.error(error)
  }
}

const newReservationSchema = z.object({
  starts_at: z.date(),
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
  country: z.string(),
  zip: z.number().positive(),
  city: z.string(),
  street_address: z.string(),
})

export type NewReservationInput = {
  starts_at: Date
  ends_at: Date
  price: number
  first_name: string
  last_name: string
  email: string
  phone: string
  country: string
  zip: number
  city: string
  street_address: string
}
