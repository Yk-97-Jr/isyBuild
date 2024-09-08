// apiClients/baseQueryWithReauth.ts

import type {BaseQueryFn, FetchArgs, FetchBaseQueryError} from '@reduxjs/toolkit/query';

import {fetchBaseQuery} from '@reduxjs/toolkit/query';

import Cookies from "js-cookie";

import {refreshAccessToken} from "@/apiClients/helper/tokenRefreshHelper";
import {verifyToken} from "@/utils/verifyToken";


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const baseQuery = fetchBaseQuery({baseUrl: baseUrl});

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  // Identify the type of query or mutation
  const skipTokenRefreshFor = ['/login/']; // specify the login endpoints
  const requestUrl = typeof args === 'string' ? args : args.url;

  // If the request URL matches the login endpoint, skip token handling
  if (skipTokenRefreshFor.includes(requestUrl)) {

    return await baseQuery(args, api, extraOptions);
  }

  const accessToken = Cookies.get('access_token');

  if (accessToken) {
    (args as any).headers = {
      ...(args as any).headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }

  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = Cookies.get('refresh_token');

    if (refreshToken) {
      const refreshResult = await refreshAccessToken(refreshToken);

      if (refreshResult) {
        const decodedAccessToken = verifyToken(refreshResult.access);
        const decodedRefreshToken = verifyToken(refreshResult.refresh);

        const accessExpiryDate = new Date(decodedAccessToken.exp * 1000);
        const refreshExpiryDate = new Date(decodedRefreshToken.exp * 1000);

        Cookies.set('access_token', refreshResult.access, {expires: accessExpiryDate});
        Cookies.set('refresh_token', refreshResult.refresh, {expires: refreshExpiryDate});

        const retryAccessToken = Cookies.get('access_token');

        if (retryAccessToken) {
          (args as any).headers = {
            ...(args as any).headers,
            Authorization: `Bearer ${retryAccessToken}`,
          };
        }

        result = await baseQuery(args, api, extraOptions);
      } else {
        // Clear tokens and redirect to login
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        window.location.href = '/login';
      }
    } else {
      window.location.href = '/login';
    }
  }

  return result;
};
