import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../configs/env";
import { extractData } from "../../../utils/storage"

export const appointmentsApi = createApi({
    reducerPath: 'betApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/bet/`,
        prepareHeaders: (headers) => {
            let token = extractData("access_token")
            if (token) headers.set("authorization", `Bearer ${token}`)
            return headers
        }
    }),
    tagTypes: ['Bets'],
    endpoints: (builder) => ({
        getAppointments: builder.query({
            query: (params) => ({
                url: `get`,
                method: "GET",
                params
            }),
            providesTags: ['Bets'],
        }),
        getAppointmentById: builder.query({
            query: (id) => ({
                url: `get/${id}`,
                method: "GET",
            }),
            providesTags: ['Bets'],
        }),
    }),
})

export const {
    useGetAppointmentsQuery,
    useGetAppointmentByIdQuery
} = appointmentsApi

