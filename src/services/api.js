import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { findIndex } from 'lodash'

const API_URL = process.env.REACT_APP_API_URL

export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['StocksData', 'Holdings'],
    baseQuery: fetchBaseQuery({ 
        baseUrl: '',
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
                url: `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${tickers}`)}`,
                providesTags:['StocksData']
            }),
            transformResponse: (response) => response.quoteResponse.result,
        }),
        getAllHoldings: builder.query({
            query: () => `${API_URL}/holdings`,
            providesTags: ['Holdings'],
        }),
        addHolding: builder.mutation({
            query: (stocks) => ({
                url: `${API_URL}/addHoldings`,
                method: 'POST',
                body: stocks,
            }),
            invalidatesTags: ['Holdings']
        }),
        deleteHolding: builder.mutation({
            query: (id) => ({
                url: `${API_URL}/holding/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                let patchResult = dispatch(
                    api.util.updateQueryData('getAllHoldings', undefined, (draft) => {
                        const index = findIndex(draft, { _id: id });
                        draft.splice(index, 1);
                    })
                )
                try {
                    await queryFulfilled
                } 
                catch {
                    patchResult.undo()
                }
            },
        }),
        updateHolding: builder.mutation({
            query: ({id, body}) => ({
                url: `${API_URL}/holding/${id}`,
                method: 'PUT',
                body: body
            }),
            async onQueryStarted({id}, { dispatch, queryFulfilled }) {
                try {
                    const response = await queryFulfilled
                    dispatch(
                        api.util.updateQueryData('getAllHoldings', undefined, (draft) => {
                            let oldHolding = draft.find(d => d._id === id)
                            Object.assign(oldHolding, response.data)
                        })
                    )
                } 
                catch {
                    //TODO error management
                }
            },
        })
    }),
})

export const { 
    useLazyGetSearchStockQuery,
    useLazyGetStocksDataQuery,
    useGetAllHoldingsQuery,
    useAddHoldingMutation,
    useDeleteHoldingMutation,
    useUpdateHoldingMutation
} = api;