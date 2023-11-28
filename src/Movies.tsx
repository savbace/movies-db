import { connect } from "react-redux";
import "./Movies.css"
import { RootState } from "./store";
import { Movie } from "./reducers/movies";

interface Props {
    movies: Movie[];
}

function Movies({ movies }: Props) {
    return (
        <section>
            <div>
                {movies.map(m => (<div className="Movies-item" key={m.title}>{m.title}</div>))}
            </div>
        </section>
    );
}

const mapStateToProps = (state: RootState) => ({
    movies: state.movies.top
})

const connector = connect(mapStateToProps)

export default connector(Movies);