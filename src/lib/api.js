import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_URL = "https://aidf-e-commerce-back-end-production.up.railway.app";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/api/`, prepareHeaders: async (headers, { getState }) => {
            const token = await window?.Clerk?.session?.getToken();
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
        }
    }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => "products",
        }),
        getProductsById: builder.query({
            query: (id) => `products/${id}`,
        }),
        createProduct: builder.mutation({
            query: (product) => ({
                url: `products`,
                method: "POST",
                body: product,
            }),
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `products/${id}`,
                method: "DELETE",
            }),
        }),
        createBuying: builder.mutation({
            query: (buying) => ({
                url: "buyings",
                method: "POST",
                body: buying,
            })
        })
    }),
});

export const { useGetProductsQuery, useGetProductsByIdQuery, useCreateProductMutation, useDeleteProductMutation, useCreateBuyingMutation } = api;