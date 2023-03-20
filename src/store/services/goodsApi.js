import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const goodsApi = createApi({
  reducerPath: "goodsApi",
  tagTypes: ["Products", "Cart", "WishList", "Compare"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  endpoints: (build) => ({
    getGoods: build.query({
      query: (categorySlug) => ({
        url: `goods`,
        params: {
          categorySlug: categorySlug,
        },
      }),
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
          categorySlug: category,
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
              ...result.map(({ id }) => ({ type: "Cart", id })),
              { type: "Cart", id: "LIST" },
            ]
          : [{ type: "Cart", id: "LIST" }],
    }),
    addProductInCart: build.mutation({
      query: (body) => ({
        url: "cart",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),
    deleteProductFromCart: build.mutation({
      query: (id) => ({
        url: `cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
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
              ...result.map(({ id }) => ({ type: "WishList", id })),
              { type: "WishList", id: "LIST" },
            ]
          : [{ type: "WishList", id: "LIST" }],
    }),
    addInWishList: build.mutation({
      query: (body) => ({
        url: "wishList",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "WishList", id: "LIST" }],
    }),
    deleteFromWishList: build.mutation({
      query: (id) => ({
        url: `wishList/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "WishList", id: "LIST" }],
    }),

    getCompare: build.query({
      query: () => `compare`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Compare", id })),
              { type: "Compare", id: "LIST" },
            ]
          : [{ type: "Compare", id: "LIST" }],
    }),
    addInCompare: build.mutation({
      query: (body) => ({
        url: "compare",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Compare", id: "LIST" }],
    }),
    deleteFromCompare: build.mutation({
      query: (id) => ({
        url: `compare/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Compare", id: "LIST" }],
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
