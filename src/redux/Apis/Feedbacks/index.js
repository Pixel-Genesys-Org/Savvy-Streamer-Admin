import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../configs/env";
import { extractData } from "../../../utils/storage";

export const feedbackApi = createApi({
    reducerPath: 'feedbackApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/feedback/`,
        prepareHeaders: (headers) => {
            let token = extractData("access_token")
            if (token) headers.set("authorization", `Bearer ${token}`)
            return headers
        }
    }),
    tagTypes: ['Feedbacks'],
    endpoints: (builder) => ({
        getFeedbacks: builder.query({
            query: (params) => ({
                url: `get`,
                method: "GET",
                params
            }),
            providesTags: ['Feedbacks'],
            keepUnusedDataFor: 0,
        }),
        getFeedbackById: builder.query({
            query: (id) => ({
                url: `get/${id}`,
                method: "GET",
            }),
            keepUnusedDataFor: 0,
        })
    }),
})

export const {
    useGetFeedbacksQuery,
    useGetFeedbackByIdQuery
} = feedbackApi