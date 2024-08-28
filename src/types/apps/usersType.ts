// Type Imports
import type {ThemeColor} from '@core/types'

export type UsersType = {
  count: number
  next: string
  user: {
    id: number
    email: string
    first_name: string
    last_name: string
    date_joined: string
    is_active: boolean
  }
}
