import { UnknownAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";

import moviesReducer from "./features/Movies/moviesSlice";
import { tmdbApi } from "./services/tmdb";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    [tmdbApi.reducerPath]: tmdbApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmdbApi.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType> = ThunkAction<ReturnType, RootState, undefined, UnknownAction>;

export default store;
