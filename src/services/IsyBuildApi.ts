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
      query: queryArg => ({ url: `/admin-staff/create/`, method: 'POST', body: queryArg.adminStaffCreateRequest })
    }),
    adminStaffUpdatePartialUpdate: build.mutation<
      AdminStaffUpdatePartialUpdateApiResponse,
      AdminStaffUpdatePartialUpdateApiArg
    >({
      query: queryArg => ({
        url: `/admin-staff/update/${queryArg.adminUserId}/`,
        method: 'PATCH',
        body: queryArg.patchedAdminStaffUpdateRequest
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
    clientsOwnerRetrieve: build.query<ClientsOwnerRetrieveApiResponse, ClientsOwnerRetrieveApiArg>({
      query: queryArg => ({ url: `/clients/${queryArg.clientId}/owner/` })
    }),
    clientsOwnerAssignUpdate: build.mutation<ClientsOwnerAssignUpdateApiResponse, ClientsOwnerAssignUpdateApiArg>({
      query: queryArg => ({
        url: `/clients/${queryArg.clientId}/owner/assign/`,
        method: 'PUT',
        body: queryArg.clientOwnerCreateRequest
      })
    }),
    clientsOwnerDeleteDestroy: build.mutation<ClientsOwnerDeleteDestroyApiResponse, ClientsOwnerDeleteDestroyApiArg>({
      query: queryArg => ({ url: `/clients/${queryArg.clientId}/owner/delete/`, method: 'DELETE' })
    }),
    clientsOwnerUpdateUpdate: build.mutation<ClientsOwnerUpdateUpdateApiResponse, ClientsOwnerUpdateUpdateApiArg>({
      query: queryArg => ({
        url: `/clients/${queryArg.clientId}/owner/update/`,
        method: 'PUT',
        body: queryArg.clientOwnerUpdateRequest
      })
    }),
    clientsStaffRetrieve3: build.query<ClientsStaffRetrieve3ApiResponse, ClientsStaffRetrieve3ApiArg>({
      query: queryArg => ({
        url: `/clients/${queryArg.clientId}/staff/`,
        params: { page: queryArg.page, page_size: queryArg.pageSize }
      })
    }),
    clientsStaffCreateCreate2: build.mutation<ClientsStaffCreateCreate2ApiResponse, ClientsStaffCreateCreate2ApiArg>({
      query: queryArg => ({
        url: `/clients/${queryArg.clientId}/staff/create/`,
        method: 'POST',
        body: queryArg.clientStaffCreateRequest
      })
    }),
    clientsCreateCreate: build.mutation<ClientsCreateCreateApiResponse, ClientsCreateCreateApiArg>({
      query: queryArg => ({ url: `/clients/create/`, method: 'POST', body: queryArg.clientCreateUpdateRequest })
    }),
    clientsDeleteDestroy: build.mutation<ClientsDeleteDestroyApiResponse, ClientsDeleteDestroyApiArg>({
      query: queryArg => ({ url: `/clients/delete/${queryArg.clientId}/`, method: 'DELETE' })
    }),
    clientsStaffRetrieve: build.query<ClientsStaffRetrieveApiResponse, ClientsStaffRetrieveApiArg>({
      query: queryArg => ({ url: `/clients/staff/`, params: { page: queryArg.page, page_size: queryArg.pageSize } })
    }),
    clientsStaffRetrieve2: build.query<ClientsStaffRetrieve2ApiResponse, ClientsStaffRetrieve2ApiArg>({
      query: queryArg => ({ url: `/clients/staff/${queryArg.clientStaffId}/` })
    }),
    clientsStaffDeleteDestroy: build.mutation<ClientsStaffDeleteDestroyApiResponse, ClientsStaffDeleteDestroyApiArg>({
      query: queryArg => ({ url: `/clients/staff/${queryArg.clientStaffId}/delete/`, method: 'DELETE' })
    }),
    clientsStaffUpdateUpdate: build.mutation<ClientsStaffUpdateUpdateApiResponse, ClientsStaffUpdateUpdateApiArg>({
      query: queryArg => ({
        url: `/clients/staff/${queryArg.clientStaffId}/update/`,
        method: 'PUT',
        body: queryArg.clientStaffUpdateRequest
      })
    }),
    clientsStaffCreateCreate: build.mutation<ClientsStaffCreateCreateApiResponse, ClientsStaffCreateCreateApiArg>({
      query: queryArg => ({ url: `/clients/staff/create/`, method: 'POST', body: queryArg.clientStaffCreateRequest })
    }),
    clientsUpdateUpdate: build.mutation<ClientsUpdateUpdateApiResponse, ClientsUpdateUpdateApiArg>({
      query: queryArg => ({
        url: `/clients/update/${queryArg.clientId}/`,
        method: 'PUT',
        body: queryArg.clientCreateUpdateRequest
      })
    }),
    contactUsSendEmailCreate: build.mutation<ContactUsSendEmailCreateApiResponse, ContactUsSendEmailCreateApiArg>({
      query: queryArg => ({ url: `/contact-us/send-email/`, method: 'POST', body: queryArg.contactUsEmailRequest })
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
        body: queryArg.phoneNumberCreateUpdateRequest
      })
    }),
    contactsUpdateUpdate: build.mutation<ContactsUpdateUpdateApiResponse, ContactsUpdateUpdateApiArg>({
      query: queryArg => ({
        url: `/contacts/${queryArg.contactId}/update/`,
        method: 'PUT',
        body: queryArg.contactCreateUpdateRequest
      })
    }),
    loginCreate: build.mutation<LoginCreateApiResponse, LoginCreateApiArg>({
      query: queryArg => ({ url: `/login/`, method: 'POST', body: queryArg.tokenObtainPairRequest })
    }),
    logoutCreate: build.mutation<LogoutCreateApiResponse, LogoutCreateApiArg>({
      query: queryArg => ({ url: `/logout/`, method: 'POST', body: queryArg.tokenRefreshRequest })
    }),
    lotsRetrieve: build.query<LotsRetrieveApiResponse, LotsRetrieveApiArg>({
      query: queryArg => ({ url: `/lots/`, params: { page: queryArg.page, page_size: queryArg.pageSize } })
    }),
    lotsRetrieve2: build.query<LotsRetrieve2ApiResponse, LotsRetrieve2ApiArg>({
      query: queryArg => ({ url: `/lots/${queryArg.lotId}/` })
    }),
    lotsCreateCreate: build.mutation<LotsCreateCreateApiResponse, LotsCreateCreateApiArg>({
      query: queryArg => ({ url: `/lots/create/`, method: 'POST', body: queryArg.lotCreateUpdateRequest })
    }),
    lotsDeleteDestroy: build.mutation<LotsDeleteDestroyApiResponse, LotsDeleteDestroyApiArg>({
      query: queryArg => ({ url: `/lots/delete/${queryArg.lotId}/`, method: 'DELETE' })
    }),
    lotsUpdateUpdate: build.mutation<LotsUpdateUpdateApiResponse, LotsUpdateUpdateApiArg>({
      query: queryArg => ({
        url: `/lots/update/${queryArg.lotId}/`,
        method: 'PUT',
        body: queryArg.lotCreateUpdateRequest
      })
    }),
    passwordConfirmCreate: build.mutation<PasswordConfirmCreateApiResponse, PasswordConfirmCreateApiArg>({
      query: queryArg => ({ url: `/password-confirm/`, method: 'POST', body: queryArg.setNewPasswordRequest })
    }),
    passwordResetCreate: build.mutation<PasswordResetCreateApiResponse, PasswordResetCreateApiArg>({
      query: queryArg => ({ url: `/password-reset/`, method: 'POST', body: queryArg.passwordResetRequestRequest })
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
        body: queryArg.phoneNumberCreateUpdateRequest
      })
    }),
    projectLotsRetrieve: build.query<ProjectLotsRetrieveApiResponse, ProjectLotsRetrieveApiArg>({
      query: queryArg => ({ url: `/project-lots/${queryArg.projectLotId}/` })
    }),
    projectLotsDeleteDestroy: build.mutation<ProjectLotsDeleteDestroyApiResponse, ProjectLotsDeleteDestroyApiArg>({
      query: queryArg => ({ url: `/project-lots/${queryArg.projectLotId}/delete/`, method: 'DELETE' })
    }),
    projectLotsSubcontractorsRetrieve2: build.query<
      ProjectLotsSubcontractorsRetrieve2ApiResponse,
      ProjectLotsSubcontractorsRetrieve2ApiArg
    >({
      query: queryArg => ({
        url: `/project-lots/${queryArg.projectLotId}/subcontractors/`,
        params: { page: queryArg.page, page_size: queryArg.pageSize }
      })
    }),
    projectLotsSubcontractorsAssignCreate: build.mutation<
      ProjectLotsSubcontractorsAssignCreateApiResponse,
      ProjectLotsSubcontractorsAssignCreateApiArg
    >({
      query: queryArg => ({
        url: `/project-lots/${queryArg.projectLotId}/subcontractors/assign/`,
        method: 'POST',
        body: queryArg.projectLotSubcontractorCreateRequest
      })
    }),
    projectLotsUpdateStatusUpdate: build.mutation<
      ProjectLotsUpdateStatusUpdateApiResponse,
      ProjectLotsUpdateStatusUpdateApiArg
    >({
      query: queryArg => ({
        url: `/project-lots/${queryArg.projectLotId}/update-status/`,
        method: 'PUT',
        body: queryArg.projectLotUpdateRequest
      })
    }),
    projectLotsUploadDocumentCreate: build.mutation<
      ProjectLotsUploadDocumentCreateApiResponse,
      ProjectLotsUploadDocumentCreateApiArg
    >({
      query: queryArg => ({
        url: `/project-lots/${queryArg.projectLotId}/upload-document/`,
        method: 'POST',
        body: queryArg.documentUploadRequest
      })
    }),
    projectLotsCreateCreate: build.mutation<ProjectLotsCreateCreateApiResponse, ProjectLotsCreateCreateApiArg>({
      query: queryArg => ({ url: `/project-lots/create/`, method: 'POST', body: queryArg.projectLotCreateRequest })
    }),
    projectLotsDocumentsDeleteDestroy: build.mutation<
      ProjectLotsDocumentsDeleteDestroyApiResponse,
      ProjectLotsDocumentsDeleteDestroyApiArg
    >({
      query: queryArg => ({ url: `/project-lots/documents/${queryArg.documentId}/delete/`, method: 'DELETE' })
    }),
    projectLotsDocumentsUpdateCreate: build.mutation<
      ProjectLotsDocumentsUpdateCreateApiResponse,
      ProjectLotsDocumentsUpdateCreateApiArg
    >({
      query: queryArg => ({
        url: `/project-lots/documents/${queryArg.documentId}/update/`,
        method: 'POST',
        body: queryArg.documentUploadRequest
      })
    }),
    projectLotsSubcontractorsRetrieve: build.query<
      ProjectLotsSubcontractorsRetrieveApiResponse,
      ProjectLotsSubcontractorsRetrieveApiArg
    >({
      query: queryArg => ({ url: `/project-lots/subcontractors/${queryArg.projectLotSubcontractorId}/` })
    }),
    projectLotsSubcontractorsRemoveDestroy: build.mutation<
      ProjectLotsSubcontractorsRemoveDestroyApiResponse,
      ProjectLotsSubcontractorsRemoveDestroyApiArg
    >({
      query: queryArg => ({
        url: `/project-lots/subcontractors/${queryArg.projectLotSubcontractorId}/remove/`,
        method: 'DELETE'
      })
    }),
    projectLotsSubcontractorsDocumentsDeleteDevisDestroy: build.mutation<
      ProjectLotsSubcontractorsDocumentsDeleteDevisDestroyApiResponse,
      ProjectLotsSubcontractorsDocumentsDeleteDevisDestroyApiArg
    >({
      query: queryArg => ({
        url: `/project-lots/subcontractors/documents/${queryArg.documentId}/delete-devis/`,
        method: 'DELETE'
      })
    }),
    projectLotsSubcontractorsDocumentsUploadDevisCreate: build.mutation<
      ProjectLotsSubcontractorsDocumentsUploadDevisCreateApiResponse,
      ProjectLotsSubcontractorsDocumentsUploadDevisCreateApiArg
    >({
      query: queryArg => ({
        url: `/project-lots/subcontractors/documents/${queryArg.projectLotSubcontractorId}/upload-devis/`,
        method: 'POST',
        body: queryArg.documentUploadRequest
      })
    }),
    projectsRetrieve: build.query<ProjectsRetrieveApiResponse, ProjectsRetrieveApiArg>({
      query: queryArg => ({ url: `/projects/`, params: { page: queryArg.page, page_size: queryArg.pageSize } })
    }),
    projectsRetrieve2: build.query<ProjectsRetrieve2ApiResponse, ProjectsRetrieve2ApiArg>({
      query: queryArg => ({ url: `/projects/${queryArg.projectId}/` })
    }),
    projectsLotsRetrieve: build.query<ProjectsLotsRetrieveApiResponse, ProjectsLotsRetrieveApiArg>({
      query: queryArg => ({
        url: `/projects/${queryArg.projectId}/lots/`,
        params: { page: queryArg.page, page_size: queryArg.pageSize }
      })
    }),
    projectsTemplatesList: build.query<ProjectsTemplatesListApiResponse, ProjectsTemplatesListApiArg>({
      query: queryArg => ({ url: `/projects/${queryArg.projectId}/templates/` })
    }),
    projectsCreateCreate: build.mutation<ProjectsCreateCreateApiResponse, ProjectsCreateCreateApiArg>({
      query: queryArg => ({ url: `/projects/create/`, method: 'POST', body: queryArg.projectCreateRequest })
    }),
    projectsDeleteDestroy: build.mutation<ProjectsDeleteDestroyApiResponse, ProjectsDeleteDestroyApiArg>({
      query: queryArg => ({ url: `/projects/delete/${queryArg.projectId}/`, method: 'DELETE' })
    }),
    projectsTemplatesRetrieve: build.query<ProjectsTemplatesRetrieveApiResponse, ProjectsTemplatesRetrieveApiArg>({
      query: queryArg => ({ url: `/projects/templates/${queryArg.templateId}/` })
    }),
    projectsTemplatesUpdateUpdate: build.mutation<
      ProjectsTemplatesUpdateUpdateApiResponse,
      ProjectsTemplatesUpdateUpdateApiArg
    >({
      query: queryArg => ({
        url: `/projects/templates/${queryArg.templateId}/update/`,
        method: 'PUT',
        body: queryArg.projectEmailTemplateUpdateRequest
      })
    }),
    projectsUpdateUpdate: build.mutation<ProjectsUpdateUpdateApiResponse, ProjectsUpdateUpdateApiArg>({
      query: queryArg => ({
        url: `/projects/update/${queryArg.projectId}/`,
        method: 'PUT',
        body: queryArg.projectUpdateRequest
      })
    }),
    setPasswordCreate: build.mutation<SetPasswordCreateApiResponse, SetPasswordCreateApiArg>({
      query: queryArg => ({ url: `/set-password/`, method: 'POST', body: queryArg.setasswordRequest })
    }),
    subcontractorsRetrieve: build.query<SubcontractorsRetrieveApiResponse, SubcontractorsRetrieveApiArg>({
      query: queryArg => ({ url: `/subcontractors/`, params: { page: queryArg.page, page_size: queryArg.pageSize } })
    }),
    subcontractorsRetrieve2: build.query<SubcontractorsRetrieve2ApiResponse, SubcontractorsRetrieve2ApiArg>({
      query: queryArg => ({ url: `/subcontractors/${queryArg.subcontractorId}/` })
    }),
    subcontractorsStaffRetrieve2: build.query<
      SubcontractorsStaffRetrieve2ApiResponse,
      SubcontractorsStaffRetrieve2ApiArg
    >({
      query: queryArg => ({
        url: `/subcontractors/${queryArg.subcontractorId}/staff/`,
        params: { page: queryArg.page, page_size: queryArg.pageSize }
      })
    }),
    subcontractorsStaffCreateCreate: build.mutation<
      SubcontractorsStaffCreateCreateApiResponse,
      SubcontractorsStaffCreateCreateApiArg
    >({
      query: queryArg => ({
        url: `/subcontractors/${queryArg.subcontractorId}/staff/create/`,
        method: 'POST',
        body: queryArg.subcontractorStaffCreateRequest
      })
    }),
    subcontractorsCreateCreate: build.mutation<SubcontractorsCreateCreateApiResponse, SubcontractorsCreateCreateApiArg>(
      {
        query: queryArg => ({
          url: `/subcontractors/create/`,
          method: 'POST',
          body: queryArg.subcontractorCreateRequest
        })
      }
    ),
    subcontractorsDeleteDestroy: build.mutation<
      SubcontractorsDeleteDestroyApiResponse,
      SubcontractorsDeleteDestroyApiArg
    >({
      query: queryArg => ({ url: `/subcontractors/delete/${queryArg.subcontractorId}/`, method: 'DELETE' })
    }),
    subcontractorsStaffRetrieve: build.query<SubcontractorsStaffRetrieveApiResponse, SubcontractorsStaffRetrieveApiArg>(
      {
        query: queryArg => ({ url: `/subcontractors/staff/${queryArg.subcontractorStaffId}/` })
      }
    ),
    subcontractorsStaffDeleteDestroy: build.mutation<
      SubcontractorsStaffDeleteDestroyApiResponse,
      SubcontractorsStaffDeleteDestroyApiArg
    >({
      query: queryArg => ({ url: `/subcontractors/staff/${queryArg.subcontractorStaffId}/delete/`, method: 'DELETE' })
    }),
    subcontractorsStaffUpdatePartialUpdate: build.mutation<
      SubcontractorsStaffUpdatePartialUpdateApiResponse,
      SubcontractorsStaffUpdatePartialUpdateApiArg
    >({
      query: queryArg => ({
        url: `/subcontractors/staff/${queryArg.subcontractorStaffId}/update/`,
        method: 'PATCH',
        body: queryArg.patchedSubcontractorStaffUpdateRequest
      })
    }),
    subcontractorsUpdateUpdate: build.mutation<SubcontractorsUpdateUpdateApiResponse, SubcontractorsUpdateUpdateApiArg>(
      {
        query: queryArg => ({
          url: `/subcontractors/update/${queryArg.subcontractorId}/`,
          method: 'PUT',
          body: queryArg.subcontractorUpdateRequest
        })
      }
    ),
    tokenRefreshCreate: build.mutation<TokenRefreshCreateApiResponse, TokenRefreshCreateApiArg>({
      query: queryArg => ({ url: `/token_refresh/`, method: 'POST', body: queryArg.tokenRefreshRequest })
    }),
    userChangePasswordCreate: build.mutation<UserChangePasswordCreateApiResponse, UserChangePasswordCreateApiArg>({
      query: queryArg => ({ url: `/user/change-password/`, method: 'POST', body: queryArg.userChangePasswordRequest })
    }),
    userConfirmEmailChangeCreate: build.mutation<
      UserConfirmEmailChangeCreateApiResponse,
      UserConfirmEmailChangeCreateApiArg
    >({
      query: queryArg => ({
        url: `/user/confirm-email-change/`,
        method: 'POST',
        body: queryArg.userEmailChangeConfirmRequest
      })
    }),
    userProfileRetrieve: build.query<UserProfileRetrieveApiResponse, UserProfileRetrieveApiArg>({
      query: () => ({ url: `/user/profile/` })
    }),
    userRequestChangeEmailCreate: build.mutation<
      UserRequestChangeEmailCreateApiResponse,
      UserRequestChangeEmailCreateApiArg
    >({
      query: queryArg => ({
        url: `/user/request-change-email/`,
        method: 'POST',
        body: queryArg.userEmailChangeRequestRequest
      })
    }),
    userUpdatePartialUpdate: build.mutation<UserUpdatePartialUpdateApiResponse, UserUpdatePartialUpdateApiArg>({
      query: queryArg => ({ url: `/user/update/`, method: 'PATCH', body: queryArg.patchedUserProfileUpdateRequest })
    }),
    userUpdateAvatarCreate: build.mutation<UserUpdateAvatarCreateApiResponse, UserUpdateAvatarCreateApiArg>({
      query: queryArg => ({ url: `/user/update-avatar/`, method: 'POST', body: queryArg.avatarUpdateRequest })
    })
  }),
  overrideExisting: false
})
export { injectedRtkApi as pIsyBuildApi }
export type AdminStaffRetrieveApiResponse = /** status 200  */ PaginatedAdminStaffRead
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
  adminStaffCreateRequest: AdminStaffCreateRequestWrite
}
export type AdminStaffUpdatePartialUpdateApiResponse = /** status 200  */ AdminStaffRead
export type AdminStaffUpdatePartialUpdateApiArg = {
  adminUserId: number
  patchedAdminStaffUpdateRequest: PatchedAdminStaffUpdateRequest
}
export type AdminUsersDeleteDestroyApiResponse = /** status 204  */ any
export type AdminUsersDeleteDestroyApiArg = {
  adminUserId: number
}
export type ClientsRetrieveApiResponse = /** status 200  */ PaginatedClientRead
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
export type ClientsOwnerRetrieveApiResponse = /** status 200  */ UserRead
export type ClientsOwnerRetrieveApiArg = {
  clientId: number
}
export type ClientsOwnerAssignUpdateApiResponse = /** status 200  */ ClientRead
export type ClientsOwnerAssignUpdateApiArg = {
  clientId: number
  clientOwnerCreateRequest: ClientOwnerCreateRequestWrite
}
export type ClientsOwnerDeleteDestroyApiResponse = /** status 204  */ any
export type ClientsOwnerDeleteDestroyApiArg = {
  clientId: number
}
export type ClientsOwnerUpdateUpdateApiResponse = /** status 200  */ ClientRead
export type ClientsOwnerUpdateUpdateApiArg = {
  clientId: number
  clientOwnerUpdateRequest: ClientOwnerUpdateRequest
}
export type ClientsStaffRetrieve3ApiResponse = /** status 200  */ PaginatedClientStaffRead
export type ClientsStaffRetrieve3ApiArg = {
  clientId: number
  /** Page number of the results to fetch */
  page?: number
  /** Number of results per page */
  pageSize?: number
}
export type ClientsStaffCreateCreate2ApiResponse = /** status 201  */ ClientStaffRead
export type ClientsStaffCreateCreate2ApiArg = {
  clientId: number
  clientStaffCreateRequest: ClientStaffCreateRequestWrite
}
export type ClientsCreateCreateApiResponse = /** status 201  */ ClientRead
export type ClientsCreateCreateApiArg = {
  clientCreateUpdateRequest: ClientCreateUpdateRequest
}
export type ClientsDeleteDestroyApiResponse = /** status 204  */ any
export type ClientsDeleteDestroyApiArg = {
  clientId: number
}
export type ClientsStaffRetrieveApiResponse = /** status 200  */ PaginatedClientStaffRead
export type ClientsStaffRetrieveApiArg = {
  /** Page number of the results to fetch */
  page?: number
  /** Number of results per page */
  pageSize?: number
}
export type ClientsStaffRetrieve2ApiResponse = /** status 200  */ ClientStaffRead
export type ClientsStaffRetrieve2ApiArg = {
  clientStaffId: number
}
export type ClientsStaffDeleteDestroyApiResponse = /** status 204  */ any
export type ClientsStaffDeleteDestroyApiArg = {
  clientStaffId: number
}
export type ClientsStaffUpdateUpdateApiResponse = /** status 200  */ ClientStaffRead
export type ClientsStaffUpdateUpdateApiArg = {
  clientStaffId: number
  clientStaffUpdateRequest: ClientStaffUpdateRequest
}
export type ClientsStaffCreateCreateApiResponse = /** status 201  */ ClientStaffRead
export type ClientsStaffCreateCreateApiArg = {
  clientStaffCreateRequest: ClientStaffCreateRequestWrite
}
export type ClientsUpdateUpdateApiResponse = /** status 200  */ ClientRead
export type ClientsUpdateUpdateApiArg = {
  clientId: number
  clientCreateUpdateRequest: ClientCreateUpdateRequest
}
export type ContactUsSendEmailCreateApiResponse = unknown
export type ContactUsSendEmailCreateApiArg = {
  contactUsEmailRequest: ContactUsEmailRequest
}
export type ContactsRetrieveApiResponse = /** status 200  */ ContactRead
export type ContactsRetrieveApiArg = {
  contactId: number
}
export type ContactsDeleteDestroyApiResponse = /** status 204  */ any
export type ContactsDeleteDestroyApiArg = {
  contactId: number
}
export type ContactsPhoneNumbersRetrieveApiResponse = /** status 200  */ PaginatedPhoneNumberRead
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
  phoneNumberCreateUpdateRequest: PhoneNumberCreateUpdateRequest
}
export type ContactsUpdateUpdateApiResponse = /** status 200  */ ContactRead
export type ContactsUpdateUpdateApiArg = {
  contactId: number
  contactCreateUpdateRequest: ContactCreateUpdateRequest
}
export type LoginCreateApiResponse = /** status 200  */ {
  [key: string]: any
}
export type LoginCreateApiArg = {
  tokenObtainPairRequest: TokenObtainPairRequestWrite
}
export type LogoutCreateApiResponse = /** status 205 No response body */ void
export type LogoutCreateApiArg = {
  tokenRefreshRequest: TokenRefreshRequest
}
export type LotsRetrieveApiResponse = /** status 200  */ PaginatedLotRead
export type LotsRetrieveApiArg = {
  /** Page number of the results to fetch */
  page?: number
  /** Number of results per page */
  pageSize?: number
}
export type LotsRetrieve2ApiResponse = /** status 200  */ LotRead
export type LotsRetrieve2ApiArg = {
  lotId: number
}
export type LotsCreateCreateApiResponse = /** status 201  */ LotRead
export type LotsCreateCreateApiArg = {
  lotCreateUpdateRequest: LotCreateUpdateRequest
}
export type LotsDeleteDestroyApiResponse = /** status 204  */ any
export type LotsDeleteDestroyApiArg = {
  lotId: number
}
export type LotsUpdateUpdateApiResponse = /** status 200  */ LotRead
export type LotsUpdateUpdateApiArg = {
  lotId: number
  lotCreateUpdateRequest: LotCreateUpdateRequest
}
export type PasswordConfirmCreateApiResponse = /** status 200  */ any
export type PasswordConfirmCreateApiArg = {
  setNewPasswordRequest: SetNewPasswordRequestWrite
}
export type PasswordResetCreateApiResponse = /** status 200  */ any
export type PasswordResetCreateApiArg = {
  passwordResetRequestRequest: PasswordResetRequestRequest
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
  phoneNumberCreateUpdateRequest: PhoneNumberCreateUpdateRequest
}
export type ProjectLotsRetrieveApiResponse = /** status 200  */ ProjectLotRead
export type ProjectLotsRetrieveApiArg = {
  projectLotId: number
}
export type ProjectLotsDeleteDestroyApiResponse = /** status 204  */ {
  [key: string]: any
}
export type ProjectLotsDeleteDestroyApiArg = {
  projectLotId: number
}
export type ProjectLotsSubcontractorsRetrieve2ApiResponse = /** status 200  */ PaginatedProjectLotSubcontractorRead
export type ProjectLotsSubcontractorsRetrieve2ApiArg = {
  /** Page number of the results to fetch */
  page?: number
  /** Number of results per page */
  pageSize?: number
  projectLotId: number
}
export type ProjectLotsSubcontractorsAssignCreateApiResponse = /** status 201  */ ProjectLotSubcontractorRead
export type ProjectLotsSubcontractorsAssignCreateApiArg = {
  projectLotId: number
  projectLotSubcontractorCreateRequest: ProjectLotSubcontractorCreateRequest
}
export type ProjectLotsUpdateStatusUpdateApiResponse = /** status 200  */ ProjectLotRead
export type ProjectLotsUpdateStatusUpdateApiArg = {
  projectLotId: number
  projectLotUpdateRequest: ProjectLotUpdateRequest
}
export type ProjectLotsUploadDocumentCreateApiResponse = /** status 201  */ {
  [key: string]: any
}
export type ProjectLotsUploadDocumentCreateApiArg = {
  projectLotId: number
  documentUploadRequest: DocumentUploadRequest
}
export type ProjectLotsCreateCreateApiResponse = /** status 201  */ ProjectLotRead
export type ProjectLotsCreateCreateApiArg = {
  projectLotCreateRequest: ProjectLotCreateRequest
}
export type ProjectLotsDocumentsDeleteDestroyApiResponse = /** status 204  */ {
  [key: string]: any
}
export type ProjectLotsDocumentsDeleteDestroyApiArg = {
  documentId: number
}
export type ProjectLotsDocumentsUpdateCreateApiResponse = /** status 200  */ {
  [key: string]: any
}
export type ProjectLotsDocumentsUpdateCreateApiArg = {
  documentId: number
  documentUploadRequest: DocumentUploadRequest
}
export type ProjectLotsSubcontractorsRetrieveApiResponse = /** status 200  */ ProjectLotSubcontractorRead
export type ProjectLotsSubcontractorsRetrieveApiArg = {
  projectLotSubcontractorId: number
}
export type ProjectLotsSubcontractorsRemoveDestroyApiResponse = /** status 204  */ {
  [key: string]: any
}
export type ProjectLotsSubcontractorsRemoveDestroyApiArg = {
  projectLotSubcontractorId: number
}
export type ProjectLotsSubcontractorsDocumentsDeleteDevisDestroyApiResponse = /** status 204  */ {
  [key: string]: any
}
export type ProjectLotsSubcontractorsDocumentsDeleteDevisDestroyApiArg = {
  documentId: number
}
export type ProjectLotsSubcontractorsDocumentsUploadDevisCreateApiResponse = /** status 200  */ {
  [key: string]: any
}
export type ProjectLotsSubcontractorsDocumentsUploadDevisCreateApiArg = {
  projectLotSubcontractorId: number
  documentUploadRequest: DocumentUploadRequest
}
export type ProjectsRetrieveApiResponse = /** status 200  */ PaginatedProjectRead
export type ProjectsRetrieveApiArg = {
  /** Page number of the results to fetch */
  page?: number
  /** Number of results per page */
  pageSize?: number
}
export type ProjectsRetrieve2ApiResponse = /** status 200  */ ProjectRead
export type ProjectsRetrieve2ApiArg = {
  projectId: number
}
export type ProjectsLotsRetrieveApiResponse = /** status 200  */ PaginatedProjectLotRead
export type ProjectsLotsRetrieveApiArg = {
  /** Page number of the results to fetch */
  page?: number
  /** Number of results per page */
  pageSize?: number
  projectId: number
}
export type ProjectsTemplatesListApiResponse = /** status 200  */ ProjectEmailTemplateRead[]
export type ProjectsTemplatesListApiArg = {
  projectId: number
}
export type ProjectsCreateCreateApiResponse = /** status 201  */ ProjectRead
export type ProjectsCreateCreateApiArg = {
  projectCreateRequest: ProjectCreateRequest
}
export type ProjectsDeleteDestroyApiResponse = /** status 204  */ any
export type ProjectsDeleteDestroyApiArg = {
  projectId: number
}
export type ProjectsTemplatesRetrieveApiResponse = /** status 200  */ ProjectEmailTemplateRead
export type ProjectsTemplatesRetrieveApiArg = {
  templateId: number
}
export type ProjectsTemplatesUpdateUpdateApiResponse = /** status 200  */ ProjectEmailTemplateRead
export type ProjectsTemplatesUpdateUpdateApiArg = {
  templateId: number
  projectEmailTemplateUpdateRequest: ProjectEmailTemplateUpdateRequest
}
export type ProjectsUpdateUpdateApiResponse = /** status 200  */ ProjectRead
export type ProjectsUpdateUpdateApiArg = {
  projectId: number
  projectUpdateRequest: ProjectUpdateRequest
}
export type SetPasswordCreateApiResponse = /** status 200  */ any
export type SetPasswordCreateApiArg = {
  setasswordRequest: SetasswordRequestWrite
}
export type SubcontractorsRetrieveApiResponse = /** status 200  */ PaginatedSubcontractortRead
export type SubcontractorsRetrieveApiArg = {
  /** Page number of the results to fetch */
  page?: number
  /** Number of results per page */
  pageSize?: number
}
export type SubcontractorsRetrieve2ApiResponse = /** status 200  */ SubcontractorRead
export type SubcontractorsRetrieve2ApiArg = {
  subcontractorId: number
}
export type SubcontractorsStaffRetrieve2ApiResponse = /** status 200  */ PaginatedSubcontractorStaffRead
export type SubcontractorsStaffRetrieve2ApiArg = {
  /** Page number of the results to fetch */
  page?: number
  /** Number of results per page */
  pageSize?: number
  subcontractorId: number
}
export type SubcontractorsStaffCreateCreateApiResponse = /** status 201  */ SubcontractorStaffRead
export type SubcontractorsStaffCreateCreateApiArg = {
  subcontractorId: number
  subcontractorStaffCreateRequest: SubcontractorStaffCreateRequestWrite
}
export type SubcontractorsCreateCreateApiResponse = /** status 201  */ SubcontractorRead
export type SubcontractorsCreateCreateApiArg = {
  subcontractorCreateRequest: SubcontractorCreateRequest
}
export type SubcontractorsDeleteDestroyApiResponse = /** status 204  */ any
export type SubcontractorsDeleteDestroyApiArg = {
  subcontractorId: number
}
export type SubcontractorsStaffRetrieveApiResponse = /** status 200  */ SubcontractorStaffRead
export type SubcontractorsStaffRetrieveApiArg = {
  subcontractorStaffId: number
}
export type SubcontractorsStaffDeleteDestroyApiResponse = /** status 204  */ any
export type SubcontractorsStaffDeleteDestroyApiArg = {
  subcontractorStaffId: number
}
export type SubcontractorsStaffUpdatePartialUpdateApiResponse = /** status 200  */ SubcontractorStaffRead
export type SubcontractorsStaffUpdatePartialUpdateApiArg = {
  subcontractorStaffId: number
  patchedSubcontractorStaffUpdateRequest: PatchedSubcontractorStaffUpdateRequest
}
export type SubcontractorsUpdateUpdateApiResponse = /** status 200  */ SubcontractorRead
export type SubcontractorsUpdateUpdateApiArg = {
  subcontractorId: number
  subcontractorUpdateRequest: SubcontractorUpdateRequest
}
export type TokenRefreshCreateApiResponse = /** status 200  */ {
  [key: string]: any
}
export type TokenRefreshCreateApiArg = {
  tokenRefreshRequest: TokenRefreshRequest
}
export type UserChangePasswordCreateApiResponse = /** status 200  */ {
  [key: string]: any
}
export type UserChangePasswordCreateApiArg = {
  userChangePasswordRequest: UserChangePasswordRequest
}
export type UserConfirmEmailChangeCreateApiResponse = /** status 200  */ {
  message?: string
  new_email?: string
}
export type UserConfirmEmailChangeCreateApiArg = {
  userEmailChangeConfirmRequest: UserEmailChangeConfirmRequest
}
export type UserProfileRetrieveApiResponse = /** status 200  */ UserRead
export type UserProfileRetrieveApiArg = void
export type UserRequestChangeEmailCreateApiResponse = /** status 200  */ any
export type UserRequestChangeEmailCreateApiArg = {
  userEmailChangeRequestRequest: UserEmailChangeRequestRequestWrite
}
export type UserUpdatePartialUpdateApiResponse = /** status 200  */ UserRead
export type UserUpdatePartialUpdateApiArg = {
  patchedUserProfileUpdateRequest: PatchedUserProfileUpdateRequest
}
export type UserUpdateAvatarCreateApiResponse = /** status 200  */ UserRead
export type UserUpdateAvatarCreateApiArg = {
  avatarUpdateRequest: AvatarUpdateRequest
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
  avatar: string
  email: string
  first_name?: string
  last_name?: string
  date_joined?: string
  is_active?: boolean
  role: string
}
export type CreatedBy = {
  email: string
  first_name?: string
  last_name?: string
}
export type CreatedByRead = {
  id: number
  avatar: string
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
export type PaginatedAdminStaff = {
  count: number
  next: string | null
  previous: string | null
  results: AdminStaff[]
}
export type PaginatedAdminStaffRead = {
  count: number
  next: string | null
  previous: string | null
  results: AdminStaffRead[]
}
export type UserCreateRequest = {
  email: string
  first_name: string
  last_name: string
  is_active?: boolean
}
export type UserCreateRequestWrite = {
  email: string
  first_name: string
  last_name: string
  is_active?: boolean
  redirect_uri: string
}
export type AdminStaffCreateRequest = {
  user: UserCreateRequest
}
export type AdminStaffCreateRequestWrite = {
  user: UserCreateRequestWrite
}
export type PatchedAdminStaffUpdateRequest = {
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
  owner: CreatedByRead
  contact_email: string
  phone_number: string
  is_active?: boolean
  created_by: CreatedByRead
  created_at: string
  updated_at: string
}
export type PaginatedClient = {
  count: number
  next: string | null
  previous: string | null
  results: Client[]
}
export type PaginatedClientRead = {
  count: number
  next: string | null
  previous: string | null
  results: ClientRead[]
}
export type ClientOwnerCreateRequest = {
  user: UserCreateRequest
}
export type ClientOwnerCreateRequestWrite = {
  user: UserCreateRequestWrite
}
export type UserUpdateRequest = {
  first_name: string
  last_name: string
  is_active?: boolean
}
export type ClientOwnerUpdateRequest = {
  user: UserUpdateRequest
}
export type ClientStaff = {}
export type ClientStaffRead = {
  id: number
  user: UserRead
  created_by: CreatedByRead
  created_at: string
  updated_at: string
}
export type PaginatedClientStaff = {
  count: number
  next: string | null
  previous: string | null
  results: ClientStaff[]
}
export type PaginatedClientStaffRead = {
  count: number
  next: string | null
  previous: string | null
  results: ClientStaffRead[]
}
export type ClientStaffCreateRequest = {
  user: UserCreateRequest
  client_id?: number | null
}
export type ClientStaffCreateRequestWrite = {
  user: UserCreateRequestWrite
  client_id?: number | null
}
export type AddressCreateRequest = {
  street_number: string
  street_name: string
  postal_code: string
  city: string
  department?: string | null
  region?: string | null
  country?: string
}
export type ClientCreateUpdateRequest = {
  name: string
  siren_number: string
  address: AddressCreateRequest
  contact_email: string
  phone_number: string
  is_active?: boolean
}
export type ClientStaffUpdateRequest = {
  user: UserUpdateRequest
}
export type ContactUsEmailRequest = {
  nom: string
  prenom: string
  telephone: string
  email: string
  fonction: string
  entreprise: string
  message?: string
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
export type PaginatedPhoneNumber = {
  count: number
  next: string | null
  previous: string | null
  results: PhoneNumber[]
}
export type PaginatedPhoneNumberRead = {
  count: number
  next: string | null
  previous: string | null
  results: PhoneNumberRead[]
}
export type PhoneNumberCreateUpdateRequest = {
  number: string
  type: TypeEnum
}
export type ContactCreateUpdateRequest = {
  first_name: string
  last_name: string
  email: string
}
export type TokenObtainPairRequest = {}
export type TokenObtainPairRequestWrite = {
  email: string
  password: string
}
export type TokenRefreshRequest = {
  refresh: string
}
export type Lot = {
  name: string
  description?: string | null
}
export type LotRead = {
  id: number
  name: string
  description?: string | null
  client: ClientRead
  created_by: CreatedByRead
  created_at: string
  updated_at: string
}
export type PaginatedLot = {
  count: number
  next: string | null
  previous: string | null
  results: Lot[]
}
export type PaginatedLotRead = {
  count: number
  next: string | null
  previous: string | null
  results: LotRead[]
}
export type LotCreateUpdateRequest = {
  name: string
  description?: string | null
}
export type SetNewPasswordRequest = {}
export type SetNewPasswordRequestWrite = {
  new_password: string
  uid: string
  token: string
}
export type PasswordResetRequestRequest = {
  email: string
  redirect_uri: string
}
export type Status109Enum = 'pending' | 'in_progress' | 'review' | 'completed' | 'canceled'
export type ProjectLot = {
  status?: Status109Enum
  notes?: string
}
export type ProjectSimple = {
  name: string
}
export type ProjectSimpleRead = {
  id: number
  name: string
}
export type LotSimple = {
  name: string
}
export type LotSimpleRead = {
  id: number
  name: string
}
export type Folder = {
  name: string
}
export type Document = {
  name: string
  tags?: string | null
}
export type DocumentVersion = {
  version_number: number
  notes?: string | null
}
export type DocumentVersionRead = {
  version_number: number
  file_url: string
  notes?: string | null
  created_at: string
}
export type DocumentRead = {
  id: number
  name: string
  tags?: string | null
  latest_version: DocumentVersionRead
}
export type FolderRead = {
  id: number
  name: string
  documents: DocumentRead[]
}
export type ProjectLotRead = {
  id: number
  project: ProjectSimpleRead
  lot: LotSimpleRead
  status?: Status109Enum
  folder: FolderRead
  notes?: string
  created_by: CreatedByRead
  created_at: string
  updated_at: string
}
export type Status841Enum = 'pending' | 'in_progress' | 'completed' | 'not_responding' | 'canceled'
export type ProjectLotSubcontractor = {
  status?: Status841Enum
  notes?: string | null
}
export type ProjectLotSimple = {
  status?: Status109Enum
  notes?: string
}
export type ProjectLotSimpleRead = {
  id: number
  project: ProjectSimpleRead
  lot: LotSimpleRead
  status?: Status109Enum
  notes?: string
}
export type SubcontractorSimple = {
  name: string
  siren_number: string
}
export type SubcontractorSimpleRead = {
  id: number
  name: string
  siren_number: string
}
export type SubcontractorStaffSimple = {
  user: number
}
export type SubcontractorStaffSimpleRead = {
  id: number
  user: number
  subcontractor: SubcontractorSimpleRead
}
export type ProjectLotSubcontractorRead = {
  id: number
  project_lot: ProjectLotSimpleRead
  subcontractor: SubcontractorSimpleRead
  subcontractor_staff: SubcontractorStaffSimpleRead
  status?: Status841Enum
  notes?: string | null
  created_by: CreatedByRead
  created_at: string
  updated_at: string
}
export type PaginatedProjectLotSubcontractor = {
  count: number
  next: string | null
  previous: string | null
  results: ProjectLotSubcontractor[]
}
export type PaginatedProjectLotSubcontractorRead = {
  count: number
  next: string | null
  previous: string | null
  results: ProjectLotSubcontractorRead[]
}
export type ProjectLotSubcontractorCreateRequest = {
  subcontractor_id: number
  subcontractor_staff_id: number
  status?: Status841Enum
  notes?: string | null
}
export type ProjectLotUpdateRequest = {
  status?: Status109Enum
}
export type DocumentUploadRequest = {
  name?: string
  file: Blob
  tags?: string
  notes?: string
}
export type ProjectLotCreateRequest = {
  lot_id: number
  project_id: number
}
export type ProjectStatusEnum = 'draft' | 'pending' | 'in_progress' | 'completed' | 'on_hold' | 'canceled'
export type RiskLevelEnum = 'low' | 'medium' | 'high' | 'critical'
export type Project = {
  code: string
  name: string
  description?: string
  status?: ProjectStatusEnum
  start_date?: string | null
  estimated_completion_date?: string | null
  percentage_complete?: string
  budget?: string
  actual_cost?: string
  cost_variance?: string
  risk_level?: RiskLevelEnum
}
export type MapCoordinate = {
  latitude: string
  longitude: string
}
export type ProjectRead = {
  id: number
  code: string
  name: string
  description?: string
  client: ClientRead
  status?: ProjectStatusEnum
  start_date?: string | null
  estimated_completion_date?: string | null
  map_coordinate: MapCoordinate
  percentage_complete?: string
  budget?: string
  actual_cost?: string
  cost_variance?: string
  risk_level?: RiskLevelEnum
  address: AddressRead
  manager: ClientStaffRead
  staff: ClientStaffRead[]
  created_by: CreatedByRead
  created_at: string
  updated_at: string
}
export type PaginatedProject = {
  count: number
  next: string | null
  previous: string | null
  results: Project[]
}
export type PaginatedProjectRead = {
  count: number
  next: string | null
  previous: string | null
  results: ProjectRead[]
}
export type PaginatedProjectLot = {
  count: number
  next: string | null
  previous: string | null
  results: ProjectLot[]
}
export type PaginatedProjectLotRead = {
  count: number
  next: string | null
  previous: string | null
  results: ProjectLotRead[]
}
export type TemplateTypeEnum = 'upload_devis' | 'assign_subcontractor' | 'update_document'
export type ProjectEmailTemplate = {
  project: ProjectSimple
  template_type: TemplateTypeEnum
}
export type EmailTemplate = {
  /** Template name for internal reference */
  name: string
  /** Subject template with placeholders */
  subject_template: string
  /** Customizable header content with placeholders */
  header_template?: string | null
  /** Customizable body content with placeholders */
  body_template: string
  /** Customizable footer content with placeholders */
  footer_template?: string | null
}
export type EmailTemplateRead = {
  id: number
  /** Template name for internal reference */
  name: string
  /** Subject template with placeholders */
  subject_template: string
  /** Customizable header content with placeholders */
  header_template?: string | null
  /** Customizable body content with placeholders */
  body_template: string
  /** Customizable footer content with placeholders */
  footer_template?: string | null
}
export type ProjectEmailTemplateRead = {
  id: number
  project: ProjectSimpleRead
  email_template: EmailTemplateRead
  template_type: TemplateTypeEnum
}
export type MapCoordinateCreateOrUpdateRequest = {
  latitude: string
  longitude: string
}
export type ProjectCreateRequest = {
  code: string
  name: string
  description?: string
  client_id?: number | null
  start_date?: string | null
  budget?: string
  address?: AddressCreateRequest
  map_coordinate?: MapCoordinateCreateOrUpdateRequest
  notes?: string
}
export type EmailTemplateUpdateRequest = {
  /** Template name for internal reference */
  name: string
  /** Subject template with placeholders */
  subject_template: string
  /** Customizable header content with placeholders */
  header_template?: string | null
  /** Customizable body content with placeholders */
  body_template: string
  /** Customizable footer content with placeholders */
  footer_template?: string | null
}
export type ProjectEmailTemplateUpdateRequest = {
  email_template: EmailTemplateUpdateRequest
}
export type ProjectUpdateRequest = {
  code: string
  name: string
  description?: string
  start_date?: string | null
  budget?: string
  address: AddressCreateRequest
  map_coordinate: MapCoordinateCreateOrUpdateRequest
  notes?: string
}
export type SetasswordRequest = {}
export type SetasswordRequestWrite = {
  new_password: string
  uid: string
  token: string
}
export type Subcontractor = {
  name: string
  siren_number: string
  address: Address
  contact_email: string
  phone_number: string
  is_active?: boolean
}
export type SubcontractorRead = {
  id: number
  name: string
  siren_number: string
  address: AddressRead
  contact_email: string
  clients: ClientRead[]
  phone_number: string
  owner: CreatedByRead
  is_active?: boolean
  lots: LotSimpleRead[]
  created_by: CreatedByRead
  created_at: string
  updated_at: string
}
export type PaginatedSubcontractort = {
  count: number
  next: string | null
  previous: string | null
  results: Subcontractor[]
}
export type PaginatedSubcontractortRead = {
  count: number
  next: string | null
  previous: string | null
  results: SubcontractorRead[]
}
export type SubcontractorStaff = {}
export type SubcontractorStaffRead = {
  id: number
  user: UserRead
  created_by: CreatedByRead
  created_at: string
  updated_at: string
}
export type PaginatedSubcontractorStaff = {
  count: number
  next: string | null
  previous: string | null
  results: SubcontractorStaff[]
}
export type PaginatedSubcontractorStaffRead = {
  count: number
  next: string | null
  previous: string | null
  results: SubcontractorStaffRead[]
}
export type SubcontractorStaffCreateRequest = {
  user: UserCreateRequest
}
export type SubcontractorStaffCreateRequestWrite = {
  user: UserCreateRequestWrite
}
export type SubcontractorCreateRequest = {
  name: string
  siren_number: string
  address: AddressCreateRequest
  contact_email: string
  phone_number: string
  is_active?: boolean
  lots_ids?: number[] | null
  client_id?: number | null
}
export type PatchedSubcontractorStaffUpdateRequest = {
  user?: UserUpdateRequest
}
export type SubcontractorUpdateRequest = {
  name: string
  siren_number: string
  address: AddressCreateRequest
  contact_email: string
  phone_number: string
  is_active?: boolean
  lots_ids?: number[] | null
}
export type UserChangePasswordRequest = {
  old_password: string
  new_password: string
}
export type UserEmailChangeConfirmRequest = {
  token: string
}
export type UserEmailChangeRequestRequest = {
  new_email: string
  redirect_uri: string
}
export type UserEmailChangeRequestRequestWrite = {
  new_email: string
  password: string
  redirect_uri: string
}
export type PatchedUserProfileUpdateRequest = {
  first_name?: string
  last_name?: string
}
export type AvatarUpdateRequest = {
  avatar: Blob
}
export const {
  useAdminStaffRetrieveQuery,
  useAdminStaffRetrieve2Query,
  useAdminStaffCreateCreateMutation,
  useAdminStaffUpdatePartialUpdateMutation,
  useAdminUsersDeleteDestroyMutation,
  useClientsRetrieveQuery,
  useClientsRetrieve2Query,
  useClientsOwnerRetrieveQuery,
  useClientsOwnerAssignUpdateMutation,
  useClientsOwnerDeleteDestroyMutation,
  useClientsOwnerUpdateUpdateMutation,
  useClientsStaffRetrieve3Query,
  useClientsStaffCreateCreate2Mutation,
  useClientsCreateCreateMutation,
  useClientsDeleteDestroyMutation,
  useClientsStaffRetrieveQuery,
  useClientsStaffRetrieve2Query,
  useClientsStaffDeleteDestroyMutation,
  useClientsStaffUpdateUpdateMutation,
  useClientsStaffCreateCreateMutation,
  useClientsUpdateUpdateMutation,
  useContactUsSendEmailCreateMutation,
  useContactsRetrieveQuery,
  useContactsDeleteDestroyMutation,
  useContactsPhoneNumbersRetrieveQuery,
  useContactsPhoneNumbersCreateCreateMutation,
  useContactsUpdateUpdateMutation,
  useLoginCreateMutation,
  useLogoutCreateMutation,
  useLotsRetrieveQuery,
  useLotsRetrieve2Query,
  useLotsCreateCreateMutation,
  useLotsDeleteDestroyMutation,
  useLotsUpdateUpdateMutation,
  usePasswordConfirmCreateMutation,
  usePasswordResetCreateMutation,
  usePhoneNumbersRetrieveQuery,
  usePhoneNumbersDeleteDestroyMutation,
  usePhoneNumbersUpdateUpdateMutation,
  useProjectLotsRetrieveQuery,
  useProjectLotsDeleteDestroyMutation,
  useProjectLotsSubcontractorsRetrieve2Query,
  useProjectLotsSubcontractorsAssignCreateMutation,
  useProjectLotsUpdateStatusUpdateMutation,
  useProjectLotsUploadDocumentCreateMutation,
  useProjectLotsCreateCreateMutation,
  useProjectLotsDocumentsDeleteDestroyMutation,
  useProjectLotsDocumentsUpdateCreateMutation,
  useProjectLotsSubcontractorsRetrieveQuery,
  useProjectLotsSubcontractorsRemoveDestroyMutation,
  useProjectLotsSubcontractorsDocumentsDeleteDevisDestroyMutation,
  useProjectLotsSubcontractorsDocumentsUploadDevisCreateMutation,
  useProjectsRetrieveQuery,
  useProjectsRetrieve2Query,
  useProjectsLotsRetrieveQuery,
  useProjectsTemplatesListQuery,
  useProjectsCreateCreateMutation,
  useProjectsDeleteDestroyMutation,
  useProjectsTemplatesRetrieveQuery,
  useProjectsTemplatesUpdateUpdateMutation,
  useProjectsUpdateUpdateMutation,
  useSetPasswordCreateMutation,
  useSubcontractorsRetrieveQuery,
  useSubcontractorsRetrieve2Query,
  useSubcontractorsStaffRetrieve2Query,
  useSubcontractorsStaffCreateCreateMutation,
  useSubcontractorsCreateCreateMutation,
  useSubcontractorsDeleteDestroyMutation,
  useSubcontractorsStaffRetrieveQuery,
  useSubcontractorsStaffDeleteDestroyMutation,
  useSubcontractorsStaffUpdatePartialUpdateMutation,
  useSubcontractorsUpdateUpdateMutation,
  useTokenRefreshCreateMutation,
  useUserChangePasswordCreateMutation,
  useUserConfirmEmailChangeCreateMutation,
  useUserProfileRetrieveQuery,
  useUserRequestChangeEmailCreateMutation,
  useUserUpdatePartialUpdateMutation,
  useUserUpdateAvatarCreateMutation
} = injectedRtkApi
