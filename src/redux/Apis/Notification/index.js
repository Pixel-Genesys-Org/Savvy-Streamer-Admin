import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../configs/env";
import { extractData } from "../../../utils/storage";

export const notificationApi = createApi({
    reducerPath: 'notificationApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/notification/`,
        prepareHeaders: (headers) => {
            let token = extractData("access_token")
            if (token) headers.set("authorization", `Bearer ${token}`)
            return headers
        }
    }),
    tagTypes: ['Notifications'],
    endpoints: (builder) => ({
        getNotifications: builder.query({
            query: (params) => ({
                url: `get`,
                method: "GET",
                params
            }),
            providesTags: ['Notifications'],
        }),
    }),
})

export const {
    useGetNotificationsQuery,
} = notificationApi

