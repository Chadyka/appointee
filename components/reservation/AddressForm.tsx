import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form'
import { NewReservationInput } from '../../pages/book/[slug]'

export default function AddressForm({
  register,
  errors,
}: {
  register: UseFormRegister<NewReservationInput>
  errors: Partial<FieldErrorsImpl<any>>
}) {
  return (
    <>
      <div className="mb-6 w-full text-center text-xl font-semibold">
        Customer address
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-6 gap-6">
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
              <p className="pt-2 text-red-500">{`*${errors.country?.message}`}</p>
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
              <p className="pt-2 text-red-500">{`*${errors.zip?.message}`}</p>
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
              <p className="pt-2 text-red-500">{`*${errors.city?.message}`}</p>
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
              <p className="pt-2 text-red-500">{`*${errors.street_address?.message}`}</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
