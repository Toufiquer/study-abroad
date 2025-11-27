import { apiSlice } from '@/redux/api/apiSlice';

export const footerApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    // 1. CREATE: Add new footer settings
    createFooterSettings: builder.mutation({
      query: data => ({
        url: '/api/footer-settings',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['FooterSettings'],
    }),

    // 2. READ: Get footer settings
    getFooterSettings: builder.query({
      query: () => ({
        url: '/api/footer-settings',
        method: 'GET',
      }),
      providesTags: ['FooterSettings'],
    }),

    // 3. UPDATE: Update existing settings (using PATCH for partial update)
    // Arguments expected: { id: string, data: object }
    updateFooterSettings: builder.mutation({
      query: data => ({
        url: `/api/footer-settings`, // Assuming the API expects ID in URL
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['FooterSettings'],
    }),

    // 4. DELETE: Remove footer settings
    deleteFooterSettings: builder.mutation({
      query: id => ({
        url: `/api/footer-settings`,
        method: 'DELETE',
        body: { id: id },
      }),
      invalidatesTags: ['FooterSettings'],
    }),
  }),
});

export const { useCreateFooterSettingsMutation, useGetFooterSettingsQuery, useUpdateFooterSettingsMutation, useDeleteFooterSettingsMutation } = footerApi;
