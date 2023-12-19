import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

import { client } from "../../api/tmdb";
import { ActionWithPayload, createReducer } from "../../redux/utils";

export interface Movie {
    id: number;
    title: string;
    overview: string;
    popularity: number;
    image?: string;
}

interface MoviesState {
    loading: boolean;
    top: Movie[]
}

const initialState: MoviesState = {
    loading: false,
    top: []
}

export type Actions = { type: "movies/fetch" } | { type: "movies/loading" };

export type ThunkResult<R> = ThunkAction<R, MoviesState, undefined, Actions> | Action

export function fetchMovies(): ThunkResult<Promise<void>> {
    return async (dispatch) => {
        dispatch({ type: "movies/loading", payload: true });

        const configuration = await client.getConfiguration(); // todo: single load per app
        const results = await client.getNowPlaying();
        const imageSize = "w780";
        const movies: Movie[] = results.map((movie) => ({
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            popularity: movie.popularity,
            image: movie.backdrop_path ? `${configuration.images.base_url}${imageSize}${movie.backdrop_path}` : undefined
        }));

        dispatch({ type: "movies/loading", payload: false });
        dispatch({ type: "movies/fetch", payload: movies })
    }
}

const moviesReducer = createReducer<MoviesState>(
    initialState,
    {
        "movies/loading": (state, action: ActionWithPayload<boolean>) => {
            return { ...state, loading: action.payload };
        },
        "movies/fetch": (state, action: ActionWithPayload<Movie[]>) => {
            return { ...state, top: action.payload };
        },
    });

export default moviesReducer;