import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const goodsApi = createApi({
  reducerPath: "goodsApi",
  tagTypes: ["Products"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://194.58.109.209:3001/" }),
  endpoints: (build) => ({
    getGoods: build.query({
      query: () => `goods`,
    }),
    getFilteredAndSortedGoods: build.query({
      query: ({
        sort,
        limit,
        page,
        brand = "",
        priceTo,
        priceFrom,
        search,
        category,
      }) => ({
        url: `goods${brand}`,
        params: {
          _sort: sort,
          _limit: limit,
          _page: page,
          q: search,
          price_gte: priceFrom,
          price_lte: priceTo,
          slug: category,
        },
      }),
      transformResponse: (response, meta) => ({
        response,
        totalCount: Number(meta.response.headers.get("X-Total-Count")),
      }),
    }),
    getGood: build.query({
      query: (id) => `goods/${id}`,
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

    getWishList: build.query({
      query: () => `wishList`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Products", id })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),
    addInWishList: build.mutation({
      query: (body) => ({
        url: "wishList",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    deleteFromWishList: build.mutation({
      query: (id) => ({
        url: `wishList/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),

    getCompare: build.query({
      query: () => `compare`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Products", id })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),
    addInCompare: build.mutation({
      query: (body) => ({
        url: "compare",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    deleteFromCompare: build.mutation({
      query: (id) => ({
        url: `compare/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),

    addOrder: build.mutation({
      query: (body) => ({
        url: "orders",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetGoodsQuery,
  useGetGoodQuery,
  useGetFilteredAndSortedGoodsQuery,
  useGetCartQuery,
  useAddProductInCartMutation,
  useDeleteProductFromCartMutation,
  useGetWishListQuery,
  useGetCompareQuery,
  useAddInWishListMutation,
  useAddInCompareMutation,
  useDeleteFromWishListMutation,
  useDeleteFromCompareMutation,
  useChangeProductQtyMutation,
  useAddOrderMutation,
} = goodsApi;
