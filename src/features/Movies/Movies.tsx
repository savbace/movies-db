import styles from "./Movies.module.scss";

import { useEffect } from "react";
import { connect } from "react-redux";
import { RootState } from "../../store";
import { fetchMovies } from "./moviesSlice";
import MovieCard from "./MovieCard";
import { useAppDispatch, useAppSelector } from "../../hooks";

function Movies() {
    const dispatch = useAppDispatch();
    const movies = useAppSelector(state => state.movies.top);
    const loading = useAppSelector(state => state.movies.loading);

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