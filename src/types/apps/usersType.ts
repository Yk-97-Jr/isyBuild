// Type Imports


export type UsersType = {
  id: number
  user: {
    id: number
    email: string
    first_name?: string
    last_name?: string
    date_joined?: string
    is_active?: boolean
  }
  created_by: {
    id: number
    email: string
    first_name?: string
    last_name?: string
    date_joined?: string
    is_active?: boolean
  }
  created_at: string
  updated_at: string
}
export type LotsType = {
  id: number
  name: string
  description: string
  client: {
    id: number
    name: string
    siren_number: string
    address: {
      id: number
      street_number: string
      street_name: string
      postal_code: string
      city: string
      department: string
      region: string
      country: string
      created_by: {
        id: number
        email: string
        first_name: string
        last_name: string
      }
      created_at: string
      updated_at: string
    }
    contact_email: string
    phone_number: string
    is_active: boolean
    created_by: {
      id: number
      email: string
      first_name: string
      last_name: string
    }
    created_at: string
    updated_at: string
  }
  created_by: {
    id: number
    email: string
    first_name: string
    last_name: string
  }
  created_at: string
  updated_at: string
}
