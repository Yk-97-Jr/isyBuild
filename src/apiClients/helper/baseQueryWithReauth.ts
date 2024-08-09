// apiClients/baseQueryWithReauth.ts

import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { fetchBaseQuery } from '@reduxjs/toolkit/query';

import {refreshAccessToken} from "@/apiClients/helper/tokenRefreshHelper";




const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ;
const baseQuery = fetchBaseQuery({ baseUrl: baseUrl });

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  // Get the token from localStorage
  const accessToken = localStorage.getItem('access_token');

  // If there's an access token, add it to the headers
  if (accessToken) {
    (args as any).headers = {
      ...(args as any).headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }

  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    console.log("refreeeeeesh")

    // Try to get a new token
    const refreshToken = localStorage.getItem('refresh_token');

    console.log(refreshToken)

    if (refreshToken) {
      console.log(refreshToken)
      const refreshResult = await refreshAccessToken(refreshToken)

      console.log(refreshResult)

      if (refreshResult) {
        // Store the new tokens in localStorage
        localStorage.setItem('access_token', refreshResult.access);
        localStorage.setItem('refresh_token', refreshResult.refresh);

        // Retry the initial query with the new token
        const retryAccessToken = localStorage.getItem('access_token');

        if (retryAccessToken) {
          (args as any).headers = {
            ...(args as any).headers,
            Authorization: `Bearer ${retryAccessToken}`,
          };
        }

        result = await baseQuery(args, api, extraOptions);
      } else {
        // If refresh fails, remove tokens and redirect to login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        window.location.href = '/login';
      }
    } else {
      // If no refresh token is present, redirect to login
      window.location.href = '/login';
    }
  }

  return result;
};
