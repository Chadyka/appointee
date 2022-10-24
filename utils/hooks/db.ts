import type {
  Organization,
  Profile,
  Provider,
  Service,
  Subscription,
} from '../../types/database/types'
import { supabase } from '../supabaseClient'

export const db = {
  // @ts-expect-error
  organizations: () => supabase.from<Organization>('organizations'),
  // @ts-expect-error
  profiles: () => supabase.from<Profile>('profiles'),
  // @ts-expect-error
  providers: () => supabase.from<Provider>('providers'),
  // @ts-expect-error
  services: () => supabase.from<Service>('services'),
  // @ts-expect-error
  subscriptions: () => supabase.from<Subscription>('subscriptions'),
  // @ts-expect-error
  customers: () => supabase.from<Customers>('customers'),
}

export const getPagination = (page: number, size: number) => {
  const limit = size ? +size : 3
  const from = page ? page * limit : 0
  const to = page ? from + size : size

  return { from, to }
}
