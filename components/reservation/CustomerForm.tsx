import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form'
import { NewReservationInput } from '../../types/Onboarding'

export default function CustomerForm({
  register,
  errors,
}: {
  register: UseFormRegister<NewReservationInput>
  errors: Partial<FieldErrorsImpl<any>>
}) {
  return (
    <>
      <div className="mb-6 w-full text-center text-xl font-semibold">
        Customer contact
      </div>
      <div className="space-y-6">
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
              <p className="pt-2 text-red-500">{`*${errors.first_name?.message}`}</p>
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
              <p className="pt-2 text-red-500">{`*${errors.last_name?.message}`}</p>
            )}
          </div>
          <div className="col-span-6">
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
              <p className="pt-2 text-red-500">{`*${errors.email?.message}`}</p>
            )}
          </div>
          <div className="col-span-6">
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
              <p className="pt-2 text-red-500">{`*${errors.phone?.message}`}</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
