import { Action, Reducer } from "redux";

export interface Movie {
    title: string;
}

interface MoviesState {
    top: Movie[]
}

const initialState: MoviesState = {
    top: [
        { title: "The Shawshank Redemption" },
        { title: "The Godfather" },
        { title: "The Dark Knight" },
        { title: "The Godfather Part II" },
        { title: "Angry Men" }
    ]
}

const moviesReducer: Reducer<MoviesState, Action> = (state, action) => {
    return initialState;
}

export default moviesReducer;