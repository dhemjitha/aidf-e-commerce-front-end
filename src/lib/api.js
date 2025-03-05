import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_URL = "http://localhost:8000";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}/api/` }),
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
    }),
});

export const { useGetProductsQuery, useGetProductsByIdQuery, useCreateProductMutation } = api;