import styles from "./MovieCard.module.css";

import { Link } from "react-router-dom";

interface Props {
    id: number
    title: string;
    popularity: number;
    overview: string;
}

function MovieCard({ id, title, overview, popularity }: Props) {
    return (
        <div className={styles.card}>
            <div>
                <Link to={`/movies/${id}`}>{title}</Link>
            </div>
            <span className={styles.overview}>{overview}</span>
            <div className={styles.popularity}>{popularity}</div>
        </div>
    );
}

export default MovieCard;