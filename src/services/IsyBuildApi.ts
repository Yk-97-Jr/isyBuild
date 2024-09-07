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
    clientsRetrieve: build.query<ClientsRetrieveApiResponse, ClientsRetrieveApiArg>({
      query: queryArg => ({ url: `/clients/`, params: { page: queryArg.page, page_size: queryArg.pageSize } })
    }),
    clientsRetrieve2: build.query<ClientsRetrieve2ApiResponse, ClientsRetrieve2ApiArg>({
      query: queryArg => ({ url: `/clients/${queryArg.clientId}/` })
    }),
    clientsContactsRetrieve: build.query<ClientsContactsRetrieveApiResponse, ClientsContactsRetrieveApiArg>({
      query: queryArg => ({
        url: `/clients/${queryArg.clientId}/contacts/`,
        params: { page: queryArg.page, page_size: queryArg.pageSize }
      })
    }),
    clientsContactsCreateCreate: build.mutation<
      ClientsContactsCreateCreateApiResponse,
      ClientsContactsCreateCreateApiArg
    >({
      query: queryArg => ({
        url: `/clients/${queryArg.clientId}/contacts/create/`,
        method: 'POST',
        body: queryArg.contactCreateUpdate
      })
    }),
    clientsCreateCreate: build.mutation<ClientsCreateCreateApiResponse, ClientsCreateCreateApiArg>({
      query: queryArg => ({ url: `/clients/create/`, method: 'POST', body: queryArg.clientCreateUpdate })
    }),
    clientsDeleteDestroy: build.mutation<ClientsDeleteDestroyApiResponse, ClientsDeleteDestroyApiArg>({
      query: queryArg => ({ url: `/clients/delete/${queryArg.clientId}/`, method: 'DELETE' })
    }),
    clientsUpdateUpdate: build.mutation<ClientsUpdateUpdateApiResponse, ClientsUpdateUpdateApiArg>({
      query: queryArg => ({
        url: `/clients/update/${queryArg.clientId}/`,
        method: 'PUT',
        body: queryArg.clientCreateUpdate
      })
    }),
    contactUsSendEmailCreate: build.mutation<ContactUsSendEmailCreateApiResponse, ContactUsSendEmailCreateApiArg>({
      query: queryArg => ({ url: `/contact-us/send-email/`, method: 'POST', body: queryArg.contactUsEmail })
    }),
    contactsRetrieve: build.query<ContactsRetrieveApiResponse, ContactsRetrieveApiArg>({
      query: queryArg => ({ url: `/contacts/${queryArg.contactId}/` })
    }),
    contactsDeleteDestroy: build.mutation<ContactsDeleteDestroyApiResponse, ContactsDeleteDestroyApiArg>({
      query: queryArg => ({ url: `/contacts/${queryArg.contactId}/delete/`, method: 'DELETE' })
    }),
    contactsPhoneNumbersRetrieve: build.query<
      ContactsPhoneNumbersRetrieveApiResponse,
      ContactsPhoneNumbersRetrieveApiArg
    >({
      query: queryArg => ({
        url: `/contacts/${queryArg.contactId}/phone-numbers/`,
        params: { page: queryArg.page, page_size: queryArg.pageSize }
      })
    }),
    contactsPhoneNumbersCreateCreate: build.mutation<
      ContactsPhoneNumbersCreateCreateApiResponse,
      ContactsPhoneNumbersCreateCreateApiArg
    >({
      query: queryArg => ({
        url: `/contacts/${queryArg.contactId}/phone-numbers/create/`,
        method: 'POST',
        body: queryArg.phoneNumberCreateUpdate
      })
    }),
    contactsUpdateUpdate: build.mutation<ContactsUpdateUpdateApiResponse, ContactsUpdateUpdateApiArg>({
      query: queryArg => ({
        url: `/contacts/${queryArg.contactId}/update/`,
        method: 'PUT',
        body: queryArg.contactCreateUpdate
      })
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
    phoneNumbersRetrieve: build.query<PhoneNumbersRetrieveApiResponse, PhoneNumbersRetrieveApiArg>({
      query: queryArg => ({ url: `/phone-numbers/${queryArg.phoneNumberId}/` })
    }),
    phoneNumbersDeleteDestroy: build.mutation<PhoneNumbersDeleteDestroyApiResponse, PhoneNumbersDeleteDestroyApiArg>({
      query: queryArg => ({ url: `/phone-numbers/${queryArg.phoneNumberId}/delete/`, method: 'DELETE' })
    }),
    phoneNumbersUpdateUpdate: build.mutation<PhoneNumbersUpdateUpdateApiResponse, PhoneNumbersUpdateUpdateApiArg>({
      query: queryArg => ({
        url: `/phone-numbers/${queryArg.phoneNumberId}/update/`,
        method: 'PUT',
        body: queryArg.phoneNumberCreateUpdate
      })
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
export type ClientsRetrieveApiResponse = /** status 200  */ PaginatedRead
export type ClientsRetrieveApiArg = {

  /** Page number of the results to fetch */
  page?: number

  /** Number of results per page */
  pageSize?: number
}
export type ClientsRetrieve2ApiResponse = /** status 200  */ ClientRead
export type ClientsRetrieve2ApiArg = {
  clientId: number
}
export type ClientsContactsRetrieveApiResponse = /** status 200  */ PaginatedRead
export type ClientsContactsRetrieveApiArg = {
  clientId: number

  /** Page number of the results to fetch */
  page?: number

  /** Number of results per page */
  pageSize?: number
}
export type ClientsContactsCreateCreateApiResponse = /** status 201  */ ContactRead
export type ClientsContactsCreateCreateApiArg = {
  clientId: number
  contactCreateUpdate: ContactCreateUpdate
}
export type ClientsCreateCreateApiResponse = /** status 201  */ ClientRead
export type ClientsCreateCreateApiArg = {
  clientCreateUpdate: ClientCreateUpdate
}
export type ClientsDeleteDestroyApiResponse = /** status 204  */ any
export type ClientsDeleteDestroyApiArg = {
  clientId: number
}
export type ClientsUpdateUpdateApiResponse = /** status 200  */ ClientRead
export type ClientsUpdateUpdateApiArg = {
  clientId: number
  clientCreateUpdate: ClientCreateUpdate
}
export type ContactUsSendEmailCreateApiResponse = unknown
export type ContactUsSendEmailCreateApiArg = {
  contactUsEmail: ContactUsEmail
}
export type ContactsRetrieveApiResponse = /** status 200  */ ContactRead
export type ContactsRetrieveApiArg = {
  contactId: number
}
export type ContactsDeleteDestroyApiResponse = /** status 204  */ any
export type ContactsDeleteDestroyApiArg = {
  contactId: number
}
export type ContactsPhoneNumbersRetrieveApiResponse = /** status 200  */ PaginatedRead
export type ContactsPhoneNumbersRetrieveApiArg = {
  contactId: number

  /** Page number of the results to fetch */
  page?: number

  /** Number of results per page */
  pageSize?: number
}
export type ContactsPhoneNumbersCreateCreateApiResponse = /** status 201  */ PhoneNumberRead
export type ContactsPhoneNumbersCreateCreateApiArg = {
  contactId: number
  phoneNumberCreateUpdate: PhoneNumberCreateUpdate
}
export type ContactsUpdateUpdateApiResponse = /** status 200  */ ContactRead
export type ContactsUpdateUpdateApiArg = {
  contactId: number
  contactCreateUpdate: ContactCreateUpdate
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
export type PhoneNumbersRetrieveApiResponse = /** status 200  */ PhoneNumberRead
export type PhoneNumbersRetrieveApiArg = {
  phoneNumberId: number
}
export type PhoneNumbersDeleteDestroyApiResponse = /** status 204  */ any
export type PhoneNumbersDeleteDestroyApiArg = {
  phoneNumberId: number
}
export type PhoneNumbersUpdateUpdateApiResponse = /** status 200  */ PhoneNumberRead
export type PhoneNumbersUpdateUpdateApiArg = {
  phoneNumberId: number
  phoneNumberCreateUpdate: PhoneNumberCreateUpdate
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
export type CreatedBy = {
  email: string
  first_name?: string
  last_name?: string
}
export type CreatedByRead = {
  id: number
  email: string
  first_name?: string
  last_name?: string
}
export type AdminStaffRead = {
  id: number
  user: UserRead
  created_by: CreatedByRead
  created_at: string
  updated_at: string
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
export type Address = {
  street_number: string
  street_name: string
  postal_code: string
  city: string
  department?: string | null
  region?: string | null
  country?: string
}
export type AddressRead = {
  id: number
  street_number: string
  street_name: string
  postal_code: string
  city: string
  department?: string | null
  region?: string | null
  country?: string
  created_by: CreatedByRead
  created_at: string
  updated_at: string
}
export type Client = {
  name: string
  siren_number: string
  address: Address
  contact_email: string
  phone_number: string
  is_active?: boolean
}
export type ClientRead = {
  id: number
  name: string
  siren_number: string
  address: AddressRead
  contact_email: string
  phone_number: string
  is_active?: boolean
  created_by: CreatedByRead
  created_at: string
  updated_at: string
}
export type Contact = {
  first_name: string
  last_name: string
  email: string
}
export type TypeEnum = 'work' | 'personal' | 'fax'
export type PhoneNumber = {
  number: string
  type?: TypeEnum
}
export type PhoneNumberRead = {
  id: number
  number: string
  type?: TypeEnum
  created_by: CreatedByRead
  created_at: string
  updated_at: string
}
export type ContactRead = {
  id: number
  first_name: string
  last_name: string
  email: string
  phone_numbers: PhoneNumberRead[]
  created_by: CreatedByRead
  created_at: string
  updated_at: string
}
export type ContactCreateUpdate = {
  first_name: string
  last_name: string
  email: string
}
export type AddressCreate = {
  street_number: string
  street_name: string
  postal_code: string
  city: string
  department?: string | null
  region?: string | null
  country?: string
}
export type ClientCreateUpdate = {
  name: string
  siren_number: string
  address: AddressCreate
  contact_email: string
  phone_number: string
  is_active?: boolean
}
export type ContactUsEmail = {
  nom: string
  prenom: string
  telephone: string
  email: string
  fonction: string
  entreprise: string
  message?: string
}
export type PhoneNumberCreateUpdate = {
  number: string
  type: TypeEnum
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
  useClientsRetrieveQuery,
  useClientsRetrieve2Query,
  useClientsContactsRetrieveQuery,
  useClientsContactsCreateCreateMutation,
  useClientsCreateCreateMutation,
  useClientsDeleteDestroyMutation,
  useClientsUpdateUpdateMutation,
  useContactUsSendEmailCreateMutation,
  useContactsRetrieveQuery,
  useContactsDeleteDestroyMutation,
  useContactsPhoneNumbersRetrieveQuery,
  useContactsPhoneNumbersCreateCreateMutation,
  useContactsUpdateUpdateMutation,
  useLoginCreateMutation,
  useLogoutCreateMutation,
  usePasswordConfirmCreateMutation,
  usePasswordResetCreateMutation,
  usePhoneNumbersRetrieveQuery,
  usePhoneNumbersDeleteDestroyMutation,
  usePhoneNumbersUpdateUpdateMutation,
  useSetPasswordCreateMutation,
  useTokenRefreshCreateMutation,
  useUserChangePasswordCreateMutation,
  useUserConfirmEmailChangeCreateMutation,
  useUserProfileRetrieveQuery,
  useUserRequestChangeEmailCreateMutation,
  useUserUpdatePartialUpdateMutation
} = injectedRtkApi
