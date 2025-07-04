import type { IBook } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({
        // baseUrl: "http://localhost:5000/api",
        baseUrl: "https://library-management-api-eta.vercel.app/api",
    }),
    tagTypes: ['book', 'borrow'],
    endpoints: (builder) => ({
        // get books
        getBooks: builder.query({
            query: ({
                page = 1,
                limit = 10,
                sort = "desc",
                sortBy = "createdAt",
                filter = "" }) => `/books?page=${page}&limit=${limit}&sort=${sort}&sortBy=${sortBy}&filter=${filter}`,
            providesTags: ['book']
        }),

        // create a book
        createBook: builder.mutation({
            query: (bookData) => ({
                url: "/books",
                method: "POST",
                body: bookData
            }),
            invalidatesTags: ['book'],
        }),

        // getting a single book
        getBook: builder.query({
            query: (bookId) => ({
                url: `/books/${bookId}`,
                method: "GET",
            }),
        }),

        // updating a book
        updateBook: builder.mutation<IBook, { bookId: string, bookData: Partial<IBook> }>({
            query: ({ bookId, bookData }) => ({
                url: `/books/${bookId}`,
                method: "PATCH",
                body: bookData
            }),
            invalidatesTags: ['book']
        }),

        // deleting book
        deleteBook: builder.mutation({
            query: (bookId) => ({
                url: `/books/${bookId}`,
                method: "DELETE"
            }),
            invalidatesTags: ['book']
        }),

        // borrowing a book
        borrowBook: builder.mutation({
            query: (bookData) => ({
                url: "/borrow",
                method: "POST",
                body: bookData,
            }),
            invalidatesTags: ['borrow', 'book'],
        }),

        getBorrowSummary: builder.query({
            query: () => "/borrow",
            providesTags: ['borrow'],
        }),
    })
})

export const {
    useGetBooksQuery, useCreateBookMutation, useGetBookQuery, useUpdateBookMutation, useDeleteBookMutation, useBorrowBookMutation,
    useGetBorrowSummaryQuery } = baseApi;