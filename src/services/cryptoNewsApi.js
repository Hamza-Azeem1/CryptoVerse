import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const newsApiHeaders = {
    'X-RapidAPI-Key': import.meta.env.VITE_NEWS_API_KEY,
    'X-RapidAPI-Host': import.meta.env.VITE_NEWS_API_HOST,
};

const baseUrl = import.meta.env.VITE_NEWS_API_BASE_URL;

const createRequest = (url) => ({
    url,
    headers: newsApiHeaders
});

export const CryptoNewsApi = createApi({
    reducerPath: 'CryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: () => createRequest('/bitcoinist')
        })
    })
});

export const {
    useGetCryptoNewsQuery,
} = CryptoNewsApi;
