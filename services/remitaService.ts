import { ApiSlice } from "./Api";

const remitaSlice = ApiSlice.enhanceEndpoints({
  addTagTypes: ["remita-transaction" as const],
}).injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: "RemPayment/categories",
      }),
    }),
    getBillersByCategory: builder.query({
      query: ({ categoryId }) => ({
        url: "RemPayment/category/biller",
        params: {
          categoryId,
        },
      }),
      transformResponse: (apiResponse: Record<string, any>) => {
        const data = apiResponse.data.map((e: Record<string, any>) => ({
          ...e,
          value: e?.billerId,
          label: e?.billerName,
        }));
        return data;
      },
    }),
    getBillers: builder.query({
      query: () => ({
        url: "RemPayment/billers",
      }),
      transformResponse: (apiResponse: Record<string, any>) => {
        const data = apiResponse.data.map((e: Record<string, any>) => ({
          ...e,
          value: e?.billerId,
          label: e?.billerName,
        }));
        return data;
      },
    }),
    getBillerProducts: builder.query({
      query: ({ billerId }) => ({
        url: "RemPayment/biller/products",
        params: {
          billerId,
        },
      }),
      transformResponse: (apiResponse: Record<string, any>) => {
        const data = apiResponse.data.products.map(
          (e: Record<string, any>) => ({
            ...e,
            value: e?.billPaymentProductId,
            label: e?.billPaymentProductName,
          })
        );
        return { ...apiResponse.data, products: data };
      },
    }),
    getTransactionHistory: builder.query({
      query: ({ page, type }) => ({
        url: "RemPayment/transaction/history",
        params: {
          limit: 5,
          page,
          type,
        },
      }),
      providesTags: ["remita-transaction"],
    }),
    getSingleTransaction: builder.query({
      query: ({ reference }) => ({
        url: "RemPayment/transaction/single",
        params: {
          reference,
        },
      }),
    }),
    makePayment: builder.mutation({
      query: (body) => ({
        url: "rempayment/make/payment",
        body,
        method: "POST",
      }),
      invalidatesTags: ["remita-transaction"],
    }),
    validateProduct: builder.mutation({
      query: (body) => ({
        url: "RemPayment/validate-customer",
        body,
        method: "POST",
      }),
      invalidatesTags: ["remita-transaction"],
    }),
  }),
});

export const {
  useGetBillerProductsQuery,
  useGetBillersByCategoryQuery,
  useGetBillersQuery,
  useGetCategoriesQuery,
  useGetSingleTransactionQuery,
  useGetTransactionHistoryQuery,
  useLazyGetBillerProductsQuery,
  useLazyGetBillersByCategoryQuery,
  useLazyGetBillersQuery,
  useLazyGetCategoriesQuery,
  useLazyGetSingleTransactionQuery,
  useLazyGetTransactionHistoryQuery,
  useMakePaymentMutation,
  useValidateProductMutation
} = remitaSlice;
