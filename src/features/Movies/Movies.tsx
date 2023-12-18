import styles from "./Movies.module.scss";

import { connect } from "react-redux";
import { RootState } from "../../store";
import { Movie } from "../../reducers/movies";
import MovieCard from "./MovieCard";
import { useEffect, useState } from "react";
import configuration from "../../configuration";

async function getNowPlaying() {
    var headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Authorization", `Bearer ${configuration.apiToken}`);

    var requestOptions = {
        method: "GET",
        headers: headers
    };

    const response = await fetch(`${configuration.apiUrl}/3/movie/now_playing`, requestOptions);
    const value = await response.json();
    return value;
}

interface Props {
    movies: Movie[];
}

function Movies({ movies }: Props) {
    const [moviesTemp, setMoviesTemp] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const value = await getNowPlaying();
            const nowPlaying: Movie[] = value.results.map((movie: Movie) => ({
                id: movie.id,
                title: movie.title,
                overview: movie.overview,
                popularity: movie.popularity
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