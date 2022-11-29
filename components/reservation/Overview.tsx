import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { format } from 'date-fns'
import { NewReservationInput } from '../../pages/book/[slug]'
import { Service } from '../../types/database/types'

export default function Overview({
  formValues,
  service,
}: {
  formValues: NewReservationInput
  service: Service | null
}) {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-y-6">
        <h2 className="w-full text-center text-xl font-semibold text-zinc-800">
          Thank you for booking!
        </h2>
        <CheckCircleIcon className="h-24 w-24" />
        <div className="w-full">
          <h4 className="w-full border-b-2 border-dashed border-zinc-400 py-3 text-center text-lg font-medium">
            Booking details
          </h4>
          <div className="my-6 grid grid-cols-6 gap-6">
            <div className="col-span-6 flex w-full justify-between">
              <div className="flex flex-col font-medium">
                <span>Date:</span>
                <span>{formValues?.starts_at.toDateString()}</span>
              </div>
              <div className="flex flex-col font-medium ">
                <span>Time:</span>
                <span>{format(formValues.starts_at, 'HH:mm')}</span>
              </div>
            </div>
            <div className="col-span-6 flex w-full justify-between">
              <div className="flex flex-col font-medium">
                <span>Duration:</span>
                <span>{service?.duration}</span>
              </div>
              <div className="flex flex-col font-medium ">
                <span>Price:</span>
                <span>
                  {service?.price &&
                    service.price.toLocaleString('hu-HU', {
                      style: 'currency',
                      currency: 'HUF',
                      maximumFractionDigits: 0,
                    })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
