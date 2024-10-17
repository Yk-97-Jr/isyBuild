// Third-party Imports
import {configureStore} from '@reduxjs/toolkit'

import {IsyBuildClient} from "@/apiClients/IsyBuildClient";


export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [IsyBuildClient.reducerPath]: IsyBuildClient.reducer,
  },

  middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false}).concat(IsyBuildClient.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
