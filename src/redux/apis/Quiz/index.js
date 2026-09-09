import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../configs/env";
import { extractData } from "../../../utils/storage"

export const quizApi = createApi({
    reducerPath: 'quizApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/quiz/`,
        prepareHeaders: (headers) => {
            let token = extractData("access_token")
            if (token) headers.set("authorization", `Bearer ${token}`)
            return headers
        }
    }),
    tagTypes: ['Quizes'],
    endpoints: (builder) => ({
        createQuiz: builder.mutation({
            query: (body) => ({
                url: `create`,
                method: "POST",
                body
            }),
            invalidatesTags: ['Quizes', 'ListQuizes'],
        }),
        updateQuiz: builder.mutation({
            query: (body) => ({
                url: `update/${body?.id}`,
                method: "PATCH",
                body: body?.payload
            }),
            invalidatesTags: ['Quizes', 'ListQuizes'],
        }),
        deleteQuiz: builder.mutation({
            query: (id) => ({
                url: `delete/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Quizes', 'ListQuizes'],
        }),
        getQuizes: builder.query({
            query: (params) => ({
                url: `get`,
                method: "GET",
                params
            }),
            providesTags: ['Quizes'],
        }),
        getQuizById: builder.query({
            query: (id) => ({
                url: `get/${id}`,
                method: "GET",
            }),
        }),
        listQuizes: builder.query({
            query: () => ({
                url: `list`,
                method: "GET",
            }),
            providesTags: ['ListQuizes'],
        }),
    }),
})

export const {
    useCreateQuizMutation,
    useUpdateQuizMutation,
    useDeleteQuizMutation,
    useGetQuizesQuery,
    useGetQuizByIdQuery,
    useListQuizesQuery
} = quizApi

