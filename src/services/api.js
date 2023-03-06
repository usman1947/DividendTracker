import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { addStocksData } from 'services/stocksDataSlice'

const API_URL = process.env.REACT_APP_API_URL

export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['StocksData', 'Holdings'],
    baseQuery: fetchBaseQuery({ 
        baseUrl: API_URL,
    }),
    endpoints: (builder) => ({
        getSearchStock: builder.query({
            query: (searchString) => ({
                url: `${API_URL}/search?symbol=${searchString}`,
            }),
            providesTags:['Stocks'],
            transformResponse: (response) => response.quotes
        }),
        getStocksData: builder.query({
            //uses All origins pass through proxy to access yahoo finance api
            query: (tickers) => ({
                url: `https://api.allorigins.win/get?url=${encodeURIComponent(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${tickers}`)}`,
                providesTags:['StocksData']
            }),
            transformResponse: (response) => JSON.parse(response.contents).quoteResponse.result,
            async onQueryStarted({tickers}, { dispatch, queryFulfilled }) {
                try {
                    const { data: response } = await queryFulfilled
				    dispatch(addStocksData(response))
                } catch {
                    //TODO error management
                }
            },
        }),
        getAllHoldings: builder.query({
            query: () => ({
                url: `${API_URL}/holdings`,
            }),
            providesTags:['Holdings']
        }),
        addHolding: builder.mutation({
            query: (stock) => ({
                url: `${API_URL}/addHolding`,
                method: 'POST',
                body: stock,
            }),
            invalidatesTags: ['Holdings']
        })
    }),
})

export const { 
    useLazyGetSearchStockQuery,
    useLazyGetStocksDataQuery,
    useGetAllHoldingsQuery,
    useAddHoldingMutation
} = api;