import { apiSlice } from '@/redux/api/apiSlice'

export const personalPostsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPersonalPosts: builder.query({
            query: ({ page, limit, q, author_email }) => {
                let url = `/api/posts/v1/personal?page=${page || 1}&limit=${limit || 10}&author_email=${author_email}`
                if (q) {
                    url += `&q=${encodeURIComponent(q)}`
                }
                return url
            },
            providesTags: [{ type: 'tagTypePosts', id: 'LIST' }],
        }),
        addPersonalPost: builder.mutation({
            query: (newPost) => ({
                url: '/api/posts/v1/personal',
                method: 'POST',
                body: newPost,
            }),
            invalidatesTags: [{ type: 'tagTypePosts' }],
        }),
        updatePersonalPost: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/api/posts/v1/personal`,
                method: 'PUT',
                body: { id, ...data },
            }),
            invalidatesTags: [{ type: 'tagTypePosts' }],
        }),
        deletePersonalPost: builder.mutation({
            query: ({ id, 'author-email': authorEmail }) => ({
                url: `/api/posts/v1/personal`,
                method: 'DELETE',
                body: { id, 'author-email': authorEmail },
            }),
            invalidatesTags: [{ type: 'tagTypePosts' }],
        }),
        bulkUpdatePersonalPosts: builder.mutation({
            query: (bulkData) => ({
                url: `/api/posts/v1/personal?bulk=true`,
                method: 'PUT',
                body: bulkData,
            }),
            invalidatesTags: [{ type: 'tagTypePosts' }],
        }),
        bulkDeletePersonalPosts: builder.mutation({
            query: (bulkData) => ({
                url: `/api/posts/v1/personal?bulk=true`,
                method: 'DELETE',
                body: bulkData,
            }),
            invalidatesTags: [{ type: 'tagTypePosts' }],
        }),
    }),
})

export const {
    useGetPersonalPostsQuery,
    useAddPersonalPostMutation,
    useUpdatePersonalPostMutation,
    useDeletePersonalPostMutation,
    useBulkUpdatePersonalPostsMutation,
    useBulkDeletePersonalPostsMutation,
} = personalPostsApi
