import { IsyBuildClient as api } from "../apiClients/IsyBuildClient";

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    subcontractorsOwnerDeleteDestroy: build.mutation<
      SubcontractorsOwnerDeleteDestroyApiResponse,
      SubcontractorsOwnerDeleteDestroyApiArg
    >({
      query: (queryArg) => ({
        url: `/Subcontractors/${queryArg.subcontractorId}/owner/delete/`,
        method: "DELETE",
      }),
    }),
    adminStaffRetrieve: build.query<
      AdminStaffRetrieveApiResponse,
      AdminStaffRetrieveApiArg
    >({
      query: (queryArg) => ({
        url: `/admin-staff/`,
        params: {
          created_by__email: queryArg.createdByEmail,
          is_active: queryArg.isActive,
          ordering: queryArg.ordering,
          page: queryArg.page,
          page_size: queryArg.pageSize,
          search: queryArg.search,
          user__email: queryArg.userEmail,
          user__first_name: queryArg.userFirstName,
          user__last_name: queryArg.userLastName,
        },
      }),
    }),
    adminStaffRetrieve2: build.query<
      AdminStaffRetrieve2ApiResponse,
      AdminStaffRetrieve2ApiArg
    >({
      query: (queryArg) => ({ url: `/admin-staff/${queryArg.adminUserId}/` }),
    }),
    adminStaffCreateCreate: build.mutation<
      AdminStaffCreateCreateApiResponse,
      AdminStaffCreateCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/admin-staff/create/`,
        method: "POST",
        body: queryArg.adminStaffCreateRequest,
      }),
    }),
    adminStaffUpdatePartialUpdate: build.mutation<
      AdminStaffUpdatePartialUpdateApiResponse,
      AdminStaffUpdatePartialUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/admin-staff/update/${queryArg.adminUserId}/`,
        method: "PATCH",
        body: queryArg.patchedAdminStaffUpdateRequest,
      }),
    }),
    adminUsersDeleteDestroy: build.mutation<
      AdminUsersDeleteDestroyApiResponse,
      AdminUsersDeleteDestroyApiArg
    >({
      query: (queryArg) => ({
        url: `/admin-users/delete/${queryArg.adminUserId}/`,
        method: "DELETE",
      }),
    }),
    categoriesList: build.query<
      CategoriesListApiResponse,
      CategoriesListApiArg
    >({
      query: (queryArg) => ({
        url: `/categories/`,
        params: {
          name: queryArg.name,
          ordering: queryArg.ordering,
          page: queryArg.page,
          page_size: queryArg.pageSize,
          search: queryArg.search,
        },
      }),
    }),
    categoriesRetrieve: build.query<
      CategoriesRetrieveApiResponse,
      CategoriesRetrieveApiArg
    >({
      query: (queryArg) => ({ url: `/categories/${queryArg.categoryId}/` }),
    }),
    categoryDelete: build.mutation<
      CategoryDeleteApiResponse,
      CategoryDeleteApiArg
    >({
      query: (queryArg) => ({
        url: `/categories/${queryArg.categoryId}/delete/`,
        method: "DELETE",
      }),
    }),
    categoryUpdate: build.mutation<
      CategoryUpdateApiResponse,
      CategoryUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/categories/${queryArg.categoryId}/update/`,
        method: "PUT",
        body: queryArg.categoryRequest,
      }),
    }),
    categoryCreate: build.mutation<
      CategoryCreateApiResponse,
      CategoryCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/categories/create/`,
        method: "POST",
        body: queryArg.categoryRequest,
      }),
    }),
    clientsRetrieve: build.query<
      ClientsRetrieveApiResponse,
      ClientsRetrieveApiArg
    >({
      query: (queryArg) => ({
        url: `/clients/`,
        params: {
          contact_email: queryArg.contactEmail,
          created_by__email: queryArg.createdByEmail,
          is_active: queryArg.isActive,
          name: queryArg.name,
          ordering: queryArg.ordering,
          owner__email: queryArg.ownerEmail,
          page: queryArg.page,
          page_size: queryArg.pageSize,
          phone_number: queryArg.phoneNumber,
          search: queryArg.search,
          siren_number: queryArg.sirenNumber,
        },
      }),
    }),
    clientsRetrieve2: build.query<
      ClientsRetrieve2ApiResponse,
      ClientsRetrieve2ApiArg
    >({
      query: (queryArg) => ({ url: `/clients/${queryArg.clientId}/` }),
    }),
    clientsOwnerRetrieve: build.query<
      ClientsOwnerRetrieveApiResponse,
      ClientsOwnerRetrieveApiArg
    >({
      query: (queryArg) => ({ url: `/clients/${queryArg.clientId}/owner/` }),
    }),
    clientsOwnerAssignUpdate: build.mutation<
      ClientsOwnerAssignUpdateApiResponse,
      ClientsOwnerAssignUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/clients/${queryArg.clientId}/owner/assign/`,
        method: "PUT",
        body: queryArg.clientOwnerCreateRequest,
      }),
    }),
    clientsOwnerDeleteDestroy: build.mutation<
      ClientsOwnerDeleteDestroyApiResponse,
      ClientsOwnerDeleteDestroyApiArg
    >({
      query: (queryArg) => ({
        url: `/clients/${queryArg.clientId}/owner/delete/`,
        method: "DELETE",
      }),
    }),
    clientsOwnerUpdateUpdate: build.mutation<
      ClientsOwnerUpdateUpdateApiResponse,
      ClientsOwnerUpdateUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/clients/${queryArg.clientId}/owner/update/`,
        method: "PUT",
        body: queryArg.clientOwnerUpdateRequest,
      }),
    }),
    clientsStaffRetrieve3: build.query<
      ClientsStaffRetrieve3ApiResponse,
      ClientsStaffRetrieve3ApiArg
    >({
      query: (queryArg) => ({
        url: `/clients/${queryArg.clientId}/staff/`,
        params: {
          created_by: queryArg.createdBy,
          email: queryArg.email,
          first_name: queryArg.firstName,
          last_name: queryArg.lastName,
          ordering: queryArg.ordering,
          page: queryArg.page,
          page_size: queryArg.pageSize,
          search: queryArg.search,
        },
      }),
    }),
    clientsStaffCreateCreate2: build.mutation<
      ClientsStaffCreateCreate2ApiResponse,
      ClientsStaffCreateCreate2ApiArg
    >({
      query: (queryArg) => ({
        url: `/clients/${queryArg.clientId}/staff/create/`,
        method: "POST",
        body: queryArg.clientStaffCreateRequest,
      }),
    }),
    clientsCreateCreate: build.mutation<
      ClientsCreateCreateApiResponse,
      ClientsCreateCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/clients/create/`,
        method: "POST",
        body: queryArg.clientCreateUpdateRequest,
      }),
    }),
    clientsDeleteDestroy: build.mutation<
      ClientsDeleteDestroyApiResponse,
      ClientsDeleteDestroyApiArg
    >({
      query: (queryArg) => ({
        url: `/clients/delete/${queryArg.clientId}/`,
        method: "DELETE",
      }),
    }),
    clientsStaffRetrieve: build.query<
      ClientsStaffRetrieveApiResponse,
      ClientsStaffRetrieveApiArg
    >({
      query: (queryArg) => ({
        url: `/clients/staff/`,
        params: {
          created_by: queryArg.createdBy,
          email: queryArg.email,
          first_name: queryArg.firstName,
          last_name: queryArg.lastName,
          ordering: queryArg.ordering,
          page: queryArg.page,
          page_size: queryArg.pageSize,
          search: queryArg.search,
        },
      }),
    }),
    clientsStaffRetrieve2: build.query<
      ClientsStaffRetrieve2ApiResponse,
      ClientsStaffRetrieve2ApiArg
    >({
      query: (queryArg) => ({
        url: `/clients/staff/${queryArg.clientStaffId}/`,
      }),
    }),
    clientsStaffDeleteDestroy: build.mutation<
      ClientsStaffDeleteDestroyApiResponse,
      ClientsStaffDeleteDestroyApiArg
    >({
      query: (queryArg) => ({
        url: `/clients/staff/${queryArg.clientStaffId}/delete/`,
        method: "DELETE",
      }),
    }),
    clientsStaffUpdateUpdate: build.mutation<
      ClientsStaffUpdateUpdateApiResponse,
      ClientsStaffUpdateUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/clients/staff/${queryArg.clientStaffId}/update/`,
        method: "PUT",
        body: queryArg.clientStaffUpdateRequest,
      }),
    }),
    clientsStaffCreateCreate: build.mutation<
      ClientsStaffCreateCreateApiResponse,
      ClientsStaffCreateCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/clients/staff/create/`,
        method: "POST",
        body: queryArg.clientStaffCreateRequest,
      }),
    }),
    clientsUpdateUpdate: build.mutation<
      ClientsUpdateUpdateApiResponse,
      ClientsUpdateUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/clients/update/${queryArg.clientId}/`,
        method: "PUT",
        body: queryArg.clientCreateUpdateRequest,
      }),
    }),
    contactUsSendEmailCreate: build.mutation<
      ContactUsSendEmailCreateApiResponse,
      ContactUsSendEmailCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/contact-us/send-email/`,
        method: "POST",
        body: queryArg.contactUsEmailRequest,
      }),
    }),
    contactsRetrieve: build.query<
      ContactsRetrieveApiResponse,
      ContactsRetrieveApiArg
    >({
      query: (queryArg) => ({ url: `/contacts/${queryArg.contactId}/` }),
    }),
    contactsDeleteDestroy: build.mutation<
      ContactsDeleteDestroyApiResponse,
      ContactsDeleteDestroyApiArg
    >({
      query: (queryArg) => ({
        url: `/contacts/${queryArg.contactId}/delete/`,
        method: "DELETE",
      }),
    }),
    contactsPhoneNumbersRetrieve: build.query<
      ContactsPhoneNumbersRetrieveApiResponse,
      ContactsPhoneNumbersRetrieveApiArg
    >({
      query: (queryArg) => ({
        url: `/contacts/${queryArg.contactId}/phone-numbers/`,
        params: { page: queryArg.page, page_size: queryArg.pageSize },
      }),
    }),
    contactsPhoneNumbersCreateCreate: build.mutation<
      ContactsPhoneNumbersCreateCreateApiResponse,
      ContactsPhoneNumbersCreateCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/contacts/${queryArg.contactId}/phone-numbers/create/`,
        method: "POST",
        body: queryArg.phoneNumberCreateUpdateRequest,
      }),
    }),
    contactsUpdateUpdate: build.mutation<
      ContactsUpdateUpdateApiResponse,
      ContactsUpdateUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/contacts/${queryArg.contactId}/update/`,
        method: "PUT",
        body: queryArg.contactCreateUpdateRequest,
      }),
    }),
    getDocumentDetail: build.query<
      GetDocumentDetailApiResponse,
      GetDocumentDetailApiArg
    >({
      query: (queryArg) => ({ url: `/document/${queryArg.documentId}/` }),
    }),
    getDocumentHistory: build.query<
      GetDocumentHistoryApiResponse,
      GetDocumentHistoryApiArg
    >({
      query: (queryArg) => ({
        url: `/document/${queryArg.documentId}/history`,
      }),
    }),
    documentDiffusionsList: build.query<
      DocumentDiffusionsListApiResponse,
      DocumentDiffusionsListApiArg
    >({
      query: (queryArg) => ({
        url: `/document_diffusions/`,
        params: {
          created_by: queryArg.createdBy,
          page: queryArg.page,
          page_size: queryArg.pageSize,
          title: queryArg.title,
        },
      }),
    }),
    documentDiffusionDetail: build.query<
      DocumentDiffusionDetailApiResponse,
      DocumentDiffusionDetailApiArg
    >({
      query: (queryArg) => ({
        url: `/document_diffusions/${queryArg.documentDiffusionId}/`,
      }),
    }),
    documentDiffusionCommentsList: build.query<
      DocumentDiffusionCommentsListApiResponse,
      DocumentDiffusionCommentsListApiArg
    >({
      query: (queryArg) => ({
        url: `/document_diffusions/${queryArg.documentDiffusionId}/comments-list/`,
        params: { page: queryArg.page, page_size: queryArg.pageSize },
      }),
    }),
    documentDiffusionDelete: build.mutation<
      DocumentDiffusionDeleteApiResponse,
      DocumentDiffusionDeleteApiArg
    >({
      query: (queryArg) => ({
        url: `/document_diffusions/${queryArg.documentDiffusionId}/delete/`,
        method: "DELETE",
      }),
    }),
    documentDiffusionDocumentDelete: build.mutation<
      DocumentDiffusionDocumentDeleteApiResponse,
      DocumentDiffusionDocumentDeleteApiArg
    >({
      query: (queryArg) => ({
        url: `/document_diffusions/${queryArg.documentDiffusionId}/delete-document/`,
        method: "DELETE",
      }),
    }),
    documentDiffusionDiffuse: build.mutation<
      DocumentDiffusionDiffuseApiResponse,
      DocumentDiffusionDiffuseApiArg
    >({
      query: (queryArg) => ({
        url: `/document_diffusions/${queryArg.documentDiffusionId}/diffuse/`,
        method: "POST",
        body: queryArg.diffusionRequest,
      }),
    }),
    documentDiffusionUpdate: build.mutation<
      DocumentDiffusionUpdateApiResponse,
      DocumentDiffusionUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/document_diffusions/${queryArg.documentDiffusionId}/update/`,
        method: "PUT",
        body: queryArg.documentDiffusionUpdateRequest,
      }),
    }),
    diffusionIntervenantCommentCreate: build.mutation<
      DiffusionIntervenantCommentCreateApiResponse,
      DiffusionIntervenantCommentCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/document_diffusions/${queryArg.documentDiffusionId}/update-status/`,
        method: "POST",
        body: queryArg.diffusionIntervenantCommentCreateRequest,
      }),
    }),
    documentDiffusionUpload: build.mutation<
      DocumentDiffusionUploadApiResponse,
      DocumentDiffusionUploadApiArg
    >({
      query: (queryArg) => ({
        url: `/document_diffusions/${queryArg.documentDiffusionId}/upload-document/`,
        method: "POST",
        body: queryArg.documentUploadRequest,
      }),
    }),
    documentDiffusionConfigByProjectList: build.query<
      DocumentDiffusionConfigByProjectListApiResponse,
      DocumentDiffusionConfigByProjectListApiArg
    >({
      query: (queryArg) => ({
        url: `/document_diffusions/${queryArg.projectId}/configs/`,
      }),
    }),
    documentDiffusionConfigDetail: build.query<
      DocumentDiffusionConfigDetailApiResponse,
      DocumentDiffusionConfigDetailApiArg
    >({
      query: (queryArg) => ({
        url: `/document_diffusions/configs/${queryArg.documentDiffusionConfigId}/`,
      }),
    }),
    documentDiffusionConfigUpdate: build.mutation<
      DocumentDiffusionConfigUpdateApiResponse,
      DocumentDiffusionConfigUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/document_diffusions/configs/${queryArg.documentDiffusionConfigId}/update/`,
        method: "PUT",
        body: queryArg.documentDiffusionConfigUpdateRequest,
      }),
    }),
    documentDiffusionCreate: build.mutation<
      DocumentDiffusionCreateApiResponse,
      DocumentDiffusionCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/document_diffusions/create/`,
        method: "POST",
        body: queryArg.documentDiffusionCreateRequest,
      }),
    }),
    retrieveFinanceEnterpriseById: build.query<
      RetrieveFinanceEnterpriseByIdApiResponse,
      RetrieveFinanceEnterpriseByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/finance-enterprises/${queryArg.financeEnterpriseId}/`,
      }),
    }),
    listFinanceSituations: build.query<
      ListFinanceSituationsApiResponse,
      ListFinanceSituationsApiArg
    >({
      query: (queryArg) => ({
        url: `/finance-enterprises/${queryArg.financeEnterpriseId}/finance-situations/`,
        params: { page: queryArg.page, page_size: queryArg.pageSize },
      }),
    }),
    listTravailSupplementaire: build.query<
      ListTravailSupplementaireApiResponse,
      ListTravailSupplementaireApiArg
    >({
      query: (queryArg) => ({
        url: `/finance-enterprises/${queryArg.financeEnterpriseId}/travail-supplementaires/`,
        params: { page: queryArg.page, page_size: queryArg.pageSize },
      }),
    }),
    updateFinanceEnterprise: build.mutation<
      UpdateFinanceEnterpriseApiResponse,
      UpdateFinanceEnterpriseApiArg
    >({
      query: (queryArg) => ({
        url: `/finance-enterprises/${queryArg.financeEnterpriseId}/update/`,
        method: "PATCH",
        body: queryArg.patchedFinanceEnterpriseUpdateRequest,
      }),
    }),
    retrieveFinanceSituation: build.query<
      RetrieveFinanceSituationApiResponse,
      RetrieveFinanceSituationApiArg
    >({
      query: (queryArg) => ({
        url: `/finance-situations/${queryArg.situationId}`,
      }),
    }),
    deleteFinanceSituation: build.mutation<
      DeleteFinanceSituationApiResponse,
      DeleteFinanceSituationApiArg
    >({
      query: (queryArg) => ({
        url: `/finance-situations/${queryArg.situationId}/delete/`,
        method: "DELETE",
      }),
    }),
    updateFinanceSituation: build.mutation<
      UpdateFinanceSituationApiResponse,
      UpdateFinanceSituationApiArg
    >({
      query: (queryArg) => ({
        url: `/finance-situations/${queryArg.situationId}/update/`,
        method: "PATCH",
        body: queryArg.patchedFinanceSituationUpdateRequest,
      }),
    }),
    createFinanceSituation: build.mutation<
      CreateFinanceSituationApiResponse,
      CreateFinanceSituationApiArg
    >({
      query: (queryArg) => ({
        url: `/finance-situations/create`,
        method: "POST",
        body: queryArg.financeSituationCreateRequest,
      }),
    }),
    retrieveFinanceById: build.query<
      RetrieveFinanceByIdApiResponse,
      RetrieveFinanceByIdApiArg
    >({
      query: (queryArg) => ({ url: `/finance/${queryArg.financeId}/` }),
    }),
    listProjectLotFinance: build.query<
      ListProjectLotFinanceApiResponse,
      ListProjectLotFinanceApiArg
    >({
      query: (queryArg) => ({
        url: `/finance/${queryArg.projectId}`,
        params: {
          ordering: queryArg.ordering,
          page: queryArg.page,
          page_size: queryArg.pageSize,
          search: queryArg.search,
        },
      }),
    }),
    getFolderDetail: build.query<
      GetFolderDetailApiResponse,
      GetFolderDetailApiArg
    >({
      query: (queryArg) => ({ url: `/folders/${queryArg.folderId}/` }),
    }),
    listProjectIntervenantProject: build.query<
      ListProjectIntervenantProjectApiResponse,
      ListProjectIntervenantProjectApiArg
    >({
      query: (queryArg) => ({
        url: `/intervenant/projects/`,
        params: {
          ordering: queryArg.ordering,
          page: queryArg.page,
          page_size: queryArg.pageSize,
          search: queryArg.search,
        },
      }),
    }),
    getIntervenantProjectDetail: build.query<
      GetIntervenantProjectDetailApiResponse,
      GetIntervenantProjectDetailApiArg
    >({
      query: (queryArg) => ({
        url: `/intervenant/projects/${queryArg.projectId}/`,
      }),
    }),
    intervenantRolesRetrieve: build.query<
      IntervenantRolesRetrieveApiResponse,
      IntervenantRolesRetrieveApiArg
    >({
      query: () => ({ url: `/intervenant/roles/` }),
    }),
    localisationsList: build.query<
      LocalisationsListApiResponse,
      LocalisationsListApiArg
    >({
      query: (queryArg) => ({
        url: `/localisations/`,
        params: {
          created_by: queryArg.createdBy,
          name: queryArg.name,
          ordering: queryArg.ordering,
          page: queryArg.page,
          page_size: queryArg.pageSize,
          search: queryArg.search,
        },
      }),
    }),
    localisationDetail: build.query<
      LocalisationDetailApiResponse,
      LocalisationDetailApiArg
    >({
      query: (queryArg) => ({
        url: `/localisations/${queryArg.localisationId}/`,
      }),
    }),
    localisationsDeleteDestroy: build.mutation<
      LocalisationsDeleteDestroyApiResponse,
      LocalisationsDeleteDestroyApiArg
    >({
      query: (queryArg) => ({
        url: `/localisations/${queryArg.localisationId}/delete/`,
        method: "DELETE",
      }),
    }),
    localisationUpdate: build.mutation<
      LocalisationUpdateApiResponse,
      LocalisationUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/localisations/${queryArg.localisationId}/update/`,
        method: "PUT",
        body: queryArg.localisationRequest,
      }),
    }),
    localisationCreate: build.mutation<
      LocalisationCreateApiResponse,
      LocalisationCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/localisations/create/`,
        method: "POST",
        body: queryArg.localisationRequest,
      }),
    }),
    loginCreate: build.mutation<LoginCreateApiResponse, LoginCreateApiArg>({
      query: (queryArg) => ({
        url: `/login/`,
        method: "POST",
        body: queryArg.tokenObtainPairRequest,
      }),
    }),
    logoutCreate: build.mutation<LogoutCreateApiResponse, LogoutCreateApiArg>({
      query: (queryArg) => ({
        url: `/logout/`,
        method: "POST",
        body: queryArg.tokenRefreshRequest,
      }),
    }),
    lotsRetrieve: build.query<LotsRetrieveApiResponse, LotsRetrieveApiArg>({
      query: (queryArg) => ({
        url: `/lots/`,
        params: {
          client_ids: queryArg.clientIds,
          created_by: queryArg.createdBy,
          description: queryArg.description,
          name: queryArg.name,
          ordering: queryArg.ordering,
          page: queryArg.page,
          page_size: queryArg.pageSize,
          search: queryArg.search,
        },
      }),
    }),
    lotsRetrieve2: build.query<LotsRetrieve2ApiResponse, LotsRetrieve2ApiArg>({
      query: (queryArg) => ({ url: `/lots/${queryArg.lotId}/` }),
    }),
    lotsCreateCreate: build.mutation<
      LotsCreateCreateApiResponse,
      LotsCreateCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/lots/create/`,
        method: "POST",
        body: queryArg.lotCreateUpdateRequest,
      }),
    }),
    lotsDeleteDestroy: build.mutation<
      LotsDeleteDestroyApiResponse,
      LotsDeleteDestroyApiArg
    >({
      query: (queryArg) => ({
        url: `/lots/delete/${queryArg.lotId}/`,
        method: "DELETE",
      }),
    }),
    lotsUpdateUpdate: build.mutation<
      LotsUpdateUpdateApiResponse,
      LotsUpdateUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/lots/update/${queryArg.lotId}/`,
        method: "PUT",
        body: queryArg.lotCreateUpdateRequest,
      }),
    }),
    getInAppNotificationsList: build.query<
      GetInAppNotificationsListApiResponse,
      GetInAppNotificationsListApiArg
    >({
      query: (queryArg) => ({
        url: `/notifications/in-app/`,
        params: { page: queryArg.page, page_size: queryArg.pageSize },
      }),
    }),
    getInAppNotificationDetail: build.query<
      GetInAppNotificationDetailApiResponse,
      GetInAppNotificationDetailApiArg
    >({
      query: (queryArg) => ({
        url: `/notifications/in-app/${queryArg.notificationId}`,
      }),
    }),
    markNotificationAsRead: build.mutation<
      MarkNotificationAsReadApiResponse,
      MarkNotificationAsReadApiArg
    >({
      query: (queryArg) => ({
        url: `/notifications/in-app/${queryArg.notificationId}/read/`,
        method: "POST",
      }),
    }),
    passwordConfirmCreate: build.mutation<
      PasswordConfirmCreateApiResponse,
      PasswordConfirmCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/password-confirm/`,
        method: "POST",
        body: queryArg.setNewPasswordRequest,
      }),
    }),
    passwordResetCreate: build.mutation<
      PasswordResetCreateApiResponse,
      PasswordResetCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/password-reset/`,
        method: "POST",
        body: queryArg.passwordResetRequestRequest,
      }),
    }),
    phoneNumbersRetrieve: build.query<
      PhoneNumbersRetrieveApiResponse,
      PhoneNumbersRetrieveApiArg
    >({
      query: (queryArg) => ({
        url: `/phone-numbers/${queryArg.phoneNumberId}/`,
      }),
    }),
    phoneNumbersDeleteDestroy: build.mutation<
      PhoneNumbersDeleteDestroyApiResponse,
      PhoneNumbersDeleteDestroyApiArg
    >({
      query: (queryArg) => ({
        url: `/phone-numbers/${queryArg.phoneNumberId}/delete/`,
        method: "DELETE",
      }),
    }),
    phoneNumbersUpdateUpdate: build.mutation<
      PhoneNumbersUpdateUpdateApiResponse,
      PhoneNumbersUpdateUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/phone-numbers/${queryArg.phoneNumberId}/update/`,
        method: "PUT",
        body: queryArg.phoneNumberCreateUpdateRequest,
      }),
    }),
    productList: build.query<ProductListApiResponse, ProductListApiArg>({
      query: (queryArg) => ({
        url: `/products/`,
        params: {
          category: queryArg.category,
          name: queryArg.name,
          ordering: queryArg.ordering,
          page: queryArg.page,
          page_size: queryArg.pageSize,
          search: queryArg.search,
        },
      }),
    }),
    productDetail: build.query<ProductDetailApiResponse, ProductDetailApiArg>({
      query: (queryArg) => ({ url: `/products/${queryArg.productId}/` }),
    }),
    productDelete: build.mutation<
      ProductDeleteApiResponse,
      ProductDeleteApiArg
    >({
      query: (queryArg) => ({
        url: `/products/${queryArg.productId}/delete/`,
        method: "DELETE",
      }),
    }),
    productUpdate: build.mutation<
      ProductUpdateApiResponse,
      ProductUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/products/${queryArg.productId}/update/`,
        method: "PUT",
        body: queryArg.productRequest,
      }),
    }),
    productCreate: build.mutation<
      ProductCreateApiResponse,
      ProductCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/products/create/`,
        method: "POST",
        body: queryArg.productRequest,
      }),
    }),
    productMediaDetail: build.query<
      ProductMediaDetailApiResponse,
      ProductMediaDetailApiArg
    >({
      query: (queryArg) => ({
        url: `/products/media/${queryArg.productMediaId}/`,
      }),
    }),
    productMediaDelete: build.mutation<
      ProductMediaDeleteApiResponse,
      ProductMediaDeleteApiArg
    >({
      query: (queryArg) => ({
        url: `/products/media/${queryArg.productMediaId}/delete/`,
        method: "DELETE",
      }),
    }),
    productMediaCreate: build.mutation<
      ProductMediaCreateApiResponse,
      ProductMediaCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/products/media/create/`,
        method: "POST",
        body: queryArg.productMediaRequest,
      }),
    }),
    projectLotsRetrieve: build.query<
      ProjectLotsRetrieveApiResponse,
      ProjectLotsRetrieveApiArg
    >({
      query: (queryArg) => ({ url: `/project-lots/${queryArg.projectLotId}/` }),
    }),
    projectLotsDeleteDestroy: build.mutation<
      ProjectLotsDeleteDestroyApiResponse,
      ProjectLotsDeleteDestroyApiArg
    >({
      query: (queryArg) => ({
        url: `/project-lots/${queryArg.projectLotId}/delete/`,
        method: "DELETE",
      }),
    }),
    projectLotsSubcontractorDevisRetrieve: build.query<
      ProjectLotsSubcontractorDevisRetrieveApiResponse,
      ProjectLotsSubcontractorDevisRetrieveApiArg
    >({
      query: (queryArg) => ({
        url: `/project-lots/${queryArg.projectLotId}/subcontractor/devis/`,
      }),
    }),
    projectLotsSubcontractorsRetrieve2: build.query<
      ProjectLotsSubcontractorsRetrieve2ApiResponse,
      ProjectLotsSubcontractorsRetrieve2ApiArg
    >({
      query: (queryArg) => ({
        url: `/project-lots/${queryArg.projectLotId}/subcontractors/`,
        params: {
          created_by: queryArg.createdBy,
          ordering: queryArg.ordering,
          page: queryArg.page,
          page_size: queryArg.pageSize,
          search: queryArg.search,
          status: queryArg.status,
          subcontractor_name: queryArg.subcontractorName,
          subcontractor_staff_email: queryArg.subcontractorStaffEmail,
          subcontractor_staff_first_name: queryArg.subcontractorStaffFirstName,
        },
      }),
    }),
    projectLotsSubcontractorsAssignCreate: build.mutation<
      ProjectLotsSubcontractorsAssignCreateApiResponse,
      ProjectLotsSubcontractorsAssignCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/project-lots/${queryArg.projectLotId}/subcontractors/assign/`,
        method: "POST",
        body: queryArg.projectLotSubcontractorCreateRequest,
      }),
    }),
    projectLotsUpdateStatusUpdate: build.mutation<
      ProjectLotsUpdateStatusUpdateApiResponse,
      ProjectLotsUpdateStatusUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/project-lots/${queryArg.projectLotId}/update-status/`,
        method: "PUT",
        body: queryArg.projectLotUpdateRequest,
      }),
    }),
    uploadDevisBySubconstactor: build.mutation<
      UploadDevisBySubconstactorApiResponse,
      UploadDevisBySubconstactorApiArg
    >({
      query: (queryArg) => ({
        url: `/project-lots/${queryArg.projectLotId}/upload-devis/`,
        method: "POST",
        body: queryArg.documentUploadRequest,
      }),
    }),
    projectLotsUploadDocumentCreate: build.mutation<
      ProjectLotsUploadDocumentCreateApiResponse,
      ProjectLotsUploadDocumentCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/project-lots/${queryArg.projectLotId}/upload-document/`,
        method: "POST",
        body: queryArg.documentUploadRequest,
      }),
    }),
    projectLotsCreateCreate: build.mutation<
      ProjectLotsCreateCreateApiResponse,
      ProjectLotsCreateCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/project-lots/create/`,
        method: "POST",
        body: queryArg.projectLotCreateRequest,
      }),
    }),
    projectLotsDocumentsDeleteDestroy: build.mutation<
      ProjectLotsDocumentsDeleteDestroyApiResponse,
      ProjectLotsDocumentsDeleteDestroyApiArg
    >({
      query: (queryArg) => ({
        url: `/project-lots/documents/${queryArg.documentId}/delete/`,
        method: "DELETE",
      }),
    }),
    projectLotsDocumentsUpdateCreate: build.mutation<
      ProjectLotsDocumentsUpdateCreateApiResponse,
      ProjectLotsDocumentsUpdateCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/project-lots/documents/${queryArg.documentId}/update/`,
        method: "POST",
        body: queryArg.documentUploadRequest,
      }),
    }),
    projectLotsSubcontractorsRetrieve: build.query<
      ProjectLotsSubcontractorsRetrieveApiResponse,
      ProjectLotsSubcontractorsRetrieveApiArg
    >({
      query: (queryArg) => ({
        url: `/project-lots/subcontractors/${queryArg.projectLotSubcontractorId}/`,
      }),
    }),
    projectLotsSubcontractorsRemoveDestroy: build.mutation<
      ProjectLotsSubcontractorsRemoveDestroyApiResponse,
      ProjectLotsSubcontractorsRemoveDestroyApiArg
    >({
      query: (queryArg) => ({
        url: `/project-lots/subcontractors/${queryArg.projectLotSubcontractorId}/remove/`,
        method: "DELETE",
      }),
    }),
    updateProjectLotSubcontractorStatus: build.mutation<
      UpdateProjectLotSubcontractorStatusApiResponse,
      UpdateProjectLotSubcontractorStatusApiArg
    >({
      query: (queryArg) => ({
        url: `/project-lots/subcontractors/${queryArg.projectLotSubcontractorId}/update-status/`,
        method: "PUT",
        body: queryArg.projectLotSubcontractorUpdateRequest,
      }),
    }),
    projectLotsSubcontractorsDocumentsDeleteDevisDestroy: build.mutation<
      ProjectLotsSubcontractorsDocumentsDeleteDevisDestroyApiResponse,
      ProjectLotsSubcontractorsDocumentsDeleteDevisDestroyApiArg
    >({
      query: (queryArg) => ({
        url: `/project-lots/subcontractors/documents/${queryArg.documentId}/delete-devis/`,
        method: "DELETE",
      }),
    }),
    projectLotsSubcontractorsDocumentsUploadDevisCreate: build.mutation<
      ProjectLotsSubcontractorsDocumentsUploadDevisCreateApiResponse,
      ProjectLotsSubcontractorsDocumentsUploadDevisCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/project-lots/subcontractors/documents/${queryArg.projectLotSubcontractorId}/upload-devis/`,
        method: "POST",
        body: queryArg.documentUploadRequest,
      }),
    }),
    projectsRetrieve: build.query<
      ProjectsRetrieveApiResponse,
      ProjectsRetrieveApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/`,
        params: {
          client_ids: queryArg.clientIds,
          code: queryArg.code,
          created_by: queryArg.createdBy,
          description: queryArg.description,
          name: queryArg.name,
          ordering: queryArg.ordering,
          page: queryArg.page,
          page_size: queryArg.pageSize,
          percentage_complete_max: queryArg.percentageCompleteMax,
          percentage_complete_min: queryArg.percentageCompleteMin,
          search: queryArg.search,
          status: queryArg.status,
        },
      }),
    }),
    projectsRetrieve2: build.query<
      ProjectsRetrieve2ApiResponse,
      ProjectsRetrieve2ApiArg
    >({
      query: (queryArg) => ({ url: `/projects/${queryArg.projectId}/` }),
    }),
    assignProjectStaff: build.mutation<
      AssignProjectStaffApiResponse,
      AssignProjectStaffApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/${queryArg.projectId}/assign-staff/`,
        method: "POST",
        body: queryArg.projectStaffAssignRequest,
      }),
    }),
    projectIntervenantList: build.query<
      ProjectIntervenantListApiResponse,
      ProjectIntervenantListApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/${queryArg.projectId}/intervenants/`,
        params: {
          ordering: queryArg.ordering,
          page: queryArg.page,
          page_size: queryArg.pageSize,
          role: queryArg.role,
          search: queryArg.search,
        },
      }),
    }),
    projectIntervenantCreate: build.mutation<
      ProjectIntervenantCreateApiResponse,
      ProjectIntervenantCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/${queryArg.projectId}/intervenants/add/`,
        method: "POST",
        body: queryArg.intervenantCreateRequest,
      }),
    }),
    projectsLotsRetrieve: build.query<
      ProjectsLotsRetrieveApiResponse,
      ProjectsLotsRetrieveApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/${queryArg.projectId}/lots/`,
        params: {
          created_by: queryArg.createdBy,
          lot_name: queryArg.lotName,
          ordering: queryArg.ordering,
          page: queryArg.page,
          page_size: queryArg.pageSize,
          search: queryArg.search,
          status: queryArg.status,
        },
      }),
    }),
    listProjectStaff: build.query<
      ListProjectStaffApiResponse,
      ListProjectStaffApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/${queryArg.projectId}/staff/`,
        params: { page: queryArg.page, page_size: queryArg.pageSize },
      }),
    }),
    projectsStaffReorderUpdate: build.mutation<
      ProjectsStaffReorderUpdateApiResponse,
      ProjectsStaffReorderUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/${queryArg.projectId}/staff/reorder/`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    getProjectStaffTree: build.query<
      GetProjectStaffTreeApiResponse,
      GetProjectStaffTreeApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/${queryArg.projectId}/staff/tree/`,
      }),
    }),
    listSuiviAdministrative: build.query<
      ListSuiviAdministrativeApiResponse,
      ListSuiviAdministrativeApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/${queryArg.projectId}/suivi-administrative/`,
        params: {
          ordering: queryArg.ordering,
          page: queryArg.page,
          page_size: queryArg.pageSize,
          search: queryArg.search,
          status: queryArg.status,
        },
      }),
    }),
    listSuiviAdministrativeIntervenant: build.query<
      ListSuiviAdministrativeIntervenantApiResponse,
      ListSuiviAdministrativeIntervenantApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/${queryArg.projectId}/suivi-administrative/intervenant/`,
        params: {
          ordering: queryArg.ordering,
          page: queryArg.page,
          page_size: queryArg.pageSize,
          search: queryArg.search,
        },
      }),
    }),
    projectsTemplatesList: build.query<
      ProjectsTemplatesListApiResponse,
      ProjectsTemplatesListApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/${queryArg.projectId}/templates/`,
      }),
    }),
    projectsCreateCreate: build.mutation<
      ProjectsCreateCreateApiResponse,
      ProjectsCreateCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/create/`,
        method: "POST",
        body: queryArg.projectCreateRequest,
      }),
    }),
    projectsDeleteDestroy: build.mutation<
      ProjectsDeleteDestroyApiResponse,
      ProjectsDeleteDestroyApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/delete/${queryArg.projectId}/`,
        method: "DELETE",
      }),
    }),
    projectIntervenantDetail: build.query<
      ProjectIntervenantDetailApiResponse,
      ProjectIntervenantDetailApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/intervenants/${queryArg.projectIntervenantId}/`,
      }),
    }),
    projectIntervenantDelete: build.mutation<
      ProjectIntervenantDeleteApiResponse,
      ProjectIntervenantDeleteApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/intervenants/${queryArg.projectIntervenantId}/delete/`,
        method: "DELETE",
      }),
    }),
    projectIntervenantUpdate: build.mutation<
      ProjectIntervenantUpdateApiResponse,
      ProjectIntervenantUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/intervenants/${queryArg.projectIntervenantId}/update/`,
        method: "PUT",
        body: queryArg.intervenantUpdateRequest,
      }),
    }),
    getProjectStaffById: build.query<
      GetProjectStaffByIdApiResponse,
      GetProjectStaffByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/staff/${queryArg.projectStaffId}/`,
      }),
    }),
    removeProjectStaffById: build.mutation<
      RemoveProjectStaffByIdApiResponse,
      RemoveProjectStaffByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/staff/${queryArg.projectStaffId}/remove/`,
        method: "DELETE",
      }),
    }),
    updateProjectStaffById: build.mutation<
      UpdateProjectStaffByIdApiResponse,
      UpdateProjectStaffByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/staff/${queryArg.projectStaffId}/update/`,
        method: "PUT",
        body: queryArg.projectStaffUpdateRequest,
      }),
    }),
    projectsTemplatesRetrieve: build.query<
      ProjectsTemplatesRetrieveApiResponse,
      ProjectsTemplatesRetrieveApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/templates/${queryArg.templateId}/`,
      }),
    }),
    projectsTemplatesResetCreate: build.mutation<
      ProjectsTemplatesResetCreateApiResponse,
      ProjectsTemplatesResetCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/templates/${queryArg.templateId}/reset/`,
        method: "POST",
      }),
    }),
    projectsTemplatesUpdateUpdate: build.mutation<
      ProjectsTemplatesUpdateUpdateApiResponse,
      ProjectsTemplatesUpdateUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/templates/${queryArg.templateId}/update/`,
        method: "PUT",
        body: queryArg.projectEmailTemplateUpdateRequest,
      }),
    }),
    projectsUpdateUpdate: build.mutation<
      ProjectsUpdateUpdateApiResponse,
      ProjectsUpdateUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/projects/update/${queryArg.projectId}/`,
        method: "PUT",
        body: queryArg.projectUpdateRequest,
      }),
    }),
    setPasswordCreate: build.mutation<
      SetPasswordCreateApiResponse,
      SetPasswordCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/set-password/`,
        method: "POST",
        body: queryArg.setasswordRequest,
      }),
    }),
    listProjectSubcontractor: build.query<
      ListProjectSubcontractorApiResponse,
      ListProjectSubcontractorApiArg
    >({
      query: (queryArg) => ({
        url: `/subcontractor/projects/`,
        params: {
          code: queryArg.code,
          description: queryArg.description,
          name: queryArg.name,
          ordering: queryArg.ordering,
          page: queryArg.page,
          page_size: queryArg.pageSize,
          search: queryArg.search,
        },
      }),
    }),
    getSubcontractorProjectDetail: build.query<
      GetSubcontractorProjectDetailApiResponse,
      GetSubcontractorProjectDetailApiArg
    >({
      query: (queryArg) => ({
        url: `/subcontractor/projects/${queryArg.projectId}/`,
      }),
    }),
    subcontractorsRetrieve: build.query<
      SubcontractorsRetrieveApiResponse,
      SubcontractorsRetrieveApiArg
    >({
      query: (queryArg) => ({
        url: `/subcontractors/`,
        params: {
          client_ids: queryArg.clientIds,
          contact_email: queryArg.contactEmail,
          created_by: queryArg.createdBy,
          is_active: queryArg.isActive,
          lot_ids: queryArg.lotIds,
          name: queryArg.name,
          ordering: queryArg.ordering,
          owner_email: queryArg.ownerEmail,
          page: queryArg.page,
          page_size: queryArg.pageSize,
          phone_number: queryArg.phoneNumber,
          search: queryArg.search,
          siren_number: queryArg.sirenNumber,
        },
      }),
    }),
    subcontractorsRetrieve2: build.query<
      SubcontractorsRetrieve2ApiResponse,
      SubcontractorsRetrieve2ApiArg
    >({
      query: (queryArg) => ({
        url: `/subcontractors/${queryArg.subcontractorId}/`,
      }),
    }),
    subcontractorsOwnerRetrieve: build.query<
      SubcontractorsOwnerRetrieveApiResponse,
      SubcontractorsOwnerRetrieveApiArg
    >({
      query: (queryArg) => ({
        url: `/subcontractors/${queryArg.subcontractorId}/owner/`,
      }),
    }),
    subcontractorsOwnerAssignUpdate: build.mutation<
      SubcontractorsOwnerAssignUpdateApiResponse,
      SubcontractorsOwnerAssignUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/subcontractors/${queryArg.subcontractorId}/owner/assign/`,
        method: "PUT",
        body: queryArg.subcontractorOwnerCreateRequest,
      }),
    }),
    subcontractorsOwnerUpdateUpdate: build.mutation<
      SubcontractorsOwnerUpdateUpdateApiResponse,
      SubcontractorsOwnerUpdateUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/subcontractors/${queryArg.subcontractorId}/owner/update/`,
        method: "PUT",
        body: queryArg.subcontractorOwnerUpdateRequest,
      }),
    }),
    subcontractorsStaffRetrieve2: build.query<
      SubcontractorsStaffRetrieve2ApiResponse,
      SubcontractorsStaffRetrieve2ApiArg
    >({
      query: (queryArg) => ({
        url: `/subcontractors/${queryArg.subcontractorId}/staff/`,
        params: {
          created_by: queryArg.createdBy,
          email: queryArg.email,
          first_name: queryArg.firstName,
          is_active: queryArg.isActive,
          last_name: queryArg.lastName,
          ordering: queryArg.ordering,
          page: queryArg.page,
          page_size: queryArg.pageSize,
          search: queryArg.search,
        },
      }),
    }),
    subcontractorsStaffCreateCreate: build.mutation<
      SubcontractorsStaffCreateCreateApiResponse,
      SubcontractorsStaffCreateCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/subcontractors/${queryArg.subcontractorId}/staff/create/`,
        method: "POST",
        body: queryArg.subcontractorStaffCreateRequest,
      }),
    }),
    subcontractorsCreateCreate: build.mutation<
      SubcontractorsCreateCreateApiResponse,
      SubcontractorsCreateCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/subcontractors/create/`,
        method: "POST",
        body: queryArg.subcontractorCreateRequest,
      }),
    }),
    subcontractorsDeleteDestroy: build.mutation<
      SubcontractorsDeleteDestroyApiResponse,
      SubcontractorsDeleteDestroyApiArg
    >({
      query: (queryArg) => ({
        url: `/subcontractors/delete/${queryArg.subcontractorId}/`,
        method: "DELETE",
      }),
    }),
    getSubcontractorStaffList: build.query<
      GetSubcontractorStaffListApiResponse,
      GetSubcontractorStaffListApiArg
    >({
      query: (queryArg) => ({
        url: `/subcontractors/staff/`,
        params: {
          created_by: queryArg.createdBy,
          email: queryArg.email,
          first_name: queryArg.firstName,
          is_active: queryArg.isActive,
          last_name: queryArg.lastName,
          ordering: queryArg.ordering,
          page: queryArg.page,
          page_size: queryArg.pageSize,
          search: queryArg.search,
        },
      }),
    }),
    subcontractorsStaffRetrieve: build.query<
      SubcontractorsStaffRetrieveApiResponse,
      SubcontractorsStaffRetrieveApiArg
    >({
      query: (queryArg) => ({
        url: `/subcontractors/staff/${queryArg.subcontractorStaffId}/`,
      }),
    }),
    subcontractorsStaffDeleteDestroy: build.mutation<
      SubcontractorsStaffDeleteDestroyApiResponse,
      SubcontractorsStaffDeleteDestroyApiArg
    >({
      query: (queryArg) => ({
        url: `/subcontractors/staff/${queryArg.subcontractorStaffId}/delete/`,
        method: "DELETE",
      }),
    }),
    subcontractorsStaffUpdatePartialUpdate: build.mutation<
      SubcontractorsStaffUpdatePartialUpdateApiResponse,
      SubcontractorsStaffUpdatePartialUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/subcontractors/staff/${queryArg.subcontractorStaffId}/update/`,
        method: "PATCH",
        body: queryArg.patchedSubcontractorStaffUpdateRequest,
      }),
    }),
    createSubcontractorBySubcontractorUser: build.mutation<
      CreateSubcontractorBySubcontractorUserApiResponse,
      CreateSubcontractorBySubcontractorUserApiArg
    >({
      query: (queryArg) => ({
        url: `/subcontractors/staff/create/`,
        method: "POST",
        body: queryArg.subcontractorStaffCreateRequest,
      }),
    }),
    subcontractorsUpdateUpdate: build.mutation<
      SubcontractorsUpdateUpdateApiResponse,
      SubcontractorsUpdateUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/subcontractors/update/${queryArg.subcontractorId}/`,
        method: "PUT",
        body: queryArg.subcontractorUpdateRequest,
      }),
    }),
    retrieveSuiviAdministrativeDetail: build.query<
      RetrieveSuiviAdministrativeDetailApiResponse,
      RetrieveSuiviAdministrativeDetailApiArg
    >({
      query: (queryArg) => ({
        url: `/suivi-administrative/${queryArg.suiviAdministrativeId}/`,
      }),
    }),
    retrieveSuiviAdministrativeDetailIntervenant: build.query<
      RetrieveSuiviAdministrativeDetailIntervenantApiResponse,
      RetrieveSuiviAdministrativeDetailIntervenantApiArg
    >({
      query: (queryArg) => ({
        url: `/suivi-administrative/${queryArg.suiviAdministrativeId}/intervenant/`,
      }),
    }),
    retrieveSuiviAdministrativeStepDetail: build.query<
      RetrieveSuiviAdministrativeStepDetailApiResponse,
      RetrieveSuiviAdministrativeStepDetailApiArg
    >({
      query: (queryArg) => ({
        url: `/suivi-administrative/steps/${queryArg.stepId}`,
      }),
    }),
    listSuiviAdministrativeStepComments: build.query<
      ListSuiviAdministrativeStepCommentsApiResponse,
      ListSuiviAdministrativeStepCommentsApiArg
    >({
      query: (queryArg) => ({
        url: `/suivi-administrative/steps/${queryArg.stepId}/comments/`,
        params: { page: queryArg.page, page_size: queryArg.pageSize },
      }),
    }),
    uploadSuiviAdministrativeStepDocument: build.mutation<
      UploadSuiviAdministrativeStepDocumentApiResponse,
      UploadSuiviAdministrativeStepDocumentApiArg
    >({
      query: (queryArg) => ({
        url: `/suivi-administrative/steps/${queryArg.stepId}/documents/upload/`,
        method: "POST",
        body: queryArg.documentUploadRequest,
      }),
    }),
    updateSuiviAdministrativeStep: build.mutation<
      UpdateSuiviAdministrativeStepApiResponse,
      UpdateSuiviAdministrativeStepApiArg
    >({
      query: (queryArg) => ({
        url: `/suivi-administrative/steps/${queryArg.stepId}/update/`,
        method: "PATCH",
        body: queryArg.patchedSuiviAdministrativeStepUpdateRequest,
      }),
    }),
    addSuiviAdministrativeStepComment: build.mutation<
      AddSuiviAdministrativeStepCommentApiResponse,
      AddSuiviAdministrativeStepCommentApiArg
    >({
      query: (queryArg) => ({
        url: `/suivi-administrative/steps/comments/`,
        method: "POST",
        body: queryArg.suiviAdministrativeStepCommentCreateRequest,
      }),
    }),
    deleteSuiviAdministrativeStepDocument: build.mutation<
      DeleteSuiviAdministrativeStepDocumentApiResponse,
      DeleteSuiviAdministrativeStepDocumentApiArg
    >({
      query: (queryArg) => ({
        url: `/suivi-administrative/steps/documents/${queryArg.stepDocumentId}/delete/`,
        method: "DELETE",
      }),
    }),
    updateSuiviAdministrativeStepDocument: build.mutation<
      UpdateSuiviAdministrativeStepDocumentApiResponse,
      UpdateSuiviAdministrativeStepDocumentApiArg
    >({
      query: (queryArg) => ({
        url: `/suivi-administrative/steps/documents/${queryArg.stepDocumentId}/update/`,
        method: "PUT",
        body: queryArg.documentUploadRequest,
      }),
    }),
    tokenRefreshCreate: build.mutation<
      TokenRefreshCreateApiResponse,
      TokenRefreshCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/token_refresh/`,
        method: "POST",
        body: queryArg.tokenRefreshRequest,
      }),
    }),
    deleteTravailSupplementaire: build.mutation<
      DeleteTravailSupplementaireApiResponse,
      DeleteTravailSupplementaireApiArg
    >({
      query: (queryArg) => ({
        url: `/travail-supplementaires/${queryArg.tsId}/delete/`,
        method: "DELETE",
      }),
    }),
    updateTravailSupplementaire: build.mutation<
      UpdateTravailSupplementaireApiResponse,
      UpdateTravailSupplementaireApiArg
    >({
      query: (queryArg) => ({
        url: `/travail-supplementaires/${queryArg.tsId}/update/`,
        method: "PATCH",
        body: queryArg.patchedTravailSupplementaireUpdateRequest,
      }),
    }),
    createTravailSupplementaire: build.mutation<
      CreateTravailSupplementaireApiResponse,
      CreateTravailSupplementaireApiArg
    >({
      query: (queryArg) => ({
        url: `/travail-supplementaires/create`,
        method: "POST",
        body: queryArg.travailSupplementaireCreateRequest,
      }),
    }),
    userChangePasswordCreate: build.mutation<
      UserChangePasswordCreateApiResponse,
      UserChangePasswordCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/user/change-password/`,
        method: "POST",
        body: queryArg.userChangePasswordRequest,
      }),
    }),
    userConfirmEmailChangeCreate: build.mutation<
      UserConfirmEmailChangeCreateApiResponse,
      UserConfirmEmailChangeCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/user/confirm-email-change/`,
        method: "POST",
        body: queryArg.userEmailChangeConfirmRequest,
      }),
    }),
    userProfileRetrieve: build.query<
      UserProfileRetrieveApiResponse,
      UserProfileRetrieveApiArg
    >({
      query: () => ({ url: `/user/profile/` }),
    }),
    userRequestChangeEmailCreate: build.mutation<
      UserRequestChangeEmailCreateApiResponse,
      UserRequestChangeEmailCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/user/request-change-email/`,
        method: "POST",
        body: queryArg.userEmailChangeRequestRequest,
      }),
    }),
    userUpdatePartialUpdate: build.mutation<
      UserUpdatePartialUpdateApiResponse,
      UserUpdatePartialUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/user/update/`,
        method: "PATCH",
        body: queryArg.patchedUserProfileUpdateRequest,
      }),
    }),
    userUpdateAvatarCreate: build.mutation<
      UserUpdateAvatarCreateApiResponse,
      UserUpdateAvatarCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/user/update-avatar/`,
        method: "POST",
        body: queryArg.avatarUpdateRequest,
      }),
    }),
  }),
  overrideExisting: false,
});

export { injectedRtkApi as pIsyBuildApi };
export type SubcontractorsOwnerDeleteDestroyApiResponse =
  /** status 204  */ any;
export type SubcontractorsOwnerDeleteDestroyApiArg = {
  subcontractorId: number;
};
export type AdminStaffRetrieveApiResponse =
  /** status 200  */ PaginatedAdminStaffRead;
export type AdminStaffRetrieveApiArg = {

  /** Filter by created by email (contains match) */
  createdByEmail?: string;

  /** Filter by active status (True or False) */
  isActive?: boolean;

  /** Comma-separated fields to order by (e.g., 'name', '-date_joined') */
  ordering?:
    | "-created_at"
    | "-created_by__email"
    | "-id"
    | "-user__date_joined"
    | "-user__email"
    | "-user__first_name"
    | "-user__is_active"
    | "-user__last_name"
    | "created_at"
    | "created_by__email"
    | "id"
    | "user__date_joined"
    | "user__email"
    | "user__first_name"
    | "user__is_active"
    | "user__last_name";

  /** Page number of the results to fetch */
  page?: number;

  /** Number of results per page */
  pageSize?: number;

  /** Search by first name, last name, or email */
  search?: string;

  /** Filter by email (contains match) */
  userEmail?: string;

  /** Filter by first name (contains match) */
  userFirstName?: string;

  /** Filter by last name (contains match) */
  userLastName?: string;
};
export type AdminStaffRetrieve2ApiResponse = /** status 200  */ AdminStaffRead;
export type AdminStaffRetrieve2ApiArg = {
  adminUserId: number;
};
export type AdminStaffCreateCreateApiResponse =
  /** status 201  */ AdminStaffRead;
export type AdminStaffCreateCreateApiArg = {
  adminStaffCreateRequest: AdminStaffCreateRequestWrite;
};
export type AdminStaffUpdatePartialUpdateApiResponse =
  /** status 200  */ AdminStaffRead;
export type AdminStaffUpdatePartialUpdateApiArg = {
  adminUserId: number;
  patchedAdminStaffUpdateRequest: PatchedAdminStaffUpdateRequest;
};
export type AdminUsersDeleteDestroyApiResponse = /** status 204  */ any;
export type AdminUsersDeleteDestroyApiArg = {
  adminUserId: number;
};
export type CategoriesListApiResponse =
  /** status 200  */ PaginatedCategoryRead;
export type CategoriesListApiArg = {

  /** Filter by category name (contains match) */
  name?: string;

  /** Order results by fields (e.g., 'name', '-created_at') */
  ordering?:
    | "-created_at"
    | "-created_by__email"
    | "-description"
    | "-id"
    | "-name"
    | "created_at"
    | "created_by__email"
    | "description"
    | "id"
    | "name";

  /** Page number of the results to fetch */
  page?: number;

  /** Number of results per page */
  pageSize?: number;

  /** Search by category name, or description */
  search?: string;
};
export type CategoriesRetrieveApiResponse = /** status 200  */ CategoryRead;
export type CategoriesRetrieveApiArg = {
  categoryId: number;
};
export type CategoryDeleteApiResponse = /** status 204  */ any;
export type CategoryDeleteApiArg = {
  categoryId: number;
};
export type CategoryUpdateApiResponse = /** status 200  */ CategoryRead;
export type CategoryUpdateApiArg = {
  categoryId: number;
  categoryRequest: CategoryRequest;
};
export type CategoryCreateApiResponse = /** status 201  */ CategoryRead;
export type CategoryCreateApiArg = {
  categoryRequest: CategoryRequest;
};
export type ClientsRetrieveApiResponse = /** status 200  */ PaginatedClientRead;
export type ClientsRetrieveApiArg = {

  /** Filter by contact email (contains match) */
  contactEmail?: string;

  /** Filter by the email of the creator */
  createdByEmail?: string;

  /** Filter by active status (True or False) */
  isActive?: boolean;

  /** Filter by client name (contains match) */
  name?: string;

  /** Comma-separated fields to order by (e.g., 'name', '-date_joined') */
  ordering?:
    | "-contact_email"
    | "-created_at"
    | "-created_by__email"
    | "-id"
    | "-is_active"
    | "-name"
    | "-owner__email"
    | "-phone_number"
    | "-siren_number"
    | "contact_email"
    | "created_at"
    | "created_by__email"
    | "id"
    | "is_active"
    | "name"
    | "owner__email"
    | "phone_number"
    | "siren_number";

  /** Filter by the owner's email */
  ownerEmail?: string;

  /** Page number of the results to fetch */
  page?: number;

  /** Number of results per page */
  pageSize?: number;

  /** Filter by phone number (contains match) */
  phoneNumber?: string;

  /** Search by client name, email, or phone number */
  search?: string;

  /** Filter by SIREN number (contains match) */
  sirenNumber?: string;
};
export type ClientsRetrieve2ApiResponse = /** status 200  */ ClientRead;
export type ClientsRetrieve2ApiArg = {
  clientId: number;
};
export type ClientsOwnerRetrieveApiResponse = /** status 200  */ UserRead;
export type ClientsOwnerRetrieveApiArg = {
  clientId: number;
};
export type ClientsOwnerAssignUpdateApiResponse = /** status 200  */ ClientRead;
export type ClientsOwnerAssignUpdateApiArg = {
  clientId: number;
  clientOwnerCreateRequest: ClientOwnerCreateRequestWrite;
};
export type ClientsOwnerDeleteDestroyApiResponse = /** status 204  */ any;
export type ClientsOwnerDeleteDestroyApiArg = {
  clientId: number;
};
export type ClientsOwnerUpdateUpdateApiResponse = /** status 200  */ ClientRead;
export type ClientsOwnerUpdateUpdateApiArg = {
  clientId: number;
  clientOwnerUpdateRequest: ClientOwnerUpdateRequest;
};
export type ClientsStaffRetrieve3ApiResponse =
  /** status 200  */ PaginatedClientStaffRead;
export type ClientsStaffRetrieve3ApiArg = {
  clientId: number;

  /** Filter by created by email (contains match) */
  createdBy?: string;

  /** Filter by email (contains match) */
  email?: string;

  /** Filter by first name (contains match) */
  firstName?: string;

  /** Filter by last name (contains match) */
  lastName?: string;

  /** Comma-separated fields to order by (e.g., 'name', '-date_joined') */
  ordering?:
    | "-created_at"
    | "-created_by__email"
    | "-id"
    | "-user__date_joined"
    | "-user__email"
    | "-user__first_name"
    | "-user__is_active"
    | "-user__last_name"
    | "created_at"
    | "created_by__email"
    | "id"
    | "user__date_joined"
    | "user__email"
    | "user__first_name"
    | "user__is_active"
    | "user__last_name";

  /** Page number of the results to fetch */
  page?: number;

  /** Number of results per page */
  pageSize?: number;

  /** Search by first name, last name, or email */
  search?: string;
};
export type ClientsStaffCreateCreate2ApiResponse =
  /** status 201  */ ClientStaffRead;
export type ClientsStaffCreateCreate2ApiArg = {
  clientId: number;
  clientStaffCreateRequest: ClientStaffCreateRequestWrite;
};
export type ClientsCreateCreateApiResponse = /** status 201  */ ClientRead;
export type ClientsCreateCreateApiArg = {
  clientCreateUpdateRequest: ClientCreateUpdateRequest;
};
export type ClientsDeleteDestroyApiResponse = /** status 204  */ any;
export type ClientsDeleteDestroyApiArg = {
  clientId: number;
};
export type ClientsStaffRetrieveApiResponse =
  /** status 200  */ PaginatedClientStaffRead;
export type ClientsStaffRetrieveApiArg = {

  /** Filter by created by email (contains match) */
  createdBy?: string;

  /** Filter by email (contains match) */
  email?: string;

  /** Filter by first name (contains match) */
  firstName?: string;

  /** Filter by last name (contains match) */
  lastName?: string;

  /** Comma-separated fields to order by (e.g., 'name', '-date_joined') */
  ordering?:
    | "-created_at"
    | "-created_by__email"
    | "-id"
    | "-user__date_joined"
    | "-user__email"
    | "-user__first_name"
    | "-user__is_active"
    | "-user__last_name"
    | "created_at"
    | "created_by__email"
    | "id"
    | "user__date_joined"
    | "user__email"
    | "user__first_name"
    | "user__is_active"
    | "user__last_name";

  /** Page number of the results to fetch */
  page?: number;

  /** Number of results per page */
  pageSize?: number;

  /** Search by first name, last name, or email */
  search?: string;
};
export type ClientsStaffRetrieve2ApiResponse =
  /** status 200  */ ClientStaffRead;
export type ClientsStaffRetrieve2ApiArg = {
  clientStaffId: number;
};
export type ClientsStaffDeleteDestroyApiResponse = /** status 204  */ any;
export type ClientsStaffDeleteDestroyApiArg = {
  clientStaffId: number;
};
export type ClientsStaffUpdateUpdateApiResponse =
  /** status 200  */ ClientStaffRead;
export type ClientsStaffUpdateUpdateApiArg = {
  clientStaffId: number;
  clientStaffUpdateRequest: ClientStaffUpdateRequest;
};
export type ClientsStaffCreateCreateApiResponse =
  /** status 201  */ ClientStaffRead;
export type ClientsStaffCreateCreateApiArg = {
  clientStaffCreateRequest: ClientStaffCreateRequestWrite;
};
export type ClientsUpdateUpdateApiResponse = /** status 200  */ ClientRead;
export type ClientsUpdateUpdateApiArg = {
  clientId: number;
  clientCreateUpdateRequest: ClientCreateUpdateRequest;
};
export type ContactUsSendEmailCreateApiResponse = unknown;
export type ContactUsSendEmailCreateApiArg = {
  contactUsEmailRequest: ContactUsEmailRequest;
};
export type ContactsRetrieveApiResponse = /** status 200  */ ContactRead;
export type ContactsRetrieveApiArg = {
  contactId: number;
};
export type ContactsDeleteDestroyApiResponse = /** status 204  */ any;
export type ContactsDeleteDestroyApiArg = {
  contactId: number;
};
export type ContactsPhoneNumbersRetrieveApiResponse =
  /** status 200  */ PaginatedPhoneNumberRead;
export type ContactsPhoneNumbersRetrieveApiArg = {
  contactId: number;

  /** Page number of the results to fetch */
  page?: number;

  /** Number of results per page */
  pageSize?: number;
};
export type ContactsPhoneNumbersCreateCreateApiResponse =
  /** status 201  */ PhoneNumberRead;
export type ContactsPhoneNumbersCreateCreateApiArg = {
  contactId: number;
  phoneNumberCreateUpdateRequest: PhoneNumberCreateUpdateRequest;
};
export type ContactsUpdateUpdateApiResponse = /** status 200  */ ContactRead;
export type ContactsUpdateUpdateApiArg = {
  contactId: number;
  contactCreateUpdateRequest: ContactCreateUpdateRequest;
};
export type GetDocumentDetailApiResponse = /** status 200  */ DocumentRead;
export type GetDocumentDetailApiArg = {
  documentId: number;
};
export type GetDocumentHistoryApiResponse =
  /** status 200  */ DocumentVersionRead[];
export type GetDocumentHistoryApiArg = {
  documentId: number;
};
export type DocumentDiffusionsListApiResponse =
  /** status 200  */ PaginatedDocumentDiffusionRead;
export type DocumentDiffusionsListApiArg = {

  /** Filter by creator's email (contains match) */
  createdBy?: string;

  /** Page number of the results to fetch */
  page?: number;

  /** Number of results per page */
  pageSize?: number;

  /** Filter by document diffusion title (contains match) */
  title?: string;
};
export type DocumentDiffusionDetailApiResponse =
  /** status 200  */ DocumentDiffusionRead;
export type DocumentDiffusionDetailApiArg = {
  documentDiffusionId: number;
};
export type DocumentDiffusionCommentsListApiResponse =
  /** status 200  */ PaginatedDocumentDiffusionConfigRead;
export type DocumentDiffusionCommentsListApiArg = {
  documentDiffusionId: number;

  /** Page number of the results to fetch */
  page?: number;

  /** Number of results per page */
  pageSize?: number;
};
export type DocumentDiffusionDeleteApiResponse = /** status 204  */ any;
export type DocumentDiffusionDeleteApiArg = {
  documentDiffusionId: number;
};
export type DocumentDiffusionDocumentDeleteApiResponse = /** status 204  */ {
  [key: string]: any;
};
export type DocumentDiffusionDocumentDeleteApiArg = {
  documentDiffusionId: number;
};
export type DocumentDiffusionDiffuseApiResponse =
  /** status 200  */ DocumentDiffusionRead;
export type DocumentDiffusionDiffuseApiArg = {
  documentDiffusionId: number;
  diffusionRequest: DiffusionRequest;
};
export type DocumentDiffusionUpdateApiResponse =
  /** status 200  */ DocumentDiffusionRead;
export type DocumentDiffusionUpdateApiArg = {
  documentDiffusionId: number;
  documentDiffusionUpdateRequest: DocumentDiffusionUpdateRequest;
};
export type DiffusionIntervenantCommentCreateApiResponse =
  /** status 201 Comment created successfully. */ DiffusionIntervenantCommentRead;
export type DiffusionIntervenantCommentCreateApiArg = {
  documentDiffusionId: number;
  diffusionIntervenantCommentCreateRequest: DiffusionIntervenantCommentCreateRequest;
};
export type DocumentDiffusionUploadApiResponse = /** status 201  */ {
  [key: string]: any;
};
export type DocumentDiffusionUploadApiArg = {
  documentDiffusionId: number;
  documentUploadRequest: DocumentUploadRequest;
};
export type DocumentDiffusionConfigByProjectListApiResponse =
  /** status 200  */ DocumentDiffusionConfigRead;
export type DocumentDiffusionConfigByProjectListApiArg = {
  projectId: number;
};
export type DocumentDiffusionConfigDetailApiResponse =
  /** status 200  */ DocumentDiffusionConfigRead;
export type DocumentDiffusionConfigDetailApiArg = {
  documentDiffusionConfigId: number;
};
export type DocumentDiffusionConfigUpdateApiResponse =
  /** status 200  */ DocumentDiffusionConfigRead;
export type DocumentDiffusionConfigUpdateApiArg = {
  documentDiffusionConfigId: number;
  documentDiffusionConfigUpdateRequest: DocumentDiffusionConfigUpdateRequest;
};
export type DocumentDiffusionCreateApiResponse =
  /** status 201  */ DocumentDiffusionRead;
export type DocumentDiffusionCreateApiArg = {
  documentDiffusionCreateRequest: DocumentDiffusionCreateRequest;
};
export type RetrieveFinanceEnterpriseByIdApiResponse =
  /** status 200 FinanceEnterprise details retrieved successfully. */ FinanceEnterpriseRead;
export type RetrieveFinanceEnterpriseByIdApiArg = {
  financeEnterpriseId: number;
};
export type ListFinanceSituationsApiResponse =
  /** status 200  */ PaginatedFinanceSituationRead;
export type ListFinanceSituationsApiArg = {
  financeEnterpriseId: number;

  /** Page number of the results to fetch */
  page?: number;

  /** Number of results per page */
  pageSize?: number;
};
export type ListTravailSupplementaireApiResponse =
  /** status 200  */ PaginatedTravailSupplementaireRead;
export type ListTravailSupplementaireApiArg = {
  financeEnterpriseId: number;

  /** Page number of the results to fetch */
  page?: number;

  /** Number of results per page */
  pageSize?: number;
};
export type UpdateFinanceEnterpriseApiResponse =
  /** status 200 FinanceEnterprise updated successfully. */ FinanceEnterpriseRead;
export type UpdateFinanceEnterpriseApiArg = {
  financeEnterpriseId: number;
  patchedFinanceEnterpriseUpdateRequest: PatchedFinanceEnterpriseUpdateRequest;
};
export type RetrieveFinanceSituationApiResponse =
  /** status 200  */ FinanceSituationRead;
export type RetrieveFinanceSituationApiArg = {
  situationId: number;
};
export type DeleteFinanceSituationApiResponse = unknown;
export type DeleteFinanceSituationApiArg = {
  situationId: number;
};
export type UpdateFinanceSituationApiResponse =
  /** status 200  */ FinanceSituationRead;
export type UpdateFinanceSituationApiArg = {
  situationId: number;
  patchedFinanceSituationUpdateRequest: PatchedFinanceSituationUpdateRequest;
};
export type CreateFinanceSituationApiResponse =
  /** status 201  */ FinanceSituationRead;
export type CreateFinanceSituationApiArg = {
  financeSituationCreateRequest: FinanceSituationCreateRequestWrite;
};
export type RetrieveFinanceByIdApiResponse =
  /** status 200 Finance details retrieved successfully. */ FinanceRead;
export type RetrieveFinanceByIdApiArg = {
  financeId: number;
};
export type ListProjectLotFinanceApiResponse =
  /** status 200  */ PaginatedFinanceRead;
export type ListProjectLotFinanceApiArg = {

  /** Order results by fields (e.g., 'created_at', '-lot_name') */
  ordering?:
    | "-created_at"
    | "-created_by__email"
    | "-id"
    | "-project_lot__lot__name"
    | "-total_cie"
    | "-total_contract"
    | "-total_final_amount"
    | "-total_markets_plus_ts"
    | "-total_prorata"
    | "-total_retention_guarantee"
    | "-total_ts_choix"
    | "-total_ts_tma"
    | "-total_ts_travaux"
    | "-updated_at"
    | "created_at"
    | "created_by__email"
    | "id"
    | "project_lot__lot__name"
    | "total_cie"
    | "total_contract"
    | "total_final_amount"
    | "total_markets_plus_ts"
    | "total_prorata"
    | "total_retention_guarantee"
    | "total_ts_choix"
    | "total_ts_tma"
    | "total_ts_travaux"
    | "updated_at";

  /** Page number of the results to fetch */
  page?: number;

  /** Number of results per page */
  pageSize?: number;
  projectId: number;

  /** Search by project lot name */
  search?: string;
};
export type GetFolderDetailApiResponse = /** status 200  */ FolderRead;
export type GetFolderDetailApiArg = {
  folderId: number;
};
export type ListProjectIntervenantProjectApiResponse =
  /** status 200  */ PaginatedProjectForIntervenantRead;
export type ListProjectIntervenantProjectApiArg = {

  /** Comma-separated fields to order by (e.g., 'name', '-date_joined') */
  ordering?:
    | "-code"
    | "-description"
    | "-id"
    | "-name"
    | "code"
    | "description"
    | "id"
    | "name";

  /** Page number of the results to fetch */
  page?: number;

  /** Number of results per page */
  pageSize?: number;

  /** Search by code, name,description ,client name */
  search?: string;
};
export type GetIntervenantProjectDetailApiResponse =
  /** status 200  */ ProjectForIntervenantRead;
export type GetIntervenantProjectDetailApiArg = {
  projectId: number;
};
export type IntervenantRolesRetrieveApiResponse =
  /** status 200 Available roles for Intervenants */ {
    [key: string]: any;
  };
export type IntervenantRolesRetrieveApiArg = void;
export type LocalisationsListApiResponse =
  /** status 200  */ PaginatedLocalisationRead;
export type LocalisationsListApiArg = {

  /** Filter by creator's email (contains match) */
  createdBy?: string;

  /** Filter by localisation name (contains match) */
  name?: string;

  /** Order results by fields (e.g., 'name', '-created_at') */
  ordering?:
    | "-created_at"
    | "-created_by__email"
    | "-id"
    | "-name"
    | "created_at"
    | "created_by__email"
    | "id"
    | "name";

  /** Page number of the results to fetch */
  page?: number;

  /** Number of results per page */
  pageSize?: number;

  /** Search by localisation name */
  search?: string;
};
export type LocalisationDetailApiResponse = /** status 200  */ LocalisationRead;
export type LocalisationDetailApiArg = {
  localisationId: number;
};
export type LocalisationsDeleteDestroyApiResponse = /** status 204  */ any;
export type LocalisationsDeleteDestroyApiArg = {
  localisationId: number;
};
export type LocalisationUpdateApiResponse = /** status 200  */ LocalisationRead;
export type LocalisationUpdateApiArg = {
  localisationId: number;
  localisationRequest: LocalisationRequest;
};
export type LocalisationCreateApiResponse = /** status 201  */ LocalisationRead;
export type LocalisationCreateApiArg = {
  localisationRequest: LocalisationRequest;
};
export type LoginCreateApiResponse = /** status 200  */ {
  [key: string]: any;
};
export type LoginCreateApiArg = {
  tokenObtainPairRequest: TokenObtainPairRequestWrite;
};
export type LogoutCreateApiResponse = /** status 205 No response body */ void;
export type LogoutCreateApiArg = {
  tokenRefreshRequest: TokenRefreshRequest;
};
export type LotsRetrieveApiResponse = /** status 200  */ PaginatedLotRead;
export type LotsRetrieveApiArg = {

  /** Filter by Client IDs (comma-separated) */
  clientIds?: string;

  /** Filter by creator's email (contains match) */
  createdBy?: string;

  /** Filter by lot description (contains match) */
  description?: string;

  /** Filter by lot name (contains match) */
  name?: string;

  /** Order results by fields (e.g., 'name', '-created_at') */
  ordering?:
    | "-client__name"
    | "-created_at"
    | "-created_by__email"
    | "-description"
    | "-id"
    | "-name"
    | "client__name"
    | "created_at"
    | "created_by__email"
    | "description"
    | "id"
    | "name";

  /** Page number of the results to fetch */
  page?: number;

  /** Number of results per page */
  pageSize?: number;

  /** Search by code, name,description  */
  search?: string;
};
export type LotsRetrieve2ApiResponse = /** status 200  */ LotRead;
export type LotsRetrieve2ApiArg = {
  lotId: number;
};
export type LotsCreateCreateApiResponse = /** status 201  */ LotRead;
export type LotsCreateCreateApiArg = {
  lotCreateUpdateRequest: LotCreateUpdateRequest;
};
export type LotsDeleteDestroyApiResponse = /** status 204  */ any;
export type LotsDeleteDestroyApiArg = {
  lotId: number;
};
export type LotsUpdateUpdateApiResponse = /** status 200  */ LotRead;
export type LotsUpdateUpdateApiArg = {
  lotId: number;
  lotCreateUpdateRequest: LotCreateUpdateRequest;
};
export type GetInAppNotificationsListApiResponse =
  /** status 200  */ PaginatedInAppNotificationRead;
export type GetInAppNotificationsListApiArg = {

  /** Page number of the results to fetch */
  page?: number;

  /** Number of results per page */
  pageSize?: number;
};
export type GetInAppNotificationDetailApiResponse =
  /** status 200 Success: Notification retrieved */ InAppNotificationRead;
export type GetInAppNotificationDetailApiArg = {
  notificationId: number;
};
export type MarkNotificationAsReadApiResponse = unknown;
export type MarkNotificationAsReadApiArg = {
  notificationId: number;
};
export type PasswordConfirmCreateApiResponse = /** status 200  */ any;
export type PasswordConfirmCreateApiArg = {
  setNewPasswordRequest: SetNewPasswordRequestWrite;
};
export type PasswordResetCreateApiResponse = /** status 200  */ any;
export type PasswordResetCreateApiArg = {
  passwordResetRequestRequest: PasswordResetRequestRequest;
};
export type PhoneNumbersRetrieveApiResponse =
  /** status 200  */ PhoneNumberRead;
export type PhoneNumbersRetrieveApiArg = {
  phoneNumberId: number;
};
export type PhoneNumbersDeleteDestroyApiResponse = /** status 204  */ any;
export type PhoneNumbersDeleteDestroyApiArg = {
  phoneNumberId: number;
};
export type PhoneNumbersUpdateUpdateApiResponse =
  /** status 200  */ PhoneNumberRead;
export type PhoneNumbersUpdateUpdateApiArg = {
  phoneNumberId: number;
  phoneNumberCreateUpdateRequest: PhoneNumberCreateUpdateRequest;
};
export type ProductListApiResponse = /** status 200  */ PaginatedProductRead;
export type ProductListApiArg = {

  /** Filter by Categories IDs (comma-separated) */
  category?: string;

  /** Filter by product name (contains match) */
  name?: string;

  /** Order results by fields (e.g., 'name', '-created_at') */
  ordering?:
    | "-category__name"
    | "-created_at"
    | "-created_by__email"
    | "-description"
    | "-id"
    | "-name"
    | "category__name"
    | "created_at"
    | "created_by__email"
    | "description"
    | "id"
    | "name";

  /** Page number of the results to fetch */
  page?: number;

  /** Number of results per page */
  pageSize?: number;

  /** Search by product name, or description */
  search?: string;
};
export type ProductDetailApiResponse = /** status 200  */ ProductRead;
export type ProductDetailApiArg = {
  productId: number;
};
export type ProductDeleteApiResponse = /** status 204  */ any;
export type ProductDeleteApiArg = {
  productId: number;
};
export type ProductUpdateApiResponse = /** status 200  */ ProductRead;
export type ProductUpdateApiArg = {
  productId: number;
  productRequest: ProductRequest;
};
export type ProductCreateApiResponse = /** status 201  */ ProductRead;
export type ProductCreateApiArg = {
  productRequest: ProductRequest;
};
export type ProductMediaDetailApiResponse = /** status 200  */ ProductMediaRead;
export type ProductMediaDetailApiArg = {
  productMediaId: number;
};
export type ProductMediaDeleteApiResponse = /** status 204  */ any;
export type ProductMediaDeleteApiArg = {
  productMediaId: number;
};
export type ProductMediaCreateApiResponse = /** status 200  */ ProductRead;
export type ProductMediaCreateApiArg = {
  productMediaRequest: ProductMediaRequest;
};
export type ProjectLotsRetrieveApiResponse = /** status 200  */ ProjectLotRead;
export type ProjectLotsRetrieveApiArg = {
  projectLotId: number;
};
export type ProjectLotsDeleteDestroyApiResponse = /** status 204  */ {
  [key: string]: any;
};
export type ProjectLotsDeleteDestroyApiArg = {
  projectLotId: number;
};
export type ProjectLotsSubcontractorDevisRetrieveApiResponse =
  /** status 200  */ DocumentRead;
export type ProjectLotsSubcontractorDevisRetrieveApiArg = {
  projectLotId: number;
};
export type ProjectLotsSubcontractorsRetrieve2ApiResponse =
  /** status 200  */ PaginatedProjectLotSubcontractorRead;
export type ProjectLotsSubcontractorsRetrieve2ApiArg = {

  /** Filter by creator's email (contains match) */
  createdBy?: string;

  /** Order results by fields (e.g., 'subcontractor__name', '-created_at') */
  ordering?:
    | "-created_at"
    | "-id"
    | "-status"
    | "-subcontractor__name"
    | "-subcontractor_staff__user__first_name"
    | "created_at"
    | "id"
    | "status"
    | "subcontractor__name"
    | "subcontractor_staff__user__first_name";

  /** Page number of the results to fetch */
  page?: number;

  /** Number of results per page */
  pageSize?: number;
  projectLotId: number;

  /** Search by subcontractor name, status, or subcontractor staff email/first name */
  search?: string;

  /** Filter by subcontractor status */
  status?:
    | "canceled"
    | "completed"
    | "in_progress"
    | "not_responding"
    | "pending";

  /** Filter by subcontractor name (contains match) */
  subcontractorName?: string;

  /** Filter by subcontractor staff email (contains match) */
  subcontractorStaffEmail?: string;

  /** Filter by subcontractor staff first name (contains match) */
  subcontractorStaffFirstName?: string;
};
export type ProjectLotsSubcontractorsAssignCreateApiResponse =
  /** status 201  */ ProjectLotSubcontractorRead;
export type ProjectLotsSubcontractorsAssignCreateApiArg = {
  projectLotId: number;
  projectLotSubcontractorCreateRequest: ProjectLotSubcontractorCreateRequest;
};
export type ProjectLotsUpdateStatusUpdateApiResponse =
  /** status 200  */ ProjectLotRead;
export type ProjectLotsUpdateStatusUpdateApiArg = {
  projectLotId: number;
  projectLotUpdateRequest: ProjectLotUpdateRequest;
};
export type UploadDevisBySubconstactorApiResponse = /** status 200  */ {
  [key: string]: any;
};
export type UploadDevisBySubconstactorApiArg = {
  projectLotId: number;
  documentUploadRequest: DocumentUploadRequest;
};
export type ProjectLotsUploadDocumentCreateApiResponse = /** status 201  */ {
  [key: string]: any;
};
export type ProjectLotsUploadDocumentCreateApiArg = {
  projectLotId: number;
  documentUploadRequest: DocumentUploadRequest;
};
export type ProjectLotsCreateCreateApiResponse =
  /** status 201  */ ProjectLotRead;
export type ProjectLotsCreateCreateApiArg = {
  projectLotCreateRequest: ProjectLotCreateRequest;
};
export type ProjectLotsDocumentsDeleteDestroyApiResponse = /** status 204  */ {
  [key: string]: any;
};
export type ProjectLotsDocumentsDeleteDestroyApiArg = {
  documentId: number;
};
export type ProjectLotsDocumentsUpdateCreateApiResponse = /** status 200  */ {
  [key: string]: any;
};
export type ProjectLotsDocumentsUpdateCreateApiArg = {
  documentId: number;
  documentUploadRequest: DocumentUploadRequest;
};
export type ProjectLotsSubcontractorsRetrieveApiResponse =
  /** status 200  */ ProjectLotSubcontractorRead;
export type ProjectLotsSubcontractorsRetrieveApiArg = {
  projectLotSubcontractorId: number;
};
export type ProjectLotsSubcontractorsRemoveDestroyApiResponse =
  /** status 204  */ {
    [key: string]: any;
  };
export type ProjectLotsSubcontractorsRemoveDestroyApiArg = {
  projectLotSubcontractorId: number;
};
export type UpdateProjectLotSubcontractorStatusApiResponse =
  /** status 200  */ ProjectLotSubcontractorRead;
export type UpdateProjectLotSubcontractorStatusApiArg = {
  projectLotSubcontractorId: number;
  projectLotSubcontractorUpdateRequest: ProjectLotSubcontractorUpdateRequest;
};
export type ProjectLotsSubcontractorsDocumentsDeleteDevisDestroyApiResponse =
  /** status 204  */ {
    [key: string]: any;
  };
export type ProjectLotsSubcontractorsDocumentsDeleteDevisDestroyApiArg = {
  documentId: number;
};
export type ProjectLotsSubcontractorsDocumentsUploadDevisCreateApiResponse =
  /** status 200  */ {
    [key: string]: any;
  };
export type ProjectLotsSubcontractorsDocumentsUploadDevisCreateApiArg = {
  projectLotSubcontractorId: number;
  documentUploadRequest: DocumentUploadRequest;
};
export type ProjectsRetrieveApiResponse =
  /** status 200  */ PaginatedProjectRead;
export type ProjectsRetrieveApiArg = {

  /** Filter by Client IDs (comma-separated) */
  clientIds?: string;

  /** Filter by project code (contains match) */
  code?: string;

  /** Filter by creator's email (contains match) */
  createdBy?: string;

  /** Filter by project description (contains match) */
  description?: string;

  /** Filter by project name (contains match) */
  name?: string;

  /** Comma-separated fields to order by (e.g., 'name', '-date_joined') */
  ordering?:
    | "-client__name"
    | "-code"
    | "-created_at"
    | "-created_by__email"
    | "-description"
    | "-id"
    | "-manager__user__email"
    | "-name"
    | "-percentage_complete"
    | "-start_date"
    | "-status"
    | "client__name"
    | "code"
    | "created_at"
    | "created_by__email"
    | "description"
    | "id"
    | "manager__user__email"
    | "name"
    | "percentage_complete"
    | "start_date"
    | "status";

  /** Page number of the results to fetch */
  page?: number;

  /** Number of results per page */
  pageSize?: number;

  /** Maximum completion percentage */
  percentageCompleteMax?: number;

  /** Minimum completion percentage */
  percentageCompleteMin?: number;

  /** Search by code, name,description ,client name */
  search?: string;

  /** Filter by project status */
  status?:
    | "canceled"
    | "completed"
    | "draft"
    | "in_progress"
    | "on_hold"
    | "pending";
};
export type ProjectsRetrieve2ApiResponse = /** status 200  */ ProjectRead;
export type ProjectsRetrieve2ApiArg = {
  projectId: number;
};
export type AssignProjectStaffApiResponse = /** status 201  */ ProjectStaffRead;
export type AssignProjectStaffApiArg = {
  projectId: number;
  projectStaffAssignRequest: ProjectStaffAssignRequest;
};
export type ProjectIntervenantListApiResponse =
  /** status 200  */ PaginatedProjectIntervenantRead;
export type ProjectIntervenantListApiArg = {

  /** Order results by fields (e.g., 'name', '-created_at') */
  ordering?:
    | "-created_at"
    | "-created_by__email"
    | "-id"
    | "-intervenant__role"
    | "-intervenant__user__date_joined"
    | "-intervenant__user__email"
    | "-intervenant__user__first_name"
    | "-intervenant__user__last_name"
    | "created_at"
    | "created_by__email"
    | "id"
    | "intervenant__role"
    | "intervenant__user__date_joined"
    | "intervenant__user__email"
    | "intervenant__user__first_name"
    | "intervenant__user__last_name";

  /** Page number of the results to fetch */
  page?: number;

  /** Number of results per page */
  pageSize?: number;
  projectId: number;

  /** Filter by  role */
  role?:
    | "Architecte"
    | "Assistance ma\u00EEtrise d\u2019ouvrage hygi\u00E8ne et environnement"
    | "Bureau d'\u00E9tude technique"
    | "Bureau de contr\u00F4le"
    | "Client"
    | "Coordonnateur s\u00E9curit\u00E9 et protection de la sant\u00E9";

  /** Search by first name, last name, or email */
  search?: string;
};
export type ProjectIntervenantCreateApiResponse =
  /** status 201  */ ProjectIntervenantRead;
export type ProjectIntervenantCreateApiArg = {
  projectId: number;
  intervenantCreateRequest: IntervenantCreateRequestWrite;
};
export type ProjectsLotsRetrieveApiResponse =
  /** status 200  */ PaginatedProjectLotRead;
export type ProjectsLotsRetrieveApiArg = {

  /** Filter by creator's email (contains match) */
  createdBy?: string;

  /** Filter by lot name (contains match) */
  lotName?: string;

  /** Order results by fields (e.g., 'lot__name', '-created_at') */
  ordering?:
    | "-created_at"
    | "-id"
    | "-lot__name"
    | "-status"
    | "created_at"
    | "id"
    | "lot__name"
    | "status";

  /** Page number of the results to fetch */
  page?: number;

  /** Number of results per page */
  pageSize?: number;
  projectId: number;

  /** Search by lot name or status */
  search?: string;

  /** Filter by project lot status */
  status?: "canceled" | "completed" | "in_progress" | "pending" | "review";
};
export type ListProjectStaffApiResponse =
  /** status 200  */ PaginatedProjectStaffRead;
export type ListProjectStaffApiArg = {

  /** Page number of the results to fetch */
  page?: number;

  /** Number of results per page */
  pageSize?: number;
  projectId: number;
};
export type ProjectsStaffReorderUpdateApiResponse = /** status 200  */ {
  [key: string]: any;
};
export type ProjectsStaffReorderUpdateApiArg = {
  projectId: number;
  body: ProjectStaffReorderRequest[];
};
export type GetProjectStaffTreeApiResponse =
  /** status 200  */ ProjectStaffTreeRead[];
export type GetProjectStaffTreeApiArg = {
  projectId: number;
};
export type ListSuiviAdministrativeApiResponse =
  /** status 200  */ PaginatedSuiviAdministrativeRead;
export type ListSuiviAdministrativeApiArg = {

  /** Order results by fields (e.g., 'lot__name', '-created_at') */
  ordering?:
    | "-created_at"
    | "-created_by__email"
    | "-id"
    | "-project_lot__lot__name"
    | "-status"
    | "created_at"
    | "created_by__email"
    | "id"
    | "project_lot__lot__name"
    | "status";

  /** Page number of the results to fetch */
  page?: number;

  /** Number of results per page */
  pageSize?: number;
  projectId: number;

  /** Search by administrative status or related intervenant */
  search?: string;

  /** Filter by status */
  status?: "completed" | "in_progress" | "not_started";
};
export type ListSuiviAdministrativeIntervenantApiResponse =
  /** status 200  */ PaginatedSuiviAdministrativeIntervenantRead;
export type ListSuiviAdministrativeIntervenantApiArg = {

  /** Order results by fields (e.g., 'lot__name', '-created_at') */
  ordering?:
    | "-created_at"
    | "-created_by__email"
    | "-id"
    | "-project_lot__lot__name"
    | "-status"
    | "created_at"
    | "created_by__email"
    | "id"
    | "project_lot__lot__name"
    | "status";

  /** Page number of the results to fetch */
  page?: number;

  /** Number of results per page */
  pageSize?: number;
  projectId: number;

  /** Search by administrative status or related intervenant */
  search?: string;
};
export type ProjectsTemplatesListApiResponse =
  /** status 200  */ ProjectEmailTemplateRead[];
export type ProjectsTemplatesListApiArg = {
  projectId: number;
};
export type ProjectsCreateCreateApiResponse = /** status 201  */ ProjectRead;
export type ProjectsCreateCreateApiArg = {
  projectCreateRequest: ProjectCreateRequest;
};
export type ProjectsDeleteDestroyApiResponse = /** status 204  */ any;
export type ProjectsDeleteDestroyApiArg = {
  projectId: number;
};
export type ProjectIntervenantDetailApiResponse =
  /** status 200 Project Intervenant details retrieved successfully. */ ProjectIntervenantRead;
export type ProjectIntervenantDetailApiArg = {
  projectIntervenantId: number;
};
export type ProjectIntervenantDeleteApiResponse = unknown;
export type ProjectIntervenantDeleteApiArg = {
  projectIntervenantId: number;
};
export type ProjectIntervenantUpdateApiResponse = unknown;
export type ProjectIntervenantUpdateApiArg = {
  projectIntervenantId: number;
  intervenantUpdateRequest: IntervenantUpdateRequest;
};
export type GetProjectStaffByIdApiResponse =
  /** status 200  */ ProjectStaffRead;
export type GetProjectStaffByIdApiArg = {
  projectStaffId: number;
};
export type RemoveProjectStaffByIdApiResponse = /** status 204  */ {
  [key: string]: any;
};
export type RemoveProjectStaffByIdApiArg = {
  projectStaffId: number;
};
export type UpdateProjectStaffByIdApiResponse =
  /** status 200  */ ProjectStaffRead;
export type UpdateProjectStaffByIdApiArg = {
  projectStaffId: number;
  projectStaffUpdateRequest: ProjectStaffUpdateRequest;
};
export type ProjectsTemplatesRetrieveApiResponse =
  /** status 200  */ ProjectEmailTemplateRead;
export type ProjectsTemplatesRetrieveApiArg = {
  templateId: number;
};
export type ProjectsTemplatesResetCreateApiResponse =
  /** status 200  */ ProjectEmailTemplateRead;
export type ProjectsTemplatesResetCreateApiArg = {
  templateId: number;
};
export type ProjectsTemplatesUpdateUpdateApiResponse =
  /** status 200  */ ProjectEmailTemplateRead;
export type ProjectsTemplatesUpdateUpdateApiArg = {
  templateId: number;
  projectEmailTemplateUpdateRequest: ProjectEmailTemplateUpdateRequest;
};
export type ProjectsUpdateUpdateApiResponse = /** status 200  */ ProjectRead;
export type ProjectsUpdateUpdateApiArg = {
  projectId: number;
  projectUpdateRequest: ProjectUpdateRequest;
};
export type SetPasswordCreateApiResponse = /** status 200  */ any;
export type SetPasswordCreateApiArg = {
  setasswordRequest: SetasswordRequestWrite;
};
export type ListProjectSubcontractorApiResponse =
  /** status 200  */ PaginatedProjectSubcontractorRead;
export type ListProjectSubcontractorApiArg = {

  /** Filter by project code (contains match) */
  code?: string;

  /** Filter by project description (contains match) */
  description?: string;

  /** Filter by project name (contains match) */
  name?: string;

  /** Comma-separated fields to order by (e.g., 'name', '-date_joined') */
  ordering?:
    | "-code"
    | "-description"
    | "-id"
    | "-name"
    | "code"
    | "description"
    | "id"
    | "name";

  /** Page number of the results to fetch */
  page?: number;

  /** Number of results per page */
  pageSize?: number;

  /** Search by code, name,description ,client name */
  search?: string;
};
export type GetSubcontractorProjectDetailApiResponse =
  /** status 200  */ ProjectSubcontractorRead;
export type GetSubcontractorProjectDetailApiArg = {
  projectId: number;
};
export type SubcontractorsRetrieveApiResponse =
  /** status 200  */ PaginatedSubcontractortRead;
export type SubcontractorsRetrieveApiArg = {

  /** Filter by Client IDs (comma-separated) */
  clientIds?: string;

  /** Filter by contact email (contains match) */
  contactEmail?: string;

  /** Filter by the creator's email */
  createdBy?: string;

  /** Filter by active status (True or False) */
  isActive?: boolean;

  /** Filter by Lot IDs (comma-separated) */
  lotIds?: string;

  /** Filter by subcontractor name (contains match) */
  name?: string;

  /** Comma-separated fields to order by (e.g., 'name', '-created_at') */
  ordering?:
    | "-contact_email"
    | "-created_at"
    | "-created_by__email"
    | "-id"
    | "-is_active"
    | "-name"
    | "-owner__email"
    | "-phone_number"
    | "-siren_number"
    | "contact_email"
    | "created_at"
    | "created_by__email"
    | "id"
    | "is_active"
    | "name"
    | "owner__email"
    | "phone_number"
    | "siren_number";

  /** Filter by the owner's email */
  ownerEmail?: string;

  /** Page number of the results to fetch */
  page?: number;

  /** Number of results per page */
  pageSize?: number;

  /** Filter by phone number (contains match) */
  phoneNumber?: string;

  /** Search by first name, last name, or email */
  search?: string;

  /** Filter by SIREN number (contains match) */
  sirenNumber?: string;
};
export type SubcontractorsRetrieve2ApiResponse =
  /** status 200  */ SubcontractorRead;
export type SubcontractorsRetrieve2ApiArg = {
  subcontractorId: number;
};
export type SubcontractorsOwnerRetrieveApiResponse =
  /** status 200  */ UserRead;
export type SubcontractorsOwnerRetrieveApiArg = {
  subcontractorId: number;
};
export type SubcontractorsOwnerAssignUpdateApiResponse =
  /** status 200  */ SubcontractorRead;
export type SubcontractorsOwnerAssignUpdateApiArg = {
  subcontractorId: number;
  subcontractorOwnerCreateRequest: SubcontractorOwnerCreateRequestWrite;
};
export type SubcontractorsOwnerUpdateUpdateApiResponse =
  /** status 200  */ SubcontractorRead;
export type SubcontractorsOwnerUpdateUpdateApiArg = {
  subcontractorId: number;
  subcontractorOwnerUpdateRequest: SubcontractorOwnerUpdateRequest;
};
export type SubcontractorsStaffRetrieve2ApiResponse =
  /** status 200  */ PaginatedSubcontractorStaffRead;
export type SubcontractorsStaffRetrieve2ApiArg = {

  /** Filter by created by email (contains match) */
  createdBy?: string;

  /** Filter by email (contains match) */
  email?: string;

  /** Filter by first name (contains match) */
  firstName?: string;

  /** Filter by active status (True or False) */
  isActive?: boolean;

  /** Filter by last name (contains match) */
  lastName?: string;

  /** Comma-separated fields to order by (e.g., 'name', '-date_joined') */
  ordering?:
    | "-created_at"
    | "-created_by__email"
    | "-id"
    | "-user__date_joined"
    | "-user__email"
    | "-user__first_name"
    | "-user__is_active"
    | "-user__last_name"
    | "created_at"
    | "created_by__email"
    | "id"
    | "user__date_joined"
    | "user__email"
    | "user__first_name"
    | "user__is_active"
    | "user__last_name";

  /** Page number of the results to fetch */
  page?: number;

  /** Number of results per page */
  pageSize?: number;

  /** Search by first name, last name, or email */
  search?: string;
  subcontractorId: number;
};
export type SubcontractorsStaffCreateCreateApiResponse =
  /** status 201  */ SubcontractorStaffRead;
export type SubcontractorsStaffCreateCreateApiArg = {
  subcontractorId: number;
  subcontractorStaffCreateRequest: SubcontractorStaffCreateRequestWrite;
};
export type SubcontractorsCreateCreateApiResponse =
  /** status 201  */ SubcontractorRead;
export type SubcontractorsCreateCreateApiArg = {
  subcontractorCreateRequest: SubcontractorCreateRequest;
};
export type SubcontractorsDeleteDestroyApiResponse = /** status 204  */ any;
export type SubcontractorsDeleteDestroyApiArg = {
  subcontractorId: number;
};
export type GetSubcontractorStaffListApiResponse =
  /** status 200  */ PaginatedSubcontractorStaffRead;
export type GetSubcontractorStaffListApiArg = {

  /** Filter by created by email (contains match) */
  createdBy?: string;

  /** Filter by email (contains match) */
  email?: string;

  /** Filter by first name (contains match) */
  firstName?: string;

  /** Filter by active status (True or False) */
  isActive?: boolean;

  /** Filter by last name (contains match) */
  lastName?: string;

  /** Comma-separated fields to order by (e.g., 'name', '-date_joined') */
  ordering?:
    | "-created_at"
    | "-created_by__email"
    | "-id"
    | "-user__date_joined"
    | "-user__email"
    | "-user__first_name"
    | "-user__is_active"
    | "-user__last_name"
    | "created_at"
    | "created_by__email"
    | "id"
    | "user__date_joined"
    | "user__email"
    | "user__first_name"
    | "user__is_active"
    | "user__last_name";

  /** Page number of the results to fetch */
  page?: number;

  /** Number of results per page */
  pageSize?: number;

  /** Search by first name, last name, or email */
  search?: string;
};
export type SubcontractorsStaffRetrieveApiResponse =
  /** status 200  */ SubcontractorStaffRead;
export type SubcontractorsStaffRetrieveApiArg = {
  subcontractorStaffId: number;
};
export type SubcontractorsStaffDeleteDestroyApiResponse =
  /** status 204  */ any;
export type SubcontractorsStaffDeleteDestroyApiArg = {
  subcontractorStaffId: number;
};
export type SubcontractorsStaffUpdatePartialUpdateApiResponse =
  /** status 200  */ SubcontractorStaffRead;
export type SubcontractorsStaffUpdatePartialUpdateApiArg = {
  subcontractorStaffId: number;
  patchedSubcontractorStaffUpdateRequest: PatchedSubcontractorStaffUpdateRequest;
};
export type CreateSubcontractorBySubcontractorUserApiResponse =
  /** status 201  */ SubcontractorStaffRead;
export type CreateSubcontractorBySubcontractorUserApiArg = {
  subcontractorStaffCreateRequest: SubcontractorStaffCreateRequestWrite;
};
export type SubcontractorsUpdateUpdateApiResponse =
  /** status 200  */ SubcontractorRead;
export type SubcontractorsUpdateUpdateApiArg = {
  subcontractorId: number;
  subcontractorUpdateRequest: SubcontractorUpdateRequest;
};
export type RetrieveSuiviAdministrativeDetailApiResponse =
  /** status 200  */ SuiviAdministrativeRead;
export type RetrieveSuiviAdministrativeDetailApiArg = {
  suiviAdministrativeId: number;
};
export type RetrieveSuiviAdministrativeDetailIntervenantApiResponse =
  /** status 200  */ SuiviAdministrativeIntervenantRead;
export type RetrieveSuiviAdministrativeDetailIntervenantApiArg = {
  suiviAdministrativeId: number;
};
export type RetrieveSuiviAdministrativeStepDetailApiResponse =
  /** status 200  */ SuiviAdministrativeStepRead;
export type RetrieveSuiviAdministrativeStepDetailApiArg = {
  stepId: number;
};
export type ListSuiviAdministrativeStepCommentsApiResponse =
  /** status 200  */ PaginatedSuiviAdministrativeStepCommentRead;
export type ListSuiviAdministrativeStepCommentsApiArg = {

  /** Page number of the results to fetch */
  page?: number;

  /** Number of results per page */
  pageSize?: number;
  stepId: number;
};
export type UploadSuiviAdministrativeStepDocumentApiResponse =
  /** status 200  */ StepDocumentRead;
export type UploadSuiviAdministrativeStepDocumentApiArg = {
  stepId: number;
  documentUploadRequest: DocumentUploadRequest;
};
export type UpdateSuiviAdministrativeStepApiResponse = unknown;
export type UpdateSuiviAdministrativeStepApiArg = {
  stepId: number;
  patchedSuiviAdministrativeStepUpdateRequest: PatchedSuiviAdministrativeStepUpdateRequest;
};
export type AddSuiviAdministrativeStepCommentApiResponse =
  /** status 201 Comment created successfully. */ SuiviAdministrativeStepCommentRead;
export type AddSuiviAdministrativeStepCommentApiArg = {
  suiviAdministrativeStepCommentCreateRequest: SuiviAdministrativeStepCommentCreateRequest;
};
export type DeleteSuiviAdministrativeStepDocumentApiResponse = unknown;
export type DeleteSuiviAdministrativeStepDocumentApiArg = {
  stepDocumentId: number;
};
export type UpdateSuiviAdministrativeStepDocumentApiResponse =
  /** status 200  */ StepDocumentRead;
export type UpdateSuiviAdministrativeStepDocumentApiArg = {
  stepDocumentId: number;
  documentUploadRequest: DocumentUploadRequest;
};
export type TokenRefreshCreateApiResponse = /** status 200  */ {
  [key: string]: any;
};
export type TokenRefreshCreateApiArg = {
  tokenRefreshRequest: TokenRefreshRequest;
};
export type DeleteTravailSupplementaireApiResponse = unknown;
export type DeleteTravailSupplementaireApiArg = {
  tsId: number;
};
export type UpdateTravailSupplementaireApiResponse =
  /** status 200 Travail Supplémentaire updated successfully. */ TravailSupplementaireRead;
export type UpdateTravailSupplementaireApiArg = {
  tsId: number;
  patchedTravailSupplementaireUpdateRequest: PatchedTravailSupplementaireUpdateRequest;
};
export type CreateTravailSupplementaireApiResponse =
  /** status 201 Travail Supplémentaire created successfully. */ TravailSupplementaireRead;
export type CreateTravailSupplementaireApiArg = {
  travailSupplementaireCreateRequest: TravailSupplementaireCreateRequestWrite;
};
export type UserChangePasswordCreateApiResponse = /** status 200  */ {
  [key: string]: any;
};
export type UserChangePasswordCreateApiArg = {
  userChangePasswordRequest: UserChangePasswordRequest;
};
export type UserConfirmEmailChangeCreateApiResponse = /** status 200  */ {
  message?: string;
  new_email?: string;
};
export type UserConfirmEmailChangeCreateApiArg = {
  userEmailChangeConfirmRequest: UserEmailChangeConfirmRequest;
};
export type UserProfileRetrieveApiResponse = /** status 200  */ UserRead;
export type UserProfileRetrieveApiArg = void;
export type UserRequestChangeEmailCreateApiResponse = /** status 200  */ any;
export type UserRequestChangeEmailCreateApiArg = {
  userEmailChangeRequestRequest: UserEmailChangeRequestRequestWrite;
};
export type UserUpdatePartialUpdateApiResponse = /** status 200  */ UserRead;
export type UserUpdatePartialUpdateApiArg = {
  patchedUserProfileUpdateRequest: PatchedUserProfileUpdateRequest;
};
export type UserUpdateAvatarCreateApiResponse = /** status 200  */ UserRead;
export type UserUpdateAvatarCreateApiArg = {
  avatarUpdateRequest: AvatarUpdateRequest;
};
export type AdminStaff = {};
export type User = {
  email: string;
  first_name?: string;
  last_name?: string;
  date_joined?: string;
  is_active?: boolean;
};
export type UserRead = {
  id: number;
  avatar: string;
  email: string;
  first_name?: string;
  last_name?: string;
  date_joined?: string;
  is_active?: boolean;
  role: string;
};
export type CreatedBy = {
  email: string;
  first_name?: string;
  last_name?: string;
};
export type CreatedByRead = {
  id: number;
  avatar: string;
  email: string;
  first_name?: string;
  last_name?: string;
};
export type AdminStaffRead = {
  id: number;
  user: UserRead;
  created_by: CreatedByRead;
  created_at: string;
  updated_at: string;
};
export type PaginatedAdminStaff = {
  count: number;
  next: string | null;
  previous: string | null;
  results: AdminStaff[];
};
export type PaginatedAdminStaffRead = {
  count: number;
  next: string | null;
  previous: string | null;
  results: AdminStaffRead[];
};
export type UserCreateRequest = {
  email: string;
  first_name: string;
  last_name: string;
  is_active?: boolean;
};
export type UserCreateRequestWrite = {
  email: string;
  first_name: string;
  last_name: string;
  is_active?: boolean;
  redirect_uri: string;
};
export type AdminStaffCreateRequest = {
  user: UserCreateRequest;
};
export type AdminStaffCreateRequestWrite = {
  user: UserCreateRequestWrite;
};
export type PatchedAdminStaffUpdateRequest = {
  first_name?: string;
  last_name?: string;
  is_active?: boolean;
};
export type Category = {
  name: string;
  description?: string | null;
};
export type Product = {
  name: string;
  description?: string | null;
  category: number;
  technical_sheet?: string | null;
};
export type ProductMedia = {
  image: string;
  product: number;
};
export type ProductMediaRead = {
  id: number;
  image: string;
  product: number;
  created_by: CreatedByRead;
  created_at: string;
  updated_at: string;
};
export type ProductRead = {
  id: number;
  name: string;
  description?: string | null;
  category: number;
  technical_sheet?: string | null;
  media: ProductMediaRead[];
  created_by: CreatedByRead;
  created_at: string;
  updated_at: string;
};
export type CategoryRead = {
  id: number;
  name: string;
  products: ProductRead[];
  description?: string | null;
  created_by: CreatedByRead;
  created_at: string;
  updated_at: string;
};
export type PaginatedCategory = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Category[];
};
export type PaginatedCategoryRead = {
  count: number;
  next: string | null;
  previous: string | null;
  results: CategoryRead[];
};
export type CategoryRequest = {
  name: string;
  description?: string | null;
};
export type Address = {
  street_number: string;
  street_name: string;
  postal_code: string;
  city: string;
  department?: string | null;
  region?: string | null;
  country?: string;
};
export type AddressRead = {
  id: number;
  street_number: string;
  street_name: string;
  postal_code: string;
  city: string;
  department?: string | null;
  region?: string | null;
  country?: string;
  created_by: CreatedByRead;
  created_at: string;
  updated_at: string;
};
export type Client = {
  name: string;
  siren_number: string;
  address: Address;
  contact_email: string;
  phone_number: string;
  is_active?: boolean;
};
export type ClientRead = {
  id: number;
  name: string;
  siren_number: string;
  address: AddressRead;
  owner: CreatedByRead;
  contact_email: string;
  phone_number: string;
  is_active?: boolean;
  created_by: CreatedByRead;
  created_at: string;
  updated_at: string;
};
export type PaginatedClient = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Client[];
};
export type PaginatedClientRead = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ClientRead[];
};
export type ClientOwnerCreateRequest = {
  user: UserCreateRequest;
};
export type ClientOwnerCreateRequestWrite = {
  user: UserCreateRequestWrite;
};
export type UserUpdateRequest = {
  first_name: string;
  last_name: string;
  is_active?: boolean;
};
export type ClientOwnerUpdateRequest = {
  user: UserUpdateRequest;
};
export type ClientStaff = {};
export type ClientStaffRead = {
  id: number;
  user: UserRead;
  created_by: CreatedByRead;
  created_at: string;
  updated_at: string;
};
export type PaginatedClientStaff = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ClientStaff[];
};
export type PaginatedClientStaffRead = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ClientStaffRead[];
};
export type ClientStaffCreateRequest = {
  user: UserCreateRequest;
  client_id?: number | null;
};
export type ClientStaffCreateRequestWrite = {
  user: UserCreateRequestWrite;
  client_id?: number | null;
};
export type AddressCreateRequest = {
  street_number: string;
  street_name: string;
  postal_code: string;
  city: string;
  department?: string | null;
  region?: string | null;
  country?: string;
};
export type ClientCreateUpdateRequest = {
  name: string;
  siren_number: string;
  address: AddressCreateRequest;
  contact_email: string;
  phone_number: string;
  is_active?: boolean;
};
export type ClientStaffUpdateRequest = {
  user: UserUpdateRequest;
};
export type ContactUsEmailRequest = {
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  fonction: string;
  entreprise: string;
  message?: string;
};
export type Contact = {
  first_name: string;
  last_name: string;
  email: string;
};
export type TypeB5BEnum = "work" | "personal" | "fax";
export type PhoneNumber = {
  number: string;
  type?: TypeB5BEnum;
};
export type PhoneNumberRead = {
  id: number;
  number: string;
  type?: TypeB5BEnum;
  created_by: CreatedByRead;
  created_at: string;
  updated_at: string;
};
export type ContactRead = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_numbers: PhoneNumberRead[];
  created_by: CreatedByRead;
  created_at: string;
  updated_at: string;
};
export type PaginatedPhoneNumber = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PhoneNumber[];
};
export type PaginatedPhoneNumberRead = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PhoneNumberRead[];
};
export type PhoneNumberCreateUpdateRequest = {
  number: string;
  type: TypeB5BEnum;
};
export type ContactCreateUpdateRequest = {
  first_name: string;
  last_name: string;
  email: string;
};
export type Document = {
  name: string;
  tags?: string | null;
};
export type DocumentVersion = {
  version_number: number;
  notes?: string | null;
};
export type DocumentVersionRead = {
  version_number: number;
  file_url: string;
  notes?: string | null;
  created_at: string;
};
export type DocumentRead = {
  id: number;
  name: string;
  tags?: string | null;
  latest_version: DocumentVersionRead;
};
export type PhaseEnum = "design" | "execution";
export type Type474Enum =
  | "plan_technique"
  | "plan_de_coffrage"
  | "fiche_technique"
  | "avis_technique"
  | "note_de_calcul"
  | "fiche_question"
  | "autre";
export type Localisation = {
  name: string;
};
export type LocalisationRead = {
  id: number;
  name: string;
  created_by: CreatedByRead;
  created_at: string;
  updated_at: string;
};
export type Status109Enum =
  | "pending"
  | "in_progress"
  | "review"
  | "completed"
  | "canceled";
export type ProjectLot = {
  status?: Status109Enum;
  notes?: string;
};
export type ProjectSimple = {
  name: string;
};
export type ClientSimple = {
  name: string;
  siren_number: string;
  contact_email: string;
  phone_number: string;
};
export type ClientSimpleRead = {
  id: number;
  name: string;
  siren_number: string;
  contact_email: string;
  phone_number: string;
};
export type ProjectSimpleRead = {
  id: number;
  name: string;
  client: ClientSimpleRead;
};
export type LotSimple = {
  name: string;
};
export type LotSimpleRead = {
  id: number;
  name: string;
};
export type Folder = {
  name: string;
};
export type FolderRead = {
  id: number;
  name: string;
  documents: DocumentRead[];
};
export type ProjectLotRead = {
  id: number;
  project: ProjectSimpleRead;
  lot: LotSimpleRead;
  status?: Status109Enum;
  folder: FolderRead;
  notes?: string;
  created_by: CreatedByRead;
  created_at: string;
  updated_at: string;
};
export type DocumentDiffusion = {
  title: string;
  phase: PhaseEnum;
  diffusion_date?: string | null;
  indice?: string | null;
  type: Type474Enum;
  localisation: Localisation;
  project_lot: ProjectLot;
};
export type DocumentDiffusionRead = {
  id: number;
  title: string;
  phase: PhaseEnum;
  diffusion_date?: string | null;
  indice?: string | null;
  type: Type474Enum;
  localisation: LocalisationRead;
  project_lot: ProjectLotRead;
  document: DocumentRead;
  created_by: CreatedByRead;
  created_at: string;
  updated_at: string;
};
export type PaginatedDocumentDiffusion = {
  count: number;
  next: string | null;
  previous: string | null;
  results: DocumentDiffusion[];
};
export type PaginatedDocumentDiffusionRead = {
  count: number;
  next: string | null;
  previous: string | null;
  results: DocumentDiffusionRead[];
};
export type RolesEnum =
  | "Architecte"
  | "Bureau de contr\u00F4le"
  | "Bureau d'\u00E9tude technique"
  | "Coordonnateur s\u00E9curit\u00E9 et protection de la sant\u00E9"
  | "Assistance ma\u00EEtrise d\u2019ouvrage hygi\u00E8ne et environnement"
  | "Client";
export type ProjectStatusEnum =
  | "draft"
  | "pending"
  | "in_progress"
  | "completed"
  | "on_hold"
  | "canceled";
export type RiskLevelEnum = "low" | "medium" | "high" | "critical";
export type Project = {
  code: string;
  name: string;
  description?: string;
  status?: ProjectStatusEnum;
  start_date?: string | null;
  estimated_completion_date?: string | null;
  percentage_complete?: string;
  budget?: string;
  actual_cost?: string;
  cost_variance?: string;
  risk_level?: RiskLevelEnum;
  notification_frequency?: number;
  max_notifications?: number;
};
export type MapCoordinate = {
  latitude: string;
  longitude: string;
};
export type ProjectRead = {
  id: number;
  code: string;
  name: string;
  description?: string;
  client: ClientRead;
  status?: ProjectStatusEnum;
  start_date?: string | null;
  estimated_completion_date?: string | null;
  map_coordinate: MapCoordinate;
  percentage_complete?: string;
  budget?: string;
  actual_cost?: string;
  cost_variance?: string;
  risk_level?: RiskLevelEnum;
  address: AddressRead;
  manager: ClientStaffRead;
  notification_frequency?: number;
  max_notifications?: number;
  created_by: CreatedByRead;
  created_at: string;
  updated_at: string;
};
export type DocumentDiffusionConfig = {
  type: Type474Enum;
  roles: RolesEnum[];
  project: Project;
};
export type DocumentDiffusionConfigRead = {
  id: number;
  type: Type474Enum;
  roles: RolesEnum[];
  project: ProjectRead;
};
export type PaginatedDocumentDiffusionConfig = {
  count: number;
  next: string | null;
  previous: string | null;
  results: DocumentDiffusionConfig[];
};
export type PaginatedDocumentDiffusionConfigRead = {
  count: number;
  next: string | null;
  previous: string | null;
  results: DocumentDiffusionConfigRead[];
};
export type DiffusionRequest = {
  indice?: number;
};
export type DocumentDiffusionUpdateRequest = {
  title: string;
  phase: PhaseEnum;
  localisation: number;
};
export type Status7C6Enum = "valid" | "invalid" | "not_validated_yet";
export type BlankEnum = "";
export type NullEnum = null;
export type DiffusionIntervenantComment = {
  comment?: string | null;
  status?: (Status7C6Enum | BlankEnum | NullEnum) | null;
  created_by?: number | null;
};
export type DiffusionIntervenantCommentRead = {
  id: number;
  comment?: string | null;
  document: DocumentRead;
  status?: (Status7C6Enum | BlankEnum | NullEnum) | null;
  created_by?: number | null;
  created_at: string;
};
export type DiffusionIntervenantCommentCreateRequest = {
  diffusion_intervenant_id: number;

  /** Text content of the comment. */
  comment: string;

  /** The file to be uploaded. */
  document_file?: Blob;
  status?: Status7C6Enum;
};
export type DocumentUploadRequest = {
  name?: string;
  file: Blob;
  tags?: string;
  notes?: string;
};
export type DocumentDiffusionConfigUpdateRequest = {
  type: Type474Enum;
  roles: RolesEnum[];
};
export type DocumentDiffusionCreateRequest = {
  title: string;
  phase: PhaseEnum;
  type: Type474Enum;
  localisation: number;
  project_lot: number;
};
export type DgdStatusEnum =
  | "regle"
  | "valide"
  | "valide_bloque_jp"
  | "etabli_non_signe_ets"
  | "en_attente_moex"
  | "en_attente_levee_reserves"
  | "valide_a_zero"
  | "signe_par_ets_attente_jp"
  | "refuse_par_amo"
  | "abandon";
export type FinanceEnterprise = {
  total_contract: string;
  prorata?: string;
  total_ts_travaux?: string;
  total_ts_choix?: string;
  total_ts_tma?: string;
  markets_plus_ts?: string;
  cie?: string;
  retention_guarantee?: string;
  final_amount?: string;
  payment_cumulated?: string;
  payment_cumulated_percentage?: string;
  caution?: string;

  /** Status of the DGD for the finance enterprise

    * `regle` - Réglé
    * `valide` - Validé
    * `valide_bloque_jp` - Validé bloqué par JP courvoyeur
    * `etabli_non_signe_ets` - Établi non signé ETS
    * `en_attente_moex` - En attente Moex
    * `en_attente_levee_reserves` - En attente levée de réserves
    * `valide_a_zero` - Validé à zéro
    * `signe_par_ets_attente_jp` - Signé par ETS attente JP
    * `refuse_par_amo` - Refusé par AMO
    * `abandon` - Abandon */
  dgd_status?: (DgdStatusEnum | BlankEnum | NullEnum) | null;
};
export type SubcontractorSimple = {
  name: string;
  siren_number: string;
};
export type SubcontractorSimpleRead = {
  id: number;
  name: string;
  siren_number: string;
};
export type FinanceEnterpriseRead = {
  id: number;
  subcontractor: SubcontractorSimpleRead;
  total_contract: string;
  prorata?: string;
  total_ts_travaux?: string;
  total_ts_choix?: string;
  total_ts_tma?: string;
  markets_plus_ts?: string;
  cie?: string;
  retention_guarantee?: string;
  final_amount?: string;
  payment_cumulated?: string;
  payment_cumulated_percentage?: string;
  caution?: string;

  /** Status of the DGD for the finance enterprise

    * `regle` - Réglé
    * `valide` - Validé
    * `valide_bloque_jp` - Validé bloqué par JP courvoyeur
    * `etabli_non_signe_ets` - Établi non signé ETS
    * `en_attente_moex` - En attente Moex
    * `en_attente_levee_reserves` - En attente levée de réserves
    * `valide_a_zero` - Validé à zéro
    * `signe_par_ets_attente_jp` - Signé par ETS attente JP
    * `refuse_par_amo` - Refusé par AMO
    * `abandon` - Abandon */
  dgd_status?: (DgdStatusEnum | BlankEnum | NullEnum) | null;
};
export type FinanceSituation = {
  name?: string;
  amount?: string;
};
export type FinanceEnterpriseSimple = {};
export type FinanceEnterpriseSimpleRead = {
  id: number;
  subcontractor: SubcontractorSimpleRead;
};
export type FinanceSituationRead = {
  id: number;
  finance_enterprise: FinanceEnterpriseSimpleRead;
  name?: string;
  amount?: string;
  created_by: CreatedByRead;
  created_at: string;
  updated_at: string;
};
export type PaginatedFinanceSituation = {
  count: number;
  next: string | null;
  previous: string | null;
  results: FinanceSituation[];
};
export type PaginatedFinanceSituationRead = {
  count: number;
  next: string | null;
  previous: string | null;
  results: FinanceSituationRead[];
};
export type TravailSupplementaire = {
  name?: string;
  amount: string;
};
export type TravailSupplementaireRead = {
  id: number;
  name?: string;
  finance_enterprise: FinanceEnterpriseSimpleRead;
  amount: string;
  created_by: CreatedByRead;
  created_at: string;
  updated_at: string;
};
export type PaginatedTravailSupplementaire = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TravailSupplementaire[];
};
export type PaginatedTravailSupplementaireRead = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TravailSupplementaireRead[];
};
export type PatchedFinanceEnterpriseUpdateRequest = {
  total_contract?: string;
  total_ts_choix?: string;
  total_ts_tma?: string;
  cie?: string;
  retention_guarantee?: string;
  caution?: string;
  dgd_status?: DgdStatusEnum;
};
export type PatchedFinanceSituationUpdateRequest = {
  amount?: string;
};
export type FinanceSituationCreateRequest = {
  amount?: string;
};
export type FinanceSituationCreateRequestWrite = {
  finance_enterprise_id: number;
  amount?: string;
};
export type Finance = {
  total_contract?: string;
  total_prorata?: string;
  total_ts_travaux?: string;
  total_ts_choix?: string;
  total_ts_tma?: string;
  total_markets_plus_ts?: string;
  total_cie?: string;
  total_retention_guarantee?: string;
  total_final_amount?: string;
  finance_enterprises: FinanceEnterprise[];
  payment_cumulated?: string;
  payment_cumulated_percentage?: string;
};
export type ProjectLotSimple = {
  status?: Status109Enum;
  notes?: string;
};
export type ProjectLotSimpleRead = {
  id: number;
  project: ProjectSimpleRead;
  lot: LotSimpleRead;
  status?: Status109Enum;
  notes?: string;
};
export type FinanceRead = {
  id: number;
  project_lot: ProjectLotSimpleRead;
  total_contract?: string;
  total_prorata?: string;
  total_ts_travaux?: string;
  total_ts_choix?: string;
  total_ts_tma?: string;
  total_markets_plus_ts?: string;
  total_cie?: string;
  total_retention_guarantee?: string;
  total_final_amount?: string;
  finance_enterprises: FinanceEnterpriseRead[];
  payment_cumulated?: string;
  payment_cumulated_percentage?: string;
};
export type PaginatedFinance = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Finance[];
};
export type PaginatedFinanceRead = {
  count: number;
  next: string | null;
  previous: string | null;
  results: FinanceRead[];
};
export type ProjectForIntervenant = {
  code: string;
  name: string;
  description?: string;
};
export type ProjectForIntervenantRead = {
  id: number;
  code: string;
  name: string;
  description?: string;
  client: ClientSimpleRead;
  map_coordinate: MapCoordinate;
  address: AddressRead;
  created_at: string;
  updated_at: string;
};
export type PaginatedProjectForIntervenant = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ProjectForIntervenant[];
};
export type PaginatedProjectForIntervenantRead = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ProjectForIntervenantRead[];
};
export type PaginatedLocalisation = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Localisation[];
};
export type PaginatedLocalisationRead = {
  count: number;
  next: string | null;
  previous: string | null;
  results: LocalisationRead[];
};
export type LocalisationRequest = {
  name: string;
};
export type TokenObtainPairRequest = {};
export type TokenObtainPairRequestWrite = {
  email: string;
  password: string;
};
export type TokenRefreshRequest = {
  refresh: string;
};
export type Lot = {
  name: string;
  description?: string | null;
};
export type LotRead = {
  id: number;
  name: string;
  description?: string | null;
  client: ClientRead;
  created_by: CreatedByRead;
  created_at: string;
  updated_at: string;
};
export type PaginatedLot = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Lot[];
};
export type PaginatedLotRead = {
  count: number;
  next: string | null;
  previous: string | null;
  results: LotRead[];
};
export type LotCreateUpdateRequest = {
  name: string;
  description?: string | null;
};
export type InAppNotificationStatusEnum =
  | "pending"
  | "Sent"
  | "Failed"
  | "read"
  | "unread";
export type ChannelEnum = "Email" | "sms" | "whatsApp" | "push" | "in_app";
export type InAppNotification = {
  subject?: string | null;
  message: string;
  status?: InAppNotificationStatusEnum;
  channel: ChannelEnum;
  sent_at?: string | null;
  read_at?: string | null;
  redirect_url?: string | null;
  context_data?: any | null;
};
export type InAppNotificationRead = {
  id: number;
  subject?: string | null;
  message: string;
  status?: InAppNotificationStatusEnum;
  channel: ChannelEnum;
  sent_at?: string | null;
  read_at?: string | null;
  redirect_url?: string | null;
  context_data?: any | null;
};
export type PaginatedInAppNotification = {
  count: number;
  next: string | null;
  previous: string | null;
  results: InAppNotification[];
};
export type PaginatedInAppNotificationRead = {
  count: number;
  next: string | null;
  previous: string | null;
  results: InAppNotificationRead[];
};
export type SetNewPasswordRequest = {};
export type SetNewPasswordRequestWrite = {
  new_password: string;
  uid: string;
  token: string;
};
export type PasswordResetRequestRequest = {
  email: string;
  redirect_uri: string;
};
export type PaginatedProduct = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
};
export type PaginatedProductRead = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ProductRead[];
};
export type ProductRequest = {
  name: string;
  description?: string | null;
  category: number;
  technical_sheet?: string | null;
};
export type ProductMediaRequest = {
  image: Blob;
  product: number;
};
export type Status841Enum =
  | "pending"
  | "in_progress"
  | "completed"
  | "not_responding"
  | "canceled";
export type ProjectLotSubcontractor = {
  status?: Status841Enum;
  notes?: string | null;
  notifications_sent?: number;
  last_notification_date?: string | null;

  /** Total contract amount for the subcontractor */
  total_contract?: string;
};
export type SubcontractorStaffSimple = {};
export type SubcontractorStaffSimpleRead = {
  id: number;
  user: CreatedByRead;
  subcontractor: SubcontractorSimpleRead;
};
export type ProjectLotSubcontractorRead = {
  id: number;
  project_lot: ProjectLotSimpleRead;
  subcontractor: SubcontractorSimpleRead;
  subcontractor_staff: SubcontractorStaffSimpleRead;
  devis_document: DocumentRead;
  status?: Status841Enum;
  notes?: string | null;
  notifications_sent?: number;
  last_notification_date?: string | null;
  created_by: CreatedByRead;
  created_at: string;
  updated_at: string;

  /** Total contract amount for the subcontractor */
  total_contract?: string;
};
export type PaginatedProjectLotSubcontractor = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ProjectLotSubcontractor[];
};
export type PaginatedProjectLotSubcontractorRead = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ProjectLotSubcontractorRead[];
};
export type ProjectLotSubcontractorCreateRequest = {
  subcontractor_id: number;
  subcontractor_staff_id: number;
  status?: Status841Enum;
  notes?: string | null;
};
export type ProjectLotUpdateRequest = {
  status?: Status109Enum;
};
export type ProjectLotCreateRequest = {
  lot_id: number;
  project_id: number;
};
export type ProjectLotSubcontractorUpdateRequest = {
  status?: Status841Enum;

  /** Total contract amount for the subcontractor */
  total_contract?: string;
};
export type PaginatedProject = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Project[];
};
export type PaginatedProjectRead = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ProjectRead[];
};
export type ProjectStaff = {
  role: string;
};
export type ClientStaffSimple = {};
export type UserSimple = {
  email: string;
  first_name?: string;
  last_name?: string;
};
export type UserSimpleRead = {
  id: number;
  avatar: string;
  email: string;
  first_name?: string;
  last_name?: string;
};
export type ClientStaffSimpleRead = {
  id: number;
  user: UserSimpleRead;
};
export type ProjectStaffRead = {
  id: number;
  staff: ClientStaffSimpleRead;
  role: string;
  supervisor: ClientStaffSimpleRead | null;
  created_by: CreatedByRead;
  created_at: string;
  updated_at: string;
};
export type ProjectStaffAssignRequest = {
  staff_id: number;
  role: string;
  supervisor_id?: number | null;
};
export type ProjectIntervenant = {};
export type RoleEnum =
  | "Architecte"
  | "Bureau de contr\u00F4le"
  | "Bureau d'\u00E9tude technique"
  | "Coordonnateur s\u00E9curit\u00E9 et protection de la sant\u00E9"
  | "Assistance ma\u00EEtrise d\u2019ouvrage hygi\u00E8ne et environnement"
  | "Client";
export type Intervenant = {
  role: RoleEnum;
};
export type IntervenantRead = {
  id: number;
  user: UserRead;
  role: RoleEnum;
  created_by: CreatedByRead;
  created_at: string;
  updated_at: string;
};
export type ProjectIntervenantRead = {
  id: number;
  intervenant: IntervenantRead;
  created_by: CreatedByRead;
  created_at: string;
  updated_at: string;
};
export type PaginatedProjectIntervenant = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ProjectIntervenant[];
};
export type PaginatedProjectIntervenantRead = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ProjectIntervenantRead[];
};
export type IntervenantCreateRequest = {
  user: UserCreateRequest;
  role: RoleEnum;
};
export type IntervenantCreateRequestWrite = {
  user: UserCreateRequestWrite;
  role: RoleEnum;
};
export type PaginatedProjectLot = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ProjectLot[];
};
export type PaginatedProjectLotRead = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ProjectLotRead[];
};
export type PaginatedProjectStaff = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ProjectStaff[];
};
export type PaginatedProjectStaffRead = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ProjectStaffRead[];
};
export type ProjectStaffReorderRequest = {
  id: number;
  supervisor_id?: number | null;
  children?: {
    [key: string]: any;
  }[];
};
export type ProjectStaffTree = {
  role: string;
};
export type ProjectStaffTreeRead = {
  id: number;
  staff: ClientStaffSimpleRead;
  role: string;
  children: string;
};
export type SuiviAdministrativeStatusEnum =
  | "not_started"
  | "in_progress"
  | "completed";
export type SuiviAdministrative = {

  /** Overall status of the administrative process.

    * `not_started` - Not Started
    * `in_progress` - In Progress
    * `completed` - Completed */
  status?: SuiviAdministrativeStatusEnum;
};
export type Status3BfEnum =
  | "not_started"
  | "in_progress"
  | "completed"
  | "on_hold"
  | "canceled"
  | "rejected"
  | "temporarily_done";
export type SuiviAdministrativeStep = {
  step_name: string;
  order?: number;

  /** Number of days before or after the project start date. */
  nbr_of_days: number;
  target_date?: string | null;
  actual_date?: string | null;

  /** Status of the step in the suivi administrative process.

    * `not_started` - Not Started
    * `in_progress` - In Progress
    * `completed` - Completed
    * `on_hold` - On Hold
    * `canceled` - Canceled
    * `rejected` - Rejected
    * `temporarily_done` - Temporarily Done */
  status?: Status3BfEnum;
};
export type StepDocument = {

  /** Whether the document is valid for this step. */
  is_valid?: boolean;

  /** If True, this document cannot be updated or deleted in the current step. */
  protected?: boolean;
};
export type StepDocumentRead = {
  id: number;
  document: DocumentRead;

  /** Whether the document is valid for this step. */
  is_valid?: boolean;

  /** If True, this document cannot be updated or deleted in the current step. */
  protected?: boolean;
};
export type SuiviAdministrativeStepRead = {
  id: number;
  step_name: string;
  step_documents: StepDocumentRead[];
  order?: number;

  /** Number of days before or after the project start date. */
  nbr_of_days: number;
  target_date?: string | null;
  actual_date?: string | null;

  /** Status of the step in the suivi administrative process.

    * `not_started` - Not Started
    * `in_progress` - In Progress
    * `completed` - Completed
    * `on_hold` - On Hold
    * `canceled` - Canceled
    * `rejected` - Rejected
    * `temporarily_done` - Temporarily Done */
  status?: Status3BfEnum;
  assigned_to: ProjectIntervenantRead;
  created_by: CreatedByRead;
  created_at: string;
  updated_at: string;
};
export type SuiviAdministrativeRead = {
  id: number;
  project_lot: ProjectLotRead;

  /** Overall status of the administrative process.

    * `not_started` - Not Started
    * `in_progress` - In Progress
    * `completed` - Completed */
  status?: SuiviAdministrativeStatusEnum;
  steps: SuiviAdministrativeStepRead[];
  created_by: CreatedByRead;
  created_at: string;
  updated_at: string;
};
export type PaginatedSuiviAdministrative = {
  count: number;
  next: string | null;
  previous: string | null;
  results: SuiviAdministrative[];
};
export type PaginatedSuiviAdministrativeRead = {
  count: number;
  next: string | null;
  previous: string | null;
  results: SuiviAdministrativeRead[];
};
export type SuiviAdministrativeIntervenant = {};
export type SuiviAdministrativeIntervenantRead = {
  id: number;
  project_lot: ProjectLotSimpleRead;
  steps: string;
};
export type PaginatedSuiviAdministrativeIntervenant = {
  count: number;
  next: string | null;
  previous: string | null;
  results: SuiviAdministrativeIntervenant[];
};
export type PaginatedSuiviAdministrativeIntervenantRead = {
  count: number;
  next: string | null;
  previous: string | null;
  results: SuiviAdministrativeIntervenantRead[];
};
export type TemplateTypeEnum =
  | "upload_devis"
  | "assign_subcontractor"
  | "update_document"
  | "rappel_client"
  | "rappel_subcontractor";
export type ProjectEmailTemplate = {
  project: ProjectSimple;
  template_type: TemplateTypeEnum;
};
export type EmailTemplate = {

  /** Template name for internal reference */
  name: string;

  /** Subject template with placeholders */
  subject_template: string;

  /** Customizable header content with placeholders */
  header_template?: string | null;

  /** Customizable body content with placeholders */
  body_template: string;

  /** Customizable footer content with placeholders */
  footer_template?: string | null;
};
export type EmailTemplateRead = {
  id: number;

  /** Template name for internal reference */
  name: string;

  /** Subject template with placeholders */
  subject_template: string;

  /** Customizable header content with placeholders */
  header_template?: string | null;

  /** Customizable body content with placeholders */
  body_template: string;

  /** Customizable footer content with placeholders */
  footer_template?: string | null;
};
export type ProjectEmailTemplateRead = {
  id: number;
  project: ProjectSimpleRead;
  email_template: EmailTemplateRead;
  template_type: TemplateTypeEnum;
};
export type MapCoordinateCreateOrUpdateRequest = {
  latitude: string;
  longitude: string;
};
export type ProjectCreateRequest = {
  code: string;
  name: string;
  description?: string;
  client_id?: number | null;
  start_date?: string | null;
  budget?: string;
  address?: AddressCreateRequest;
  map_coordinate?: MapCoordinateCreateOrUpdateRequest;
  notes?: string;
};
export type IntervenantUpdateRequest = {
  user: UserUpdateRequest;
  role: RoleEnum;
};
export type ProjectStaffUpdateRequest = {
  role?: string;
  supervisor_id?: number | null;
};
export type EmailTemplateUpdateRequest = {

  /** Template name for internal reference */
  name: string;

  /** Subject template with placeholders */
  subject_template: string;

  /** Customizable header content with placeholders */
  header_template?: string | null;

  /** Customizable body content with placeholders */
  body_template: string;

  /** Customizable footer content with placeholders */
  footer_template?: string | null;
};
export type ProjectEmailTemplateUpdateRequest = {
  email_template: EmailTemplateUpdateRequest;
};
export type ProjectUpdateRequest = {
  code: string;
  name: string;
  description?: string;
  start_date?: string | null;
  budget?: string;
  address: AddressCreateRequest;
  map_coordinate: MapCoordinateCreateOrUpdateRequest;
  notes?: string;
  notification_frequency?: number | null;
  max_notifications?: number | null;
};
export type SetasswordRequest = {};
export type SetasswordRequestWrite = {
  new_password: string;
  uid: string;
  token: string;
};
export type ProjectSubcontractor = {
  code: string;
  name: string;
  description?: string;
  manager?: number | null;
};
export type ProjectSubcontractorRead = {
  id: number;
  code: string;
  name: string;
  description?: string;
  client: ClientSimpleRead;
  map_coordinate: MapCoordinate;
  address: AddressRead;
  manager?: number | null;
  created_at: string;
  updated_at: string;
};
export type PaginatedProjectSubcontractor = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ProjectSubcontractor[];
};
export type PaginatedProjectSubcontractorRead = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ProjectSubcontractorRead[];
};
export type Subcontractor = {
  name: string;
  siren_number: string;
  address: Address;
  contact_email: string;
  phone_number: string;
  is_active?: boolean;
};
export type SubcontractorRead = {
  id: number;
  name: string;
  siren_number: string;
  address: AddressRead;
  contact_email: string;
  clients: ClientRead[];
  phone_number: string;
  owner: CreatedByRead;
  is_active?: boolean;
  lots: LotSimpleRead[];
  created_by: CreatedByRead;
  created_at: string;
  updated_at: string;
};
export type PaginatedSubcontractort = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Subcontractor[];
};
export type PaginatedSubcontractortRead = {
  count: number;
  next: string | null;
  previous: string | null;
  results: SubcontractorRead[];
};
export type SubcontractorOwnerCreateRequest = {
  user: UserCreateRequest;
};
export type SubcontractorOwnerCreateRequestWrite = {
  user: UserCreateRequestWrite;
};
export type SubcontractorOwnerUpdateRequest = {
  user: UserUpdateRequest;
};
export type SubcontractorStaff = {};
export type SubcontractorStaffRead = {
  id: number;
  user: UserRead;
  created_by: CreatedByRead;
  created_at: string;
  updated_at: string;
};
export type PaginatedSubcontractorStaff = {
  count: number;
  next: string | null;
  previous: string | null;
  results: SubcontractorStaff[];
};
export type PaginatedSubcontractorStaffRead = {
  count: number;
  next: string | null;
  previous: string | null;
  results: SubcontractorStaffRead[];
};
export type SubcontractorStaffCreateRequest = {
  user: UserCreateRequest;
};
export type SubcontractorStaffCreateRequestWrite = {
  user: UserCreateRequestWrite;
};
export type SubcontractorCreateRequest = {
  name: string;
  siren_number: string;
  address: AddressCreateRequest;
  contact_email: string;
  phone_number: string;
  is_active?: boolean;
  lots_ids?: number[] | null;
  client_id?: number | null;
};
export type PatchedSubcontractorStaffUpdateRequest = {
  user?: UserUpdateRequest;
};
export type SubcontractorUpdateRequest = {
  name: string;
  siren_number: string;
  address: AddressCreateRequest;
  contact_email: string;
  phone_number: string;
  is_active?: boolean;
  lots_ids?: number[] | null;
};
export type SuiviAdministrativeStepComment = {

  /** The content of the comment. */
  comment: string;

  /** Optional status update for the step when this comment is created.

    * `not_started` - Not Started
    * `in_progress` - In Progress
    * `completed` - Completed
    * `on_hold` - On Hold
    * `canceled` - Canceled
    * `rejected` - Rejected
    * `temporarily_done` - Temporarily Done */
  status?: (Status3BfEnum | BlankEnum | NullEnum) | null;
  created_by?: number | null;
};
export type SuiviAdministrativeStepCommentRead = {
  id: number;

  /** The content of the comment. */
  comment: string;
  document: DocumentRead;

  /** Optional status update for the step when this comment is created.

    * `not_started` - Not Started
    * `in_progress` - In Progress
    * `completed` - Completed
    * `on_hold` - On Hold
    * `canceled` - Canceled
    * `rejected` - Rejected
    * `temporarily_done` - Temporarily Done */
  status?: (Status3BfEnum | BlankEnum | NullEnum) | null;
  created_by?: number | null;
  created_at: string;
};
export type PaginatedSuiviAdministrativeStepComment = {
  count: number;
  next: string | null;
  previous: string | null;
  results: SuiviAdministrativeStepComment[];
};
export type PaginatedSuiviAdministrativeStepCommentRead = {
  count: number;
  next: string | null;
  previous: string | null;
  results: SuiviAdministrativeStepCommentRead[];
};
export type PatchedSuiviAdministrativeStepUpdateRequest = {

  /** Optional status to update for the step.

    * `not_started` - Not Started
    * `in_progress` - In Progress
    * `completed` - Completed
    * `on_hold` - On Hold
    * `canceled` - Canceled
    * `rejected` - Rejected
    * `temporarily_done` - Temporarily Done */
  status?: Status3BfEnum;

  /** Number of days, must be a positive integer. */
  nbr_of_days?: number;
};
export type SuiviAdministrativeStepCommentCreateRequest = {

  /** ID of the step to comment on. */
  step_id: number;

  /** Text content of the comment. */
  comment: string;

  /** The file to be uploaded. */
  document_file?: Blob;

  /** Optional status to update for the step.

    * `not_started` - Not Started
    * `in_progress` - In Progress
    * `completed` - Completed
    * `on_hold` - On Hold
    * `canceled` - Canceled
    * `rejected` - Rejected
    * `temporarily_done` - Temporarily Done */
  status?: Status3BfEnum;
};
export type PatchedTravailSupplementaireUpdateRequest = {
  amount?: string;
};
export type TravailSupplementaireCreateRequest = {
  amount: string;
};
export type TravailSupplementaireCreateRequestWrite = {
  finance_enterprise_id: number;
  amount: string;
};
export type UserChangePasswordRequest = {
  old_password: string;
  new_password: string;
};
export type UserEmailChangeConfirmRequest = {
  token: string;
};
export type UserEmailChangeRequestRequest = {
  new_email: string;
  redirect_uri: string;
};
export type UserEmailChangeRequestRequestWrite = {
  new_email: string;
  password: string;
  redirect_uri: string;
};
export type PatchedUserProfileUpdateRequest = {
  first_name?: string;
  last_name?: string;
};
export type AvatarUpdateRequest = {
  avatar: Blob;
};
export const {
  useSubcontractorsOwnerDeleteDestroyMutation,
  useAdminStaffRetrieveQuery,
  useAdminStaffRetrieve2Query,
  useAdminStaffCreateCreateMutation,
  useAdminStaffUpdatePartialUpdateMutation,
  useAdminUsersDeleteDestroyMutation,
  useCategoriesListQuery,
  useCategoriesRetrieveQuery,
  useCategoryDeleteMutation,
  useCategoryUpdateMutation,
  useCategoryCreateMutation,
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
  useGetDocumentDetailQuery,
  useGetDocumentHistoryQuery,
  useDocumentDiffusionsListQuery,
  useDocumentDiffusionDetailQuery,
  useDocumentDiffusionCommentsListQuery,
  useDocumentDiffusionDeleteMutation,
  useDocumentDiffusionDocumentDeleteMutation,
  useDocumentDiffusionDiffuseMutation,
  useDocumentDiffusionUpdateMutation,
  useDiffusionIntervenantCommentCreateMutation,
  useDocumentDiffusionUploadMutation,
  useDocumentDiffusionConfigByProjectListQuery,
  useDocumentDiffusionConfigDetailQuery,
  useDocumentDiffusionConfigUpdateMutation,
  useDocumentDiffusionCreateMutation,
  useRetrieveFinanceEnterpriseByIdQuery,
  useListFinanceSituationsQuery,
  useListTravailSupplementaireQuery,
  useUpdateFinanceEnterpriseMutation,
  useRetrieveFinanceSituationQuery,
  useDeleteFinanceSituationMutation,
  useUpdateFinanceSituationMutation,
  useCreateFinanceSituationMutation,
  useRetrieveFinanceByIdQuery,
  useListProjectLotFinanceQuery,
  useGetFolderDetailQuery,
  useListProjectIntervenantProjectQuery,
  useGetIntervenantProjectDetailQuery,
  useIntervenantRolesRetrieveQuery,
  useLocalisationsListQuery,
  useLocalisationDetailQuery,
  useLocalisationsDeleteDestroyMutation,
  useLocalisationUpdateMutation,
  useLocalisationCreateMutation,
  useLoginCreateMutation,
  useLogoutCreateMutation,
  useLotsRetrieveQuery,
  useLotsRetrieve2Query,
  useLotsCreateCreateMutation,
  useLotsDeleteDestroyMutation,
  useLotsUpdateUpdateMutation,
  useGetInAppNotificationsListQuery,
  useGetInAppNotificationDetailQuery,
  useMarkNotificationAsReadMutation,
  usePasswordConfirmCreateMutation,
  usePasswordResetCreateMutation,
  usePhoneNumbersRetrieveQuery,
  usePhoneNumbersDeleteDestroyMutation,
  usePhoneNumbersUpdateUpdateMutation,
  useProductListQuery,
  useProductDetailQuery,
  useProductDeleteMutation,
  useProductUpdateMutation,
  useProductCreateMutation,
  useProductMediaDetailQuery,
  useProductMediaDeleteMutation,
  useProductMediaCreateMutation,
  useProjectLotsRetrieveQuery,
  useProjectLotsDeleteDestroyMutation,
  useProjectLotsSubcontractorDevisRetrieveQuery,
  useProjectLotsSubcontractorsRetrieve2Query,
  useProjectLotsSubcontractorsAssignCreateMutation,
  useProjectLotsUpdateStatusUpdateMutation,
  useUploadDevisBySubconstactorMutation,
  useProjectLotsUploadDocumentCreateMutation,
  useProjectLotsCreateCreateMutation,
  useProjectLotsDocumentsDeleteDestroyMutation,
  useProjectLotsDocumentsUpdateCreateMutation,
  useProjectLotsSubcontractorsRetrieveQuery,
  useProjectLotsSubcontractorsRemoveDestroyMutation,
  useUpdateProjectLotSubcontractorStatusMutation,
  useProjectLotsSubcontractorsDocumentsDeleteDevisDestroyMutation,
  useProjectLotsSubcontractorsDocumentsUploadDevisCreateMutation,
  useProjectsRetrieveQuery,
  useProjectsRetrieve2Query,
  useAssignProjectStaffMutation,
  useProjectIntervenantListQuery,
  useProjectIntervenantCreateMutation,
  useProjectsLotsRetrieveQuery,
  useListProjectStaffQuery,
  useProjectsStaffReorderUpdateMutation,
  useGetProjectStaffTreeQuery,
  useListSuiviAdministrativeQuery,
  useListSuiviAdministrativeIntervenantQuery,
  useProjectsTemplatesListQuery,
  useProjectsCreateCreateMutation,
  useProjectsDeleteDestroyMutation,
  useProjectIntervenantDetailQuery,
  useProjectIntervenantDeleteMutation,
  useProjectIntervenantUpdateMutation,
  useGetProjectStaffByIdQuery,
  useRemoveProjectStaffByIdMutation,
  useUpdateProjectStaffByIdMutation,
  useProjectsTemplatesRetrieveQuery,
  useProjectsTemplatesResetCreateMutation,
  useProjectsTemplatesUpdateUpdateMutation,
  useProjectsUpdateUpdateMutation,
  useSetPasswordCreateMutation,
  useListProjectSubcontractorQuery,
  useGetSubcontractorProjectDetailQuery,
  useSubcontractorsRetrieveQuery,
  useSubcontractorsRetrieve2Query,
  useSubcontractorsOwnerRetrieveQuery,
  useSubcontractorsOwnerAssignUpdateMutation,
  useSubcontractorsOwnerUpdateUpdateMutation,
  useSubcontractorsStaffRetrieve2Query,
  useSubcontractorsStaffCreateCreateMutation,
  useSubcontractorsCreateCreateMutation,
  useSubcontractorsDeleteDestroyMutation,
  useGetSubcontractorStaffListQuery,
  useSubcontractorsStaffRetrieveQuery,
  useSubcontractorsStaffDeleteDestroyMutation,
  useSubcontractorsStaffUpdatePartialUpdateMutation,
  useCreateSubcontractorBySubcontractorUserMutation,
  useSubcontractorsUpdateUpdateMutation,
  useRetrieveSuiviAdministrativeDetailQuery,
  useRetrieveSuiviAdministrativeDetailIntervenantQuery,
  useRetrieveSuiviAdministrativeStepDetailQuery,
  useListSuiviAdministrativeStepCommentsQuery,
  useUploadSuiviAdministrativeStepDocumentMutation,
  useUpdateSuiviAdministrativeStepMutation,
  useAddSuiviAdministrativeStepCommentMutation,
  useDeleteSuiviAdministrativeStepDocumentMutation,
  useUpdateSuiviAdministrativeStepDocumentMutation,
  useTokenRefreshCreateMutation,
  useDeleteTravailSupplementaireMutation,
  useUpdateTravailSupplementaireMutation,
  useCreateTravailSupplementaireMutation,
  useUserChangePasswordCreateMutation,
  useUserConfirmEmailChangeCreateMutation,
  useUserProfileRetrieveQuery,
  useUserRequestChangeEmailCreateMutation,
  useUserUpdatePartialUpdateMutation,
  useUserUpdateAvatarCreateMutation,
} = injectedRtkApi;
