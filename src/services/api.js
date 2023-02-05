import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getLastBusinessDay } from 'util/Utility'
import { saveMarketData } from 'database/db';
import { addMarketData } from 'services/marketDataSlice'

//ALPHA ADVANTAGE
const _ALPHA_ADVANTAGE_ENDPOINT = 'https://www.alphavantage.co/query';
const _ALPHA_ADVANTAGE_API_KEY = 'apikey=3QM6WMRKQS9705V4'

//POLYGON
const _POLYGON_IO_ENDPOINT = 'https://api.polygon.io/v2/aggs'
const _POLYGON_IO_API_KEY = 'e4UHMBeGB8re8bomNWQRLla_9mYulTF2'


function getAlphaAdvantageUrl(functionName, urlParam){
    return `${_ALPHA_ADVANTAGE_ENDPOINT}?function=${functionName}&${urlParam}&${_ALPHA_ADVANTAGE_API_KEY}`
}

// by default keys of objects from alpha advantage api look something like
// "1. open": "136.35",
// this functions remove 1. and updates all the given example key to something like
// open: "136.35",
function updateArrayKeys(arr) {
    return arr.map(obj => {
      const newObj = {};
      for (const key in obj) {
        newObj[key.replace(/^\d+\.\s/, "")] = obj[key];
      }
      return newObj;
    });
}

export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['Stocks', 'MarketData'],
    baseQuery: fetchBaseQuery({ 
        baseUrl: '',
    }),
    endpoints: (builder) => ({
        getSearchStock: builder.query({
            query: (searchString) => ({
                url: getAlphaAdvantageUrl('SYMBOL_SEARCH', `keywords=${searchString}`),
                providesTags:['Stocks']
            }),
            transformResponse: (response) => updateArrayKeys(response.bestMatches)
        }),
        getStockMarketData: builder.query({
            // date in YYYY-MM-DD
            query: (date) => ({
                url: `${_POLYGON_IO_ENDPOINT}/grouped/locale/us/market/stocks/${date}?adjusted=true&apiKey=${_POLYGON_IO_API_KEY}`,
                providesTags:['MarketData']
            }),
            transformResponse: (response) => {return {data: response.results, createdDate: getLastBusinessDay()}},
            async onQueryStarted({date}, { queryFulfilled }) {
                try {
                    const { data: response } = await queryFulfilled
                    await saveMarketData(response)
				    addMarketData(response.data)
                } catch {
                    //TODO error management
                }
            },
        })
    }),
})

export const { 
    useLazyGetSearchStockQuery,
    useLazyGetStockMarketDataQuery
} = api;