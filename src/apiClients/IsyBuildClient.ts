// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import {createApi} from '@reduxjs/toolkit/query/react'

import {baseQueryWithReauth} from "@/apiClients/helper/baseQueryWithReauth";

// initialize an empty api service that we'll inject endpoints into later as needed
export const IsyBuildClient = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
})
