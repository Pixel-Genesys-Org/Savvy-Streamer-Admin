import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../configs/env";
import { extractData } from "../../../utils/storage";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/user/`,
        prepareHeaders: (headers) => {
            let token = extractData("access_token")
            if (token) headers.set("authorization", `Bearer ${token}`)
            return headers
        }
    }),
    tagTypes: ['Users', 'Reports'],
    endpoints: (builder) => ({
        handleStatus: builder.mutation({
            query: (body) => ({
                url: `handle-status/${body?.id}`,
                method: "PATCH",
                body: body?.payload
            }),
            invalidatesTags: ['Users'],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `delete/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Users'],
        }),
        getUsers: builder.query({
            query: (params) => ({
                url: `get`,
                method: "GET",
                params
            }),
            keepUnusedDataFor: 0,
            providesTags: ['Users'],
        }),
        getUserById: builder.query({
            query: (id) => ({
                url: `get/${id}`,
                method: "GET",
            }),
            keepUnusedDataFor: 0,
        }),
    }),
})

export const {
    useHandleStatusMutation,
    useDeleteUserMutation,
    useGetUsersQuery,
    useGetUserByIdQuery,
} = userApi