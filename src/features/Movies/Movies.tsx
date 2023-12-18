import styles from "./Movies.module.scss";

import { connect } from "react-redux";
import { RootState } from "../../store";
import { Movie } from "../../reducers/movies";
import MovieCard from "./MovieCard";
import { useEffect, useState } from "react";
import { client } from "../../api/tmdb";

interface Props {
    movies: Movie[];
}

function Movies({ movies }: Props) {
    const [moviesTemp, setMoviesTemp] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const configuration = await client.getConfiguration();
            const results = await client.getNowPlaying();
            const imageSize = "w780";
            const nowPlaying: Movie[] = results.map((movie) => ({
                id: movie.id,
                title: movie.title,
                overview: movie.overview,
                popularity: movie.popularity,
                image: movie.backdrop_path ? `${configuration.images.base_url}${imageSize}${movie.backdrop_path}` : undefined
            }));

            setMoviesTemp(nowPlaying);
        };

        fetchMovies()
            .catch(console.error);
    }, []);

    return (
        <section>
            <div className={styles.list}>
                {moviesTemp.map(m => (
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
    movies: state.movies.top
})

const connector = connect(mapStateToProps)

export default connector(Movies);