import { Box, Button, Container, LinearProgress } from "@mui/material";
import { useGetMoviesQuery } from "./services/tmdb";
import { useMemo, useState } from "react";

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

  const { data, isLoading, error } = useGetMoviesQuery(query);

  return (
    <Container sx={{ mt: 2 }}>
      {isLoading && <LinearProgress />}
      <Button variant="contained" onClick={() => setPage((p) => p + 1)}>
        Load more
      </Button>
      <Box>
        <ul>
          {data?.results.map((m) => (
            <li key={m.id}>{m.title}</li>
          ))}
        </ul>
      </Box>
    </Container>
  );
}
