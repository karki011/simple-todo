// src/api.ts
import { createApi } from '@reduxjs/toolkit/query/react'
import { httpClient } from '../http-client'
import { RawTodo, RawUpdateTodoResponse } from './types'

export const todosApi = createApi({
  reducerPath: 'api',
  baseQuery: httpClient,
  endpoints: (builder) => ({
    getTodos: builder.query<RawTodo[], void>({
      query: () => 'get',
    }),

    updateTodo: builder.mutation<RawUpdateTodoResponse, { id: string; isComplete: boolean }>({
      query: ({ id, isComplete }) => ({
        url: `patch/${id}`,
        method: 'PATCH',
        body: { isComplete },
      }),
      onQueryStarted: async ({ id, isComplete }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          todosApi.util.updateQueryData('getTodos', undefined, (draft) => {
            const todo = draft.find((t) => t.id === id)
            if (todo) {
              todo.isComplete = isComplete
            }
          })
        )
        try {
          await queryFulfilled
        } catch (err) {
          patchResult.undo()
          console.error('Update failed, rolling back', err)
        }
      },
    }),
  }),
})

export const { useGetTodosQuery, useUpdateTodoMutation } = todosApi
