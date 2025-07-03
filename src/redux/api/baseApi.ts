import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api"
    }),
    tagTypes: ['book'],
    endpoints: (builder) => ({
        // get books
        getBooks: builder.query({
            query: ({
                page = 1,
                limit = 10,
                sort = "desc",
                sortBy = "createdAt",
                filter = "" }) => `/books?page=${page}&limit=${limit}&sort=${sort}&sortBy=${sortBy}&filter=${filter}`,
        }),

        // create a book
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