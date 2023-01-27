import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const _ALPHA_ADVANTAGE_ENDPOINT = 'https://www.alphavantage.co/query';
const _API_KEY = 'apikey=3QM6WMRKQS9705V4'

function getUrl(functionName, urlParam){
    return `?function=${functionName}&${urlParam}&${_API_KEY}`
}
function updateArrayKeys(arr) {
    return arr.map(obj => {
      const newObj = {};
      for (const key in obj) {
        newObj[key.replace(/^\d+\.\s/, "")] = obj[key];
      }
      return newObj;
    });
  }

export const alphaAdvantageApi = createApi({
    reducerPath: 'alphaAdvantageApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: _ALPHA_ADVANTAGE_ENDPOINT,
    }),
    endpoints: (builder) => ({
        getSearchStock: builder.query({
            query: (searchString) => ({
                url: getUrl('SYMBOL_SEARCH', `keywords=${searchString}`),
                providesTags:['Stocks']
            }),
            transformResponse: (response) => updateArrayKeys(response.bestMatches)
        })
    }),
})

export const { 
    useLazyGetSearchStockQuery
} = alphaAdvantageApi;