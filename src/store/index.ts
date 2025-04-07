// Third-party Imports
import {configureStore} from '@reduxjs/toolkit'

import {IsyBuildClient} from "@/apiClients/IsyBuildClient";
import stepReducer from './slices/stepSlice';

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [IsyBuildClient.reducerPath]: IsyBuildClient.reducer,
    steps: stepReducer,
  },

  middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false}).concat(IsyBuildClient.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
