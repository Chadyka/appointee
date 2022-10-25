import type {
  Booking,
  Customer,
  Profile,
  Provider,
  Service,
} from '../../types/database/types'
import { supabase } from '../supabaseClient'

export const db = {
  // @ts-expect-error
  profiles: () => supabase.from<Profile>('profiles'),
  // @ts-expect-error
  providers: () => supabase.from<Provider>('providers'),
  // @ts-expect-error
  services: () => supabase.from<Service>('services'),
  // @ts-expect-error
  customers: () => supabase.from<Customer>('customers'),
  // @ts-expect-error
  addresses: () => supabase.from<Address>('addresses'),
  // @ts-expect-error
  bookings: () => supabase.from<Booking>('bookings'),
}

export const getPagination = (page: number, size: number) => {
  const limit = size ? +size : 3
  const from = page ? page * limit : 0
  const to = page ? from + size : size

  return { from, to }
}

export const getTableRows = (
  objects: Array<Record<string, any>>,
  keys: string[]
) => {
  return objects.map((obj) => keys.map((key: string) => obj[key]))
}
