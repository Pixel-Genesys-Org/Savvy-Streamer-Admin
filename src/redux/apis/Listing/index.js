import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../configs/env";
import { extractData } from "../../../utils/storage";

export const listingApi = createApi({
    reducerPath: 'listingApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/`,
        prepareHeaders: (headers) => {
            let token = extractData("access_token")
            if (token) headers.set("authorization", `Bearer ${token}`)
            return headers
        }
    }),
    endpoints: (builder) => ({
    }),
})

export const {
} = listingApi

