import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api"
    }),
    tagTypes: ['book'],
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: ({ page = 1, limit = 10 }) => `/books?page=${page}&limit=${limit}`,
        }),

        createBook: builder.mutation({
            query: (bookData) => ({
                url: "/books",
                method: "POST",
                body: bookData
            })
        })


    })
})

export const { useGetBooksQuery, useCreateBookMutation } = baseApi;