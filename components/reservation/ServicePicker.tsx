import { Dispatch, SetStateAction } from 'react'
import { Profile, Service } from '../../types/database/types'

export default function ServicePicker({
  profile,
  services,
  selectService,
}: {
  profile: Profile
  services: Service[]
  selectService: (service: Service) => void
}) {
  return (
    <>
      <div className="flex h-full w-full flex-col gap-y-6">
        <h2 className="flex flex-col text-center text-xl font-semibold">
          <span>Welcome to {profile.website}!</span>
          <span>What can we help you with today?</span>
        </h2>
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => selectService(service)}
            className="w-full rounded-lg border-2 border-zinc-800 py-2 px-3 text-center font-medium duration-300 hover:scale-105"
          >
            {service.title}
          </button>
        ))}
      </div>
    </>
  )
}
