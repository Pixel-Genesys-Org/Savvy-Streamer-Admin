import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../configs/env";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/auth/` }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: `login`,
                method: "POST",
                body: { ...body, source: "admin" }
            }),
            transformResponse: (response, meta) => {
                meta.show_success = true
                meta.message = null
                return response;
            }
        }),
    }),
})

export const {
    useLoginMutation,
} = authApi
