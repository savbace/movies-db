import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import configuration from "../configuration";
import { PageDetails, MovieDetails, MoviesFilters } from "../api/tmdb";

const baseUrl = `${configuration.apiUrl}/3`;

interface MoviesQuery {
  page: number;
  filters: MoviesFilters;
}

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders(headers) {
      headers.set("Accept", "application/json");
      headers.set("Authorization", `Bearer ${configuration.apiToken}`);
    },
  }),
  endpoints: (builder) => ({
    getMovies: builder.query<PageDetails<MovieDetails>, MoviesQuery>({
      query(moviesQuery) {
        const params = new URLSearchParams({
          page: moviesQuery.page.toString(),
        });

        if (moviesQuery.filters.keywords?.length) {
          params.append("with_keywords", moviesQuery.filters.keywords.join("|"));
        }

        if (moviesQuery.filters.genres?.length) {
          params.append("with_genres", moviesQuery.filters.genres.join(","));
        }

        const query = params.toString();
        const path = `/discover/movie?${query}`;

        return path;
      },
    }),
  }),
});

export const { useGetMoviesQuery } = tmdbApi;
