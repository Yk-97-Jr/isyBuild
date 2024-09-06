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
  created_at: number
  created_by: number
}
