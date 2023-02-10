import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const goodsApi = createApi({
  reducerPath: "goodsApi",
  tagTypes: ["Products"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  endpoints: (build) => ({
    getGoods: build.query({
      query: () => `goods`,
    }),

    getFilteredAndSortedGoods: build.query({
      query: ({ sort, limit, page, brand = "", priceTo, priceFrom }) => ({
        url: `goods${brand}`,
        params: {
          _limit: limit,
          _sort: sort,
          _page: page,
          price_gte: priceFrom,
          price_lte: priceTo,
        },
      }),
      transformResponse: (response, meta) => ({
        response,
        totalCount: Number(meta.response.headers.get("X-Total-Count")),
      }),
    }),

    getCart: build.query({
      query: () => `cart`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Products", id })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),
    addProductInCart: build.mutation({
      query: (body) => ({
        url: "cart",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    deleteProductFromCart: build.mutation({
      query: (id) => ({
        url: `cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    changeProductQty: build.mutation({
      query: ({ id, ...body }) => ({
        url: `cart/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ({ id }) => [{ type: "Products", id }],
    }),
  }),
});

export const {
  useGetGoodsQuery,
  useGetFilteredAndSortedGoodsQuery,
  useGetCartQuery,
  useAddProductInCartMutation,
  useDeleteProductFromCartMutation,
  useChangeProductQtyMutation,
} = goodsApi;
