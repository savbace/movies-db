import styles from "./Movies.module.scss";

import { connect, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchMovies } from "./moviesSlice";
import MovieCard from "./MovieCard";
import { useEffect } from "react";

const selectMovies = (state: RootState) => state.movies.top;
const selectMoviesLoading = (state: RootState) => state.movies.loading;

function Movies() {
    const dispatch = useDispatch<AppDispatch>();
    const movies = useSelector(selectMovies);
    const loading = useSelector(selectMoviesLoading);

    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch])

    return (
        <section>
            <div className={styles.list}>
                {loading
                    ? <span>Loading...</span>
                    : movies.map(m => (
                        <MovieCard
                            key={m.id}
                            id={m.id}
                            title={m.title}
                            overview={m.overview}
                            popularity={m.popularity}
                            image={m.image}
                        />
                    ))}
            </div>
        </section>
    );
}

const mapStateToProps = (state: RootState) => ({
    movies: state.movies.top,
    loading: state.movies.loading
});

const connector = connect(mapStateToProps);

export default connector(Movies);