import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../configs/env";
import { extractData } from "../../../utils/storage";

export const generalApi = createApi({
    reducerPath: 'generalApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/general/`,
        prepareHeaders: (headers) => {
            let token = extractData("access_token")
            if (token) headers.set("authorization", `Bearer ${token}`)
            return headers
        }
    }),
    endpoints: (builder) => ({
        getDashboard: builder.query({
            query: (params) => ({
                url: `get-dashboard`,
                method: "GET",
                params
            }),
            keepUnusedDataFor: 0,
        }),
    }),
})

export const {
    useGetDashboardQuery,
} = generalApi