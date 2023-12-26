import { useContext, useEffect } from "react";
import { Movie, fetchNextPage, fetchFirstPage } from "./moviesSlice";
import MovieCard from "./MovieCard";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Box, Container, Grid, LinearProgress, Typography } from "@mui/material";
import { AuthContext, anonymousUser } from "../../AuthContext";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

function Movies() {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.movies.top);
  const loading = useAppSelector((state) => state.movies.loading);

  // useEffect(() => {
  //   dispatch(fetchFirstPage());
  // }, [dispatch]);

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Now playing
      </Typography>
      {loading && <LinearProgress color="secondary" sx={{ mb: 2 }} />}
      <MoviesCards movies={movies} loading={loading} />
    </Container>
  );
}

function MoviesCards({ movies, loading }: { movies: Movie[]; loading: boolean }) {
  const auth = useContext(AuthContext);
  const loggedIn = auth.user !== anonymousUser;
  const [containerRef, isVisible] = useIntersectionObserver();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isVisible && !loading) {
      dispatch(fetchNextPage());
    }
  }, [dispatch, loading, isVisible]);

  return (
    <>
      <Grid container spacing={4}>
        {movies.map((m) => (
          <Grid item key={m.id} xs={12} sm={6} md={4}>
            <MovieCard
              key={m.id}
              id={m.id}
              title={m.title}
              overview={m.overview}
              popularity={m.popularity}
              image={m.image}
              enableUserActions={loggedIn}
            />
          </Grid>
        ))}
      </Grid>
      <Box height="10px" ref={containerRef} />
    </>
  );
}

export default Movies;
