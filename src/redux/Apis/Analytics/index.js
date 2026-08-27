import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../configs/env";
import { extractData } from "../../../utils/storage";

export const analyticsApi = createApi({
    reducerPath: 'analyticsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/analytics/`,
        prepareHeaders: (headers) => {
            let token = extractData("access_token")
            if (token) headers.set("authorization", `Bearer ${token}`)
            return headers
        }
    }),
    endpoints: (builder) => ({
        getAnalytics: builder.query({
            query: (params) => ({
                url: `get`,
                method: "GET",
                params
            }),
            keepUnusedDataFor: 0,
        })
    }),
})

export const {
    useGetAnalyticsQuery
} = analyticsApi