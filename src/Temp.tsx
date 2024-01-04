import { Box, Button, Container, LinearProgress, Typography } from "@mui/material";
import { useMemo, useState } from "react";

import { useGetMoviesQuery } from "./services/tmdb";
import MovieCard from "./features/Movies/MovieCard";

export function Temp() {
  const [page, setPage] = useState(1);
  const query = useMemo(
    () => ({
      page,
      filters: {
        keywords: [],
        genres: [],
      },
    }),
    [page]
  );

  const { data, isLoading, isFetching } = useGetMoviesQuery(query);

  return (
    <Container sx={{ mt: 2 }}>
      {(isLoading || isFetching) && <LinearProgress sx={{ mb: 2 }} />}
      <Button variant="contained" onClick={() => setPage((p) => p + 1)}>
        Load more
      </Button>
      <Typography>Last page: {data?.lastPage}</Typography>
      <Typography>Has more pages: {data?.hasMorePages ? "Yes" : "No"}</Typography>
      <Box>
        <ul>
          {data?.results.map((m) => (
            <li key={m.id}>
              <MovieCard id={m.id} title={m.title} overview={m.overview} popularity={m.popularity} />
            </li>
          ))}
        </ul>
      </Box>
    </Container>
  );
}
