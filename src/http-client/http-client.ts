import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query'

const API_KEY = import.meta.env.VITE_API_KEY

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://b0f179aa-a791-47b5-a7ca-5585ba9e3642.mock.pstmn.io/',
  prepareHeaders: (headers) => {
    headers.set('X-Api-Key', API_KEY)
    return headers
  },
})

export const httpClient: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  if (typeof args === 'string') {
    args = { url: args }
  }
  if (!args.method) {
    args.method = 'GET'
  }
  args.method = args.method.toUpperCase()

  return baseQuery(args, api, extraOptions)
}
