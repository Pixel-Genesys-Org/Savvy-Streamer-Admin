import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../configs/env";
import { extractData } from "../../../utils/storage";

export const disputeApi = createApi({
    reducerPath: 'disputeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/dispute/`,
        prepareHeaders: (headers) => {
            let token = extractData("access_token")
            if (token) headers.set("authorization", `Bearer ${token}`)
            return headers
        }
    }),
    tagTypes: ['Disputes'],
    endpoints: (builder) => ({
        getDisputes: builder.query({
            query: (params) => ({
                url: `get`,
                method: "GET",
                params
            }),
            providesTags: ['Disputes'],
        }),
        getDisputeById: builder.query({
            query: (id) => ({
                url: `get/${id}`,
                method: "GET",
            }),
        }),
    }),
})

export const {
    useGetDisputesQuery,
    useGetDisputeByIdQuery
} = disputeApi