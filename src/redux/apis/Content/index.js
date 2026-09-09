import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../configs/env";
import { extractData } from "../../../utils/storage";

export const contentApi = createApi({
    reducerPath: 'contentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/content/`,
        prepareHeaders: (headers) => {
            let token = extractData("access_token")
            if (token) headers.set("authorization", `Bearer ${token}`)
            return headers
        }
    }),
    endpoints: (builder) => ({
        getContent: builder.query({
            query: (type) => ({
                url: `get/${type}`,
                method: "GET"
            }),
            keepUnusedDataFor: 0,
        }),
        updateContent: builder.mutation({
            query: (body) => ({
                url: `update`,
                method: "POST",
                body
            }),
        }),
    }),
})

export const {
    useGetContentQuery,
    useUpdateContentMutation
} = contentApi