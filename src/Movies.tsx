import "./Movies.css"

function Movies() {
    const movies = [
        { title: "The Shawshank Redemption" },
        { title: "The Godfather" },
        { title: "The Dark Knight" },
        { title: "The Godfather Part II" },
        { title: "Angry Men" }
    ];

    return (
        <section>
            <div>
                {movies.map(m => (<div className="Movies-item" key={m.title}>{m.title}</div>))}
            </div>
        </section>
    );
}

export default Movies;