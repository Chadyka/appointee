import { useState } from 'react'
import DatePicker from 'react-datepicker'
import { Control, useController, UseFormSetValue } from 'react-hook-form'
import { NewReservationInput } from '../../pages/book/[slug]'
import { Service } from '../../types/database/types'

export default function BookingForm({
  service,
  control,
  setFormValue,
}: {
  service: Service | null
  control: Control<NewReservationInput, any>
  setFormValue: UseFormSetValue<NewReservationInput>
}) {
  const {
    field: { value: startsAtValue },
  } = useController({
    control,
    name: 'starts_at',
    defaultValue: new Date(),
  })

  return (
    <>
      <div className="flex h-full w-full flex-col items-center justify-center gap-y-6">
        <h2 className="flex flex-col text-center text-xl font-semibold">
          <span className="w-fit rounded-full bg-zinc-800 px-6 py-2 text-zinc-50">
            {service?.title}
          </span>
        </h2>
        <div className="space-y-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 flex w-full justify-between">
              <div className="flex flex-col font-medium">
                <span>Duration:</span>
                <span>{service?.duration} minutes</span>
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
            <div className="col-span-6">
              <label htmlFor="starts_at" className="font-medium">
                When do we start?
              </label>
              <DatePicker
                selected={startsAtValue}
                onChange={(date) => {
                  date && setFormValue('starts_at', date)
                }}
                // locale="en-GB"
                showTimeSelect
                timeFormat="p"
                timeIntervals={service?.duration}
                dateFormat="Pp"
                className="block w-full rounded-lg border bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-sky-600 focus:ring-sky-600 sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
