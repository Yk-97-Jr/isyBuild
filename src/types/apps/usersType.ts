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

  created_by: {
    id: number
    email: string
    first_name: string
    last_name: string
  }
  created_at: string
  updated_at: string
}
