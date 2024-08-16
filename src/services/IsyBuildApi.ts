import { IsyBuildClient as api } from '../apiClients/IsyBuildClient'
const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    adminStaffRetrieve: build.query<AdminStaffRetrieveApiResponse, AdminStaffRetrieveApiArg>({
      query: queryArg => ({ url: `/admin-staff/`, params: { page: queryArg.page, page_size: queryArg.pageSize } })
    }),
    adminStaffRetrieve2: build.query<AdminStaffRetrieve2ApiResponse, AdminStaffRetrieve2ApiArg>({
      query: queryArg => ({ url: `/admin-staff/${queryArg.adminUserId}/` })
    }),
    adminStaffCreateCreate: build.mutation<AdminStaffCreateCreateApiResponse, AdminStaffCreateCreateApiArg>({
      query: queryArg => ({ url: `/admin-staff/create/`, method: 'POST', body: queryArg.adminStaffCreate })
    }),
    adminStaffUpdatePartialUpdate: build.mutation<
      AdminStaffUpdatePartialUpdateApiResponse,
      AdminStaffUpdatePartialUpdateApiArg
    >({
      query: queryArg => ({
        url: `/admin-staff/update/${queryArg.adminUserId}/`,
        method: 'PATCH',
        body: queryArg.patchedAdminStaffUpdate
      })
    }),
    adminUsersDeleteDestroy: build.mutation<AdminUsersDeleteDestroyApiResponse, AdminUsersDeleteDestroyApiArg>({
      query: queryArg => ({ url: `/admin-users/delete/${queryArg.adminUserId}/`, method: 'DELETE' })
    }),
    loginCreate: build.mutation<LoginCreateApiResponse, LoginCreateApiArg>({
      query: queryArg => ({ url: `/login/`, method: 'POST', body: queryArg.tokenObtainPair })
    }),
    logoutCreate: build.mutation<LogoutCreateApiResponse, LogoutCreateApiArg>({
      query: queryArg => ({ url: `/logout/`, method: 'POST', body: queryArg.tokenRefresh })
    }),
    passwordConfirmCreate: build.mutation<PasswordConfirmCreateApiResponse, PasswordConfirmCreateApiArg>({
      query: queryArg => ({ url: `/password-confirm/`, method: 'POST', body: queryArg.setNewPassword })
    }),
    passwordResetCreate: build.mutation<PasswordResetCreateApiResponse, PasswordResetCreateApiArg>({
      query: queryArg => ({ url: `/password-reset/`, method: 'POST', body: queryArg.passwordResetRequest })
    }),
    setPasswordCreate: build.mutation<SetPasswordCreateApiResponse, SetPasswordCreateApiArg>({
      query: queryArg => ({ url: `/set-password/`, method: 'POST', body: queryArg.setassword })
    }),
    tokenRefreshCreate: build.mutation<TokenRefreshCreateApiResponse, TokenRefreshCreateApiArg>({
      query: queryArg => ({ url: `/token_refresh/`, method: 'POST', body: queryArg.tokenRefresh })
    }),
    userChangePasswordCreate: build.mutation<UserChangePasswordCreateApiResponse, UserChangePasswordCreateApiArg>({
      query: queryArg => ({ url: `/user/change-password/`, method: 'POST', body: queryArg.userChangePassword })
    }),
    userConfirmEmailChangeCreate: build.mutation<
      UserConfirmEmailChangeCreateApiResponse,
      UserConfirmEmailChangeCreateApiArg
    >({
      query: queryArg => ({ url: `/user/confirm-email-change/`, method: 'POST', body: queryArg.userEmailChangeConfirm })
    }),
    userProfileRetrieve: build.query<UserProfileRetrieveApiResponse, UserProfileRetrieveApiArg>({
      query: () => ({ url: `/user/profile/` })
    }),
    userRequestChangeEmailCreate: build.mutation<
      UserRequestChangeEmailCreateApiResponse,
      UserRequestChangeEmailCreateApiArg
    >({
      query: queryArg => ({ url: `/user/request-change-email/`, method: 'POST', body: queryArg.userEmailChangeRequest })
    }),
    userUpdatePartialUpdate: build.mutation<UserUpdatePartialUpdateApiResponse, UserUpdatePartialUpdateApiArg>({
      query: queryArg => ({ url: `/user/update/`, method: 'PATCH', body: queryArg.patchedUserProfileUpdate })
    })
  }),
  overrideExisting: false
})
export { injectedRtkApi as pIsyBuildApi }
export type AdminStaffRetrieveApiResponse = /** status 200  */ PaginatedRead
export type AdminStaffRetrieveApiArg = {
  /** Page number of the results to fetch */
  page?: number
  /** Number of results per page */
  pageSize?: number
}
export type AdminStaffRetrieve2ApiResponse = /** status 200  */ AdminStaffRead
export type AdminStaffRetrieve2ApiArg = {
  adminUserId: number
}
export type AdminStaffCreateCreateApiResponse = /** status 201  */ AdminStaffRead
export type AdminStaffCreateCreateApiArg = {
  adminStaffCreate: AdminStaffCreateWrite
}
export type AdminStaffUpdatePartialUpdateApiResponse = /** status 200  */ AdminStaffRead
export type AdminStaffUpdatePartialUpdateApiArg = {
  adminUserId: number
  patchedAdminStaffUpdate: PatchedAdminStaffUpdate
}
export type AdminUsersDeleteDestroyApiResponse = /** status 204  */ any
export type AdminUsersDeleteDestroyApiArg = {
  adminUserId: number
}
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
export type PasswordConfirmCreateApiResponse = /** status 200  */ any
export type PasswordConfirmCreateApiArg = {
  setNewPassword: SetNewPasswordWrite
}
export type PasswordResetCreateApiResponse = /** status 200  */ any
export type PasswordResetCreateApiArg = {
  passwordResetRequest: PasswordResetRequest
}
export type SetPasswordCreateApiResponse = /** status 200  */ any
export type SetPasswordCreateApiArg = {
  setassword: SetasswordWrite
}
export type TokenRefreshCreateApiResponse = /** status 200  */ {
  [key: string]: any
}
export type TokenRefreshCreateApiArg = {
  tokenRefresh: TokenRefresh
}
export type UserChangePasswordCreateApiResponse = /** status 200  */ {
  [key: string]: any
}
export type UserChangePasswordCreateApiArg = {
  userChangePassword: UserChangePassword
}
export type UserConfirmEmailChangeCreateApiResponse = /** status 200  */ {
  message?: string
  new_email?: string
}
export type UserConfirmEmailChangeCreateApiArg = {
  userEmailChangeConfirm: UserEmailChangeConfirm
}
export type UserProfileRetrieveApiResponse = /** status 200  */ UserRead
export type UserProfileRetrieveApiArg = void
export type UserRequestChangeEmailCreateApiResponse = /** status 200  */ any
export type UserRequestChangeEmailCreateApiArg = {
  userEmailChangeRequest: UserEmailChangeRequestWrite
}
export type UserUpdatePartialUpdateApiResponse = /** status 200  */ UserRead
export type UserUpdatePartialUpdateApiArg = {
  patchedUserProfileUpdate: PatchedUserProfileUpdate
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
export type Paginated = {
  count: number
  next: string | null
  previous: string | null
  results: AdminStaff[]
}
export type PaginatedRead = {
  count: number
  next: string | null
  previous: string | null
  results: AdminStaffRead[]
}
export type UserCreate = {
  email: string
  first_name: string
  last_name: string
  is_active?: boolean
}
export type UserCreateWrite = {
  email: string
  first_name: string
  last_name: string
  is_active?: boolean
  redirect_uri: string
}
export type AdminStaffCreate = {
  user: UserCreate
}
export type AdminStaffCreateWrite = {
  user: UserCreateWrite
}
export type PatchedAdminStaffUpdate = {
  first_name?: string
  last_name?: string
  is_active?: boolean
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
export type SetNewPassword = {}
export type SetNewPasswordWrite = {
  new_password: string
  uid: string
  token: string
}
export type PasswordResetRequest = {
  email: string
  redirect_uri: string
}
export type Setassword = {}
export type SetasswordWrite = {
  new_password: string
  uid: string
  token: string
}
export type UserChangePassword = {
  old_password: string
  new_password: string
}
export type UserEmailChangeConfirm = {
  token: string
}
export type UserEmailChangeRequest = {
  new_email: string
  redirect_uri: string
}
export type UserEmailChangeRequestWrite = {
  new_email: string
  password: string
  redirect_uri: string
}
export type PatchedUserProfileUpdate = {
  first_name?: string
  last_name?: string
}
export const {
  useAdminStaffRetrieveQuery,
  useAdminStaffRetrieve2Query,
  useAdminStaffCreateCreateMutation,
  useAdminStaffUpdatePartialUpdateMutation,
  useAdminUsersDeleteDestroyMutation,
  useLoginCreateMutation,
  useLogoutCreateMutation,
  usePasswordConfirmCreateMutation,
  usePasswordResetCreateMutation,
  useSetPasswordCreateMutation,
  useTokenRefreshCreateMutation,
  useUserChangePasswordCreateMutation,
  useUserConfirmEmailChangeCreateMutation,
  useUserProfileRetrieveQuery,
  useUserRequestChangeEmailCreateMutation,
  useUserUpdatePartialUpdateMutation
} = injectedRtkApi
