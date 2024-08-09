import { IsyBuildClient as api } from '../apiClients/IsyBuildClient'

const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    adminStaffList: build.query<AdminStaffListApiResponse, AdminStaffListApiArg>({
      query: () => ({ url: `/admin-staff/` })
    }),
    loginCreate: build.mutation<LoginCreateApiResponse, LoginCreateApiArg>({
      query: queryArg => ({ url: `/login/`, method: 'POST', body: queryArg.tokenObtainPair })
    }),
    logoutCreate: build.mutation<LogoutCreateApiResponse, LogoutCreateApiArg>({
      query: queryArg => ({ url: `/logout/`, method: 'POST', body: queryArg.tokenRefresh })
    }),
    tokenRefreshCreate: build.mutation<TokenRefreshCreateApiResponse, TokenRefreshCreateApiArg>({
      query: queryArg => ({ url: `/token_refresh/`, method: 'POST', body: queryArg.tokenRefresh })
    })
  }),
  overrideExisting: false
})

export { injectedRtkApi as pIsyBuildApi }
export type AdminStaffListApiResponse = /** status 200  */ AdminStaffRead[]
export type AdminStaffListApiArg = void
export type LoginCreateApiResponse = /** status 200  */ {
  [key: string]: any
}
export type LoginCreateApiArg = {
  tokenObtainPair: TokenObtainPairWrite
}
export type LogoutCreateApiResponse = /** status 205 No response body */ void
export type LogoutCreateApiArg = {
  tokenRefresh: TokenRefresh
}
export type TokenRefreshCreateApiResponse = /** status 200  */ {
  [key: string]: any
}
export type TokenRefreshCreateApiArg = {
  tokenRefresh: TokenRefresh
}
export type AdminStaff = {}
export type User = {
  email: string
  first_name?: string
  last_name?: string
  date_joined?: string
  is_active?: boolean
}
export type UserRead = {
  id: number
  email: string
  first_name?: string
  last_name?: string
  date_joined?: string
  is_active?: boolean
}
export type AdminStaffRead = {
  id: number
  user: UserRead
}
export type TokenObtainPair = {}
export type TokenObtainPairRead = {
  access: string
  refresh: string
}
export type TokenObtainPairWrite = {
  email: string
  password: string
}
export type TokenRefresh = {
  refresh: string
}
export type TokenRefreshRead = {
  access: string
  refresh: string
}
export const {
  useAdminStaffListQuery,
  useLoginCreateMutation,
  useLogoutCreateMutation,
  useTokenRefreshCreateMutation
} = injectedRtkApi
