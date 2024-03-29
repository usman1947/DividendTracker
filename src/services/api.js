import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { findIndex } from 'lodash'
import { setIsLoading, setError } from 'services/app-slice'

const API_URL = process.env.REACT_APP_API_URL
function getHeaders() {
    return { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
}

export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['StocksData', 'Holdings'],
    baseQuery: fetchBaseQuery({
        baseUrl: '',
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        getSearchStock: builder.query({
            query: (searchString) => ({
                url: `${API_URL}/search?symbol=${searchString}`,
                headers: getHeaders(),
            }),
            providesTags: ['Stocks'],
            transformResponse: (response) => response.quotes,
        }),
        getStocksData: builder.query({
            //uses All origins pass through proxy to access yahoo finance api
            query: (tickers) => ({
                url: `https://api.allorigins.win/raw?url=${encodeURIComponent(
                    `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${tickers}`
                )}`,
                providesTags: ['StocksData'],
            }),
            transformResponse: (response) => response.quoteResponse.result,
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                dispatch(setIsLoading(true))
                try {
                    await queryFulfilled
                } catch (e) {
                    dispatch(setError('Failed to get stocks data'))
                } finally {
                    dispatch(setIsLoading(false))
                }
            },
        }),
        getAllHoldings: builder.query({
            query: () => ({
                url: `${API_URL}/holdings`,
                headers: getHeaders(),
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                dispatch(setIsLoading(true))
                try {
                    await queryFulfilled
                } catch (e) {
                    dispatch(setError(e.error.data.error))
                } finally {
                    dispatch(setIsLoading(false))
                }
            },
            providesTags: ['Holdings'],
        }),
        addHolding: builder.mutation({
            query: (stocks) => ({
                url: `${API_URL}/addHoldings`,
                method: 'POST',
                body: stocks,
                headers: getHeaders(),
            }),
            invalidatesTags: ['Holdings'],
            async onQueryStarted(query, { dispatch, queryFulfilled }) {
                dispatch(setIsLoading(true))
                try {
                    await queryFulfilled
                } catch (error) {
                    dispatch(setError('Something went wrong'))
                } finally {
                    dispatch(setIsLoading(false))
                }
            },
        }),
        deleteHolding: builder.mutation({
            query: (id) => ({
                url: `${API_URL}/holding/${id}`,
                method: 'DELETE',
                headers: getHeaders(),
            }),
            invalidatesTags: ['Holdings'],
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                let patchResult = dispatch(
                    api.util.updateQueryData(
                        'getAllHoldings',
                        undefined,
                        (draft) => {
                            const index = findIndex(draft, { _id: id })
                            draft.splice(index, 1)
                        }
                    )
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
        }),
        updateHolding: builder.mutation({
            query: ({ id, body }) => ({
                url: `${API_URL}/holding/${id}`,
                method: 'PUT',
                body: body,
                headers: getHeaders(),
            }),
            async onQueryStarted(
                { id, showLoading },
                { dispatch, queryFulfilled }
            ) {
                showLoading && dispatch(setIsLoading(true))
                try {
                    const response = await queryFulfilled
                    dispatch(
                        api.util.updateQueryData(
                            'getAllHoldings',
                            undefined,
                            (draft) => {
                                let oldHolding = draft.find((d) => d._id === id)
                                Object.assign(oldHolding, response.data)
                            }
                        )
                    )
                } catch {
                    dispatch(setError('Something went wrong'))
                } finally {
                    showLoading && dispatch(setIsLoading(false))
                }
            },
        }),
    }),
})

export const {
    useLazyGetSearchStockQuery,
    useLazyGetStocksDataQuery,
    useGetAllHoldingsQuery,
    useAddHoldingMutation,
    useDeleteHoldingMutation,
    useUpdateHoldingMutation,
} = api
