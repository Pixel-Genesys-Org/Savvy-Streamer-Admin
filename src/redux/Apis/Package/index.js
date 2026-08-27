import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../configs/env";
import { extractData } from "../../../utils/storage"

export const packageApi = createApi({
    reducerPath: 'packageApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/package/`,
        prepareHeaders: (headers) => {
            let token = extractData("access_token")
            if (token) headers.set("authorization", `Bearer ${token}`)
            return headers
        }
    }),
    tagTypes: ['Packages', 'PaymentLogs'],
    endpoints: (builder) => ({
        createPackage: builder.mutation({
            query: (body) => ({
                url: `create`,
                method: "POST",
                body
            }),
            invalidatesTags: ['Packages'],
        }),
        resendPackage: builder.mutation({
            query: (id) => ({
                url: `resend/${id}`,
                method: "POST",
            })
        }),
        deletePackage: builder.mutation({
            query: (id) => ({
                url: `delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Packages'],
        }),
        getPackages: builder.query({
            query: (params) => ({
                url: `get`,
                method: "GET",
                params
            }),
            providesTags: ['Packages'],
        }),
        getPaymentLogs: builder.query({
            query: (params) => ({
                url: `payment-logs`,
                method: "GET",
                params
            }),
            providesTags: ['PaymentLogs'],
        }),
    }),
})

export const {
    useCreatePackageMutation,
    useResendPackageMutation,
    useDeletePackageMutation,
    useGetPackagesQuery,
    useGetPaymentLogsQuery
} = packageApi

